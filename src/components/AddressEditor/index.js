import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { checkIfJson } from '../../utils/formatting';
import _ from 'lodash';
import formatGoogleAddress from 'utils/formatGoogleAddress';

const AddressEditor = ({ t, currentToken, endpoint, setAddress, show }) => {
  const [tempValue, setTempValue] = useState('');
  const [socket, setSocket] = useState(null);
  const [results, setResults] = useState([]);
  const [waitingSearch, setWaitingSearch] = useState('');

  const NoOptionsMessage = (props) => (
    <components.NoOptionsMessage {...props}>
      <span>{t('common.no_addresses_found')}</span>
    </components.NoOptionsMessage>
  );

  const changeAddress = (val) => {
    const parsedAddress = formatGoogleAddress(val);
    if(parsedAddress) setAddress(parsedAddress);
  }

  const onChange = useCallback(
    (v) => {
      setWaitingSearch(v);
    },
    [setWaitingSearch],
  );

  const debounceChange = useCallback(
    _.debounce((v) => {
      onChange(v);
    }, 300),
    [setWaitingSearch],
  );

  const handleTyping = useCallback(
    (v) => {
      if (v !== tempValue) {
        setTempValue(v);
        debounceChange(v);
      }
    },
    [tempValue, debounceChange, setTempValue, setWaitingSearch],
  );

  const search = (value) => {
    if (socket?.readyState === WebSocket.OPEN) {
      if (value.length > 3) {
        setWaitingSearch('');
        socket.send(
          JSON.stringify({ command: 'address_completion', address: value }),
        );
      } else {
        setResults([]);
      }
    } else if (socket?.readyState !== WebSocket.CONNECTING) {
      setWaitingSearch(value);
      setSocket(new WebSocket(`${endpoint.replace('https', 'wss')}/api/v1/ws`));
    } else {
      setWaitingSearch(value);
    }
  };

  const closeSocket = () => {
    if (socket !== null) {
      socket.close();
    }
  };

  useEffect(() => {
    if (socket !== null) {
      socket.onopen = () => {
        socket.send(`token:${currentToken}`);
      };

      socket.onmessage = (event) => {
        if (checkIfJson(event.data)) {
          const result = JSON.parse(event.data);
          if (result?.results) {
            setResults(result.results);
          }
        }
      };
    }

    return () => closeSocket();
  }, [socket]);

  useEffect(() => {
    if (socket === null) {
      setSocket(new WebSocket(`${endpoint.replace('https', 'wss')}/api/v1/ws`));
    }
  }, []);

  useEffect(() => {
    if(waitingSearch.length >= 3) {
      search(waitingSearch);
    }
  }, [socket, waitingSearch]);

  if(!show) {
    return null;
  }

  return (
    <Select
      components={{ NoOptionsMessage }}
      options={results.map((v) => ({ label: v.formatted_address, value: v }))}
      filterOption={() => true}
      inputValue={tempValue}
      placeholder={t('location.search')}
      onInputChange={handleTyping}
      onChange={(property) => changeAddress(property)}
    />
  );
}

AddressEditor.propTypes = {
  t: PropTypes.func.isRequired,
  currentToken: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
  setAddress: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
};

export default AddressEditor;
