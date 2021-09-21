import React, { useEffect, useState } from 'react';
import {
  CForm,
  CInput,
  CLabel,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CFormText,
  CRow,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMagnifyingGlass } from '@coreui/icons';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { prettyDate } from 'utils/formatting';
import NotesTable from '../NotesTable';

const EditConfigurationForm = ({
  t,
  disable,
  fields,
  updateField,
  updateFieldWithKey,
  addNote,
  editing,
  toggleInUseModal,
  deviceTypes,
  config,
}) => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [chosenTypes, setChosenTypes] = useState([]);

  const parseOptions = () => {
    const options = [{ value: '*', label: 'All' }];
    const newOptions = deviceTypes.map((option) => ({
      value: option,
      label: option,
    }));
    options.push(...newOptions);
    setTypeOptions(options);

    const newChosenTypes = fields.deviceTypes.value.map((dType) => ({
      value: dType,
      label: dType === '*' ? 'All' : dType,
    }));

    setChosenTypes(newChosenTypes);
  };

  const typeOnChange = (chosenArray) => {
    const allIndex = chosenArray.findIndex((el) => el.value === '*');

    // If the All option was chosen before, we take it out of the array
    if (allIndex === 0 && chosenTypes.length > 0) {
      const newResults = chosenArray.slice(1);
      setChosenTypes(newResults);
      updateFieldWithKey('deviceTypes', {
        value: newResults.map((el) => el.value),
        error: false,
        notEmpty: true,
      });
    } else if (allIndex > 0) {
      setChosenTypes([{ value: '*', label: 'All' }]);
      updateFieldWithKey('deviceTypes', { value: ['*'], error: false, notEmpty: true });
    } else if (chosenArray.length > 0) {
      setChosenTypes(chosenArray);
      updateFieldWithKey('deviceTypes', {
        value: chosenArray.map((el) => el.value),
        error: false,
        notEmpty: true,
      });
    } else {
      setChosenTypes([]);
      updateFieldWithKey('deviceTypes', { value: [], error: false, notEmpty: true });
    }
  };

  useEffect(() => {
    parseOptions();
  }, [deviceTypes, config]);

  return (
    <CForm>
      <CFormGroup row>
        <CCol>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('user.name')}:</div>
            </CLabel>
            <CCol xxl="9">
              {editing ? (
                <div>
                  <CInput
                    id="name"
                    type="text"
                    required
                    value={fields.name.value}
                    onChange={updateField}
                    invalid={fields.name.error}
                    disabled={disable}
                    maxLength="50"
                  />
                  <CFormText hidden={!fields.name.error} color={fields.name.error ? 'danger' : ''}>
                    {t('common.required')}
                  </CFormText>
                </div>
              ) : (
                <p className="mt-2 mb-0">{fields.name.value}</p>
              )}
            </CCol>
          </CRow>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('user.description')}:</div>
            </CLabel>
            <CCol xxl="9">
              {editing ? (
                <div>
                  <CInput
                    id="description"
                    type="text"
                    required
                    value={fields.description.value}
                    onChange={updateField}
                    invalid={fields.description.error}
                    disabled={disable}
                    maxLength="50"
                  />
                  <CInvalidFeedback>{t('common.required')}</CInvalidFeedback>
                </div>
              ) : (
                <p className="mt-2 mb-0">{fields.description.value}</p>
              )}
            </CCol>
          </CRow>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('common.created')}:</div>
            </CLabel>
            <CCol xxl="9">
              <p className="mt-2 mb-0">{prettyDate(fields.created.value)}</p>
            </CCol>
          </CRow>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('common.modified')}:</div>
            </CLabel>
            <CCol xxl="9">
              <p className="mt-2 mb-0">{prettyDate(fields.modified.value)}</p>
            </CCol>
          </CRow>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('configuration.used_by')}:</div>
            </CLabel>
            <CCol xxl="9">
              <p className="mt-2 mb-0 float-left">{config?.parsedInUse}</p>
              <CButton
                disabled={fields.inUse.value.length === 0}
                className="ml-3"
                color="primary"
                variant="outline"
                onClick={toggleInUseModal}
              >
                <CIcon content={cilMagnifyingGlass} />
              </CButton>
            </CCol>
          </CRow>
          <CRow className="py-2">
            <CLabel xxl="3" col htmlFor="name">
              <div>{t('configuration.supported_device_types')}:</div>
            </CLabel>
            <CCol xxl="9">
              <Select
                isMulti
                closeMenuOnSelect={false}
                name="Device Types"
                options={typeOptions}
                onChange={typeOnChange}
                value={chosenTypes}
                className={`basic-multi-select ${fields.deviceTypes.error ? 'border-danger' : ''}`}
                classNamePrefix="select"
                isDisabled={!editing}
              />
              <CFormText hidden={!fields.deviceTypes.error} color="danger">
                {t('configuration.need_device_type')}
              </CFormText>
            </CCol>
          </CRow>
        </CCol>
        <CCol className="mt-2">
          <NotesTable
            t={t}
            notes={fields.notes.value}
            addNote={addNote}
            loading={disable}
            editable={editing}
          />
        </CCol>
      </CFormGroup>
    </CForm>
  );
};

EditConfigurationForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldWithKey: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  toggleInUseModal: PropTypes.func.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
  config: PropTypes.instanceOf(Object),
};

EditConfigurationForm.defaultProps = {
  config: null,
};

export default EditConfigurationForm;
