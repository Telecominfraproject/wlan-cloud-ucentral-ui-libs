import { useState } from 'react';

export default (initialState) => {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    (e) => {
      setFields({
        ...fields,
        [e.target.id]: {
          ...fields[e.target.id],
          value: e.target.value,
          error: false,
        },
      });
    },
    (field, { value, error }) => {
      setFields({
        ...fields,
        [field]: {
          ...fields[field],
          value,
          error,
        },
      });
    },
    (formFields) => {
      setFields(formFields);
    },
  ];
};
