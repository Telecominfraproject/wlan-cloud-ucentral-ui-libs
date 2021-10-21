import React from 'react';
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
  CLink,
} from '@coreui/react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import NotesTable from '../NotesTable';
import FormattedDate from '../FormattedDate';

const EditEntityForm = ({
  t,
  disable,
  fields,
  updateField,
  updateFieldDirectly,
  addNote,
  editing,
  toggleAssociate,
  toggleContact,
  toggleIpModal,
}) => (
  <CForm>
    <CFormGroup row>
      <CCol>
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>{t('user.name')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
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
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>{t('user.description')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
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
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>RRM:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
            <div style={{ width: '120px' }}>
              <Select
                id="rrm"
                value={{ value: fields.rrm.value, label: fields.rrm.value }}
                onChange={(v) => updateFieldDirectly('rrm', { value: v.value })}
                options={[
                  { label: 'on', value: 'on' },
                  { label: 'off', value: 'off' },
                  { label: 'inherit', value: 'inherit' },
                ]}
                isDisabled={!editing}
              />
            </div>
          </CCol>
        </CRow>
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>{t('configuration.title')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
            {editing ? (
              <CButton className="pl-0 text-left" color="link" onClick={toggleAssociate}>
                {fields.deviceConfiguration.value === ''
                  ? t('configuration.add_configuration')
                  : fields.deviceConfiguration.value}
              </CButton>
            ) : (
              <div className="mt-2 mb-0">
                {fields.deviceConfiguration.uuid === '' ? (
                  <p className="mb-0">{t('configuration.no_associated_config')}</p>
                ) : (
                  <CLink
                    className="c-subheader-nav-link"
                    aria-current="page"
                    to={() => `/configuration/${fields.deviceConfiguration.uuid}`}
                  >
                    {fields.deviceConfiguration.value}
                  </CLink>
                )}
              </div>
            )}
          </CCol>
        </CRow>
        {fields.contact ? (
          <CRow className="pb-0">
            <CLabel lg="5" xl="3" col htmlFor="name">
              <div>{t('contact.title')}:</div>
            </CLabel>
            <CCol lg="7" xxl="9">
              {editing ? (
                <CButton className="pl-0 text-left" color="link" onClick={toggleContact}>
                  {fields.contact.value === '' ? t('contact.add_contact') : fields.contact.value}
                </CButton>
              ) : (
                <div className="mt-2 mb-0">
                  {fields.contact.uuid === '' ? (
                    <p className="mb-0">{t('contact.no_associated_contact')}</p>
                  ) : (
                    <CLink
                      className="c-subheader-nav-link"
                      aria-current="page"
                      to={() => `/contacts`}
                    >
                      {fields.contact.value}
                    </CLink>
                  )}
                </div>
              )}
            </CCol>
          </CRow>
        ) : null}
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="sourceIp">
            <div>{t('entity.ip_detection')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
            {editing ? (
              <CButton className="pl-0 text-left" color="link" onClick={toggleIpModal}>
                {fields.sourceIP.value.length === 0
                  ? t('entity.add_ips')
                  : fields.sourceIP.value.join(', ')}
              </CButton>
            ) : (
              <div className="mt-2 mb-0">
                <p className="mb-0">
                  {fields.sourceIP.value.length === 0
                    ? t('entity.no_ips')
                    : fields.sourceIP.value.join(', ')}
                </p>
              </div>
            )}
          </CCol>
        </CRow>
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>{t('common.created')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
            <div className="mt-2 mb-0">
              <FormattedDate date={fields.created.value} />
            </div>
          </CCol>
        </CRow>
      </CCol>
      <CCol className="mt-1">
        <CRow className="pb-0">
          <CLabel lg="5" xl="3" col htmlFor="name">
            <div>{t('common.modified')}:</div>
          </CLabel>
          <CCol lg="7" xxl="9">
            <div className="mt-2 mb-0">
              <FormattedDate date={fields.modified.value} />
            </div>
          </CCol>
        </CRow>
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

EditEntityForm.propTypes = {
  t: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  fields: PropTypes.instanceOf(Object).isRequired,
  updateField: PropTypes.func.isRequired,
  updateFieldDirectly: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  toggleAssociate: PropTypes.func.isRequired,
  toggleContact: PropTypes.func.isRequired,
  toggleIpModal: PropTypes.func.isRequired,
};

export default EditEntityForm;
