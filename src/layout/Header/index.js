import React, { useState, useEffect } from 'react';
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CSubheader,
  CBreadcrumbRouter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import PropTypes from 'prop-types';
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ImgWithFallback from '../../components/ImgWithFallback';
import { emailToName } from '../../utils/formatting';

const Header = ({
  showSidebar,
  setShowSidebar,
  routes,
  t,
  i18n,
  logout,
  authToken,
  endpoints,
  user,
}) => {
  const [translatedRoutes, setTranslatedRoutes] = useState(routes);

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(showSidebar) ? false : 'responsive';
    setShowSidebar(val);
  };

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(showSidebar) ? true : 'responsive';
    setShowSidebar(val);
  };

  useEffect(() => {
    setTranslatedRoutes(routes.map(({ name, ...rest }) => ({ ...rest, name: t(name) })));
  }, [i18n.language]);

  return (
    <CHeader withSubheader>
      <CToggler inHeader className="ml-md-3 d-lg-none" onClick={toggleSidebarMobile} />
      <CToggler inHeader className="ml-3 d-md-down-none" onClick={toggleSidebar} />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto" />

      <CHeaderNav className="px-3">
        <LanguageSwitcher i18n={i18n} />
      </CHeaderNav>

      <CHeaderNav className="px-1">
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
          <CDropdownToggle className="c-header-nav-link" caret={false}>
            <div className="c-avatar avatar">
              <ImgWithFallback
                src={user.avatar && user.avatar !== '' ? user.avatar : '/'}
                fallback={() => emailToName(user.email)}
              />
            </div>
          </CDropdownToggle>
          <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem to={() => '/myprofile'}>
              <div className="px-3">{t('user.my_profile')}</div>
            </CDropdownItem>
            <CDropdownItem onClick={() => logout(authToken, endpoints.ucentralsec)}>
              <strong className="px-3">{t('common.logout')}</strong>
              <CIcon name="cilAccountLogout" content={cilAccountLogout} />
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={translatedRoutes}
        />
      </CSubheader>
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
  endpoints: PropTypes.instanceOf(Object).isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(Header);
