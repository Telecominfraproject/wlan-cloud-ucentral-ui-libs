import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel } from '@coreui/react';
import Select from 'react-select';

const ConfigurationSelectField = ({
  id,
  label,
  field,
  updateField,
  firstCol,
  secondCol,
  disabled,
  options,
  width,
}) => {
  const onChange = (v) => updateField(id, { value: v.value });

  const getValue = () => {
    if (typeof field.options[0] === 'string') {
      for (const opt of field.options) {
        const value = opt.includes('(') ? opt.split('(')[1].split(')')[0] : opt;
        if (value === field.value) {
          return { value, label: opt };
        }
      }
      return null;
    }

    if (typeof field.options[0] === 'number') {
      for (const opt of field.options) {
        const value = opt;
        if (value === field.value) {
          return { value, label: opt };
        }
      }
      return null;
    }

    if (options !== null) {
      for (const opt of options) {
        if (field.value === opt.value) return opt;
      }
    }

    for (const opt of field.options) {
      if (field.value === opt.value) {
        if (field.mergeOptions) return { value: opt.value, label: `${opt.label} (${opt.value})` };
        return opt;
      }
    }

    return null;
  };

  const parseOptions = () => {
    if (options !== null) return options;
    if (typeof field.options[0] !== 'string' && typeof field.options[0] !== 'number') {
      if (field.mergeOptions)
        return field.options.map((opt) => ({
          value: opt.value,
          label: `${opt.label} (${opt.value})`,
        }));
      return field.options;
    }

    if (typeof field.options[0] === 'number') {
      return field.options.map((opt) => ({
        value: opt,
        label: `${opt}`,
      }));
    }

    if (field.options[0].includes('(')) {
      return field.options.map((opt) => ({
        value: opt.split('(')[1].split(')')[0],
        label: opt,
      }));
    }
    return field.options.map((opt) => ({
      value: opt,
      label: `${opt}${field.unit ?? ''}`,
    }));
  };

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <div style={{ maxWidth: width ?? '' }}>
          <Select
            name="Subsystems"
            options={parseOptions()}
            onChange={onChange}
            value={getValue()}
            className="basic-multi-select"
            classNamePrefix="select"
            isDisabled={disabled}
          />
        </div>
      </CCol>
    </CFormGroup>
  );
};

ConfigurationSelectField.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  options: PropTypes.instanceOf(Array),
  width: PropTypes.string,
};

ConfigurationSelectField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  options: null,
  width: null,
};

export default ConfigurationSelectField;
