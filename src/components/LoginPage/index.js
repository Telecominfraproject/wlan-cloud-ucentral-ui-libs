import React from 'react';
import { CCard, CCardBody, CCardGroup, CCol, CContainer, CRow } from '@coreui/react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import LoginForm from './LoginForm';
import ForgotPasswordForm from './ForgotPasswordForm';

const LoginPage = ({
  t,
  i18n,
  signIn,
  loading,
  loginResponse,
  forgotResponse,
  fields,
  updateField,
  isLogin,
  toggleForgotPassword,
  onKeyDown,
  sendForgotPasswordEmail,
}) => (
  <div className="c-app c-default-layout flex-row align-items-center">
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md="8">
          <img
            className={[styles.logo, 'c-sidebar-brand-full'].join(' ')}
            src="assets/OpenWiFi_LogoLockup_DarkGreyColour.svg"
            alt="OpenWifi"
          />
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                {isLogin ? (
                  <LoginForm
                    t={t}
                    i18n={i18n}
                    onKeyDown={onKeyDown}
                    signIn={signIn}
                    loading={loading}
                    fields={fields}
                    updateField={updateField}
                    loginResponse={loginResponse}
                    toggleForgotPassword={toggleForgotPassword}
                  />
                ) : (
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
                  />
                )}
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
);

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  signIn: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loginResponse: PropTypes.instanceOf(Object).isRequired,
  forgotResponse: PropTypes.instanceOf(Object).isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  isLogin: PropTypes.func.isRequired,
  toggleForgotPassword: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  sendForgotPasswordEmail: PropTypes.func.isRequired,
};

export default React.memo(LoginPage);
