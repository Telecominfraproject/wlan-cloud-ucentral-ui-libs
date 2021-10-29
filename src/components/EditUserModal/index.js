import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPopover,
  CNav,
  CNavLink,
  CTabPane,
  CTabContent,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPencil, cilSave, cilX } from '@coreui/icons';
import EditUserForm from '../EditUserForm';
import DetailedNotesTable from '../DetailedNotesTable';

const EditUserModal = ({
  t,
  user,
  updateUserWithId,
  saveUser,
  loading,
  policies,
  show,
  editing,
  toggleEditing,
  toggle,
  addNote,
}) => {
  const [index, setIndex] = useState(0);

  const toggleModal = () => {
    toggleEditing();
    toggle();
  };

  useEffect(() => {
    if (show) setIndex(0);
  }, [show]);

  return (
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
          <CPopover content={t('common.edit')}>
            <CButton
              disabled={editing}
              color="primary"
              variant="outline"
              onClick={toggleEditing}
              className="ml-2"
            >
              <CIcon name="cil-pencil" content={cilPencil} />
            </CButton>
          </CPopover>
          <CPopover content={t('common.close')}>
            <CButton color="primary" variant="outline" className="ml-2" onClick={toggleModal}>
              <CIcon content={cilX} />
            </CButton>
          </CPopover>
        </div>
      </CModalHeader>
      <CModalBody className="px-3 pt-0">
        <CNav variant="tabs" className="mb-0 p-0">
          <CNavLink
            className="font-weight-bold"
            href="#"
            active={index === 0}
            onClick={() => setIndex(0)}
          >
            {t('common.main')}
          </CNavLink>
          <CNavLink
            className="font-weight-bold"
            href="#"
            active={index === 1}
            onClick={() => setIndex(1)}
          >
            {t('configuration.notes')}
          </CNavLink>
        </CNav>
        <CTabContent>
          <CTabPane active={index === 0} className="pt-2">
            {index === 0 ? (
              <EditUserForm
                t={t}
                user={user}
                updateUserWithId={updateUserWithId}
                policies={policies}
                editing={editing}
              />
            ) : null}
          </CTabPane>
          <CTabPane active={index === 1}>
            {index === 1 ? (
              <DetailedNotesTable
                t={t}
                notes={user.notes.value}
                addNote={addNote}
                loading={loading}
                editable={editing}
              />
            ) : null}
          </CTabPane>
        </CTabContent>
      </CModalBody>
    </CModal>
  );
};

EditUserModal.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserWithId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  show: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  toggleEditing: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default React.memo(EditUserModal);
