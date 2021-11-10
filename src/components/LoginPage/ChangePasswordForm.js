import React from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CPopover,
  CAlert,
  CFormFeedback,
  CLink,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilLockLocked } from '@coreui/icons';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './index.module.scss';

const ChangePasswordForm = ({
  t,
  i18n,
  onKeyDown,
  signIn,
  loading,
  fields,
  updateField,
  changePasswordResponse,
  cancelPasswordChange,
  policies,
}) => (
  <CForm onKeyDown={(e) => onKeyDown(e, signIn)}>
    <h1>
      {t('login.change_password')}
      <div className={styles.languageSwitcher}>
        <LanguageSwitcher i18n={i18n} />
      </div>
    </h1>
    <p className="text-muted">{t('login.change_password_instructions')}</p>
    <CInputGroup className="mb-4">
      <CPopover content={t('login.password')}>
        <CInputGroupText>
          <CIcon name="cilLockLocked" content={cilLockLocked} />
        </CInputGroupText>
      </CPopover>
      <CFormInput
        id="newpassword"
        invalid={fields.newpassword.error}
        autoFocus
        required
        type="password"
        placeholder={t(fields.newpassword.placeholder)}
        autoComplete="username"
        onChange={updateField}
      />
      <CFormFeedback invalid className="help-block">
        {t('login.please_enter_username')}
      </CFormFeedback>
    </CInputGroup>
    <CInputGroup className="mb-4">
      <CPopover content={t('login.password')}>
        <CInputGroupText>
          <CIcon icon={cilLockLocked} />
        </CInputGroupText>
      </CPopover>
      <CFormInput
        id="confirmpassword"
        invalid={fields.confirmpassword.error}
        required
        type="password"
        placeholder={t(fields.confirmpassword.placeholder)}
        autoComplete="current-password"
        onChange={updateField}
      />
      <CFormFeedback invalid className="help-block">
        {t('login.different_passwords')}
      </CFormFeedback>
    </CInputGroup>
    <CRow>
      <CCol>
        <CAlert
          visible={changePasswordResponse.tried}
          color={!changePasswordResponse.error ? 'success' : 'danger'}
        >
          {changePasswordResponse.text}
        </CAlert>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CButton color="primary" className="px-4" onClick={() => signIn(true)} disabled={loading}>
          {loading ? t('login.changing_password') : t('login.change_password')}
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
      <CCol xs="5" className={styles.forgotPassword}>
        <CButton variant="ghost" color="primary" onClick={cancelPasswordChange}>
          {t('common.cancel')}
        </CButton>
      </CCol>
    </CRow>
  </CForm>
);

ChangePasswordForm.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  onKeyDown: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  changePasswordResponse: PropTypes.instanceOf(Object).isRequired,
  cancelPasswordChange: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(ChangePasswordForm);
