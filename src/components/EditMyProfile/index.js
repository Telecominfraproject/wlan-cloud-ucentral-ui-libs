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
import CIcon from '@coreui/icons-react';
import NotesTable from '../NotesTable';
import LoadingButton from '../LoadingButton';

const EditMyProfile = ({
  t,
  user,
  updateUserWithId,
  loading,
  saveUser,
  policies,
  addNote,
  uploadAvatar,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CForm>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="name">
          {t('user.name')}
        </CLabel>
        <CCol sm="4">
          <CInput id="name" value={user.name.value} onChange={updateUserWithId} maxLength="20" />
        </CCol>
        <CLabel sm="2" col htmlFor="description">
          {t('user.description')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="description"
            value={user.description.value}
            onChange={updateUserWithId}
            maxLength="50"
          />
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="userRole">
          {t('user.user_role')}
        </CLabel>
        <CCol sm="4">
          <CSelect custom id="userRole" onChange={updateUserWithId} value={user.userRole.value}>
            <option value="admin">Admin</option>
            <option value="csr">CSR</option>
            <option value="root">Root</option>
            <option value="special">Special</option>
            <option value="sub">Sub</option>
            <option value="system">System</option>
          </CSelect>
        </CCol>
        <CLabel sm="2" col htmlFor="currentPassword">
          {t('login.new_password')}
        </CLabel>
        <CCol sm="4">
          <CInputGroup>
            <CInput
              type={showPassword ? 'text' : 'password'}
              id="currentPassword"
              value={user.currentPassword.value}
              onChange={updateUserWithId}
              invalid={user.currentPassword.error}
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
            <CInvalidFeedback>{t('user.provide_password')}</CInvalidFeedback>
          </CInputGroup>
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CCol sm="6">
          <NotesTable
            t={t}
            notes={user.notes.value}
            addNote={addNote}
            loading={loading}
            size="lg"
          />
        </CCol>
        <CLabel sm="2" col htmlFor="avatar">
          {t('user.avatar_file')}
        </CLabel>
        <CCol sm="4">
          <CInputFile id="file-input" name="file-input" accept="image/*" onChange={uploadAvatar} />
        </CCol>
      </CFormGroup>
      <CRow>
        <CCol />
        <CCol xs={1} className="mt-2 text-right">
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
        <CCol xs={1} className="text-center">
          <LoadingButton
            label={t('common.save')}
            isLoadingLabel={t('common.saving')}
            isLoading={loading}
            action={saveUser}
            block={false}
            disabled={loading}
          />
        </CCol>
      </CRow>
    </CForm>
  );
};

EditMyProfile.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserWithId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
  policies: PropTypes.instanceOf(Object).isRequired,
  addNote: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};

export default React.memo(EditMyProfile);
