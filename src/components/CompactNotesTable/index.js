import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CDataTable,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CPopover,
  CModalTitle,
  CModalBody,
  CInput,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus, cilSave, cilSearch, cilX } from '@coreui/icons';
import { prettyDate } from '../../utils/formatting';
import useToggle from '../../hooks/useToggle';

const CompactNotesTable = ({ t, notes, addNote, loading, editable, switchToDetailed }) => {
  const [currentNote, setCurrentNote] = useState('');
  const [showModal, toggleModal] = useToggle(false);
  const [showAddModal, toggleAddModal] = useToggle(false);
  const [tempNotes, setTempNotes] = useState([]);

  const columns = [{ key: 'note', label: t('configuration.note'), _style: { width: '50%' } }];

  const detailedColumns = [
    { key: 'created', label: t('common.date'), _style: { width: '30%' } },
    { key: 'createdBy', label: t('common.by'), _style: { width: '20%' } },
    { key: 'note', label: t('configuration.note'), _style: { width: '50%' } },
  ];

  const saveTemp = () => {
    for (const note of tempNotes) {
      if (note.new) {
        addNote(note.note);
      }
    }
    toggleModal();
  };

  const addSingleNote = () => {
    addNote(currentNote);
    toggleAddModal();
  };

  const addTempNote = () => {
    const newNotes = [...tempNotes];
    newNotes.unshift({
      note: currentNote,
      new: true,
      created: new Date().getTime() / 1000,
      createdBy: '',
    });
    setTempNotes(newNotes);
  };

  useEffect(() => {
    setTempNotes(notes);
    setCurrentNote('');
  }, [notes]);

  useEffect(() => {
    if (showAddModal || showModal) setCurrentNote('');
  }, [showAddModal, showModal]);

  return (
    <div>
      <CRow>
        <CCol>
          <div className="overflow-auto border" style={{ height: '200px' }}>
            <CDataTable
              responsive
              border
              addTableClasses="m-0 p-0 table-sm"
              loading={loading}
              fields={columns}
              items={notes.sort((a, b) => (a.created <= b.created ? 1 : -1)) || []}
              noItemsView={{ noItems: t('common.no_items') }}
              columnHeaderSlot={{
                note: (
                  // eslint-disable-next-line react/jsx-indent
                  <div className="align-middle">
                    {t('configuration.notes')}
                    <CButton
                      className="ml-2 float-right"
                      size="sm"
                      color="primary"
                      variant="outline"
                      onClick={switchToDetailed ?? toggleModal}
                    >
                      <CIcon size="sm" content={cilSearch} />
                    </CButton>
                    <CButton
                      hidden={!editable}
                      className="ml-2 float-right"
                      size="sm"
                      color="primary"
                      variant="outline"
                      onClick={toggleAddModal}
                    >
                      <CIcon size="sm" content={cilPlus} />
                    </CButton>
                  </div>
                ),
              }}
            />
          </div>
        </CCol>
      </CRow>
      <CModal size="lg" show={showModal} onClose={toggleModal}>
        <CModalHeader className="p-1">
          <CModalTitle className="pl-1 pt-1">{t('configuration.notes')}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.save')}>
              <CButton
                hidden={!editable}
                color="primary"
                variant="outline"
                className="ml-2"
                onClick={saveTemp}
              >
                <CIcon content={cilSave} />
              </CButton>
            </CPopover>
            <CPopover content={t('common.close')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={toggleModal}>
                <CIcon content={cilX} />
              </CButton>
            </CPopover>
          </div>
        </CModalHeader>
        <CModalBody>
          {editable ? (
            <div className="d-flex flex-row mb-3">
              <CInput
                id="notes-input"
                name="text-input"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
              />
              <CButton
                className="ml-3"
                onClick={addTempNote}
                disabled={loading || currentNote === ''}
                color="primary"
              >
                <CIcon content={cilPlus} />
              </CButton>
            </div>
          ) : null}
          <div className="overflow-auto border" style={{ height: '500px' }}>
            <CDataTable
              responsive
              border
              addTableClasses="m-0 p-0"
              loading={loading}
              fields={detailedColumns}
              items={tempNotes || []}
              noItemsView={{ noItems: t('common.no_items') }}
              sorterValue={{ column: 'created', desc: 'true' }}
              scopedSlots={{
                created: (item) => (
                  <td>
                    {item.created && item.created !== 0 ? prettyDate(item.created) : t('common.na')}
                  </td>
                ),
              }}
            />
          </div>
        </CModalBody>
      </CModal>
      <CModal size="lg" show={showAddModal} onClose={toggleAddModal}>
        <CModalHeader className="p-1">
          <CModalTitle className="pl-1 pt-1">{t('common.add_note')}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.add')}>
              <CButton
                disabled={currentNote === ''}
                color="primary"
                variant="outline"
                className="ml-2"
                onClick={addSingleNote}
              >
                <CIcon content={cilPlus} />
              </CButton>
            </CPopover>
            <CPopover content={t('common.close')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={toggleAddModal}>
                <CIcon content={cilX} />
              </CButton>
            </CPopover>
          </div>
        </CModalHeader>
        <CModalBody>
          <h6>{t('common.add_note_explanation')}</h6>
          <CInput
            id="notes-input"
            name="text-input"
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          />
        </CModalBody>
      </CModal>
    </div>
  );
};

CompactNotesTable.propTypes = {
  t: PropTypes.func.isRequired,
  notes: PropTypes.instanceOf(Array).isRequired,
  addNote: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editable: PropTypes.bool,
  switchToDetailed: PropTypes.func,
};

CompactNotesTable.defaultProps = {
  editable: true,
  switchToDetailed: null,
};

export default CompactNotesTable;
