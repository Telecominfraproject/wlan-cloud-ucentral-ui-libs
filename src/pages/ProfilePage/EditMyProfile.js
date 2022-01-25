import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInvalidFeedback,
  CLabel,
  CLink,
  CPopover,
  CRow,
  CSelect,
  CInputFile,
} from '@coreui/react';
import PropTypes from 'prop-types';
import parsePhoneNumber from 'libphonenumber-js';
import CIcon from '@coreui/icons-react';
import Avatar from 'components/Avatar';
import useToggle from 'hooks/useToggle';
import ValidatePhoneNumberModal from './ValidatePhoneNumberModal';

const EditMyProfile = ({
  t,
  user,
  updateUserWithId,
  updateWithKey,
  loading,
  policies,
  avatar,
  newAvatar,
  deleteAvatar,
  showPreview,
  fileInputKey,
  sendPhoneNumberTest,
  testVerificationCode,
  editing,
  avatarDeleted,
}) => {
  const [showPhoneModal, togglePhoneModal] = useToggle(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const saveNumber = (newNumber) => {
    const newUserTypeInfo = { ...user.userTypeProprietaryInfo.value };
    newUserTypeInfo.mobiles[0] = { number: `+${newNumber}` };
    updateWithKey('userTypeProprietaryInfo', newUserTypeInfo);
  };

  const parseNumber = () => {
    if (user.userTypeProprietaryInfo.value.mobiles?.length > 0) {
      const phoneNumber = parsePhoneNumber(
        `${user.userTypeProprietaryInfo.value.mobiles[0].number}`,
      );

      if (phoneNumber) {
        return phoneNumber.formatInternational();
      }
    }

    return t('user.add_phone_number');
  };

  return (
    <CForm>
      <CRow>
        <CCol md="3" xl="2">
          <Avatar
            src={(avatar !== newAvatar && newAvatar !== '') || avatarDeleted ? newAvatar : avatar}
            fallback={user.email.value}
            size="lg"
          />
          <CRow className="my-2">
            <CCol>
              <CButton
                className="ml-2"
                color="primary"
                disabled={
                  !editing || loading || !avatar || avatar === '' || avatar === 'data:;base64,'
                }
                onClick={deleteAvatar}
              >
                {t('user.delete_avatar')}
              </CButton>
            </CCol>
          </CRow>
          <CRow className="ml-2">
            <CInputFile
              disabled={!editing}
              id="file-input"
              name="file-input"
              accept="image/*"
              onChange={showPreview}
              key={fileInputKey}
            />
          </CRow>
        </CCol>
        <CCol md="9" xl="10">
          <CRow>
            <CCol sm="12" md="6">
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="name">
                  {t('user.name')}
                </CLabel>
                <CCol md="6" xl="8">
                  {editing ? (
                    <CInput
                      id="name"
                      value={user.name.value}
                      onChange={updateUserWithId}
                      maxLength="20"
                    />
                  ) : (
                    <p className="mt-2 mb-0">{user.name.value}</p>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="mfaMethod">
                  MFA
                </CLabel>
                <CCol md="6" xl="8">
                  <CSelect
                    disabled={!editing}
                    custom
                    id="mfaMethod"
                    onChange={updateUserWithId}
                    value={user.mfaMethod.value}
                    style={{ width: '100px' }}
                  >
                    <option value="">Off</option>
                    <option value="sms">SMS</option>
                    <option value="email">Email</option>
                  </CSelect>
                </CCol>
              </CRow>
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="name">
                  {t('user.phone_number')}
                </CLabel>
                <CCol md="6" xl="8">
                  {editing ? (
                    <CButton color="link" onClick={togglePhoneModal} className="pl-0">
                      {parseNumber()}
                    </CButton>
                  ) : (
                    <p className="mt-2 mb-0">{parseNumber()}</p>
                  )}
                </CCol>
              </CRow>
            </CCol>
            <CCol sm="12" md="6">
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="description">
                  {t('user.description')}
                </CLabel>
                <CCol md="6" xl="8">
                  {editing ? (
                    <CInput
                      id="description"
                      value={user.description.value}
                      onChange={updateUserWithId}
                      maxLength="50"
                    />
                  ) : (
                    <p className="mt-2 mb-0">{user.description.value}</p>
                  )}
                </CCol>
              </CRow>
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="newPassword">
                  {t('login.new_password')}
                </CLabel>
                <CCol md="6" xl="8">
                  {editing ? (
                    <CInputGroup>
                      <CInput
                        type={showPassword ? 'text' : 'password'}
                        id="newPassword"
                        value={user.newPassword.value}
                        onChange={updateUserWithId}
                        invalid={user.newPassword.error}
                        maxLength="50"
                      />
                      <CInputGroupAppend>
                        <CPopover content={t('user.show_hide_password')}>
                          <CButton type="button" onClick={toggleShowPassword} color="secondary">
                            <CIcon
                              name={showPassword ? 'cil-envelope-open' : 'cil-envelope-closed'}
                              size="sm"
                            />
                          </CButton>
                        </CPopover>
                      </CInputGroupAppend>
                      <CInvalidFeedback>{t('user.make_sure_same_password')}</CInvalidFeedback>
                    </CInputGroup>
                  ) : null}
                </CCol>
              </CRow>
              <CRow>
                <CLabel className="mb-2" md="6" xl="4" col htmlFor="confirmNewPassword">
                  {t('user.confirm_new_password')}
                </CLabel>
                <CCol md="6" xl="8">
                  {editing ? (
                    <CInputGroup>
                      <CInput
                        type={showPassword ? 'text' : 'password'}
                        id="confirmNewPassword"
                        value={user.confirmNewPassword.value}
                        onChange={updateUserWithId}
                        invalid={user.newPassword.error}
                        maxLength="50"
                      />
                      <CInputGroupAppend>
                        <CPopover content={t('user.show_hide_password')}>
                          <CButton type="button" onClick={toggleShowPassword} color="secondary">
                            <CIcon
                              name={showPassword ? 'cil-envelope-open' : 'cil-envelope-closed'}
                              size="sm"
                            />
                          </CButton>
                        </CPopover>
                      </CInputGroupAppend>
                      <CInvalidFeedback>{t('user.make_sure_same_password')}</CInvalidFeedback>
                    </CInputGroup>
                  ) : null}
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow>
        <CCol className="mt-2 text-left" xs={2}>
          Security Retries: {localStorage.getItem('sec_retries') ?? 0}
        </CCol>
        <CCol />
        <CCol xs={2} className="mt-2 text-right">
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
      </CRow>
      <ValidatePhoneNumberModal
        t={t}
        show={showPhoneModal}
        toggle={togglePhoneModal}
        sendPhoneNumberTest={sendPhoneNumberTest}
        save={saveNumber}
        testVerificationCode={testVerificationCode}
      />
    </CForm>
  );
};

EditMyProfile.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserWithId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  avatar: PropTypes.string,
  newAvatar: PropTypes.string,
  showPreview: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  fileInputKey: PropTypes.number.isRequired,
  sendPhoneNumberTest: PropTypes.func.isRequired,
  testVerificationCode: PropTypes.func.isRequired,
  updateWithKey: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  avatarDeleted: PropTypes.bool.isRequired,
};

EditMyProfile.defaultProps = {
  avatar: '',
  newAvatar: '',
};

export default React.memo(EditMyProfile);
