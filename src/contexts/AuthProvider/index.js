import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export const AuthProvider = ({ axiosInstance, token, apiEndpoints, children }) => {
  const [currentToken, setCurrentToken] = useState(token);
  const [endpoints, setEndpoints] = useState(apiEndpoints);
  const [avatar, setAvatar] = useState('');
  const [user, setUser] = useState({
    avatar: '',
  });

  const logout = () => {
    axiosInstance
      .delete(`${endpoints.owsec}/api/v1/oauth2/${currentToken}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${currentToken}`,
        },
      })
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('gateway_endpoints');
        sessionStorage.clear();
        window.location.replace('/');
      });
  };

  const getAvatar = (newUserId) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: 'arraybuffer',
    };

    axiosInstance
      .get(
        `${endpoints.owsec}/api/v1/avatar/${
          newUserId ?? user.Id
        }?timestamp=${new Date().getTime()}`,
        options,
      )
      .then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
          ),
        );
        setAvatar(`data:;base64,${base64}`);
      })
      .catch(() => {});
  };

  const getUser = () => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    axiosInstance
      .get(`${endpoints.owsec}/api/v1/oauth2?me=true`, options)
      .then((response) => {
        setUser(response.data);
        if (response.data.Id && response.data.Id.length > 0) {
          getAvatar(response.data.Id);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (currentToken.length > 0 && endpoints?.owsec?.length > 0) {
      getUser();
    }
  }, [currentToken]);

  return (
    <AuthContext.Provider
      value={{
        currentToken,
        setCurrentToken,
        endpoints,
        setEndpoints,
        user,
        setUser,
        avatar,
        getAvatar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  axiosInstance: PropTypes.instanceOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  apiEndpoints: PropTypes.instanceOf(Object),
};

AuthProvider.defaultProps = {
  apiEndpoints: {},
};

export const useAuth = () => React.useContext(AuthContext);
