import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CPopover,
  CAlert,
  CInvalidFeedback,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilLockLocked, cilLink } from '@coreui/icons';
import PropTypes from 'prop-types';
import LanguageSwitcher from '../LanguageSwitcher';
import styles from './index.module.scss';

const LoginPage = ({ t, i18n, signIn, defaultConfig, error, setHadError }) => {
  const [userId, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [uCentralSecUrl, setUCentralSecUrl] = useState('');
  const [emptyUsername, setEmptyUsername] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [emptyGateway, setEmptyGateway] = useState(false);
  const placeholderUrl = 'uCentralSec URL (ex: https://your-url:port)';

  const formValidation = () => {
    setHadError(false);

    let isSuccessful = true;

    if (userId.trim() === '') {
      setEmptyUsername(true);
      isSuccessful = false;
    }

    if (password.trim() === '') {
      setEmptyPassword(true);
      isSuccessful = false;
    }

    if (uCentralSecUrl.trim() === '') {
      setEmptyGateway(true);
      isSuccessful = false;
    }
    return isSuccessful;
  };
  const onKeyDown = (event) => {
    if (event.code === 'Enter' && formValidation()) {
      signIn({ userId, password }, uCentralSecUrl);
    }
  };

  useEffect(() => {
    if (emptyUsername) setEmptyUsername(false);
  }, [userId]);
  useEffect(() => {
    if (emptyPassword) setEmptyPassword(false);
  }, [password]);
  useEffect(() => {
    if (emptyGateway) setEmptyGateway(false);
  }, [uCentralSecUrl]);
  useEffect(() => {
    setUCentralSecUrl(defaultConfig.DEFAULT_UCENTRALSEC_URL);
  }, [defaultConfig]);

  return (
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
                  <CForm onKeyDown={onKeyDown}>
                    <h1>{t('login.login')}</h1>
                    <p className="text-muted">{t('login.sign_in_to_account')}</p>
                    <CInputGroup className="mb-3">
                      <CPopover content={t('login.username')}>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cilUser" content={cilUser} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                      </CPopover>
                      <CInput
                        invalid={emptyUsername}
                        autoFocus
                        required
                        type="text"
                        placeholder={t('login.username')}
                        autoComplete="username"
                        onChange={(event) => setUsername(event.target.value)}
                      />
                      <CInvalidFeedback className="help-block">
                        {t('login.please_enter_username')}
                      </CInvalidFeedback>
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
                        invalid={emptyPassword}
                        required
                        type="password"
                        placeholder={t('login.password')}
                        autoComplete="current-password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <CInvalidFeedback className="help-block">
                        {t('login.please_enter_password')}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4" hidden={!defaultConfig.ALLOW_UCENTRALSEC_CHANGE}>
                      <CPopover content={t('login.url')}>
                        <CInputGroupPrepend>
                          <CInputGroupText>
                            <CIcon name="cilLink" content={cilLink} />
                          </CInputGroupText>
                        </CInputGroupPrepend>
                      </CPopover>
                      <CInput
                        invalid={emptyGateway}
                        type="text"
                        required
                        placeholder={placeholderUrl}
                        value={uCentralSecUrl}
                        autoComplete="gateway-url"
                        onChange={(event) => setUCentralSecUrl(event.target.value)}
                      />
                      <CInvalidFeedback className="help-block">
                        {t('login.please_enter_gateway')}
                      </CInvalidFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol>
                        <CAlert show={error} color="danger">
                          {t('login.login_error')}
                        </CAlert>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={() =>
                            formValidation() ? signIn({ userId, password }, uCentralSecUrl) : null
                          }
                        >
                          {t('login.login')}
                        </CButton>
                      </CCol>
                      <CCol xs="6">
                        <div className={styles.languageSwitcher}>
                          <LanguageSwitcher i18n={i18n} />
                        </div>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
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
  signIn: PropTypes.func.isRequired,
  defaultConfig: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.bool.isRequired,
  setHadError: PropTypes.func.isRequired,
};

export default React.memo(LoginPage);
