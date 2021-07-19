import React, { useState } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CInputGroup,
  CInputGroupAppend,
  CInvalidFeedback,
  CLabel,
  CPopover,
  CRow,
  CSelect,
  CSwitch,
} from '@coreui/react';
import PropTypes from 'prop-types';
import LoadingButton from 'components/LoadingButton';
import CIcon from '@coreui/icons-react';

const CreateUserForm = ({ t, user, updateUserWithId, loading, saveUser }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CCard>
      <CCardHeader>{t('common.details')}</CCardHeader>
      <CCardBody>
        <CForm>
          <CFormGroup row>
            <CCol>
              <CLabel htmlFor="email">{t('user.email_address')}</CLabel>
              <p className="form-control-static mt-2">{user.email.value}</p>
            </CCol>
            <CCol>
              <CLabel htmlFor="name">{t('user.name')}</CLabel>
              <CInput
                id="name"
                value={user.name.value}
                onChange={updateUserWithId}
                maxLength="20"
              />
            </CCol>
            <CCol>
              <CLabel htmlFor="changePassword">{t('user.force_password_change')}</CLabel>
              <CInputGroup>
                <CSwitch
                  id="changePassword"
                  color="success"
                  defaultChecked={user.changePassword.value}
                  onClick={updateUserWithId}
                  size="lg"
                />
              </CInputGroup>
            </CCol>
          </CFormGroup>
          <CFormGroup row>
            <CCol>
              <CLabel htmlFor="userRole">{t('user.user_role')}</CLabel>
              <CSelect custom id="userRole" defaultValue="Admin" onChange={updateUserWithId}>
                <option value="admin">Admin</option>
                <option value="csr">CSR</option>
                <option value="root">Root</option>
                <option value="special">Special</option>
                <option value="sub">Sub</option>
                <option value="system">System</option>
              </CSelect>
            </CCol>
            <CCol>
              <CLabel htmlFor="newPascurrentPasswordsword">{t('login.new_password')}</CLabel>
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
            <CCol>
              <CLabel htmlFor="description">{t('user.description')}</CLabel>
              <CInput
                id="description"
                value={user.description.value}
                onChange={updateUserWithId}
                maxLength="50"
              />
            </CCol>
            <CCol />
          </CFormGroup>
          <CRow>
            <CCol />
            <CCol xs={3} className="text-right">
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
      </CCardBody>
    </CCard>
  );
};

CreateUserForm.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  updateUserWithId: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveUser: PropTypes.func.isRequired,
};

export default React.memo(CreateUserForm);
