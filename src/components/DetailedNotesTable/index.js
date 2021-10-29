import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CDataTable, CRow, CCol, CButton, CInput } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilPlus } from '@coreui/icons';
import { prettyDate } from '../../utils/formatting';

const DetailedNotesTable = ({ t, notes, addNote, loading, editable }) => {
  const [currentNote, setCurrentNote] = useState('');

  const detailedColumns = [
    { key: 'created', label: t('common.date'), _style: { width: '1%' } },
    { key: 'note', label: t('configuration.note'), _style: { width: '50%' } },
    { key: 'createdBy', label: t('common.by'), _style: { width: '1%' } },
  ];

  const addNewNote = () => {
    addNote(currentNote);
  };
  useEffect(() => {
    setCurrentNote('');
  }, [notes]);

  return (
    <div>
      <CRow>
        <CCol>
          {editable ? (
            <div className="d-flex flex-row mt-2 mb-2">
              <CInput
                id="notes-input"
                name="text-input"
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
              />
              <CButton
                className="ml-3"
                onClick={addNewNote}
                disabled={loading || currentNote === ''}
                color="primary"
              >
                <CIcon content={cilPlus} />
              </CButton>
            </div>
          ) : null}
          <div className="overflow-auto border mb-2" style={{ height: '200px' }}>
            <CDataTable
              responsive
              border
              addTableClasses="m-0 p-0 table-sm"
              loading={loading}
              fields={detailedColumns}
              items={notes || []}
              noItemsView={{ noItems: t('common.no_items') }}
              sorterValue={{ column: 'created', desc: 'true' }}
              scopedSlots={{
                created: (item) => (
                  <td>
                    <div style={{ width: '150px' }}>
                      {item.created && item.created !== 0
                        ? prettyDate(item.created)
                        : t('common.na')}
                    </div>
                  </td>
                ),
                createdBy: (item) => (
                  <td>
                    <div style={{ width: '300px' }}>{item.createdBy}</div>
                  </td>
                ),
                note: (item) => (
                  <td>
                    <div style={{ minWidth: '200px' }}>{item.note}</div>
                  </td>
                ),
              }}
            />
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

DetailedNotesTable.propTypes = {
  t: PropTypes.func.isRequired,
  notes: PropTypes.instanceOf(Array).isRequired,
  addNote: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editable: PropTypes.bool,
};

DetailedNotesTable.defaultProps = {
  editable: true,
};

export default DetailedNotesTable;
