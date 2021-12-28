import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { getItem, setItem } from 'utils/localStorageHelper';
import CreateUserModal from './CreateUserModal';
import EditUserModal from './EditUserModal';
import Table from './Table';

const UserListPage = ({ currentToken, endpoints, addToast, axiosInstance }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState({ selected: 0 });
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const [userToEdit, setUserToEdit] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [usersPerPage, setUsersPerPage] = useState(getItem('devicesPerPage') || '10');
  const [policies, setPolicies] = useState({
    passwordPolicy: '',
    passwordPattern: '',
    accessPolicy: '',
  });

  const getPasswordPolicy = () => {
    axiosInstance
      .post(`${endpoints.owsec}/api/v1/oauth2?requirements=true`, {})
      .then((response) => {
        const newPolicies = response.data;
        newPolicies.accessPolicy = `${endpoints.owsec}${newPolicies.accessPolicy}`;
        newPolicies.passwordPolicy = `${endpoints.owsec}${newPolicies.passwordPolicy}`;
        setPolicies(response.data);
      })
      .catch(() => {});
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  const toggleEditModal = (userId) => {
    if (userId) setUserToEdit(userId);
    setShowEditModal(!showEditModal);
  };

  const getUsers = () => {
    setLoading(true);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${currentToken}`,
    };

    axiosInstance
      .get(`${endpoints.owsec}/api/v1/users?idOnly=true`, {
        headers,
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((e) => {
        addToast({
          title: t('common.error'),
          body: t('user.error_fetching_users', { error: e.response?.data?.ErrorDescription }),
          color: 'danger',
          autohide: true,
        });
        setLoading(false);
      });
  };

  const getAvatarPromises = (userList) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: 'arraybuffer',
    };

    const promises = userList.map(async (user) => {
      if (user.avatar !== '' && user.avatar !== '0') {
        return axiosInstance.get(
          `${endpoints.owsec}/api/v1/avatar/${user.Id}?cache=${user.avatar}`,
          options,
        );
      }
      return new Promise('');
    });

    return promises;
  };

  const getUserDetails = async (headers, idsToGet) =>
    axiosInstance
      .get(`${endpoints.owsec}/api/v1/users?select=${idsToGet}`, {
        headers,
      })
      .then((response) => response.data.users)
      .catch((e) => {
        addToast({
          title: t('common.error'),
          body: t('user.error_fetching_users', { error: e.response?.data?.ErrorDescription }),
          color: 'danger',
          autohide: true,
        });
        setLoading(false);
        return [];
      });

  const displayUsers = async () => {
    setLoading(true);

    const startIndex = page.selected * usersPerPage;
    const endIndex = parseInt(startIndex, 10) + parseInt(usersPerPage, 10);
    const idsToGet = users
      .slice(startIndex, endIndex)
      .map((x) => encodeURIComponent(x))
      .join(',');

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${currentToken}`,
    };

    let newUsers = await getUserDetails(headers, idsToGet);

    const avatarRequests = getAvatarPromises(newUsers);
    const avatars = await Promise.allSettled(avatarRequests).then((results) =>
      results.map((response) => {
        if (response.status === 'fulfilled') {
          const base64 = btoa(
            new Uint8Array(response.value.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              '',
            ),
          );
          return `data:;base64,${base64}`;
        }
        return '';
      }),
    );

    newUsers = newUsers.map((user, index) => {
      const newUser = {
        ...user,
        avatar: avatars[index],
      };
      return newUser;
    });
    setUsersToDisplay(newUsers);
    setLoading(false);
  };

  const deleteUser = (userId) => {
    setDeleteLoading(true);

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${currentToken}`,
    };

    axiosInstance
      .delete(`${endpoints.owsec}/api/v1/user/${userId}`, {
        headers,
      })
      .then(() => {
        addToast({
          title: t('common.success'),
          body: t('user.delete_success'),
          color: 'success',
          autohide: true,
        });
        getUsers();
      })
      .catch((e) => {
        addToast({
          title: t('common.error'),
          body: t('user.delete_failure', { error: e.response?.data?.ErrorDescription }),
          color: 'danger',
          autohide: true,
        });
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  const updateUsersPerPage = (value) => {
    setItem('usersPerPage', value);
    setUsersPerPage(value);
  };

  useEffect(() => {
    if (users.length > 0) {
      displayUsers();
    } else {
      setUsersToDisplay([]);
      setLoading(false);
    }
  }, [users, usersPerPage, page]);

  useEffect(() => {
    getUsers();
    getPasswordPolicy();
  }, []);

  useEffect(() => {
    if (users !== []) {
      const count = Math.ceil(users.length / usersPerPage);
      setPageCount(count);
    }
  }, [usersPerPage, users]);

  return (
    <div>
      <Table
        t={t}
        users={usersToDisplay.sort((a, b) => a.email > b.email)}
        loading={loading}
        usersPerPage={usersPerPage}
        setUsersPerPage={updateUsersPerPage}
        pageCount={pageCount}
        currentPage={page.selected}
        setPage={setPage}
        deleteUser={deleteUser}
        deleteLoading={deleteLoading}
        toggleCreate={toggleCreateModal}
        toggleEdit={toggleEditModal}
        refreshUsers={getUsers}
      />
      <CreateUserModal
        t={t}
        currentToken={currentToken}
        endpoints={endpoints}
        addToast={addToast}
        axiosInstance={axiosInstance}
        show={showCreateModal}
        toggle={toggleCreateModal}
        getUsers={getUsers}
        policies={policies}
      />
      <EditUserModal
        t={t}
        currentToken={currentToken}
        endpoints={endpoints}
        addToast={addToast}
        axiosInstance={axiosInstance}
        show={showEditModal}
        toggle={toggleEditModal}
        userId={userToEdit}
        getUsers={getUsers}
        policies={policies}
      />
    </div>
  );
};

UserListPage.propTypes = {
  currentToken: PropTypes.string.isRequired,
  endpoints: PropTypes.instanceOf(Object).isRequired,
  addToast: PropTypes.func.isRequired,
  axiosInstance: PropTypes.instanceOf(Object).isRequired,
};

export default UserListPage;
