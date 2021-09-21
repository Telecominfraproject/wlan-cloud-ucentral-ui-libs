import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CInput, CInvalidFeedback } from '@coreui/react';

const StringField = ({
  id,
  label,
  field,
  updateField,
  firstCol,
  secondCol,
  errorMessage,
  disabled,
}) => (
  <CFormGroup row className="pb-3">
    <CLabel col sm={firstCol} htmlFor="name">
      {label}
    </CLabel>
    <CCol sm={secondCol}>
      <CInput
        id={id}
        type="text"
        required
        value={field.value}
        onChange={updateField}
        invalid={field.error}
        disabled={disabled}
        maxLength="50"
      />
      <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
    </CCol>
  </CFormGroup>
);

StringField.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

StringField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  errorMessage: '',
};

export default StringField;
