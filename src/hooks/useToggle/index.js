import { useState } from 'react';

export default (initialState) => {
  const [value, setValue] = useState(initialState);

  return [
    value,
    () => {
      setValue(!value);
    },
    (newValue) => {
      setValue(newValue);
    },
  ];
};
