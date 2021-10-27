import React, { useState } from 'react';
import {
  CButton,
  CCol,
  CForm,
  CFormGroup,
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
import ValidatePhoneNumberModal from 'components/ValidatePhoneNumberModal';
import NotesTable from '../NotesTable';
import LoadingButton from '../LoadingButton';
import Avatar from '../Avatar';
import useToggle from '../../hooks/useToggle';

const EditMyProfile = ({
  t,
  user,
  updateUserWithId,
  updateWithKey,
  loading,
  policies,
  addNote,
  avatar,
  newAvatar,
  deleteAvatar,
  showPreview,
  fileInputKey,
  sendPhoneNumberTest,
  testVerificationCode,
  editing,
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
      <CFormGroup row>
        <CLabel lg="2" xxl="1" col htmlFor="name">
          {t('user.name')}
        </CLabel>
        <CCol lg="4" xxl="5">
          {editing ? (
            <CInput id="name" value={user.name.value} onChange={updateUserWithId} maxLength="20" />
          ) : (
            <p className="mt-2 mb-0">{user.name.value}</p>
          )}
        </CCol>
        <CLabel lg="2" xxl="1" col htmlFor="description">
          {t('user.description')}
        </CLabel>
        <CCol lg="4" xxl="5">
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
      </CFormGroup>
      <CFormGroup row>
        <CLabel lg="2" xxl="1" col htmlFor="mfaMethod">
          MFA
        </CLabel>
        <CCol lg="4" xxl="5">
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
        <CLabel lg="2" xxl="1" col htmlFor="name">
          {t('user.phone_number')}
        </CLabel>
        <CCol lg="4" xxl="5">
          {editing ? (
            <CButton color="link" onClick={togglePhoneModal} className="pl-0">
              {parseNumber()}
            </CButton>
          ) : (
            <p className="mt-2 mb-0">{parseNumber()}</p>
          )}
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CLabel lg="2" xxl="1" col htmlFor="newPassword">
          {t('login.new_password')}
        </CLabel>
        <CCol lg="4" xxl="5">
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
        <CLabel lg="2" xxl="1" col htmlFor="confirmNewPassword">
          {t('user.confirm_new_password')}
        </CLabel>
        <CCol lg="4" xxl="5">
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
      </CFormGroup>
      <CFormGroup row>
        <CLabel lg="2" xl="1" col htmlFor="avatar" className="pt-2">
          {t('user.avatar')}
        </CLabel>
        <CCol lg="10" xl="5" className="pt-2">
          <CRow>
            <CCol lg="2" xl="2" className="pt-2">
              {t('common.current')}
              <div className="pt-5">Preview</div>
            </CCol>
            <CCol lg="1" xl="1">
              <Avatar src={avatar} fallback={user.email.value} />
              <div className="pt-3">
                <Avatar src={newAvatar} fallback={user.email.value} />
              </div>
            </CCol>
            <CCol className="pt-2">
              <div className="mt-1 mb-4">
                <LoadingButton
                  label={t('user.delete_avatar')}
                  isLoadingLabel={t('user.deleting')}
                  isLoading={loading}
                  action={deleteAvatar}
                  block={false}
                  disabled={
                    !editing || loading || !avatar || avatar === '' || avatar === 'data:;base64,'
                  }
                />
              </div>
              <div className="pt-1">
                <CInputFile
                  disabled={!editing}
                  id="file-input"
                  name="file-input"
                  accept="image/*"
                  onChange={showPreview}
                  key={fileInputKey}
                />
              </div>
            </CCol>
          </CRow>
        </CCol>
        <CCol lg="12" xl="6" className="pt-2">
          <NotesTable
            t={t}
            notes={user.notes.value}
            addNote={addNote}
            loading={loading}
            size="lg"
            editable={editing}
          />
        </CCol>
      </CFormGroup>
      <CRow>
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
  addNote: PropTypes.func.isRequired,
  avatar: PropTypes.string,
  newAvatar: PropTypes.string,
  showPreview: PropTypes.func.isRequired,
  deleteAvatar: PropTypes.func.isRequired,
  fileInputKey: PropTypes.number.isRequired,
  sendPhoneNumberTest: PropTypes.func.isRequired,
  testVerificationCode: PropTypes.func.isRequired,
  updateWithKey: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

EditMyProfile.defaultProps = {
  avatar: '',
  newAvatar: '',
};

export default React.memo(EditMyProfile);
