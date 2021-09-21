import React from 'react';
import PropTypes from 'prop-types';
import { CCol, CRow, CSwitch } from '@coreui/react';

const SectionToggler = ({ label, active, toggle, disabled }) => (
  <CRow>
    <CCol>
      <h5 className="pr-3 float-left">{label}</h5>
      <CSwitch
        color="primary"
        defaultChecked={active}
        onClick={toggle}
        disabled={disabled}
        className="float-left"
      />
    </CCol>
  </CRow>
);

SectionToggler.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SectionToggler;
