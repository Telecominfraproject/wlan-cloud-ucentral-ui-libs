import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCollapse } from '@coreui/react';

const ConfigurationElement = ({ children, header, enabled }) => (
  <CCard style={{ backgroundColor: '#cfe2ff' }}>
    <CCardHeader className="py-0 text-white" style={{ backgroundColor: '#052c65' }}>
      {header}
    </CCardHeader>
    <CCollapse show={enabled}>
      <CCardBody className="py-1 px-2">{children}</CCardBody>
    </CCollapse>
  </CCard>
);

ConfigurationElement.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  enabled: PropTypes.bool.isRequired,
};

export default ConfigurationElement;
