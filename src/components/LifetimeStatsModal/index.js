import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as createUuid } from 'uuid';
import {
  CAlert,
  CCol,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNav,
  CNavLink,
  CRow,
  CSpinner,
  CTabContent,
  CTabPane,
  CPopover,
  CButton,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { cleanBytesString } from 'utils/formatting';

const LifetimeStatsModal = ({ t, loading, show, toggle, data }) => {
  const [key, setKey] = useState(0);

  if (loading) {
    return (
      <CModal size="lg" show={show} onClose={toggle}>
        <CModalHeader className="p-1">{t('statistics.lifetime_stats')}</CModalHeader>
        <CModalBody className="text-center align-middle">
          <CSpinner color="primary" size="lg" />
        </CModalBody>
      </CModal>
    );
  }

  if (data.interfaces && data.interfaces.length === 0) {
    return (
      <CModal size="lg" show={show} onClose={toggle}>
        <CModalHeader className="p-1">{t('statistics.lifetime_stats')}</CModalHeader>
        <CModalBody>
          <CAlert color="danger" className="text-center">
            {t('statistics.no_interfaces')}
          </CAlert>
        </CModalBody>
      </CModal>
    );
  }

  return (
    <CModal size="lg" show={show} onClose={toggle}>
      <CModalHeader className="p-1">
        <CModalTitle className="pl-1 pt-1">{t('statistics.lifetime_stats')}</CModalTitle>
        <div className="text-right">
          <CPopover content={t('common.close')}>
            <CButton color="primary" variant="outline" className="ml-2" onClick={toggle}>
              <CIcon content={cilX} />
            </CButton>
          </CPopover>
        </div>
      </CModalHeader>
      <CModalBody>
        <CNav variant="tabs">
          {data.interfaces?.map((inter, index) => (
            <CNavLink
              key={createUuid()}
              href="#"
              active={key === index}
              onClick={() => setKey(index)}
            >
              {inter.name}
            </CNavLink>
          ))}
        </CNav>
        <CTabContent className="py-2">
          {data.interfaces?.map((inter, index) => (
            <CTabPane key={createUuid()} active={key === index}>
              <CRow className="py-1">
                <CCol sm="3">Collisions</CCol>
                <CCol sm="3">{inter.counters.collisions}</CCol>
                <CCol sm="3">Multicast</CCol>
                <CCol sm="3">{inter.counters.multicast}</CCol>
              </CRow>
              <CRow className="py-1">
                <CCol sm="3">Rx Bytes</CCol>
                <CCol sm="3">{cleanBytesString(inter.counters.rx_bytes)}</CCol>
                <CCol sm="3">Rx Dropped</CCol>
                <CCol sm="3">{inter.counters.rx_dropped}</CCol>
              </CRow>
              <CRow className="py-1">
                <CCol sm="3">Rx Errors</CCol>
                <CCol sm="3">{inter.counters.rx_errors}</CCol>
                <CCol sm="3">Rx Packets</CCol>
                <CCol sm="3">{inter.counters.rx_packets}</CCol>
              </CRow>
              <CRow className="py-1">
                <CCol sm="3">Tx Bytes</CCol>
                <CCol sm="3">{cleanBytesString(inter.counters.tx_bytes)}</CCol>
                <CCol sm="3">Tx Dropped</CCol>
                <CCol sm="3">{inter.counters.tx_dropped}</CCol>
              </CRow>
              <CRow className="py-1">
                <CCol sm="3">Tx Errors</CCol>
                <CCol sm="3">{inter.counters.tx_errors}</CCol>
                <CCol sm="3">Tx Packets</CCol>
                <CCol sm="3">{inter.counters.tx_packets}</CCol>
              </CRow>
            </CTabPane>
          ))}
        </CTabContent>
      </CModalBody>
    </CModal>
  );
};

LifetimeStatsModal.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(LifetimeStatsModal);
