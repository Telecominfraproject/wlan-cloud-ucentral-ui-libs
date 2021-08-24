import React from 'react';
import { CForm, CInput, CLabel, CCol, CFormGroup, CFormText, CSelect } from '@coreui/react';
import { v4 as createUuid } from 'uuid';
import PropTypes from 'prop-types';

const AddInventoryTagForm = ({ t, disable, fields, updateField, deviceTypes, venues }) => (
  <CForm>
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="name">
        {t('common.serial_number')}
      </CLabel>
      <CCol sm="7">
        <CInput
          id="serialNumber"
          type="text"
          required
          value={fields.serialNumber.value}
          onChange={updateField}
          invalid={fields.serialNumber.error}
          disabled={disable}
          maxLength="50"
        />
        <CFormText color={fields.serialNumber.error ? 'danger' : ''}>
          {t('common.required')}, {t('entity.valid_serial')}
        </CFormText>
      </CCol>
    </CFormGroup>
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
      <CLabel col htmlFor="deviceType">
        {t('firmware.device_type')}
      </CLabel>
      <CCol sm="7">
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
      <CLabel col htmlFor="venue">
        {t('inventory.venue')}
      </CLabel>
      <CCol sm="7">
        <div>
          <CSelect
            custom
            value={fields.venue.value}
            id="venue"
            onChange={updateField}
            invalid={fields.venue.error}
            disabled={venues.length === 0 || disable}
          >
            <option value=""> </option>
            {venues.map((venue) => (
              <option key={createUuid()} value={venue.name}>
                {venue}
              </option>
            ))}
          </CSelect>
        </div>
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
      </CCol>
    </CFormGroup>
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

AddInventoryTagForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
  venues: PropTypes.instanceOf(Array).isRequired,
};

export default AddInventoryTagForm;
