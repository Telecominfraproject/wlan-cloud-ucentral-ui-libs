import React from 'react';
import PropTypes from 'prop-types';
import { CButton, CDataTable, CPopover } from '@coreui/react';
import { v4 as createUuid } from 'uuid';

const WifiAnalysisTable = ({ t, data, loading }) => {
  const columns = [
    { key: 'radio', label: '#', _style: { width: '5%' } },
    { key: 'bssid', label: 'BSSID', _style: { width: '14%' } },
    { key: 'mode', label: t('wifi_analysis.mode'), _style: { width: '9%' }, sorter: false },
    { key: 'ssid', label: 'SSID', _style: { width: '17%' } },
    { key: 'rssi', label: 'RSSI', _style: { width: '5%' }, sorter: false },
    { key: 'rxRate', label: 'Rx Rate', _style: { width: '7%' }, sorter: false },
    { key: 'rxBytes', label: 'Rx', _style: { width: '7%' }, sorter: false },
    { key: 'rxMcs', label: 'Rx MCS', _style: { width: '6%' }, sorter: false },
    { key: 'rxNss', label: 'Rx NSS', _style: { width: '6%' }, sorter: false },
    { key: 'txRate', label: 'Tx Rate', _style: { width: '7%' }, sorter: false },
    { key: 'txBytes', label: 'Tx', _style: { width: '7%' }, sorter: false },
    { key: 'ips', label: 'IP', _style: { width: '6%' }, sorter: false },
  ];

  const centerIfEmpty = (value) => (
    <td className={!value || value === '' || value === '-' ? 'text-center' : ''}>{value}</td>
  );

  const displayIp = (v4, v6) => {
    const count = v4.length + v6.length;

    const content4 = v4.map((ip) => <li key={createUuid()}>{ip}</li>);
    const content6 = v6.map((ip) => <li key={createUuid()}>{ip}</li>);

    const content = (
      <div>
        IpV4
        <ul>{content4}</ul>
        IpV6
        <ul>{content6}</ul>
      </div>
    );

    return (
      <td className="text-center">
        {count > 0 ? (
          <CPopover
            placement="bottom"
            header="Ipv4 - Ipv6 Addresses"
            content={content}
            trigger="click"
            interactive
          >
            <CButton color="primary" size="sm">
              {count}
            </CButton>
          </CPopover>
        ) : (
          <p>{count}</p>
        )}
      </td>
    );
  };

  return (
    <CDataTable
      addTableClasses="ignore-overflow"
      fields={columns}
      items={data}
      hover
      border
      loading={loading}
      sorter
      sorterValue={{ column: 'radio', asc: true }}
      scopedSlots={{
        radio: (item) => <td className="text-center">{item.radio.radio}</td>,
        rxMcs: (item) => centerIfEmpty(item.rxMcs),
        rxNss: (item) => centerIfEmpty(item.rxNss),
        rssi: (item) => centerIfEmpty(item.rssi),
        ips: (item) => displayIp(item.ipV4, item.ipV6),
      }}
    />
  );
};

WifiAnalysisTable.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
};
export default WifiAnalysisTable;
