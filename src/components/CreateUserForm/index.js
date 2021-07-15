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
  CPopover,
  CRow,
  CSelect,
  CSwitch,
} from '@coreui/react';
import PropTypes from 'prop-types';
import LoadingButton from 'components/LoadingButton';
import CIcon from '@coreui/icons-react';

const CreateUserForm = ({ t, fields, updateField, createUser, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CForm>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="email">
          {t('user.email_address')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="email"
            value={fields.email.value}
            onChange={updateField}
            invalid={fields.email.error}
            maxLength="50"
          />
          <CInvalidFeedback>{t('user.provide_email')}</CInvalidFeedback>
        </CCol>
        <CLabel sm="2" col htmlFor="name">
          {t('user.name')}
        </CLabel>
        <CCol sm="4">
          <CInput id="name" value={fields.name.value} onChange={updateField} maxLength="20" />
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="currentPassword">
          {t('user.password')}
        </CLabel>
        <CCol sm="4">
          <CInputGroup>
            <CInput
              type={showPassword ? 'text' : 'password'}
              id="currentPassword"
              value={fields.currentPassword.value}
              onChange={updateField}
              invalid={fields.currentPassword.error}
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
        <CLabel sm="2" col htmlFor="changePassword">
          {t('user.force_password_change')}
        </CLabel>
        <CCol sm="4">
          <CSwitch
            id="changePassword"
            color="success"
            defaultChecked={fields.changePassword.value}
            onClick={updateField}
          />
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="userRole">
          {t('user.user_role')}
        </CLabel>
        <CCol sm="4">
          <CSelect custom id="userRole" defaultValue="Admin" onChange={updateField}>
            <option value="admin">Admin</option>
            <option value="csr">CSR</option>
            <option value="root">Root</option>
            <option value="special">Special</option>
            <option value="sub">Sub</option>
            <option value="system">System</option>
          </CSelect>
        </CCol>
        <CLabel sm="2" col htmlFor="notes">
          {t('user.note')}
        </CLabel>
        <CCol sm="4">
          <CInput id="notes" value={fields.notes.value} onChange={updateField} maxLength="50" />
          <small className="text-muted">{t('common.optional')}</small>
        </CCol>
      </CFormGroup>
      <CFormGroup row>
        <CLabel sm="2" col htmlFor="description">
          {t('user.description')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="description"
            value={fields.description.value}
            onChange={updateField}
            maxLength="50"
          />
          <small className="text-muted">{t('common.optional')}</small>
        </CCol>
        <CLabel sm="2" col />
        <CCol sm="4" />
      </CFormGroup>
      <CRow>
        <CCol />
        <CCol xs={2}>
          <LoadingButton
            label={t('user.create')}
            isLoadingLabel={t('common.loading_ellipsis')}
            isLoading={loading}
            action={createUser}
            block
            disabled={loading}
          />
        </CCol>
      </CRow>
    </CForm>
  );
};

CreateUserForm.propTypes = {
  t: PropTypes.func.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default React.memo(CreateUserForm);
