import { useState } from 'react';

export default (initialState) => {
  const [user, setUser] = useState(initialState);

  return [
    user,
    (e) => {
      setUser({
        ...user,
        [e.target.id]: {
          ...user[e.target.id],
          value: e.target.value,
          error: false,
        },
      });
    },
    (key, newValues) => {
      setUser({
        ...user,
        [key]: {
          ...user[key],
          ...newValues,
        },
      });
    },
    (newUser) => {
      setUser(newUser);
    },
  ];
};
