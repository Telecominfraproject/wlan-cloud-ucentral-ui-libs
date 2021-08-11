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
  CPopover,
  CRow,
  CSelect,
  CSwitch,
} from '@coreui/react';
import { prettyDate, cleanBytesString } from '../../utils/formatting';
import FirmwareDetails from '../FirmwareDetails';
import CopyToClipboardButton from '../CopyToClipboardButton';

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
  displayDev,
  toggleDevDisplay,
}) => {
  const [detailsShown, setDetailsShown] = useState([]);
  const fields = [
    { key: 'imageDate', label: t('firmware.image_date'), _style: { width: '1%' } },
    { key: 'size', label: t('firmware.size'), _style: { width: '1%' } },
    { key: 'revision', label: t('firmware.revision'), _style: { width: '1%' } },
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

  const getShortRevision = (revision) => {
    if (revision.includes(' / ')) {
      return revision.split(' / ')[1];
    }
    return revision;
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
      <CCardHeader className="py-2 px-3">
        <CRow>
          <CCol />
          <CCol sm="7">
            <CRow>
              <CCol sm="2" className="pt-2 text-right">
                {t('firmware.device_type')}
              </CCol>
              <CCol sm="4" className="text-right">
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
              <CCol sm="3" className="pt-2 text-center">
                {t('firmware.show_dev')}
              </CCol>
              <CCol sm="1" className="pt-1 text-center">
                <CSwitch
                  id="showDev"
                  color="primary"
                  defaultChecked={displayDev}
                  onClick={toggleDevDisplay}
                  size="lg"
                />
              </CCol>
              <CCol sm="2">
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
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody className="p-0">
        <CDataTable
          items={data}
          fields={fields}
          loading={loading}
          hover
          border
          scopedSlots={{
            imageDate: (item) => (
              <td className="text-center align-middle">
                <div style={{ width: '150px' }}>{prettyDate(item.imageDate)}</div>
              </td>
            ),
            size: (item) => (
              <td className="align-middle">
                <div style={{ width: '100px' }}>{cleanBytesString(item.size)}</div>
              </td>
            ),
            revision: (item) => (
              <td className="align-middle">
                <CPopover content={item.revision}>
                  <div style={{ width: 'calc(10vw)' }} className="text-truncate align-middle">
                    {item.revision ? getShortRevision(item.revision) : 'N/A'}
                  </div>
                </CPopover>
              </td>
            ),
            uri: (item) => (
              <td className="align-middle">
                <div style={{ width: 'calc(45vw)' }}>
                  <div className="text-truncate align-middle">
                    <CopyToClipboardButton key={item.uri} t={t} size="md" content={item.uri} />
                    <CPopover content={item.uri}>
                      <span>{item.uri}</span>
                    </CPopover>
                  </div>
                </div>
              </td>
            ),
            show_details: (item, index) => (
              <td className="text-center align-middle">
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
        <div className="pl-3">
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
        </div>
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
  displayDev: PropTypes.bool.isRequired,
  toggleDevDisplay: PropTypes.func.isRequired,
};

export default React.memo(FirmwareList);
