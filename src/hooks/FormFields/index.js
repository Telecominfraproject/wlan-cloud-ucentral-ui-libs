import { useState } from 'react';

export default (initialState) => {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    (e) => {
      setFields({
        ...fields,
        [e.target.id]: {
          value: e.target.value,
          error: false,
          optional: fields[e.target.id].optional,
        },
      });
    },
    (field, { value, error }) => {
      setFields({
        ...fields,
        [field]: {
          value,
          error,
          optional: fields[field].optional,
        },
      });
    },
    (formFields) => {
      setFields(formFields);
    },
  ];
};
