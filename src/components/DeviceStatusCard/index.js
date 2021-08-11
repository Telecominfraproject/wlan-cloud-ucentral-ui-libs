import React from 'react';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilSync } from '@coreui/icons';
import { prettyDate, compactSecondsToDetailed } from '../../utils/formatting';
import MemoryBar from './MemoryBar';

import styles from './index.module.scss';

const DeviceStatusCard = ({
  t,
  loading,
  error,
  deviceSerialNumber,
  getData,
  status,
  lastStats,
}) => {
  const transformLoad = (load) => {
    if (load === undefined) return t('common.na');
    return `${((load / 65536) * 100).toFixed(2)}%`;
  };

  if (!error) {
    return (
      <CCard>
        <CCardHeader>
          <CRow>
            <CCol>
              <div className="text-value-lg">
                {t('status.title', { serialNumber: deviceSerialNumber })}
              </div>
            </CCol>
            <CCol>
              <div className="text-right">
                <CPopover content={t('common.refresh')}>
                  <CButton color="secondary" onClick={getData} size="sm">
                    <CIcon content={cilSync} />
                  </CButton>
                </CPopover>
              </div>
            </CCol>
          </CRow>
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
              <CRow className="my-2">
                <CCol md="5">{t('status.connection_status')} :</CCol>
                <CCol xs="10" md="7">
                  {status?.connected ? (
                    <CBadge color="success">{t('common.connected')}</CBadge>
                  ) : (
                    <CBadge color="danger">{t('common.not_connected')}</CBadge>
                  )}
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol md="5">{t('status.uptime')} :</CCol>
                <CCol xs="10" md="7">
                  {compactSecondsToDetailed(
                    lastStats?.unit?.uptime,
                    t('common.day'),
                    t('common.days'),
                    t('common.seconds'),
                  )}
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol md="5">{t('status.last_contact')} :</CCol>
                <CCol xs="10" md="7">
                  {prettyDate(status?.lastContact)}
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol md="5">{t('status.localtime')} :</CCol>
                <CCol xs="10" md="7">
                  {prettyDate(lastStats?.unit?.localtime)}
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol md="5">{t('status.load_averages')} :</CCol>
                <CCol xs="10" md="7">
                  {transformLoad(lastStats?.unit?.load[0])}
                  {' / '}
                  {transformLoad(lastStats?.unit?.load[1])}
                  {' / '}
                  {transformLoad(lastStats?.unit?.load[2])}
                </CCol>
              </CRow>
              <CRow className="my-2">
                <CCol md="5">{t('status.memory')} :</CCol>
                <CCol xs="9" md="6" style={{ paddingTop: '5px' }}>
                  <MemoryBar
                    t={t}
                    usedBytes={
                      lastStats?.unit?.memory?.total && lastStats?.unit?.memory?.free
                        ? lastStats?.unit?.memory?.total - lastStats?.unit?.memory?.free
                        : 0
                    }
                    totalBytes={lastStats?.unit?.memory?.total ?? 0}
                  />
                </CCol>
              </CRow>
            </div>
          )}
        </CCardBody>
      </CCard>
    );
  }

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <div className="text-value-lg">
              {t('status.title', { serialNumber: deviceSerialNumber })}
            </div>
          </CCol>
        </CRow>
      </CCardHeader>
      <CModalBody>
        <CAlert hidden={!error} color="danger" className={styles.centerContainer}>
          {t('status.error')}
        </CAlert>
      </CModalBody>
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
  lastStats: PropTypes.instanceOf(Object),
};

DeviceStatusCard.defaultProps = {
  status: null,
  lastStats: null,
};

export default React.memo(DeviceStatusCard);
