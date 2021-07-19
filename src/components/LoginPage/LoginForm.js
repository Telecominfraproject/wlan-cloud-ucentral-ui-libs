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
  CLink,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilLink } from '@coreui/icons';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './index.module.scss';

const LoginForm = ({
  t,
  i18n,
  onKeyDown,
  signIn,
  loading,
  fields,
  updateField,
  loginResponse,
  toggleForgotPassword,
  policies,
}) => (
  <CForm onKeyDown={(e) => onKeyDown(e, signIn)}>
    <h1>
      {t('login.login')}
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher i18n={i18n} />
      </div>
    </h1>
    <p className="text-muted">{t('login.sign_in_to_account')}</p>
    <CInputGroup className="mb-4">
      <CPopover content={t('login.username')}>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cilUser" content={cilUser} />
          </CInputGroupText>
        </CInputGroupPrepend>
      </CPopover>
      <CInput
        id="username"
        invalid={fields.username.error}
        autoFocus
        required
        type="text"
        placeholder={t(fields.username.placeholder)}
        autoComplete="username"
        onChange={updateField}
      />
      <CInvalidFeedback className="help-block">{t('login.please_enter_username')}</CInvalidFeedback>
    </CInputGroup>
    <CInputGroup className="mb-4">
      <CPopover content={t('login.password')}>
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon content={cilLockLocked} />
          </CInputGroupText>
        </CInputGroupPrepend>
      </CPopover>
      <CInput
        id="password"
        invalid={fields.password.error}
        required
        type="password"
        placeholder={t(fields.password.placeholder)}
        autoComplete="current-password"
        onChange={updateField}
      />
      <CInvalidFeedback className="help-block">{t('login.please_enter_password')}</CInvalidFeedback>
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
        <CAlert show={loginResponse.tried} color={!loginResponse.error ? 'success' : 'danger'}>
          {loginResponse.text}
        </CAlert>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CButton color="primary" className="px-4" onClick={signIn} disabled={loading}>
          {loading ? t('login.logging_in') : t('login.login')}
          <CSpinner hidden={!loading} color="light" component="span" size="sm" />
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
        <CLink
          className="c-subheader-nav-link"
          aria-current="page"
          href={policies.passwordPolicy}
          target="_blank"
          hidden={policies.passwordPolicy.length === 0}
        >
          {t('common.password_policy')}
        </CLink>
      </CCol>
      <CCol xs="5" className="text-right">
        <CButton variant="ghost" color="primary" onClick={toggleForgotPassword}>
          {t('common.forgot_password')}
        </CButton>
      </CCol>
    </CRow>
  </CForm>
);

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  loginResponse: PropTypes.instanceOf(Object).isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(LoginForm);
