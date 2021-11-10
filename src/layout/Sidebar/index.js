import React from 'react';
import { CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import CreateElements from './CreateElements';

const Sidebar = ({
  showSidebar,
  setShowSidebar,
  logo,
  options,
  redirectTo,
  logoHeight,
  logoWidth,
}) => (
  <CSidebar
    size="sm"
    position="fixed"
    unfoldable={false}
    visible={showSidebar}
    onVisibleChange={(val) => setShowSidebar(val)}
  >
    <CSidebarBrand className="d-none d-md-flex" to={redirectTo}>
      <img
        className={[styles.sidebarImgFull, 'c-sidebar-brand-full'].join(' ')}
        style={{ height: logoHeight ?? undefined, width: logoWidth ?? undefined }}
        src={logo}
        alt="OpenWifi"
      />
    </CSidebarBrand>
    <CSidebarNav>
      <CreateElements items={options} />
    </CSidebarNav>
  </CSidebar>
);

Sidebar.propTypes = {
  showSidebar: PropTypes.string.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
  logo: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(Object).isRequired,
  redirectTo: PropTypes.string.isRequired,
  logoHeight: PropTypes.string,
  logoWidth: PropTypes.string,
};

Sidebar.defaultProps = {
  logoHeight: null,
  logoWidth: null,
};

export default React.memo(Sidebar);
