import React from 'react';
import PropTypes from 'prop-types';
import { CButtonClose } from '@coreui/react';

const SectionToggler = ({ id, label, field, updateField }) => {
  const toggle = () => updateField(id, { enabled: !field.enabled });

  return (
    <div className="py-1 pb-0 mb-0">
      <h6 className="mt-1 float-left">{label}</h6>
      <div className="text-right">
        <CButtonClose onClick={toggle} style={{ color: 'white' }} />
      </div>
    </div>
  );
};

SectionToggler.propTypes = {
  id: PropTypes.string.isRequired,
  field: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
};

export default SectionToggler;
