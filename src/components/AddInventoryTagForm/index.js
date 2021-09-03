import React from 'react';
import { CForm, CInput, CLabel, CCol, CFormGroup, CFormText, CSelect } from '@coreui/react';
import { v4 as createUuid } from 'uuid';
import PropTypes from 'prop-types';

const AddInventoryTagForm = ({ t, disable, fields, updateField, deviceTypes }) => (
  <CForm className="px-5 pt-5">
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
    <CFormGroup row className="pb-3" hidden={fields.entity.hidden}>
      <CLabel col htmlFor="entity">
        {t('entity.entity')}
      </CLabel>
      <CCol sm="7">
        <CInput
          id="entity"
          type="text"
          required
          value={fields.entity.value}
          onChange={updateField}
          invalid={fields.entity.error}
          disabled={true || disable}
          maxLength="50"
        />
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
};

export default AddInventoryTagForm;
