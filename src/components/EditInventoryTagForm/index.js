import React from 'react';
import { CForm, CInput, CLabel, CCol, CFormGroup, CFormText, CRow } from '@coreui/react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import RequiredAsterisk from '../RequiredAsterisk';
import selectStyles from '../../utils/selectStyles';

const EditInventoryTagForm = ({
  t,
  disable,
  fields,
  updateField,
  updateFieldDirectly,
  deviceTypes,
  editing,
}) => (
  <CForm>
    <CFormGroup row className="mb-1">
      <CCol>
        <CLabel htmlFor="serialNumber">{t('common.serial_number')}</CLabel>
      </CCol>
      <CCol sm="8">{fields.serialNumber.value}</CCol>
    </CFormGroup>
    <CFormGroup row className="mb-1">
      <CLabel col htmlFor="name">
        {t('user.name')}
        <RequiredAsterisk />
      </CLabel>
      <CCol sm="8">
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
    </CFormGroup>
    <CFormGroup row className="mb-1">
      <CLabel col htmlFor="description">
        {t('user.description')}
      </CLabel>
      <CCol sm="8">
        {editing ? (
          <div>
            <CInput
              id="description"
              type="text"
              required
              value={fields.description.value}
              onChange={updateField}
              disabled={disable}
              maxLength="50"
            />
          </div>
        ) : (
          <p className="mt-2 mb-0">{fields.description.value}</p>
        )}
      </CCol>
    </CFormGroup>
    <CFormGroup row className="mb-1">
      <CLabel col htmlFor="deviceType">
        {t('firmware.device_type')}
        <RequiredAsterisk />
      </CLabel>
      <CCol sm="8">
        <div style={{ width: '250px' }}>
          <Select
            styles={selectStyles}
            id="deviceType"
            value={{ value: fields.deviceType.value, label: fields.deviceType.value }}
            onChange={(v) => updateFieldDirectly('deviceType', { value: v.value })}
            options={deviceTypes.map((v) => ({ value: v, label: v }))}
            isDisabled={disable || !editing}
          />
        </div>
        <CFormText
          hidden={!fields.deviceType.error}
          color={fields.deviceType.error ? 'danger' : ''}
        >
          {t('common.required')}
        </CFormText>
      </CCol>
    </CFormGroup>
    <CRow className="mb-1">
      <CLabel sm="4" col htmlFor="rrm">
        RRM
        <RequiredAsterisk />
      </CLabel>
      <CCol sm="8">
        <div style={{ width: '120px' }}>
          <Select
            id="rrm"
            styles={selectStyles}
            value={{ value: fields.rrm.value, label: fields.rrm.value }}
            onChange={(v) => updateFieldDirectly('rrm', { value: v.value, error: false })}
            options={[
              { label: 'on', value: 'on' },
              { label: 'off', value: 'off' },
              { label: 'inherit', value: 'inherit' },
            ]}
            isDisabled={disable || !editing}
          />
        </div>
        <CFormText hidden={!fields.rrm.error} color={fields.rrm.error ? 'danger' : ''}>
          {t('common.required')}
        </CFormText>
      </CCol>
    </CRow>
  </CForm>
);

EditInventoryTagForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldDirectly: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
  editing: PropTypes.bool.isRequired,
};

export default EditInventoryTagForm;
