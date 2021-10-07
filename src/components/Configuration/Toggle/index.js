import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CSwitch } from '@coreui/react';

const Toggle = ({ id, label, field, updateField, firstCol, secondCol, disabled }) => {
  const toggle = () => updateField(id, { ...field, value: !field.value });

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <CSwitch
          id={id}
          color="primary"
          defaultChecked={field.value}
          onClick={toggle}
          size="lg"
          disabled={disabled}
        />
      </CCol>
    </CFormGroup>
  );
};

Toggle.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

Toggle.defaultProps = {
  firstCol: 6,
  secondCol: 6,
};

export default Toggle;
