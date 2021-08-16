import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

const DeviceSearchBar = ({ t, search, results, history }) => {
  const [selected, setSelected] = useState(null);
  const NoOptionsMessage = (props) => (
    <components.NoOptionsMessage {...props}>
      <span>{t('common.no_devices_found')}</span>
    </components.NoOptionsMessage>
  );

  const onInputChange = (value) => {
    if (value === '' || value.match('^[a-fA-F0-9]+$')) {
      setSelected(value);
      search(value);
    }
  };

  return (
    <Select
      components={{ NoOptionsMessage }}
      options={results.map((serial) => ({ label: serial, value: serial }))}
      filterOption={() => true}
      inputValue={selected}
      placeholder={t('common.search')}
      onInputChange={onInputChange}
      onChange={(property) => history.push(`/devices/${property.value}`)}
    />
  );
};

DeviceSearchBar.propTypes = {
  t: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default DeviceSearchBar;
