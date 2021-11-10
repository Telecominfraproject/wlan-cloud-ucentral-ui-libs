import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CBadge } from '@coreui/react';

const CreateElements = ({ items }) => {
  const location = useLocation();
  const navLink = (name, icon, badge) => (
    <>
      {icon && icon}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: 'active',
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((it, i) => (it.items ? navGroup(it, i) : navItem(it, i)))}
      </Component>
    );
  };

  return (
    <>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </>
  );
};

CreateElements.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default CreateElements;
