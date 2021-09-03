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
import { prettyDate } from 'utils/formatting';
import NotesTable from '../NotesTable';

const EditEntityForm = ({ t, disable, fields, updateField, addNote, editing }) => (
  <CForm>
    <CFormGroup row>
      <CCol>
        <CRow className="py-2">
          <CLabel xxl="3" col htmlFor="name">
            <div>{t('user.name')}:</div>
          </CLabel>
          <CCol xxl="9">
            {editing ? (
              <div>
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
                <CFormText hidden={!fields.name.error} color={fields.name.error ? 'danger' : ''}>
                  {t('common.required')}
                </CFormText>
              </div>
            ) : (
              <p className="mt-2 mb-0">{fields.name.value}</p>
            )}
          </CCol>
        </CRow>
        <CRow className="py-2">
          <CLabel xxl="3" col htmlFor="name">
            <div>{t('user.description')}:</div>
          </CLabel>
          <CCol xxl="9">
            {editing ? (
              <div>
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
              </div>
            ) : (
              <p className="mt-2 mb-0">{fields.description.value}</p>
            )}
          </CCol>
        </CRow>
        <CRow className="py-2">
          <CLabel xxl="3" col htmlFor="name">
            <div>{t('common.created')}:</div>
          </CLabel>
          <CCol xxl="9">
            <p className="mt-2 mb-0">{prettyDate(fields.created.value)}</p>
          </CCol>
        </CRow>
        <CRow className="py-2">
          <CLabel xxl="3" col htmlFor="name">
            <div>{t('common.modified')}:</div>
          </CLabel>
          <CCol xxl="9">
            <p className="mt-2 mb-0">{prettyDate(fields.modified.value)}</p>
          </CCol>
        </CRow>
      </CCol>
      <CCol>
        <NotesTable
          t={t}
          notes={fields.notes.value}
          addNote={addNote}
          loading={disable}
          editable={editing}
        />
      </CCol>
    </CFormGroup>
  </CForm>
);

EditEntityForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default EditEntityForm;
