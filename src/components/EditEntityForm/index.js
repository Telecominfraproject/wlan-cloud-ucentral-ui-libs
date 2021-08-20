import React from 'react';
import {
  CForm,
  CInput,
  CLabel,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CFormText,
  CRow,
} from '@coreui/react';
import PropTypes from 'prop-types';
import NotesTable from '../NotesTable';

const EditEntityForm = ({ t, disable, fields, updateField, addNote }) => (
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
    <CRow>
      <CCol>
        <NotesTable t={t} notes={fields.notes.value} addNote={addNote} loading={disable} />
      </CCol>
    </CRow>
  </CForm>
);

EditEntityForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
};

export default EditEntityForm;
