import React, { useState } from 'react';
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
import FormattedDate from '../FormattedDate';

const AddContactForm = ({ t, disable, fields, updateField, updateFieldWithKey, entities }) => {
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

  return (
    <CForm>
      <CRow>
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
                { label: 'SUBSCRIBER', value: 'SUBSCRIBER' },
                { label: 'USER', value: 'USER' },
                { label: 'INSTALLER', value: 'INSTALLER' },
                { label: 'CSR', value: 'CSR' },
                { label: 'MANAGER', value: 'MANAGER' },
                { label: 'BUSINESSOWNER', value: 'BUSINESSOWNER' },
                { label: 'TECHNICIAN', value: 'TECHNICIAN' },
                { label: 'CORPORATE', value: 'CORPORATE' },
              ]}
              isDisabled={disable}
            />
          </div>
          <CFormText color={fields.type.error ? 'danger' : ''}>{t('common.required')}</CFormText>
        </CCol>
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
        <CLabel className="mb-5" sm="2" col htmlFor="title">
          {t('contact.user_title')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="title"
            type="text"
            required
            value={fields.title.value}
            onChange={updateField}
            invalid={fields.title.error}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="salutation">
          {t('contact.salutation')}
        </CLabel>
        <CCol sm="4">
          <div style={{ width: '120px' }}>
            <Select
              id="salutation"
              value={{
                value: fields.salutation.value,
                label: fields.salutation.value === '' ? 'None' : fields.salutation.value,
              }}
              onChange={(v) => updateFieldWithKey('salutation', { value: v.value })}
              options={[
                { label: 'None', value: '' },
                { label: 'Mr.', value: 'Mr.' },
                { label: 'Ms.', value: 'Ms.' },
                { label: 'Mx.', value: 'Mx.' },
                { label: 'Dr.', value: 'Dr.' },
              ]}
              isDisabled={disable}
            />
          </div>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="firstname">
          {t('contact.first_name')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="firstname"
            type="text"
            required
            value={fields.firstname.value}
            onChange={updateField}
            invalid={fields.firstname.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.firstname.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="lastname">
          {t('contact.last_name')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="lastname"
            type="text"
            required
            value={fields.lastname.value}
            onChange={updateField}
            invalid={fields.lastname.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.lastname.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="initials">
          {t('contact.initials')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="initials"
            type="text"
            required
            value={fields.initials.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel sm="2" col htmlFor="visual">
          {t('contact.visual')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="visual"
            type="text"
            required
            value={fields.visual.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="primaryEmail">
          {t('contact.primary_email')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="primaryEmail"
            type="text"
            required
            value={fields.primaryEmail.value}
            onChange={updateField}
            invalid={fields.primaryEmail.error}
            disabled={disable}
            maxLength="50"
          />
          <CFormText color={fields.primaryEmail.error ? 'danger' : ''}>
            {t('common.required')}
          </CFormText>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="secondaryEmail">
          {t('contact.secondary_email')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="secondaryEmail"
            type="text"
            required
            value={fields.secondaryEmail.value}
            onChange={updateField}
            invalid={fields.secondaryEmail.error}
            disabled={disable}
            maxLength="50"
          />
          <CInvalidFeedback>{t('common.required')}</CInvalidFeedback>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="accessPIN">
          {t('contact.access_pin')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="accessPIN"
            type="text"
            required
            value={fields.accessPIN.value}
            onChange={updateField}
            invalid={fields.accessPIN.error}
            disabled={disable}
            maxLength="50"
          />
          <CInvalidFeedback>{t('common.required')}</CInvalidFeedback>
        </CCol>
        <CLabel className="mb-5" sm="2" col htmlFor="phones">
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
        <CLabel className="mb-5" sm="2" col htmlFor="phones">
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
        <CLabel sm="2" col htmlFor="initialNote">
          {t('user.note')}
        </CLabel>
        <CCol sm="4">
          <CInput
            id="initialNote"
            type="text"
            required
            value={fields.initialNote.value}
            onChange={updateField}
            disabled={disable}
            maxLength="50"
          />
        </CCol>
      </CRow>
      {entities ?
        <div>
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
        </div>
      :
        null
      }
    </CForm>
  );
};

AddContactForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldWithKey: PropTypes.func.isRequired,
  entities: PropTypes.instanceOf(Array),
};

AddContactForm.defaultProps = {
  entities: null
};

export default AddContactForm;
