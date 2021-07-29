import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import {
  CBadge,
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
} from '@coreui/react';
import { cilSync, cilInfo, cilBadge, cilBan, cilNotes, cilSave } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import styles from './index.module.scss';
import { cleanBytesString } from '../../utils/formatting';
import LoadingButton from '../LoadingButton';

const DeviceListTable = ({
  devices,
  devicesPerPage,
  loading,
  updateDevicesPerPage,
  pageCount,
  updatePage,
  refreshDevice,
  t,
  toggleFirmwareModal,
  upgradeToLatest,
  upgradeStatus,
  meshIcon,
  apIcon,
  internetSwitch,
  iotIcon,
}) => {
  const columns = [
    { key: 'deviceType', label: '', filter: false, sorter: false, _style: { width: '3%' } },
    { key: 'verifiedCertificate', label: t('common.certificate'), _style: { width: '1%' } },
    { key: 'serialNumber', label: t('common.serial_number'), _style: { width: '6%' } },
    { key: 'UUID', label: t('common.config_id'), _style: { width: '6%' } },
    { key: 'firmware', label: t('firmware.revision'), filter: false, _style: { width: '28%' } },
    { key: 'firmware_button', label: '', filter: false, _style: { width: '4%' } },
    { key: 'compatible', label: t('firmware.device_type'), filter: false, _style: { width: '6%' } },
    { key: 'txBytes', label: 'Tx', filter: false, _style: { width: '11%' } },
    { key: 'rxBytes', label: 'Rx', filter: false, _style: { width: '11%' } },
    { key: 'ipAddress', label: t('common.ip_address'), _style: { width: '8%' } },
    { key: 'wifi_analysis', label: t(''), _style: { width: '4%' } },
    { key: 'show_details', label: t(''), _style: { width: '4%' } },
    { key: 'refresh_device', label: t(''), _style: { width: '4%' } },
  ];

  const getDeviceIcon = (deviceType) => {
    if (deviceType === 'AP_Default' || deviceType === 'AP') {
      return <img src={apIcon} className={styles.icon} alt="AP" />;
    }
    if (deviceType === 'MESH') {
      return <img src={meshIcon} className={styles.icon} alt="MESH" />;
    }
    if (deviceType === 'SWITCH') {
      return <img src={internetSwitch} className={styles.icon} alt="SWITCH" />;
    }
    if (deviceType === 'IOT') {
      return <img src={iotIcon} className={styles.icon} alt="SWITCH" />;
    }
    return null;
  };

  const getCertBadge = (cert) => {
    if (cert === 'NO_CERTIFICATE') {
      return (
        <div className={styles.certificateWrapper}>
          <CIcon className={styles.badge} name="cil-badge" content={cilBadge} size="2xl" alt="AP" />
          <CIcon
            className={styles.badCertificate}
            name="cil-ban"
            content={cilBan}
            size="3xl"
            alt="AP"
          />
        </div>
      );
    }

    let color = 'transparent';
    switch (cert) {
      case 'VALID_CERTIFICATE':
        color = 'danger';
        break;
      case 'MISMATCH_SERIAL':
        return (
          <CBadge color={color} className={styles.mismatchBackground}>
            <CIcon name="cil-badge" content={cilBadge} size="2xl" alt="AP" />
          </CBadge>
        );
      case 'VERIFIED':
        color = 'success';
        break;
      default:
        return (
          <div className={styles.certificateWrapper}>
            <CIcon
              className={styles.badge}
              name="cil-badge"
              content={cilBadge}
              size="2xl"
              alt="AP"
            />
            <CIcon
              className={styles.badCertificate}
              name="cil-ban"
              content={cilBan}
              size="3xl"
              alt="AP"
            />
          </div>
        );
    }
    return (
      <CBadge color={color}>
        <CIcon name="cil-badge" content={cilBadge} size="2xl" alt="AP" />
      </CBadge>
    );
  };

  const getStatusBadge = (status) => {
    if (status) {
      return 'success';
    }
    return 'danger';
  };

  const getFirmwareButton = (latest, device) => {
    let text = t('firmware.unknown_firmware_status');
    let upgradeText = t('firmware.upgrade_to_latest');
    let color = 'secondary';
    if (latest !== undefined) {
      text = t('firmware.newer_firmware_available');
      color = 'warning';

      if (latest) {
        text = t('firmware.latest_version_installed');
        upgradeText = t('firmware.reinstall_latest');
        color = 'success';
      }
    }
    return (
      <CDropdown>
        <CDropdownToggle caret={false} color={color}>
          <CIcon size="sm" content={cilSave} />
        </CDropdownToggle>
        <CDropdownMenu style={{ width: '250px' }} className="mt-2 mb-2 mx-5" placement="bottom">
          <CRow className="pl-3">
            <CCol>{text}</CCol>
          </CRow>
          <CDropdownDivider />
          <CRow className="pl-3 mt-1">
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
        </CDropdownMenu>
      </CDropdown>
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
        <CCardBody>
          <CDataTable
            addTableClasses="ignore-overflow"
            items={devices ?? []}
            fields={columns}
            hover
            border
            loading={loading}
            scopedSlots={{
              serialNumber: (item) => (
                <td className="text-center">
                  <CLink
                    className="c-subheader-nav-link"
                    aria-current="page"
                    to={() => `/devices/${item.serialNumber}`}
                  >
                    {item.serialNumber}
                  </CLink>
                </td>
              ),
              deviceType: (item) => (
                <td className="pt-3 text-center">
                  <CPopover
                    content={item.connected ? t('common.connected') : t('common.not_connected')}
                    placement="top"
                  >
                    <CBadge size="sm" color={getStatusBadge(item.connected)}>
                      {getDeviceIcon(item.deviceType) ?? item.deviceType}
                    </CBadge>
                  </CPopover>
                </td>
              ),
              verifiedCertificate: (item) => (
                <td className="text-center">
                  <CPopover
                    content={item.verifiedCertificate ?? t('common.unknown')}
                    placement="top"
                  >
                    {getCertBadge(item.verifiedCertificate)}
                  </CPopover>
                </td>
              ),
              firmware: (item) => (
                <td>
                  <CPopover
                    content={item.firmware ? item.firmware : t('common.na')}
                    placement="top"
                  >
                    <p style={{ width: 'calc(20vw)' }} className="text-truncate">
                      {item.firmware}
                    </p>
                  </CPopover>
                </td>
              ),
              firmware_button: (item) => (
                <td className="text-center">
                  {item.firmwareInfo
                    ? getFirmwareButton(item.firmwareInfo.latest, item)
                    : getFirmwareButton(undefined, item)}
                </td>
              ),
              compatible: (item) => (
                <td>
                  <CPopover
                    content={item.compatible ? item.compatible : t('common.na')}
                    placement="top"
                  >
                    <p style={{ width: 'calc(6vw)' }} className="text-truncate">
                      {item.compatible}
                    </p>
                  </CPopover>
                </td>
              ),
              txBytes: (item) => <td>{cleanBytesString(item.txBytes)}</td>,
              rxBytes: (item) => <td>{cleanBytesString(item.rxBytes)}</td>,
              ipAddress: (item) => (
                <td>
                  <CPopover
                    content={item.ipAddress ? item.ipAddress : t('common.na')}
                    placement="top"
                  >
                    <p style={{ width: 'calc(8vw)' }} className="text-truncate">
                      {item.ipAddress}
                    </p>
                  </CPopover>
                </td>
              ),
              wifi_analysis: (item) => (
                <td className="text-center">
                  <CPopover content={t('configuration.details')}>
                    <CLink
                      className="c-subheader-nav-link"
                      aria-current="page"
                      to={() => `/devices/${item.serialNumber}`}
                    >
                      <CButton color="primary" variant="outline" shape="square" size="sm">
                        <CIcon name="cil-info" content={cilInfo} size="sm" />
                      </CButton>
                    </CLink>
                  </CPopover>
                </td>
              ),
              show_details: (item) => (
                <td className="text-center">
                  <CPopover content={t('wifi_analysis.title')}>
                    <CLink
                      className="c-subheader-nav-link"
                      aria-current="page"
                      to={() => `/devices/${item.serialNumber}/wifianalysis`}
                    >
                      <CButton color="primary" variant="outline" shape="square" size="sm">
                        <CIcon name="cil-notes" content={cilNotes} size="sm" />
                      </CButton>
                    </CLink>
                  </CPopover>
                </td>
              ),
              refresh_device: (item) => (
                <td className="text-center">
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
                </td>
              ),
            }}
          />
          <ReactPaginate
            previousLabel="← Previous"
            nextLabel="Next →"
            pageCount={pageCount}
            onPageChange={updatePage}
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
  devices: PropTypes.instanceOf(Array).isRequired,
  updateDevicesPerPage: PropTypes.func.isRequired,
  pageCount: PropTypes.number.isRequired,
  updatePage: PropTypes.func.isRequired,
  devicesPerPage: PropTypes.string.isRequired,
  refreshDevice: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  toggleFirmwareModal: PropTypes.func.isRequired,
  upgradeToLatest: PropTypes.func.isRequired,
  upgradeStatus: PropTypes.instanceOf(Object).isRequired,
  meshIcon: PropTypes.string.isRequired,
  apIcon: PropTypes.string.isRequired,
  internetSwitch: PropTypes.string.isRequired,
  iotIcon: PropTypes.string.isRequired,
};

export default React.memo(DeviceListTable);
