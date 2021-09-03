import React from 'react';
import { CForm, CInput, CLabel, CCol, CFormGroup, CFormText, CSelect, CRow } from '@coreui/react';
import { v4 as createUuid } from 'uuid';
import PropTypes from 'prop-types';
import NotesTable from '../NotesTable';

const EditInventoryTagForm = ({ t, disable, fields, updateField, addNote, deviceTypes }) => (
  <CForm>
    <CFormGroup row className="pt-3">
      <CCol>
        <CLabel htmlFor="serialNumber">{t('common.serial_number')}</CLabel>
      </CCol>
      <CCol sm="8">
        <p id="serialNumber" className="form-control-static">
          {fields.serialNumber.value}
        </p>
      </CCol>
    </CFormGroup>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="name">
        {t('user.name')}
      </CLabel>
      <CCol sm="8">
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
      <CLabel col htmlFor="deviceType">
        {t('firmware.device_type')}
      </CLabel>
      <CCol sm="8">
        <div>
          <CSelect
            custom
            value={fields.deviceType.value}
            id="deviceType"
            onChange={updateField}
            invalid={fields.deviceType.error}
            disabled={disable}
          >
            <option value=""> </option>
            {deviceTypes.map((deviceType) => (
              <option key={createUuid()} value={deviceType}>
                {deviceType}
              </option>
            ))}
          </CSelect>
        </div>
        <CFormText color={fields.deviceType.error ? 'danger' : ''}>
          {t('common.required')}
        </CFormText>
      </CCol>
    </CFormGroup>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="description">
        {t('user.description')}
      </CLabel>
      <CCol sm="8">
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
      </CCol>
    </CFormGroup>
    <CRow>
      <CCol>
        <NotesTable t={t} notes={fields.notes.value} addNote={addNote} loading={disable} />
      </CCol>
    </CRow>
  </CForm>
);

EditInventoryTagForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
  addNote: PropTypes.func.isRequired,
};

export default EditInventoryTagForm;
