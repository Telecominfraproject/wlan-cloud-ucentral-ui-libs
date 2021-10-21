import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  CForm,
  CInput,
  CLabel,
  CCol,
  CFormGroup,
  CInvalidFeedback,
  CFormText,
  CRow,
  CDataTable,
  CLink,
  CPopover,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import countryList from 'utils/countryList';
import FormattedDate from '../FormattedDate';
import NotesTable from '../NotesTable';

const EditLocationForm = ({ t, disable, fields, updateField, updateFieldWithKey, entities, addNote, locationSearch }) => {
  const [filter, setFilter] = useState('');
  const [selectedEntity, setSelectedEntity] = useState('');

  const onPhonesChange = (v) => updateFieldWithKey('phones', { value: v.map((obj) => obj.value) });
  const onMobilesChange = (v) =>
    updateFieldWithKey('mobiles', { value: v.map((obj) => obj.value) });

  const NoOptionsMessage = () => (
    <h6 className="text-center pt-2">{t('common.type_for_options')}</h6>
  );

  const columns = [
    { key: 'created', label: t('common.created'), _style: { width: '20%' }, filter: false },
    { key: 'name', label: t('user.name'), _style: { width: '25%' }, filter: false },
    { key: 'description', label: t('user.description'), _style: { width: '50%' } },
    { key: 'actions', label: '', _style: { width: '15%' }, filter: false },
  ];

  const selectEntity = ({ id, name }) => {
    updateFieldWithKey('entity', { value: id });
    setSelectedEntity(name);
  };

  useEffect(() => {
    setSelectedEntity(fields.entityName.value);
  }, [fields.entityName]);

  return (
    <CForm>
      <CRow>
        <CLabel className="mb-5" sm="2" col htmlFor="name">
          {t('contact.identifier')}
        </CLabel>
        <CCol sm="4">
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
          <CInvalidFeedback>{t('common.required')}</CInvalidFeedback>
        </CCol>
        <CLabel sm="2" col htmlFor="description">
          {t('user.description')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="description"
            type="text"
            required
            value={fields.description.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="type">
          {t('contact.type')}
        </CLabel>
        <CCol sm="4">
          <div style={{ width: '200px' }}>
            <Select
              id="type"
              value={
                fields.type.value !== ''
                  ? { value: fields.type.value, label: fields.type.value }
                  : null
              }
              onChange={(v) => updateFieldWithKey('type', { value: v.value })}
              options={[
                { label: 'SERVICE', value: 'SERVICE' },
                { label: 'EQUIPMENT', value: 'EQUIPMENT' },
                { label: 'AUTO', value: 'AUTO' },
                { label: 'MANUAL', value: 'MANUAL' },
                { label: 'SPECIAL', value: 'SPECIAL' },
                { label: 'UNKNOWN', value: 'UNKNOWN' },
                { label: 'CORPORATE', value: 'CORPORATE' },
              ]}
              isDisabled={disable}
            />
          </div>
          <CFormText color={fields.type.error ? 'danger' : ''}>{t('common.required')}</CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="buildingName">
          {t('location.building_name')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="buildingName"
            type="text"
            required
            value={fields.buildingName.value}
            onChange={updateField}
            invalid={fields.buildingName.error}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel className="mb-3" sm="2" col htmlFor="phones">
          Landlines
        </CLabel>
        <CCol sm="4">
          <CreatableSelect
            isMulti
            id="phones"
            isDisabled={disable}
            onChange={onPhonesChange}
            components={{ NoOptionsMessage }}
            options={[]}
            value={fields.phones.value.map((opt) => ({ value: opt, label: opt }))}
            placeholder={t('common.type_for_options')}
          />
        </CCol>
        <CLabel className="mb-3" sm="2" col htmlFor="phones">
          Mobiles
        </CLabel>
        <CCol sm="4">
          <CreatableSelect
            id="mobiles"
            isMulti
            isDisabled={disable}
            onChange={onMobilesChange}
            components={{ NoOptionsMessage }}
            options={[]}
            value={fields.mobiles.value.map((opt) => ({ value: opt, label: opt }))}
            placeholder={t('common.type_for_options')}
          />
        </CCol>
        <CCol className="mb-3" sm="12">
          <CRow>
            <CCol sm="6">
              {locationSearch}
            </CCol>
          </CRow>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="addressLines.value[0]">
          {t('location.street_address')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="addressLines.value[0]"
            type="text"
            required
            value={fields.addressLines.value[0]}
            onChange={updateField}
            invalid={fields.addressLines.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.addressLines.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="country">
          {t('location.country')}
        </CLabel>
        <CCol sm="4">
          <div>
            <Select
              id="country"
              value={{
                value: fields.country.value,
                label: fields.country.value === '' ? 'None' : countryList.find(c => c.value === fields.country.value).label,
              }}
              onChange={(v) => updateFieldWithKey('country', { value: v.value })}
              options={countryList}
              isDisabled={disable}
            />
          </div>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="city">
          {t('location.city')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="city"
            type="text"
            required
            value={fields.city.value}
            onChange={updateField}
            invalid={fields.city.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.city.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="state">
          {t('location.state')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="state"
            type="text"
            required
            value={fields.state.value}
            onChange={updateField}
            invalid={fields.state.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.state.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="postal">
          {t('location.postal')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="postal"
            type="text"
            required
            value={fields.postal.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel sm="2" col htmlFor="geoCode">
          {t('location.geocode')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="geoCode"
            type="text"
            required
            value={fields.geoCode.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
      </CRow>
      <CFormGroup row className="pt-2 pb-1">
        <CLabel sm="2" col htmlFor="title">
          {t('entity.selected_entity')}
        </CLabel>
        <CCol sm="4" className="pt-2">
          <h6>{fields.entity.value === '' ? t('entity.need_select_entity') : selectedEntity}</h6>
        </CCol>
      </CFormGroup>
      <div className="overflow-auto border mb-1" style={{ height: '200px' }}>
        <CInput
          className="w-50 mb-2"
          type="text"
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <CDataTable
          items={entities}
          fields={columns}
          hover
          tableFilterValue={filter}
          border
          scopedSlots={{
            name: (item) => (
              <td>
                <CLink
                  className="c-subheader-nav-link"
                  aria-current="page"
                  to={() => `/configuration/${item.id}`}
                >
                  {item.name}
                </CLink>
              </td>
            ),
            created: (item) => (
              <td>
                <FormattedDate date={item.created} />
              </td>
            ),
            actions: (item) => (
              <td>
                <CPopover content={t('entity.select_entity')}>
                  <CButton color="primary" variant="outline" onClick={() => selectEntity(item)}>
                    <CIcon content={cilPlus} />
                  </CButton>
                </CPopover>
              </td>
            ),
          }}
        />
      </div>
      <NotesTable t={t} notes={fields.notes.value} addNote={addNote} loading={disable} editable />
    </CForm>
  );
};

EditLocationForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldWithKey: PropTypes.func.isRequired,
  entities: PropTypes.instanceOf(Array).isRequired,
  addNote: PropTypes.func.isRequired,
  locationSearch: PropTypes.node.isRequired
};

export default EditLocationForm;
