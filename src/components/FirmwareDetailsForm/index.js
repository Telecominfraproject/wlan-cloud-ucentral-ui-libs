import React from 'react';
import PropTypes from 'prop-types';
import { CCardBody, CCol, CInput, CRow } from '@coreui/react';
import { prettyDate, cleanBytesString } from '../../utils/formatting';
import NotesTable from '../NotesTable';

const FirmwareDetailsForm = ({ t, fields, updateFieldsWithId, addNote, editing }) => (
  <CCardBody className="p-1">
    <CRow>
      <CCol sm="2">Created</CCol>
      <CCol sm="4">{prettyDate(fields.created.value)}</CCol>
      <CCol sm="2">Release</CCol>
      <CCol sm="4">{fields.release.value}</CCol>
    </CRow>
    <CRow className="my-3">
      <CCol sm="2">Image</CCol>
      <CCol sm="4">{fields.image.value}</CCol>
      <CCol sm="2">Image Date</CCol>
      <CCol sm="4">{prettyDate(fields.imageDate.value)}</CCol>
    </CRow>
    <CRow className="my-3">
      <CCol sm="2">Revision</CCol>
      <CCol sm="4">{fields.revision.value}</CCol>
      <CCol sm="2">Size</CCol>
      <CCol sm="4">{cleanBytesString(fields.size.value)}</CCol>
    </CRow>
    <CRow className="my-3">
      <CCol sm="2">URI</CCol>
      <CCol sm="4">{fields.uri.value}</CCol>
      <CCol sm="2">Owner</CCol>
      <CCol sm="4">{fields.owner.value === '' ? t('common.unknown') : fields.owner.value}</CCol>
    </CRow>
    <CRow className="my-3">
      <CCol sm="2" className="mt-2">
        Description
      </CCol>
      <CCol sm="4">
        {editing ? (
          <CInput
            id="description"
            value={fields.description.value}
            onChange={updateFieldsWithId}
            maxLength="50"
          />
        ) : (
          <p className="mt-2 mb-0">{fields.description.value}</p>
        )}
      </CCol>
      <CCol>
        <NotesTable t={t} notes={fields.notes.value} addNote={addNote} editable={editing} />
      </CCol>
    </CRow>
  </CCardBody>
);

FirmwareDetailsForm.propTypes = {
  t: PropTypes.func.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateFieldsWithId: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
};
export default FirmwareDetailsForm;
