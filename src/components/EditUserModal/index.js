import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CModal, CModalBody, CModalHeader, CModalTitle, CPopover } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSave, cilX } from '@coreui/icons';
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
    <CModalHeader className="p-1">
      <CModalTitle className="pl-1 pt-1">
        {t('user.edit')} {user.email.value}
      </CModalTitle>
      <div className="text-right">
        <CPopover content={t('common.save')}>
          <CButton color="primary" variant="outline" onClick={saveUser} disabled={loading}>
            <CIcon content={cilSave} />
          </CButton>
        </CPopover>
        <CPopover content={t('common.close')}>
          <CButton color="primary" variant="outline" className="ml-2" onClick={toggle}>
            <CIcon content={cilX} />
          </CButton>
        </CPopover>
      </div>
    </CModalHeader>
    <CModalBody>
      <EditUserForm
        t={t}
        user={user}
        updateUserWithId={updateUserWithId}
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
