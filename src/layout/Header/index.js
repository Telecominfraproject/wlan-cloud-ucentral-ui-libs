import React, { useState, useEffect } from 'react';
import {
  CHeader,
  CHeaderToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CContainer,
  CDropdownItem,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout, cilMenu } from '@coreui/icons';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import Avatar from '../../components/Avatar';

const Header = ({
  showSidebar,
  setShowSidebar,
  routes,
  t,
  i18n,
  logout,
  logo,
  authToken,
  endpoints,
  user,
  avatar,
  hideBreadcrumb,
  extraButton,
}) => {
  const [translatedRoutes, setTranslatedRoutes] = useState(routes);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    setTranslatedRoutes(routes.map(({ name, ...rest }) => ({ ...rest, name: t(name) })));
  }, [i18n.language]);

  return (
    <CHeader position="fixed" className="py-0">
      <CContainer fluid>
        <CHeaderToggler onClick={toggleSidebar} className="ps-1">
          <CIcon icon={cilMenu} />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <img
            src={logo}
            alt="OpenWifi"
            className="c-sidebar-brand-full"
            style={{ height: '75px', width: '175px' }}
          />
        </CHeaderBrand>

        <CHeaderNav>{extraButton}</CHeaderNav>

        <CHeaderNav className="px-1">
          <LanguageSwitcher i18n={i18n} />
        </CHeaderNav>

        <CHeaderNav className="px-1">
          <CDropdown variant="nav-item">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
              <Avatar src={avatar} fallback={user.email} />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem href="/myprofile">
                <div className="px-3">{t('user.my_profile')}</div>
              </CDropdownItem>
              <CDropdownItem onClick={() => logout(authToken, endpoints.owsec)}>
                <strong className="px-3">{t('common.logout')}</strong>
                <CIcon icon={cilAccountLogout} />
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>

        {hideBreadcrumb ? null : (
          <CContainer fluid>
            <CSubheader hidden={hideBreadcrumb} className="px-3 justify-content-between">
              <CBreadcrumbRouter
                className="border-0 c-subheader-nav m-0 px-0 px-md-3"
                routes={translatedRoutes}
              />
            </CSubheader>
          </CContainer>
        )}
      </CContainer>
    </CHeader>
  );
};

Header.propTypes = {
  showSidebar: PropTypes.string.isRequired,
  setShowSidebar: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(Object).isRequired,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.instanceOf(Object).isRequired,
  logout: PropTypes.func.isRequired,
  authToken: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  endpoints: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  avatar: PropTypes.string.isRequired,
  hideBreadcrumb: PropTypes.bool,
  extraButton: PropTypes.node,
};

Header.defaultProps = {
  extraButton: null,
  hideBreadcrumb: false,
};

export default React.memo(Header);
