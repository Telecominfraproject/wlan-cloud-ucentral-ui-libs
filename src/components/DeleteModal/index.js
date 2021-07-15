import React from 'react';
import PropTypes from 'prop-types';
import { CAlert, CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react';
import ConfirmFooter from '../ConfirmFooter';

const DeleteModal = ({
  t,
  show,
  toggleShow,
  deleteRequest,
  idToDelete,
  deleteLoading,
  title,
  explanation,
  warning,
}) => {
  const deleteWrapper = () => {
    deleteRequest(idToDelete);
    toggleShow();
  };

  return (
    <CModal show={show} onClose={toggleShow}>
      <CModalHeader>
        <CModalTitle>{title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CAlert color="danger">{warning}</CAlert>
        {explanation}
      </CModalBody>
      <ConfirmFooter
        t={t}
        isShown={show}
        isLoading={deleteLoading}
        action={deleteWrapper}
        color="primary"
        toggleParent={toggleShow}
      />
    </CModal>
  );
};

DeleteModal.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggleShow: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  idToDelete: PropTypes.string.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  explanation: PropTypes.string.isRequired,
  warning: PropTypes.string.isRequired,
};

export default React.memo(DeleteModal);
