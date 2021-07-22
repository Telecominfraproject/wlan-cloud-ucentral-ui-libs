import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow } from '@coreui/react';

const WifiAnalysisTable = ({ t, data, loading, range, updateSelectedStats }) => {
  const columns = [
    { key: 'radio', label: 'R', _style: { width: '2%' } },
    { key: 'channel', label: 'Ch', _style: { width: '3%' } },
    { key: 'channelWidth', label: 'ChW', _style: { width: '2%' } },
    { key: 'mode', label: t('wifi_analysis.mode'), _style: { width: '5%' } },
    { key: 'txPower', label: 'TX Power', _style: { width: '3%' } },
    { key: 'ssid', label: 'SSID', _style: { width: '10%' } },
    { key: 'rssi', label: 'RSSI', _style: { width: '5%' } },
    { key: 'rxRate', label: 'RxBitrate', _style: { width: '7%' } },
    { key: 'rxBytes', label: 'RxBytes', _style: { width: '7%' } },
    { key: 'rxMcs', label: 'Rx MCS', _style: { width: '4%' } },
    { key: 'rxNss', label: 'Rx NSS', _style: { width: '4%' } },
    { key: 'txRate', label: 'TxRate', _style: { width: '7%' } },
    { key: 'txBytes', label: 'TxBytes', _style: { width: '7%' } },
    { key: 'ipV4', label: 'IpV4', _style: { width: '17%' } },
    { key: 'ipV6', label: 'IpV6', _style: { width: '17%' } },
  ];

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol className="text-center">
            <input
              type="range"
              style={{ width: '80%' }}
              className="form-range"
              min="0"
              max={range}
              step="1"
              onChange={(e) => updateSelectedStats(e.target.value)}
              defaultValue={range}
            />
            <h5>
              {t('common.timestamp')}: {data[0]?.timeStamp}
            </h5>
          </CCol>
        </CRow>
      </CCardHeader>
      <CCardBody>
        <CDataTable fields={columns} items={data} hover border loading={loading} />
      </CCardBody>
    </CCard>
  );
};

WifiAnalysisTable.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  range: PropTypes.number.isRequired,
  updateSelectedStats: PropTypes.func.isRequired,
};
export default WifiAnalysisTable;
