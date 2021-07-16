import React from 'react';
import {
  CButton,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
  CPopover,
  CAlert,
  CInvalidFeedback,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLink } from '@coreui/icons';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './index.module.scss';

const ForgotPasswordForm = ({
  t,
  i18n,
  onKeyDown,
  sendForgotPasswordEmail,
  loading,
  fields,
  forgotResponse,
  updateField,
  toggleForgotPassword,
}) => (
  <CForm onKeyDown={(e) => onKeyDown(e, sendForgotPasswordEmail)}>
    <h1>
      {t('common.forgot_password')}
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher i18n={i18n} />
      </div>
    </h1>
    <p className="text-muted">{t('login.forgot_password_explanation')}</p>
    <CInputGroup className="mb-4">
      <CPopover content={t('login.username')}>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cilUser" content={cilUser} />
          </CInputGroupText>
        </CInputGroupPrepend>
      </CPopover>
      <CInput
        id="forgotusername"
        invalid={fields.forgotusername.error}
        autoFocus
        required
        type="text"
        value={fields.forgotusername.value}
        placeholder={t(fields.forgotusername.placeholder)}
        autoComplete="forgotusername"
        onChange={updateField}
      />
      <CInvalidFeedback className="help-block">{t('login.please_enter_username')}</CInvalidFeedback>
    </CInputGroup>
    <CInputGroup className="mb-4" hidden={fields.ucentralsecurl.hidden}>
      <CPopover content={t('login.url')}>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cilLink" content={cilLink} />
          </CInputGroupText>
        </CInputGroupPrepend>
      </CPopover>
      <CInput
        id="ucentralsecurl"
        invalid={fields.ucentralsecurl.error}
        type="text"
        required
        placeholder={t(fields.ucentralsecurl.placeholder)}
        value={fields.ucentralsecurl.value}
        autoComplete="gateway-url"
        onChange={updateField}
      />
      <CInvalidFeedback className="help-block">{t('login.please_enter_gateway')}</CInvalidFeedback>
    </CInputGroup>
    <CRow>
      <CCol>
        <CAlert show={forgotResponse.tried} color={!forgotResponse.error ? 'success' : 'danger'}>
          {forgotResponse.text}
        </CAlert>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="6">
        <CButton
          color="primary"
          className="px-4"
          onClick={sendForgotPasswordEmail}
          disabled={loading}
        >
          {loading ? t('login.sending_ellipsis') : t('login.send_forgot')}
          <CSpinner hidden={!loading} color="light" component="span" size="sm" />
        </CButton>
      </CCol>
      <CCol xs="6" className={styles.forgotPassword}>
        <CButton variant="ghost" color="primary" onClick={toggleForgotPassword}>
          {t('common.back_to_login')}
        </CButton>
      </CCol>
    </CRow>
  </CForm>
);

ForgotPasswordForm.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  sendForgotPasswordEmail: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  forgotResponse: PropTypes.instanceOf(Object).isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;
