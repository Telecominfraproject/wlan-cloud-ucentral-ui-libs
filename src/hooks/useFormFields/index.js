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
    (field, newValues) => {
      setFields({
        ...fields,
        [field]: {
          ...fields[field],
          ...newValues,
        },
      });
    },
    (formFields) => {
      setFields(formFields);
    },
  ];
};
