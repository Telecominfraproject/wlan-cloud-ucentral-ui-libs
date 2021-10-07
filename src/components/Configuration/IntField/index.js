import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel, CInput } from '@coreui/react';
import _ from 'lodash';

const regNegativePositive = new RegExp('-?[0-9]{0,10}');

const IntField = ({ id, label, field, updateField, firstCol, secondCol, disabled }) => {
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
      if (
        e.target.value !== localValue &&
        e.target.value.length <= 5 &&
        regNegativePositive.test(e.target.value)
      ) {
        setLocalValue(e.target.value);
        debounceChange(e);
      }
    },
    [localValue, debounceChange, updateField],
  );

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <div className="d-flex flex-row">
          <CInput
            id={id}
            type="number"
            required
            value={localValue}
            onChange={handleTyping}
            invalid={field.error}
            disabled={disabled}
            pattern="[0-9]*"
            style={{ width: '100px' }}
          />
          <div className="pl-2 pt-2">{field.unit}</div>
        </div>
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
  disabled: PropTypes.bool.isRequired,
};

IntField.defaultProps = {
  firstCol: 6,
  secondCol: 6,
};

export default IntField;
