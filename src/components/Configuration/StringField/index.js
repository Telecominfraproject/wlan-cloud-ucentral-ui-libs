import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CInput, CInvalidFeedback } from '@coreui/react';
import _ from 'lodash';

const StringField = ({
  id,
  label,
  field,
  updateField,
  firstCol,
  secondCol,
  errorMessage,
  disabled,
  width,
  placeholder,
  extraButton,
}) => {
  const [localValue, setLocalValue] = useState(field.value);

  const onChange = useCallback(
    (e) => {
      updateField(e);
    },
    [updateField],
  );

  const debounceChange = useCallback(
    _.debounce((e) => {
      onChange(e);
    }, 300),
    [updateField],
  );

  const handleTyping = useCallback(
    (e) => {
      if (e.target.value !== localValue) {
        setLocalValue(e.target.value);
        debounceChange(e);
      }
    },
    [localValue, debounceChange, updateField],
  );

  useEffect(() => {
    if (localValue !== field.value) setLocalValue(field.value);
  }, [field]);

  if (extraButton !== null) {
    return (
      <CFormGroup row className="py-1">
        <CLabel col sm={firstCol} htmlFor="name">
          {label}
        </CLabel>
        <CCol sm={secondCol}>
          <div className="float-left w-75" style={{ width: width ?? '' }}>
            <CInput
              id={id}
              type="text"
              required
              value={localValue}
              onChange={handleTyping}
              invalid={field.error}
              disabled={disabled}
              placeholder={placeholder}
            />
          </div>
          <div className="float-left pl-3">{extraButton}</div>
          <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
        </CCol>
      </CFormGroup>
    );
  }

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <div style={{ width: width ?? '' }}>
          <CInput
            id={id}
            type="text"
            required
            value={localValue}
            onChange={handleTyping}
            invalid={field.error}
            disabled={disabled}
            placeholder={placeholder}
          />
        </div>
        <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
      </CCol>
    </CFormGroup>
  );
};

StringField.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  extraButton: PropTypes.node,
};

StringField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  errorMessage: '',
  width: null,
  placeholder: null,
  extraButton: null,
};

export default StringField;
