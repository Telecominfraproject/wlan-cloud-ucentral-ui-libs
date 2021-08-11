import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CCardBody,
  CDataTable,
  CButton,
  CLink,
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CPopover,
  CSelect,
  CButtonToolbar,
  CButtonClose,
} from '@coreui/react';
import {
  cilSync,
  cilNotes,
  cilArrowCircleTop,
  cilCheckCircle,
  cilWifiSignal2,
  cilTerminal,
  cilTrash,
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import ReactTooltip from 'react-tooltip';
import { v4 as createUuid } from 'uuid';
import { cleanBytesString } from '../../utils/formatting';
import DeviceBadge from '../DeviceBadge';
import LoadingButton from '../LoadingButton';
import styles from './index.module.scss';

const DeviceListTable = ({
  currentPage,
  devices,
  devicesPerPage,
  loading,
  updateDevicesPerPage,
  pageCount,
  updatePage,
  refreshDevice,
  t,
  toggleFirmwareModal,
  toggleHistoryModal,
  upgradeToLatest,
  upgradeStatus,
  deviceIcons,
  connectRtty,
  deleteDevice,
  deleteStatus,
}) => {
  const columns = [
    { key: 'deviceType', label: '', filter: false, sorter: false, _style: { width: '3%' } },
    { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
    { key: 'firmware', label: t('firmware.revision') },
    { key: 'firmware_button', label: '', filter: false, _style: { width: '4%' } },
    { key: 'compatible', label: t('common.type'), filter: false, _style: { width: '6%' } },
    { key: 'txBytes', label: 'Tx', filter: false, _style: { width: '8%' } },
    { key: 'rxBytes', label: 'Rx', filter: false, _style: { width: '8%' } },
    { key: 'ipAddress', label: t('IP'), _style: { width: '8%' } },
    { key: 'actions', label: '', _style: { width: '1%' } },
  ];

  const hideTooltips = () => ReactTooltip.hide();

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      hideTooltips();
    }
  };

  const getShortRevision = (revision) => {
    if (revision.includes(' / ')) {
      return revision.split(' / ')[1];
    }
    return revision;
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  const getFirmwareButton = (latest, device) => {
    const tooltipId = createUuid();
    let text = t('firmware.unknown_firmware_status');
    let upgradeText = t('firmware.upgrade_to_latest');
    let icon = <CIcon size="lg" name="cil-arrow-circle-top" content={cilArrowCircleTop} />;
    let color = 'secondary';
    if (latest !== undefined) {
      text = t('firmware.newer_firmware_available');
      color = 'warning';

      if (latest) {
        icon = <CIcon size="lg" name="cil-check-circle" content={cilCheckCircle} />;
        text = t('firmware.latest_version_installed');
        upgradeText = t('firmware.reinstall_latest');
        color = 'success';
      }
    }
    return (
      <div>
        <CButton color={color} data-tip data-for={tooltipId} data-event="click">
          {icon}
        </CButton>
        <ReactTooltip
          id={tooltipId}
          place="top"
          effect="solid"
          globalEventOff="click"
          clickable
          className={[styles.firmwareTooltip, 'tooltipLeft'].join(' ')}
          border
          borderColor="#321fdb"
          arrowColor="white"
          overridePosition={({ left, top }) => {
            const element = document.getElementById(tooltipId);
            const tooltipWidth = element ? element.offsetWidth : 0;
            const newLeft = left + tooltipWidth * 0.25;
            return { top, left: newLeft };
          }}
        >
          <CCardHeader color="primary" className={styles.tooltipHeader}>
            {text}
            <CButtonClose
              style={{ color: 'white' }}
              onClick={(e) => {
                e.target.parentNode.parentNode.classList.remove('show');
                hideTooltips();
              }}
            />
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <LoadingButton
                  variant="outline"
                  label={upgradeText}
                  isLoadingLabel={t('firmware.upgrading')}
                  isLoading={upgradeStatus.loading}
                  action={() => upgradeToLatest(device)}
                  block
                  disabled={upgradeStatus.loading}
                />
              </CCol>
              <CCol>
                <CButton
                  block
                  variant="outline"
                  color="primary"
                  onClick={() => {
                    toggleFirmwareModal(device);
                  }}
                >
                  {t('firmware.choose_custom')}
                </CButton>
              </CCol>
              <CCol>
                <CButton
                  block
                  variant="outline"
                  color="primary"
                  onClick={() => {
                    toggleHistoryModal(device);
                  }}
                >
                  {t('firmware.history_title')}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </ReactTooltip>
      </div>
    );
  };

  const deleteButton = (serialNumber) => {
    const tooltipId = createUuid();

    return (
      <CPopover content={t('common.delete_device')}>
        <div>
          <CButton
            color="primary"
            variant="outline"
            shape="square"
            size="sm"
            className="mx-1"
            data-tip
            data-for={tooltipId}
            data-event="click"
            style={{ width: '33px', height: '30px' }}
          >
            <CIcon name="cil-trash" content={cilTrash} size="sm" />
          </CButton>
          <ReactTooltip
            id={tooltipId}
            place="top"
            effect="solid"
            globalEventOff="click"
            clickable
            className={[styles.deleteTooltip, 'tooltipRight'].join(' ')}
            border
            borderColor="#321fdb"
            arrowColor="white"
            overridePosition={({ left, top }) => {
              const element = document.getElementById(tooltipId);
              const tooltipWidth = element ? element.offsetWidth : 0;
              const newLeft = left - tooltipWidth * 0.25;
              return { top, left: newLeft };
            }}
          >
            <CCardHeader color="primary" className={styles.tooltipHeader}>
              {t('common.device_delete', { serialNumber })}
              <CButtonClose
                style={{ color: 'white' }}
                onClick={(e) => {
                  e.target.parentNode.parentNode.classList.remove('show');
                  hideTooltips();
                }}
              />
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <LoadingButton
                    data-toggle="dropdown"
                    variant="outline"
                    color="danger"
                    label={t('common.confirm')}
                    isLoadingLabel={t('user.deleting')}
                    isLoading={deleteStatus.loading}
                    action={() => deleteDevice(serialNumber)}
                    block
                    disabled={deleteStatus.loading}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </ReactTooltip>
        </div>
      </CPopover>
    );
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol />
            <CCol xs={1}>
              <CSelect
                custom
                defaultValue={devicesPerPage}
                onChange={(e) => updateDevicesPerPage(e.target.value)}
                disabled={loading}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </CSelect>
            </CCol>
          </CRow>
        </CCardHeader>
        <CCardBody className="p-0">
          <CDataTable
            addTableClasses="ignore-overflow"
            items={devices ?? []}
            fields={columns}
            hover
            border
            loading={loading}
            scopedSlots={{
              deviceType: (item) => (
                <td className="pt-3 text-center">
                  <DeviceBadge t={t} device={item} deviceIcons={deviceIcons} />
                </td>
              ),
              serialNumber: (item) => (
                <td className="text-center align-middle">
                  <CLink
                    className="c-subheader-nav-link"
                    aria-current="page"
                    to={() => `/devices/${item.serialNumber}`}
                  >
                    {item.serialNumber}
                  </CLink>
                </td>
              ),
              firmware: (item) => (
                <td className="align-middle">
                  <CPopover
                    content={item.firmware ? item.firmware : t('common.na')}
                    placement="top"
                  >
                    <div style={{ width: 'calc(22vw)' }} className="text-truncate align-middle">
                      {getShortRevision(item.firmware)}
                    </div>
                  </CPopover>
                </td>
              ),
              firmware_button: (item) => (
                <td className="text-center align-middle">
                  {item.firmwareInfo
                    ? getFirmwareButton(item.firmwareInfo.latest, item)
                    : getFirmwareButton(undefined, item)}
                </td>
              ),
              compatible: (item) => (
                <td className="align-middle">
                  <CPopover
                    content={item.compatible ? item.compatible : t('common.na')}
                    placement="top"
                  >
                    <div style={{ width: 'calc(8vw)' }} className="text-truncate align-middle">
                      {item.compatible}
                    </div>
                  </CPopover>
                </td>
              ),
              txBytes: (item) => <td className="align-middle">{cleanBytesString(item.txBytes)}</td>,
              rxBytes: (item) => <td className="align-middle">{cleanBytesString(item.rxBytes)}</td>,
              ipAddress: (item) => (
                <td className="align-middle">
                  <CPopover
                    content={item.ipAddress ? item.ipAddress : t('common.na')}
                    placement="top"
                  >
                    <div style={{ width: 'calc(7vw)' }} className="text-truncate align-middle">
                      {item.ipAddress}
                    </div>
                  </CPopover>
                </td>
              ),
              actions: (item) => (
                <td className="text-center align-middle">
                  <CButtonToolbar
                    role="group"
                    className="justify-content-center"
                    style={{ width: '230px' }}
                  >
                    <CPopover content={t('wifi_analysis.title')}>
                      <CLink
                        className="c-subheader-nav-link"
                        aria-current="page"
                        to={() => `/devices/${item.serialNumber}/wifianalysis`}
                      >
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="mx-1"
                          style={{ width: '33px', height: '30px' }}
                        >
                          <CIcon name="cil-wifi-signal-2" content={cilWifiSignal2} size="sm" />
                        </CButton>
                      </CLink>
                    </CPopover>
                    <CPopover content={t('actions.connect')}>
                      <CButton
                        className="mx-1"
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => connectRtty(item.serialNumber)}
                        style={{ width: '33px', height: '30px' }}
                      >
                        <CIcon name="cil-terminal" content={cilTerminal} size="sm" />
                      </CButton>
                    </CPopover>
                    {deleteButton(item.serialNumber)}
                    <CPopover content={t('configuration.details')}>
                      <CLink
                        className="c-subheader-nav-link"
                        aria-current="page"
                        to={() => `/devices/${item.serialNumber}`}
                      >
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          className="mx-1"
                          style={{ width: '33px', height: '30px' }}
                        >
                          <CIcon name="cil-notes" content={cilNotes} size="sm" />
                        </CButton>
                      </CLink>
                    </CPopover>
                    <CPopover content={t('common.refresh_device')}>
                      <CButton
                        onClick={() => refreshDevice(item.serialNumber)}
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        className="mx-1"
                        style={{ width: '33px', height: '30px' }}
                      >
                        <CIcon name="cil-sync" content={cilSync} size="sm" />
                      </CButton>
                    </CPopover>
                  </CButtonToolbar>
                </td>
              ),
            }}
          />
          <div className="pl-3">
            <ReactPaginate
              previousLabel="← Previous"
              nextLabel="Next →"
              pageCount={pageCount}
              onPageChange={updatePage}
              forcePage={Number(currentPage)}
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
    </>
  );
};

DeviceListTable.propTypes = {
  currentPage: PropTypes.string,
  devices: PropTypes.instanceOf(Array).isRequired,
  updateDevicesPerPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
  devicesPerPage: PropTypes.string.isRequired,
  refreshDevice: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleFirmwareModal: PropTypes.func.isRequired,
  toggleHistoryModal: PropTypes.func.isRequired,
  upgradeToLatest: PropTypes.func.isRequired,
  upgradeStatus: PropTypes.instanceOf(Object).isRequired,
  deviceIcons: PropTypes.instanceOf(Object).isRequired,
  connectRtty: PropTypes.func.isRequired,
  deleteDevice: PropTypes.func.isRequired,
  deleteStatus: PropTypes.instanceOf(Object).isRequired,
};

DeviceListTable.defaultProps = {
  currentPage: '0',
};

export default React.memo(DeviceListTable);
