import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCol, CCollapse, CInput, CRow } from '@coreui/react';
import { prettyDate, cleanBytesString } from '../../utils/formatting';
import NotesTable from '../NotesTable';
import LoadingButton from '../LoadingButton';

const FirmwareDetails = ({
  t,
  show,
  item,
  addNote,
  addNoteLoading,
  updateDescription,
  updateDescriptionLoading,
}) => {
  const [description, setDescription] = useState('');

  const saveDescription = () => {
    updateDescription(description, item.id);
  };

  return (
    <CCollapse show={show}>
      <CCard className="mt-3 mx-3">
        <CCardHeader>{t('firmware.details_title', { image: item.image })}</CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="1">Created</CCol>
            <CCol sm="5">{prettyDate(item.created)}</CCol>
            <CCol sm="1">Release</CCol>
            <CCol sm="5">{item.release}</CCol>
          </CRow>
          <CRow className="my-3">
            <CCol sm="1">Image</CCol>
            <CCol sm="5">{item.image}</CCol>
            <CCol sm="1">Image Date</CCol>
            <CCol sm="5">{prettyDate(item.imageDate)}</CCol>
          </CRow>
          <CRow className="my-3">
            <CCol sm="1">Revision</CCol>
            <CCol sm="5">{item.revision}</CCol>
            <CCol sm="1">Size</CCol>
            <CCol sm="5">{cleanBytesString(item.size)}</CCol>
          </CRow>
          <CRow className="my-3">
            <CCol sm="1">URI</CCol>
            <CCol sm="5">{item.uri}</CCol>
            <CCol sm="1">Owner</CCol>
            <CCol sm="5">{item.owner === '' ? t('common.unknown') : item.owner}</CCol>
          </CRow>
          <CRow className="my-3">
            <CCol sm="1" className="mt-2">
              Description
            </CCol>
            <CCol sm="4">
              <CInput
                id="description"
                defaultValue={item.description}
                maxLength="50"
                onChange={(e) => setDescription(e.target.value)}
              />
            </CCol>
            <CCol sm="1">
              <LoadingButton
                label={t('common.save')}
                isLoadingLabel={t('common.saving')}
                isLoading={updateDescriptionLoading}
                action={saveDescription}
                disabled={updateDescriptionLoading}
              />
            </CCol>
            <CCol>
              <NotesTable
                t={t}
                notes={item.notes}
                addNote={addNote}
                loading={addNoteLoading}
                extraFunctionParameter={item.id}
              />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCollapse>
  );
};

FirmwareDetails.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  item: PropTypes.instanceOf(Object).isRequired,
  addNoteLoading: PropTypes.bool.isRequired,
  addNote: PropTypes.func.isRequired,
  updateDescription: PropTypes.func.isRequired,
  updateDescriptionLoading: PropTypes.bool.isRequired,
};
export default React.memo(FirmwareDetails);
