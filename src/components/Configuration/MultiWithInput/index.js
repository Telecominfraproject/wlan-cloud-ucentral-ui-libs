import React from 'react';
import PropTypes from 'prop-types';
import { CFormGroup, CCol, CLabel } from '@coreui/react';
import CreatableSelect from 'react-select/creatable';

const MultiWithInput = ({ t, id, label, field, updateField, firstCol, secondCol, disabled }) => {
  const onChange = (v) => updateField(id, { value: v.map((obj) => obj.value) });

  const NoOptionsMessage = () => (
    <h6 className="text-center pt-2">{field.formatExplanation ?? t('common.type_for_options')}</h6>
  );

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol}>
        <CreatableSelect
          isMulti
          isDisabled={disabled}
          onChange={onChange}
          components={{ NoOptionsMessage }}
          options={[]}
          value={field.value.map((opt) => ({ value: opt, label: opt }))}
          placeholder={field.formatExplanation ?? t('common.type_for_options')}
        />
      </CCol>
    </CFormGroup>
  );
};

MultiWithInput.propTypes = {
  t: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

MultiWithInput.defaultProps = {
  firstCol: 6,
  secondCol: 6,
};

export default MultiWithInput;
