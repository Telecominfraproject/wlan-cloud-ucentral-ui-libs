import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';

const DeviceSearchBar = ({ t, search, results, history, action }) => {
  const [selected, setSelected] = useState('');
  const NoOptionsMessage = (props) => (
    <components.NoOptionsMessage {...props}>
      <span>{t('common.no_devices_found')}</span>
    </components.NoOptionsMessage>
  );

  const onInputChange = (value) => {
    if (value === '' || value.match('^[a-fA-F0-9-*]+$')) {
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
      styles={{
        placeholder: (provided) => ({
          ...provided,
          // disable placeholder mouse events
          pointerEvents: 'none',
          userSelect: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          msUserSelect: 'none',
        }),
        input: (css) => ({
          ...css,
          /* expand the Input Component div */
          flex: '1 1 auto',
          /* expand the Input Component child div */
          '> div': {
            width: '100%',
          },
          /* expand the Input Component input */
          input: {
            width: '100% !important',
            textAlign: 'left',
          },
        }),
      }}
      onInputChange={onInputChange}
      onChange={(property) =>
        action === null ? history.push(`/devices/${property.value}`) : action(property.value)
      }
    />
  );
};

DeviceSearchBar.propTypes = {
  t: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  action: PropTypes.func,
};

DeviceSearchBar.defaultProps = {
  action: null,
};

export default DeviceSearchBar;
