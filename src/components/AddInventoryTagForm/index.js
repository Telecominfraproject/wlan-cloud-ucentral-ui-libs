import React from 'react';
import { CForm, CInput, CLabel, CCol, CRow, CFormGroup, CFormText } from '@coreui/react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const AddInventoryTagForm = ({
  t,
  disable,
  fields,
  updateField,
  updateFieldDirectly,
  deviceTypes,
}) => (
  <CForm className="px-5 pt-5">
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="name">
        {t('common.serial_number')}
      </CLabel>
      <CCol sm="8">
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
        <div style={{ width: '250px' }}>
          <Select
            id="deviceType"
            value={{ value: fields.deviceType.value, label: fields.deviceType.value }}
            onChange={(v) => updateFieldDirectly('deviceType', { value: v.value })}
            options={deviceTypes.map((v) => ({ value: v, label: v }))}
            isDisabled={disable}
          />
        </div>
        <CFormText color={fields.deviceType.error ? 'danger' : ''}>
          {t('common.required')}
        </CFormText>
      </CCol>
    </CFormGroup>
    <CRow className="pb-3">
      <CLabel sm="4" col htmlFor="name">
        <div>RRM:</div>
      </CLabel>
      <CCol sm="8">
        <div style={{ width: '120px' }}>
          <Select
            id="rrm"
            value={{ value: fields.rrm.value, label: fields.rrm.value }}
            onChange={(v) => updateFieldDirectly('rrm', { value: v.value, error: false })}
            options={[
              { label: 'on', value: 'on' },
              { label: 'off', value: 'off' },
              { label: 'inherit', value: 'inherit' },
            ]}
            isDisabled={disable}
          />
        </div>
        <CFormText color={fields.rrm.error ? 'danger' : ''}>{t('common.required')}</CFormText>
      </CCol>
    </CRow>
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
    <CFormGroup row className="pb-3">
      <CLabel col htmlFor="note">
        {t('user.note')}
      </CLabel>
      <CCol sm="8">
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
  updateFieldDirectly: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
};

export default AddInventoryTagForm;
