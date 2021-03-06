import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useUser from '../../../hooks/useUser';
import Modal from './Modal';

const initialState = {
  Id: {
    value: '',
    error: false,
    editable: false,
  },
  changePassword: {
    value: false,
    error: false,
    editable: true,
  },
  currentPassword: {
    value: '',
    error: false,
    editable: true,
  },
  email: {
    value: '',
    error: false,
    editable: false,
  },
  description: {
    value: '',
    error: false,
    editable: true,
  },
  name: {
    value: '',
    error: false,
    editable: true,
  },
  userRole: {
    value: 'accounting',
    error: false,
    editable: true,
  },
  notes: {
    value: [],
    editable: false,
  },
};

const EditUserModal = ({
  t,
  currentToken,
  endpoints,
  addToast,
  axiosInstance,
  show,
  toggle,
  userId,
  getUsers,
  policies,
}) => {
  const [loading, setLoading] = useState(false);
  const [initialUser, setInitialUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [user, updateWithId, updateWithKey, setUser] = useUser(initialState);

  const getUser = () => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    axiosInstance
      .get(`${endpoints.owsec}/api/v1/user/${userId}`, options)
      .then((response) => {
        const newUser = {};

        for (const key of Object.keys(response.data)) {
          if (key in initialState && key !== 'currentPassword') {
            newUser[key] = {
              ...initialState[key],
              value: response.data[key],
            };
          }
        }
        setInitialUser({ ...initialState, ...newUser });
        setUser({ ...initialState, ...newUser });
      })
      .catch(() => {
        addToast({
          title: t('common.error'),
          body: t('user.error_retrieving'),
          color: 'danger',
          autohide: true,
        });
        toggle();
      });
  };

  const toggleEditing = () => {
    if (editing) {
      getUser();
    }
    setEditing(!editing);
  };

  const updateUser = () => {
    setLoading(true);

    const parameters = {
      id: userId,
    };

    let newData = false;

    for (const key of Object.keys(user)) {
      if (user[key].editable && user[key].value !== initialUser[key].value) {
        if (key === 'currentPassword' && user[key].length < 8) {
          updateWithKey('currentPassword', {
            error: true,
          });
          newData = false;
          break;
        } else if (key === 'changePassword') {
          parameters[key] = user[key].value === 'on';
          newData = true;
        } else {
          parameters[key] = user[key].value;
          newData = true;
        }
      }
    }

    const newNotes = [];

    for (let i = 0; i < user.notes.value.length; i += 1) {
      if (user.notes.value[i].new) newNotes.push({ note: user.notes.value[i].note });
    }

    parameters.notes = newNotes;

    if (newData || newNotes.length > 0) {
      const options = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      };

      axiosInstance
        .put(`${endpoints.owsec}/api/v1/user/${userId}`, parameters, options)
        .then(() => {
          addToast({
            title: t('user.update_success_title'),
            body: t('user.update_success'),
            color: 'success',
            autohide: true,
          });
          getUsers();
          toggle();
        })
        .catch((e) => {
          addToast({
            title: t('user.update_failure_title'),
            body: t('user.update_failure', { error: e.response?.data?.ErrorDescription }),
            color: 'danger',
            autohide: true,
          });
          getUser();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
      addToast({
        title: t('user.update_success_title'),
        body: t('user.update_success'),
        color: 'success',
        autohide: true,
      });
      getUsers();
      toggle();
    }
  };

  const addNote = (currentNote) => {
    const newNotes = [...user.notes.value];
    newNotes.unshift({
      note: currentNote,
      new: true,
      created: new Date().getTime() / 1000,
      createdBy: '',
    });
    updateWithKey('notes', { value: newNotes });
  };

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    if (show) {
      getUser();
      setEditing(false);
    }
  }, [show]);

  return (
    <Modal
      t={t}
      user={user}
      updateUserWithId={updateWithId}
      saveUser={updateUser}
      loading={loading}
      policies={policies}
      show={show}
      toggle={toggle}
      editing={editing}
      toggleEditing={toggleEditing}
      addNote={addNote}
    />
  );
};

EditUserModal.propTypes = {
  t: PropTypes.func.isRequired,
  currentToken: PropTypes.string.isRequired,
  endpoints: PropTypes.instanceOf(Object).isRequired,
  addToast: PropTypes.func.isRequired,
  axiosInstance: PropTypes.instanceOf(Object).isRequired,
  userId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(EditUserModal);
