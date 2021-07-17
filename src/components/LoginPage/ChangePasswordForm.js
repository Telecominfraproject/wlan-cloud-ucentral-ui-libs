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
        <CInputGroupPrepend>
          <CInputGroupText>
            <CIcon name="cilLockLocked" content={cilLockLocked} />
          </CInputGroupText>
        </CInputGroupPrepend>
      </CPopover>
      <CInput
        id="newpassword"
        invalid={fields.newpassword.error}
        autoFocus
        required
        type="password"
        placeholder={t(fields.newpassword.placeholder)}
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
        id="confirmpassword"
        invalid={fields.confirmpassword.error}
        required
        type="password"
        placeholder={t(fields.confirmpassword.placeholder)}
        autoComplete="current-password"
        onChange={updateField}
      />
      <CInvalidFeedback className="help-block">{t('login.different_passwords')}</CInvalidFeedback>
    </CInputGroup>
    <CRow>
      <CCol>
        <CAlert
          show={changePasswordResponse.tried}
          color={!changePasswordResponse.error ? 'success' : 'danger'}
        >
          {changePasswordResponse.text}
        </CAlert>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="6">
        <CButton color="primary" className="px-4" onClick={() => signIn(true)} disabled={loading}>
          {loading ? t('login.changing_password') : t('login.change_password')}
          <CSpinner hidden={!loading} color="light" component="span" size="sm" />
        </CButton>
      </CCol>
      <CCol xs="6" className={styles.forgotPassword}>
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
};

export default ChangePasswordForm;
