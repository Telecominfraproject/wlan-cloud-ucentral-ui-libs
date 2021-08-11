import React from 'react';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import { CButton, CPopover } from '@coreui/react';

const HideTextButton = ({ t, toggle, show, size }) => (
  <CPopover content={t('user.show_hide_password')}>
    <CButton onClick={toggle} size={size} className="pt-0">
      <CIcon name={show ? 'cil-envelope-open' : 'cil-envelope-closed'} />
    </CButton>
  </CPopover>
);

HideTextButton.propTypes = {
  t: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  size: PropTypes.string,
};

HideTextButton.defaultProps = {
  size: 'sm',
};

export default React.memo(HideTextButton);
