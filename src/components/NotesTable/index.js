import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CDataTable, CRow, CCol, CLabel, CInput } from '@coreui/react';
import { prettyDate } from '../../utils/formatting';
import LoadingButton from '../LoadingButton';

const NotesTable = ({
  t,
  notes,
  addNote,
  loading,
  size,
  extraFunctionParameter,
  descriptionColumn,
  editable,
}) => {
  const [currentNote, setCurrentNote] = useState('');

  const columns = [
    { key: 'created', label: t('common.date'), _style: { width: '30%' } },
    { key: 'createdBy', label: t('common.by'), _style: { width: '20%' } },
    { key: 'note', label: t('configuration.note'), _style: { width: '50%' } },
  ];

  const saveNote = () => {
    addNote(currentNote, extraFunctionParameter);
  };

  useEffect(() => {
    setCurrentNote('');
  }, [notes]);

  if (!descriptionColumn) {
    return (
      <div>
        <CRow>
          <CCol>
            <CInput
              id="notes-input"
              name="text-input"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
          </CCol>
          <CCol sm={size === 'm' ? '3' : '2'}>
            <LoadingButton
              label={t('common.add')}
              isLoadingLabel={t('common.adding_ellipsis')}
              isLoading={loading}
              action={saveNote}
              disabled={loading || currentNote === ''}
            />
          </CCol>
        </CRow>
        <CRow className="pt-3">
          <CCol>
            <div className="overflow-auto" style={{ height: '200px' }}>
              <CDataTable
                responsive
                border
                addTableClasses="table-sm"
                loading={loading}
                fields={columns}
                items={notes || []}
                noItemsView={{ noItems: t('common.no_items') }}
                sorterValue={{ column: 'created', desc: 'true' }}
                scopedSlots={{
                  created: (item) => (
                    <td>
                      {item.created && item.created !== 0
                        ? prettyDate(item.created)
                        : t('common.na')}
                    </td>
                  ),
                }}
              />
            </div>
          </CCol>
        </CRow>
      </div>
    );
  }

  if (editable) {
    return (
      <div>
        <CRow>
          <CLabel col sm="2">
            {t('configuration.notes')}:
          </CLabel>
          <CCol sm={size === 'm' ? '7' : '8'}>
            <CInput
              id="notes-input"
              name="text-input"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
          </CCol>
          <CCol sm={size === 'm' ? '3' : '2'}>
            <LoadingButton
              label={t('common.add')}
              isLoadingLabel={t('common.adding_ellipsis')}
              isLoading={loading}
              action={saveNote}
              disabled={loading || currentNote === ''}
            />
          </CCol>
        </CRow>
        <CRow className="pt-1">
          <CCol sm="2" />
          <CCol>
            <div className="overflow-auto border" style={{ height: '200px' }}>
              <CDataTable
                responsive
                border
                addTableClasses="m-0 p-0 table-sm"
                loading={loading}
                fields={columns}
                items={notes || []}
                noItemsView={{ noItems: t('common.no_items') }}
                sorterValue={{ column: 'created', desc: 'true' }}
                scopedSlots={{
                  created: (item) => (
                    <td>
                      {item.created && item.created !== 0
                        ? prettyDate(item.created)
                        : t('common.na')}
                    </td>
                  ),
                }}
              />
            </div>
          </CCol>
        </CRow>
      </div>
    );
  }

  return (
    <div>
      <CRow>
        <CLabel col sm="2">
          {t('configuration.notes')}:
        </CLabel>
        <CCol>
          <div className="overflow-auto border" style={{ height: '200px' }}>
            <CDataTable
              responsive
              border
              addTableClasses="m-0 p-0 table-sm"
              loading={loading}
              fields={columns}
              items={notes || []}
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
        </CCol>
      </CRow>
    </div>
  );
};

NotesTable.propTypes = {
  t: PropTypes.func.isRequired,
  notes: PropTypes.instanceOf(Array).isRequired,
  addNote: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  size: PropTypes.string,
  extraFunctionParameter: PropTypes.string,
  descriptionColumn: PropTypes.bool,
  editable: PropTypes.bool,
};

NotesTable.defaultProps = {
  size: 'm',
  extraFunctionParameter: '',
  descriptionColumn: true,
  editable: true,
};

export default NotesTable;
