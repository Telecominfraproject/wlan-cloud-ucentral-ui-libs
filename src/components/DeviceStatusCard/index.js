import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CCardBody,
  CBadge,
  CModalBody,
  CAlert,
  CPopover,
  CButton,
  CSpinner,
  CLabel,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSync, cilWindowMaximize, cilX } from '@coreui/icons';
import { prettyDate, compactSecondsToDetailed } from '../../utils/formatting';
import MemoryBar from './MemoryBar';
import CopyToClipboardButton from '../CopyToClipboardButton';
import HideTextButton from '../HideTextButton';

import styles from './index.module.scss';

const errorField = (t) => (
  <CAlert className="py-0" color="danger">
    {t('status.error')}
  </CAlert>
);

const DeviceStatusCard = ({
  t,
  loading,
  error,
  deviceSerialNumber,
  getData,
  status,
  deviceConfig,
  lastStats,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const toggleShowJson = () => setShowJson(!showJson);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getPassword = () => {
    const password =
      deviceConfig?.devicePassword === '' ? 'openwifi' : deviceConfig?.devicePassword;
    return showPassword ? password : '******';
  };

  return (
    <CCard>
      <CCardHeader>
        <div className="d-flex flex-row-reverse align-items-center">
          <div className="text-right">
            <CPopover content={t('common.refresh')}>
              <CButton color="primary" variant="outline" onClick={getData}>
                <CIcon content={cilSync} />
              </CButton>
            </CPopover>
          </div>
          <div className="pr-2">
            <CPopover content={t('configuration.view_json')}>
              <CButton color="primary" variant="outline" onClick={toggleShowJson}>
                <CIcon content={cilWindowMaximize} />
              </CButton>
            </CPopover>
          </div>
          <div className="text-value-lg mr-auto">
            {deviceSerialNumber}, {deviceConfig?.compatible}
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        {(!lastStats || !status) && loading ? (
          <div className={styles.centerContainer}>
            <CSpinner className={styles.spinner} />
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            <div className={styles.overlayContainer} hidden={!loading}>
              <CSpinner className={styles.spinner} />
            </div>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.connection_status')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {status?.connected ? (
                  <CBadge color="success">{t('common.connected')}</CBadge>
                ) : (
                  <CBadge color="danger">{t('common.not_connected')}</CBadge>
                )}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel>{t('common.serial_number')}: </CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                {deviceConfig?.serialNumber}
                <CopyToClipboardButton t={t} size="sm" content={deviceConfig?.serialNumber} />
              </CCol>
              <CCol md="2" xl="2" xxl="1">
                <CLabel>{t('configuration.location')}:</CLabel>
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {deviceConfig?.location}
              </CCol>
            </CRow>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.uptime')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {error
                  ? errorField(t)
                  : compactSecondsToDetailed(
                      lastStats?.unit?.uptime,
                      t('common.day'),
                      t('common.days'),
                      t('common.seconds'),
                    )}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel>{t('configuration.type')}: </CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                {deviceConfig?.deviceType}
              </CCol>
              <CCol md="2" xl="2" xxl="1">
                <CLabel>{t('configuration.owner')}:</CLabel>
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {deviceConfig?.owner}
              </CCol>
            </CRow>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.last_contact')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {error ? errorField(t) : prettyDate(status?.lastContact)}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel className="align-middle">{t('configuration.device_password')}: </CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                {getPassword()}
                <HideTextButton t={t} toggle={toggleShowPassword} show={showPassword} />
                <CopyToClipboardButton
                  t={t}
                  size="sm"
                  content={
                    deviceConfig?.devicePassword === '' ? 'openwifi' : deviceConfig?.devicePassword
                  }
                />
              </CCol>
              <CCol md="2" xl="2" xxl="1">
                <CLabel>
                  {deviceConfig?.venue?.substring(0, 3) === 'ent'
                    ? t('entity.entity')
                    : t('inventory.venue')}
                  :
                </CLabel>
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {deviceConfig?.venue?.split(':')[1]}
              </CCol>
            </CRow>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.localtime')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {error ? errorField(t) : prettyDate(lastStats?.unit?.localtime)}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel>{t('firmware.revision')}: </CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                <CPopover content={deviceConfig?.firmware}>
                  <CLabel>
                    {deviceConfig?.firmware?.split(' / ').length > 1
                      ? deviceConfig.firmware.split(' / ')[1]
                      : deviceConfig?.firmware}
                  </CLabel>
                </CPopover>
              </CCol>
              <CCol md="2" xl="2" xxl="1">
                <CLabel>{t('configuration.last_configuration_change')}: </CLabel>
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {prettyDate(deviceConfig?.lastConfigurationChange)}
              </CCol>
            </CRow>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.load_averages')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {error ? (
                  errorField(t)
                ) : (
                  <div>
                    {lastStats?.unit?.load[0] ? (lastStats?.unit?.load[0] * 100).toFixed(2) : '-'}%
                    {' / '}
                    {lastStats?.unit?.load[1] ? (lastStats?.unit?.load[1] * 100).toFixed(2) : '-'}%
                    {' / '}
                    {lastStats?.unit?.load[2] ? (lastStats?.unit?.load[2] * 100).toFixed(2) : '-'}%
                  </div>
                )}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel>{t('common.mac')}:</CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                {deviceConfig?.macAddress}
              </CCol>
              <CCol md="2" xl="2" xxl="1">
                <CLabel>{t('configuration.created')}: </CLabel>
              </CCol>
              <CCol md="2" xl="2" xxl="3">
                {prettyDate(deviceConfig?.createdTimestamp)}
              </CCol>
            </CRow>
            <CRow>
              <CCol md="2" xl="2" xxl="1">
                {t('status.memory')}:
              </CCol>
              <CCol md="2" xl="2" xxl="3" style={{ paddingTop: '5px' }}>
                {error ? (
                  errorField(t)
                ) : (
                  <MemoryBar
                    t={t}
                    usedBytes={
                      lastStats?.unit?.memory?.total && lastStats?.unit?.memory?.free
                        ? lastStats?.unit?.memory?.total - lastStats?.unit?.memory?.free
                        : 0
                    }
                    totalBytes={lastStats?.unit?.memory?.total ?? 0}
                  />
                )}
              </CCol>
              <CCol className="border-left" md="2" xl="2" xxl="1">
                <CLabel>{t('common.manufacturer')}:</CLabel>
              </CCol>
              <CCol className="border-right" md="2" xl="2" xxl="3">
                {deviceConfig?.manufacturer}
              </CCol>
            </CRow>
          </div>
        )}
      </CCardBody>
      <CModal size="lg" show={showJson} onClose={toggleShowJson}>
        <CModalHeader className="align-middle">
          <CModalTitle className="pl-1 pt-1">{t('configuration.title')}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.close')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={toggleShowJson}>
                <CIcon content={cilX} />
              </CButton>
            </CPopover>
          </div>
        </CModalHeader>
        <CModalBody>
          <pre className="ignore">{JSON.stringify(deviceConfig, null, 4)}</pre>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={toggleShowJson}>
            {t('common.close')}
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
};

DeviceStatusCard.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  deviceSerialNumber: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
  status: PropTypes.instanceOf(Object),
  deviceConfig: PropTypes.instanceOf(Object),
  lastStats: PropTypes.instanceOf(Object),
};

DeviceStatusCard.defaultProps = {
  status: null,
  lastStats: null,
  deviceConfig: null,
};

export default React.memo(DeviceStatusCard);
