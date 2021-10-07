import { useState } from 'react';
import { set as lodashSet, get as lodashGet } from 'lodash';

const hasError = (e, field) => {
  if (field.type && field.type === 'int') {
    if (e.target.value.length === 0 || e.target.value === '-') return `This field cannot be empty`;
    if (field.minimum !== undefined && e.target.value < field.minimum)
      return `This field has a minimum value of ${field.minimum}`;
    if (field.maximum !== undefined && e.target.value > field.maximum)
      return `This field has a maximum value of ${field.maximum}`;
  }
  return null;
};

export default (initialState) => {
  const [fields, setFields] = useState(initialState);

  return [
    fields,
    (e) => {
      const field = lodashGet(fields, e.target.id);
      if (field.regex === undefined || e.target.value === '' || e.target.value.match(field.regex)) {
        const error = hasError(e, field);
        const newFields = { ...fields };

        lodashSet(newFields, e.target.id, {
          ...field,
          value: e.target.value,
          error: error !== null,
          errorMessage: error ?? undefined,
        });
        setFields({ ...newFields });
      }
    },
    (field, newValues) => {
      const oldField = lodashGet(fields, field);
      const newField = { ...oldField, ...newValues };
      const newFields = { ...fields };
      lodashSet(newFields, field, newField);
      setFields({ ...newFields });
    },
    (formFields, force = false) => {
      if (JSON.stringify(formFields) !== JSON.stringify(fields)) {
        setFields({ ...formFields });
      } else if (force) setFields({ ...formFields });
    },
  ];
};
