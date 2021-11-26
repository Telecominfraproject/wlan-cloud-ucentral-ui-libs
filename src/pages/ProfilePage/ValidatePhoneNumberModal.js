import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import parsePhoneNumber from 'libphonenumber-js';
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CPopover,
  CButton,
  CRow,
  CCol,
  CInput,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSave, cilX } from '@coreui/icons';

const ValidatePhoneNumberModal = ({
  t,
  show,
  toggle,
  save,
  sendPhoneNumberTest,
  testVerificationCode,
}) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [code, setCode] = useState('');
  const [phoneValidated, setPhoneValidated] = useState(false);

  const onCodeChange = (e) => {
    setPhoneValidated(false);
    setCode(e.target.value);
  };

  const sendTest = async () => {
    setLoading(true);
    setSent(false);

    sendPhoneNumberTest(`+${phoneNumber}`)
      .then((result) => setSent(result))
      .finally(setLoading(false));
  };

  const testCode = async () => {
    testVerificationCode(`+${phoneNumber}`, code).then((result) => {
      setPhoneValidated(result);
    });
  };

  const validateRawPhoneNumber = () => {
    if (phoneNumber !== null) {
      const numberTest = parsePhoneNumber(`+${phoneNumber}`);
      if (numberTest) {
        return numberTest.isValid();
      }
    }
    return false;
  };

  const saveNumber = () => {
    toggle();
    save(phoneNumber);
  };

  useEffect(() => {
    if (show) {
      setPhoneNumber(null);
      setLoading(false);
      setSent(false);
      setCode('');
      setPhoneValidated(false);
    }
  }, [show]);

  return (
    <CModal show={show} onClose={toggle}>
      <CModalHeader className="p-1">
        <CModalTitle className="pl-1 pt-1">{t('user.phone_number')}</CModalTitle>
        <div className="text-right">
          <CPopover content={t('common.save')}>
            <CButton
              color="primary"
              variant="outline"
              className="ml-2"
              onClick={saveNumber}
              disabled={!phoneValidated}
            >
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
        <CRow>
          <CCol>
            <h6>{t('user.enter_new_phone')}</h6>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="8">
            <PhoneInput
              enableSearch
              value={phoneNumber}
              onChange={setPhoneNumber}
              disabled={loading}
            />
          </CCol>
          <CCol>
            <CButton
              color="primary"
              onClick={sendTest}
              className="mt-1"
              disabled={!validateRawPhoneNumber() || loading}
            >
              {t('user.send_code')}
            </CButton>
          </CCol>
        </CRow>
        <h6 hidden={!sent} className="pt-4">
          {t('user.check_phone')}
        </h6>
        <CRow hidden={!sent}>
          <CCol sm="3">
            <CInput
              style={{ width: '110px' }}
              type="text"
              value={code}
              onChange={onCodeChange}
              maxLength="6"
              placeholder="Enter code"
            />
          </CCol>
          <CCol sm="3">
            <CButton color="primary" onClick={testCode}>
              {t('user.validate_phone')}
            </CButton>
          </CCol>
        </CRow>
        <CAlert hidden={!phoneValidated} className="mt-4" color="success">
          {t('user.successful_validation')}
        </CAlert>
      </CModalBody>
    </CModal>
  );
};

ValidatePhoneNumberModal.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  sendPhoneNumberTest: PropTypes.func.isRequired,
  testVerificationCode: PropTypes.func.isRequired,
};

export default ValidatePhoneNumberModal;
