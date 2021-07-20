import React from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import EditUserForm from '../EditUserForm';

const EditUserModal = ({
  t,
  user,
  updateUserWithId,
  saveUser,
  loading,
  policies,
  show,
  toggle,
  addNote,
}) => (
  <CModal show={show} onClose={toggle} size="xl">
    <CModalHeader>
      <CModalTitle>
        {t('user.edit')} {user.email.value}
      </CModalTitle>
    </CModalHeader>
    <CModalBody>
      <EditUserForm
        t={t}
        user={user}
        updateUserWithId={updateUserWithId}
        saveUser={saveUser}
        loading={loading}
        policies={policies}
        addNote={addNote}
      />
    </CModalBody>
  </CModal>
);

EditUserModal.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserWithId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default React.memo(EditUserModal);
