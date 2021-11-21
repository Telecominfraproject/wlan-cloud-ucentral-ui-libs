import React from 'react';
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ChangePasswordForm from './ChangePasswordForm';
import AccountVerificationForm from './AccountVerificationForm';

const LoginPage = ({
  t,
  i18n,
  signIn,
  loading,
  loginResponse,
  logo,
  forgotResponse,
  fields,
  updateField,
  formType,
  toggleForgotPassword,
  onKeyDown,
  submitForm,
  sendForgotPasswordEmail,
  changePasswordResponse,
  cancelPasswordChange,
  policies,
  validateCode,
  resendValidationCode,
}) => {
  const getForm = () => {
    if (formType.split('-')[0] === 'validation') {
      return (
        <AccountVerificationForm
          t={t}
          i18n={i18n}
          onKeyDown={onKeyDown}
          toggleForgotPassword={toggleForgotPassword}
          validateVerificationCode={validateCode}
          resendValidationCode={resendValidationCode}
          policies={policies}
          formType={formType}
        />
      );
    }
    if (formType === 'forgot-password') {
      return (
        <ForgotPasswordForm
          t={t}
          i18n={i18n}
          onKeyDown={onKeyDown}
          signIn={signIn}
          loading={loading}
          fields={fields}
          updateField={updateField}
          forgotResponse={forgotResponse}
          toggleForgotPassword={toggleForgotPassword}
          sendForgotPasswordEmail={sendForgotPasswordEmail}
          policies={policies}
        />
      );
    }
    if (formType === 'change-password') {
      return (
        <ChangePasswordForm
          t={t}
          i18n={i18n}
          onKeyDown={onKeyDown}
          signIn={signIn}
          loading={loading}
          fields={fields}
          updateField={updateField}
          changePasswordResponse={changePasswordResponse}
          cancelPasswordChange={cancelPasswordChange}
          policies={policies}
        />
      );
    }
    return (
      <LoginForm
        t={t}
        i18n={i18n}
        signIn={submitForm}
        loading={loading}
        fields={fields}
        updateField={updateField}
        loginResponse={loginResponse}
        toggleForgotPassword={toggleForgotPassword}
        policies={policies}
      />
    );
  };

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <img
              className={[styles.logo, 'c-sidebar-brand-full'].join(' ')}
              src={logo}
              alt="OpenWifi"
            />
            <CCardGroup>
              <CCard className="p-4" color={formType === 'change-password' ? 'secondary' : ''}>
                <CCardBody>{getForm()}</CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  logo: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginResponse: PropTypes.instanceOf(Object).isRequired,
  forgotResponse: PropTypes.instanceOf(Object).isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  sendForgotPasswordEmail: PropTypes.func.isRequired,
  changePasswordResponse: PropTypes.instanceOf(Object).isRequired,
  cancelPasswordChange: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  formType: PropTypes.string.isRequired,
  validateCode: PropTypes.func.isRequired,
  resendValidationCode: PropTypes.func.isRequired,
};

export default React.memo(LoginPage);
