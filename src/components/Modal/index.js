import React from 'react';
import PropTypes from 'prop-types';
import { CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react';

const Modal = ({ size, show, toggle, title, headerButtons, children, footer }) => (
  <CModal size={size} show={show} onClose={toggle}>
    <CModalHeader className="p-1">
      <CModalTitle className="pl-1 pt-1">{title}</CModalTitle>
      <div className="text-right">{headerButtons}</div>
    </CModalHeader>
    <CModalBody className="pt-0">{children}</CModalBody>
    {footer}
  </CModal>
);

Modal.propTypes = {
  size: PropTypes.string,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  headerButtons: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
};

Modal.defaultProps = {
  size: 'md',
  headerButtons: null,
  children: null,
  footer: null,
};

export default Modal;
