import React from 'react';
import PropTypes from 'prop-types';
import {
  CForm,
  CInput,
  CLabel,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CFormText,
  CRow,
  CSelect,
} from '@coreui/react';

const DuplicateEntityMapForm = ({ t, disable, fields, updateField }) => (
  <CForm>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="name">
        {t('user.name')}
      </CLabel>
      <CCol sm="7">
        <CInput
          id="name"
          type="text"
          required
          value={fields.name.value}
          onChange={updateField}
          invalid={fields.name.error}
          disabled={disable}
          maxLength="50"
        />
        <CFormText color={fields.name.error ? 'danger' : ''}>{t('common.required')}</CFormText>
      </CCol>
    </CFormGroup>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="description">
        {t('user.description')}
      </CLabel>
      <CCol sm="7">
        <CInput
          id="description"
          type="text"
          required
          value={fields.description.value}
          onChange={updateField}
          invalid={fields.description.error}
          disabled={disable}
          maxLength="50"
        />
        <CInvalidFeedback>{t('common.required')}</CInvalidFeedback>
      </CCol>
    </CFormGroup>
    <CRow className="pb-3">
      <CLabel col htmlFor="visibility">
        <div>{t('common.visibility')}:</div>
      </CLabel>
      <CCol sm="7">
        <CSelect
          custom
          id="visibility"
          type="text"
          required
          value={fields.visibility.value}
          onChange={updateField}
          invalid={fields.visibility.error}
          disabled={disable}
          maxLength="50"
        >
          <option value="public">public</option>
          <option value="private">private</option>
        </CSelect>
      </CCol>
    </CRow>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="note">
        {t('user.note')}
      </CLabel>
      <CCol sm="7">
        <CInput
          id="note"
          type="text"
          required
          value={fields.note.value}
          onChange={updateField}
          invalid={fields.note.error}
          disabled={disable}
        />
      </CCol>
    </CFormGroup>
  </CForm>
);

DuplicateEntityMapForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
};

export default DuplicateEntityMapForm;
