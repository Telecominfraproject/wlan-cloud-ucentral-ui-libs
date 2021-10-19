import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CInvalidFeedback } from '@coreui/react';

const textToShow = (fieldValue, fileName) => {
  if (fieldValue === '') return 'Not uploaded yet';
  if (fileName === '') return 'Filename unavailable';
  return `(using file: ${fileName})`;
};

const StringField = ({
  fileName,
  fieldValue,
  label,
  firstCol,
  secondCol,
  errorMessage,
  extraButton,
}) => (
  <CFormGroup row className="py-1">
    <CLabel col sm={firstCol} htmlFor="name">
      {label}
    </CLabel>
    <CCol className="align-middle" sm={secondCol}>
      <div className="float-left pt-2">{textToShow(fieldValue, fileName)}</div>
      <div className="float-left pl-3">{extraButton}</div>
      <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
    </CCol>
  </CFormGroup>
);

StringField.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  errorMessage: PropTypes.string,
  extraButton: PropTypes.node,
};

StringField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  errorMessage: '',
  extraButton: null,
};

export default StringField;
