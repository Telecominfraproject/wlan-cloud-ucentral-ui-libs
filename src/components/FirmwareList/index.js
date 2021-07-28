import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { v4 as createUuid } from 'uuid';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CSelect,
} from '@coreui/react';
import { prettyDate, cleanBytesString } from '../../utils/formatting';
import FirmwareDetails from '../FirmwareDetails';

const FirmwareList = ({
  t,
  loading,
  page,
  pageCount,
  setPage,
  data,
  firmwarePerPage,
  setFirmwarePerPage,
  selectedDeviceType,
  deviceTypes,
  setSelectedDeviceType,
  addNote,
  addNoteLoading,
  updateDescription,
  updateDescriptionLoading,
}) => {
  const [detailsShown, setDetailsShown] = useState([]);
  const fields = [
    { key: 'created', label: t('common.created'), _style: { width: '12%' } },
    { key: 'size', label: t('firmware.size'), _style: { width: '8%' } },
    { key: 'revision', label: t('firmware.revision'), _style: { width: '30%' } },
    { key: 'uri', label: 'URI' },
    { key: 'show_details', label: '', _style: { width: '5%' } },
  ];

  const toggleDetails = (index) => {
    const position = detailsShown.indexOf(index);
    let newDetails = detailsShown.slice();

    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...newDetails, index];
    }
    setDetailsShown(newDetails);
  };

  const changePage = (newValue) => {
    setDetailsShown([]);
    setPage(newValue);
  };

  useEffect(() => {
    setDetailsShown([]);
  }, [selectedDeviceType]);

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol />
          <CCol sm="1" className="pt-2 text-right">
            {t('firmware.device_type')}
          </CCol>
          <CCol sm="2" className="text-right">
            <div>
              <CSelect
                custom
                value={selectedDeviceType}
                onChange={(e) => setSelectedDeviceType(e.target.value)}
                disabled={loading}
              >
                {deviceTypes.map((deviceType) => (
                  <option key={createUuid()} value={deviceType}>
                    {deviceType}
                  </option>
                ))}
              </CSelect>
            </div>
          </CCol>
          <CCol sm="1">
            <div className="text-right">
              <CSelect
                custom
                defaultValue={firmwarePerPage}
                onChange={(e) => setFirmwarePerPage(e.target.value)}
                disabled={loading}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </CSelect>
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable
          items={data}
          fields={fields}
          loading={loading}
          hover
          border
          scopedSlots={{
            created: (item) => <td>{prettyDate(item.created)}</td>,
            size: (item) => <td>{cleanBytesString(item.size)}</td>,
            show_details: (item, index) => (
              <td className="text-center">
                <CButton
                  color="primary"
                  variant={detailsShown.includes(index) ? '' : 'outline'}
                  onClick={() => toggleDetails(index)}
                >
                  {detailsShown.includes(index) ? t('common.hide') : t('common.details')}
                </CButton>
              </td>
            ),
            details: (item, index) => (
              <FirmwareDetails
                t={t}
                show={detailsShown.includes(index)}
                item={item}
                addNote={addNote}
                addNoteLoading={addNoteLoading}
                updateDescription={updateDescription}
                updateDescriptionLoading={updateDescriptionLoading}
              />
            ),
          }}
        />
        <ReactPaginate
          previousLabel="← Previous"
          nextLabel="Next →"
          pageCount={pageCount}
          onPageChange={changePage}
          forcePage={page.selected}
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </CCardBody>
    </CCard>
  );
};

FirmwareList.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.instanceOf(Object).isRequired,
  setPage: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Array).isRequired,
  firmwarePerPage: PropTypes.string.isRequired,
  setFirmwarePerPage: PropTypes.func.isRequired,
  selectedDeviceType: PropTypes.string.isRequired,
  deviceTypes: PropTypes.instanceOf(Array).isRequired,
  setSelectedDeviceType: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired,
  addNoteLoading: PropTypes.bool.isRequired,
  updateDescription: PropTypes.func.isRequired,
  updateDescriptionLoading: PropTypes.bool.isRequired,
};

export default React.memo(FirmwareList);
