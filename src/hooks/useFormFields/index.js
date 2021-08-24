import { useState } from 'react';

export default (initialState) => {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    (e) => {
      if (
        fields[e.target.id].regex === undefined ||
        e.target.value === '' ||
        e.target.value.match(fields[e.target.id].regex)
      ) {
        setFields({
          ...fields,
          [e.target.id]: {
            ...fields[e.target.id],
            value: e.target.value,
            error: false,
          },
        });
      }
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
