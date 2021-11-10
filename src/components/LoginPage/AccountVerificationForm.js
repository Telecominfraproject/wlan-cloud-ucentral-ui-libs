import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormInput, CRow, CSpinner, CAlert, CLink } from '@coreui/react';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './index.module.scss';

const AccountVerificationForm = ({
  t,
  i18n,
  onKeyDown,
  toggleForgotPassword,
  validateVerificationCode,
  resendValidationCode,
  policies,
  formType,
}) => {
  const [sending, setSending] = useState(false);
  const [validating, setValidating] = useState(false);
  const [code, setCode] = useState('');
  const [success, setSuccess] = useState(null);

  const onChange = (e) => setCode(e.target.value);

  const resendCode = () => {
    setSending(true);

    resendValidationCode().finally(() => setSending(false));
  };

  const validate = () => {
    setValidating(true);
    validateVerificationCode(code)
      .then((result) => setSuccess(result))
      .finally(() => setValidating(false));
  };

  return (
    <CForm onKeyDown={(e) => onKeyDown(e, validateVerificationCode)}>
      <h1>
        {t('login.account_verification')}
        <div className={styles.languageSwitcher}>
          <LanguageSwitcher i18n={i18n} />
        </div>
      </h1>
      <p className="text-muted">
        {formType.split('-')[1] === 'sms'
          ? t('login.phone_validation_explanation')
          : t('login.email_code_validation')}
      </p>
      <div className="d-flex flex-row">
        <CFormInput
          autoFocus
          required
          type="text"
          value={code}
          placeholder={t('login.verification_code')}
          onChange={onChange}
        />
        <CButton
          className="ml-4"
          style={{ width: '300px' }}
          color="primary"
          onClick={resendCode}
          disabled={sending || validating}
        >
          {sending ? t('login.sending_ellipsis') : t('user.send_code_again')}
          <CSpinner hidden={!sending} color="light" component="span" size="sm" />
        </CButton>
      </div>
      <CRow className="pt-2">
        <CCol>
          <CAlert visible={success !== null} color={success ? 'success' : 'danger'}>
            {t('login.wrong_code')}
          </CAlert>
        </CCol>
      </CRow>
      <CRow className="pt-2">
        <CCol>
          <CButton color="primary" className="px-4" onClick={validate} disabled={validating}>
            {validating ? t('login.sending_ellipsis') : t('user.validate_phone')}
            <CSpinner hidden={!validating} color="light" component="span" size="sm" />
          </CButton>
          <CLink
            className="c-subheader-nav-link px-3"
            aria-current="page"
            href={policies.accessPolicy}
            target="_blank"
            hidden={policies.accessPolicy.length === 0}
          >
            {t('common.access_policy')}
          </CLink>
          <CButton
            className="float-end"
            variant="ghost"
            color="primary"
            onClick={toggleForgotPassword}
          >
            {t('common.back_to_login')}
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

AccountVerificationForm.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
  validateVerificationCode: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  resendValidationCode: PropTypes.func.isRequired,
  formType: PropTypes.string.isRequired,
};

export default React.memo(AccountVerificationForm);
