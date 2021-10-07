import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel } from '@coreui/react';
import Select from 'react-select';

const Multi = ({ id, label, field, updateField, firstCol, secondCol, disabled }) => {
  const onChange = (v) => updateField(id, { value: v.map((obj) => obj.value) });

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <Select
          isMulti
          closeMenuOnSelect={false}
          name="Subsystems"
          options={field.options.map((opt) => ({ value: opt, label: opt }))}
          onChange={onChange}
          value={field.value.map((opt) => ({ value: opt, label: opt }))}
          className="basic-multi-select"
          classNamePrefix="select"
          isDisabled={disabled}
        />
      </CCol>
    </CFormGroup>
  );
};

Multi.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

Multi.defaultProps = {
  firstCol: 6,
  secondCol: 6,
};

export default Multi;
