import React from 'react';
import { CFormSelect } from '@coreui/react';
import PropTypes from 'prop-types';

const LanguageSwitcher = ({ i18n }) => (
  <CFormSelect
    className="custom-select"
    defaultValue={i18n.language.split('-')[0]}
    onChange={(e) => i18n.changeLanguage(e.target.value)}
  >
    <option value="de">Deutsche</option>
    <option value="es">Español</option>
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="pt">Portugues</option>
  </CFormSelect>
);

LanguageSwitcher.propTypes = {
  i18n: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(LanguageSwitcher);
