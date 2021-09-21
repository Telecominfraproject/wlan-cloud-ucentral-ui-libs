import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CInput, CInvalidFeedback } from '@coreui/react';

const reg = new RegExp('^[0-9]+$');

const IntField = ({
  id,
  label,
  field,
  updateField,
  firstCol,
  secondCol,
  errorMessage,
  disabled,
}) => {
  const onChange = (e) => {
    if (e.target.value.length <= 5 && e.target.value.match(reg)) updateField(e);
    else e.preventDefault();
  };

  return (
    <CFormGroup row className="pb-3">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <CInput
          id={id}
          type="number"
          required
          value={field.value}
          onChange={onChange}
          invalid={field.error}
          disabled={disabled}
          pattern="[0-9]*"
          style={{ width: '100px' }}
        />
        <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
      </CCol>
    </CFormGroup>
  );
};

IntField.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

IntField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  errorMessage: '',
};

export default IntField;
