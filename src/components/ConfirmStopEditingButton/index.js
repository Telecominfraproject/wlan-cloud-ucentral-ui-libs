import React from 'react';
import PropTypes from 'prop-types';
import {
  CAlert,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPopover,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import useToggle from '../../hooks/useToggle';

const ConfirmStopEditingButton = ({ t, stopEditing, disabled }) => {
  const [show, toggleShow] = useToggle();

  const toggleAndStop = () => {
    toggleShow();
    stopEditing();
  };

  return (
    <>
      <CPopover content={t('common.stop_editing')}>
        <CButton disabled={disabled} color="dark" onClick={toggleShow} className="ml-2">
          <CIcon name="cil-x" content={cilX} />
        </CButton>
      </CPopover>
      <CModal show={show} onClose={toggleShow}>
        <CModalHeader className="p-1">
          <CModalTitle className="pl-1 pt-1 text-dark">{t('common.stop_editing')}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.close')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={toggleShow}>
                <CIcon content={cilX} />
              </CButton>
            </CPopover>
          </div>
        </CModalHeader>
        <CModalBody>
          <CAlert color="danger">{t('common.confirm_stop_editing')}</CAlert>
          <div className="text-center">
            <CButton className="mr-2" color="danger" onClick={toggleAndStop}>
              {t('common.stop_editing')}
            </CButton>
            <CButton className="ml-2" color="light" onClick={toggleShow}>
              {t('common.go_back')}
            </CButton>
          </div>
        </CModalBody>
      </CModal>
    </>
  );
};

ConfirmStopEditingButton.propTypes = {
  t: PropTypes.func.isRequired,
  stopEditing: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ConfirmStopEditingButton;
