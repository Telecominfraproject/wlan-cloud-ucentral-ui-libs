import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DeviceContext = React.createContext();

export const DeviceProvider = ({ axiosInstance, serialNumber, children }) => {
  const [deviceSerialNumber, setDeviceSerialNumber] = useState(serialNumber);

  const getDeviceConnection = async (deviceId, token, endpoint) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return axiosInstance
      .get(`${endpoint}/api/v1/device/${encodeURIComponent(deviceId)}/status`, options)
      .then((response) => response.data.connected)
      .catch(() => false);
  };

  return (
    <DeviceContext.Provider
      value={{ deviceSerialNumber, setDeviceSerialNumber, getDeviceConnection }}
    >
      {children}
    </DeviceContext.Provider>
  );
};

DeviceProvider.propTypes = {
  axiosInstance: PropTypes.instanceOf(Object).isRequired,
  serialNumber: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export const useDevice = () => React.useContext(DeviceContext);
