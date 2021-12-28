import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

const preferencesToObj = (arr) => {
  const obj = {};

  for (let i = 0; i < arr.length; i += 1) {
    obj[arr[i].tag] = arr[i].value;
  }

  return obj;
};

const preferencesToArr = (obj) => {
  const arr = [];

  for (const [tag, value] of Object.entries(obj)) {
    arr.push({ tag, value });
  }

  return arr;
};

export const AuthProvider = ({ axiosInstance, token, apiEndpoints, children }) => {
  const [currentToken, setCurrentToken] = useState(token);
  const [endpoints, setEndpoints] = useState(apiEndpoints);
  const [avatar, setAvatar] = useState('');
  const [user, setUser] = useState({
    avatar: '',
    preferences: {},
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

  const getAvatar = (userForAvatar) => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
      responseType: 'arraybuffer',
    };

    if (
      (userForAvatar && userForAvatar?.avatar !== '' && userForAvatar?.avatar !== '0') ||
      (user && user?.avatar !== '' && user?.avatar !== '0')
    )
      axiosInstance
        .get(
          `${endpoints.owsec}/api/v1/avatar/${userForAvatar?.Id ?? user.Id}?cache=${
            userForAvatar?.avatar ?? user.avatar
          }`,
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

  const getPreferences = async () => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    return axiosInstance
      .get(`${endpoints.owsec}/api/v1/preferences`, options)
      .then((response) => response.data)
      .catch(() => ({}));
  };

  const getUser = () => {
    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    let newUser = {};

    axiosInstance
      .get(`${endpoints.owsec}/api/v1/oauth2?me=true`, options)
      .then((response) => {
        newUser = response.data;
        if (
          response.data.Id &&
          response.data.Id.length > 0 &&
          newUser.avatar !== '' &&
          newUser.avatar !== '0'
        ) {
          getAvatar(newUser);
        }
        return axiosInstance.get(`${endpoints.owsec}/api/v1/preferences`, options);
      })
      .then((response) => {
        const preferences = {
          preferencesId: response.data.id,
          preferencesModified: response.data.modified,
          preferences: preferencesToObj(response.data.data),
        };

        newUser = { ...newUser, ...preferences };
      })
      .catch(() => {})
      .finally(() => {
        setUser(newUser);
      });
  };

  const deletePreference = async (preferenceToDelete) => {
    const oldPreferences = await getPreferences();
    const oldObj = preferencesToObj(oldPreferences);
    const preferencesObj = { ...oldObj, ...user.preferences };
    delete preferencesObj[preferenceToDelete];
    const arr = preferencesToArr(preferencesObj);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    const parameters = {
      data: arr,
    };

    return axiosInstance
      .put(`${endpoints.owsec}/api/v1/preferences`, parameters, options)
      .then((response) => {
        const newPrefs = preferencesToObj(response.data.data);
        setUser({
          ...user,
          ...{
            preferences: newPrefs,
            preferencesId: response.data.id,
            preferencesModified: response.data.modified,
          },
        });
        return { success: true };
      })
      .catch((e) => ({
        success: false,
        error: e.response?.data?.ErrorDescription ?? 'Unknown Error',
      }));
  };

  const updatePreferences = async (newValues) => {
    const oldPreferences = await getPreferences();
    const oldObj = preferencesToObj(oldPreferences);
    const preferencesObj = { ...oldObj, ...user.preferences, ...newValues };
    const arr = preferencesToArr(preferencesObj);

    const options = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${currentToken}`,
      },
    };

    const parameters = {
      data: arr,
    };

    return axiosInstance
      .put(`${endpoints.owsec}/api/v1/preferences`, parameters, options)
      .then((response) => {
        const newPrefs = preferencesToObj(response.data.data);
        setUser({
          ...user,
          ...{
            preferences: newPrefs,
            preferencesId: response.data.id,
            preferencesModified: response.data.modified,
          },
        });
        return { success: true };
      })
      .catch((e) => ({
        success: false,
        error: e.response?.data?.ErrorDescription ?? 'Unknown Error',
      }));
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
        updatePreferences,
        deletePreference,
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
