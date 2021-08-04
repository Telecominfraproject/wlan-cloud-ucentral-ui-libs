import React from 'react';
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
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownDivider,
  CDropdownItem,
  CButtonGroup,
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
import { cleanBytesString } from '../../utils/formatting';
import DeviceBadge from '../DeviceBadge';
import LoadingButton from '../LoadingButton';

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

  const getFirmwareButton = (latest, device) => {
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
      <CDropdown>
        <CDropdownToggle caret={false} color={color}>
          {icon}
        </CDropdownToggle>
        <CDropdownMenu style={{ width: '250px' }} className="mt-2 mb-2 mx-5" placement="bottom">
          <CRow color="secondary" className="pl-3">
            <CCol>{text}</CCol>
          </CRow>
          <CDropdownDivider />
          <CRow className="pl-3 mt-3">
            <CCol>
              <LoadingButton
                label={upgradeText}
                isLoadingLabel={t('firmware.upgrading')}
                isLoading={upgradeStatus.loading}
                action={() => upgradeToLatest(device)}
                block={false}
                disabled={upgradeStatus.loading}
              />
            </CCol>
          </CRow>
          <CRow className="pl-3 mt-3">
            <CCol>
              <CButton
                color="primary"
                onClick={() => {
                  toggleFirmwareModal(device);
                }}
              >
                {t('firmware.choose_custom')}
              </CButton>
            </CCol>
          </CRow>
          <CRow className="pl-3 mt-3">
            <CCol>
              <CButton
                color="primary"
                onClick={() => {
                  toggleHistoryModal(device);
                }}
              >
                {t('firmware.history_title')}
              </CButton>
            </CCol>
          </CRow>
        </CDropdownMenu>
      </CDropdown>
    );
  };

  const deleteButton = (serialNumber) => (
    <CPopover content={t('common.delete_device')}>
      <CDropdown>
        <CDropdownToggle className="btn-outline-primary btn-sm btn-square" caret={false}>
          <CIcon name="cil-trash" content={cilTrash} size="sm" />
        </CDropdownToggle>
        <CDropdownMenu
          style={{ width: '250px' }}
          className="mt-2 mb-2 mx-5"
          placement="bottom-start"
        >
          <CRow className="pl-3">
            <CCol>{t('common.device_delete', { serialNumber })}</CCol>
          </CRow>
          <CDropdownDivider />
          <CDropdownItem>
            <LoadingButton
              data-toggle="dropdown"
              color="danger"
              label={t('common.confirm')}
              isLoadingLabel={t('user.deleting')}
              isLoading={deleteStatus.loading}
              action={() => deleteDevice(serialNumber)}
              block
              disabled={deleteStatus.loading}
            />
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </CPopover>
  );

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
        <CCardBody>
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
                      {item.firmware}
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
                  <CButtonGroup role="group">
                    <CPopover content={t('wifi_analysis.title')}>
                      <CLink
                        className="c-subheader-nav-link"
                        aria-current="page"
                        to={() => `/devices/${item.serialNumber}/wifianalysis`}
                      >
                        <CButton color="primary" variant="outline" shape="square" size="sm">
                          <CIcon name="cil-wifi-signal-2" content={cilWifiSignal2} size="sm" />
                        </CButton>
                      </CLink>
                    </CPopover>
                    <CPopover content={t('actions.connect')}>
                      <CButton
                        color="primary"
                        variant="outline"
                        shape="square"
                        size="sm"
                        onClick={() => connectRtty(item.serialNumber)}
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
                        <CButton color="primary" variant="outline" shape="square" size="sm">
                          <CIcon name="cil-notes" content={cilNotes} size="sm" />
                        </CButton>
                      </CLink>
                    </CPopover>
                    <CPopover content={t('common.refresh_device')}>
                      <CButton
                        onClick={() => refreshDevice(item.serialNumber)}
                        color="primary"
                        variant="outline"
                        size="sm"
                      >
                        <CIcon name="cil-sync" content={cilSync} size="sm" />
                      </CButton>
                    </CPopover>
                  </CButtonGroup>
                </td>
              ),
            }}
          />
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
