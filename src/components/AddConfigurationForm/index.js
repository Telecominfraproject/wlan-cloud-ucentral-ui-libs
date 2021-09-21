import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
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

const AddConfigurationForm = ({
  t,
  show,
  disable,
  fields,
  updateField,
  updateFieldWithKey,
  deviceTypes,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [chosenTypes, setChosenTypes] = useState([]);

  const parseOptions = () => {
    const options = [{ value: '*', label: 'All' }];
    const newOptions = deviceTypes.map((option) => ({
      value: option,
      label: option,
    }));
    options.push(...newOptions);
    setTypeOptions(options);
    setChosenTypes([]);
  };

  const typeOnChange = (chosenArray) => {
    const allIndex = chosenArray.findIndex((el) => el.value === '*');

    // If the All option was chosen before, we take it out of the array
    if (allIndex === 0 && chosenTypes.length > 0) {
      const newResults = chosenArray.slice(1);
      setChosenTypes(newResults);
      updateFieldWithKey('deviceTypes', {
        value: newResults.map((el) => el.value),
        error: false,
        notEmpty: true,
      });
    } else if (allIndex > 0) {
      setChosenTypes([{ value: '*', label: 'All' }]);
      updateFieldWithKey('deviceTypes', { value: ['*'], error: false, notEmpty: true });
    } else if (chosenArray.length > 0) {
      setChosenTypes(chosenArray);
      updateFieldWithKey('deviceTypes', {
        value: chosenArray.map((el) => el.value),
        error: false,
        notEmpty: true,
      });
    } else {
      setChosenTypes([]);
      updateFieldWithKey('deviceTypes', { value: [], error: false, notEmpty: true });
    }
  };

  useEffect(() => {
    if (show) parseOptions();
  }, [show]);

  return (
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
        <CLabel col htmlFor="name">
          <div>{t('configuration.supported_device_types')}:</div>
        </CLabel>
        <CCol sm="7">
          <Select
            isMulti
            closeMenuOnSelect={false}
            name="Device Types"
            options={typeOptions}
            onChange={typeOnChange}
            value={chosenTypes}
            className={`basic-multi-select ${fields.deviceTypes.error ? 'border-danger' : ''}`}
            classNamePrefix="select"
          />
          <CFormText hidden={!fields.deviceTypes.error} color="danger">
            {t('configuration.need_device_type')}
          </CFormText>
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
};

AddConfigurationForm.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldWithKey: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
};

export default AddConfigurationForm;
