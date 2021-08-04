import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCol, CDataTable, CRow, CWidgetIcon } from '@coreui/react';
import { CChartBar, CChartPie } from '@coreui/react-chartjs';
import { cilClock, cilHappy, cilMeh, cilFrown } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { prettyDate } from '../../utils/formatting';

const getLatestColor = (percent = 0) => {
  const numberPercent = percent ? Number(percent.replace('%', '')) : 0;
  if (numberPercent >= 90) return 'success';
  if (numberPercent > 60) return 'warning';
  return 'danger';
};

const getLatestIcon = (percent = 0) => {
  const numberPercent = percent ? Number(percent.replace('%', '')) : 0;
  if (numberPercent >= 90) return <CIcon width={36} name="cil-happy" content={cilHappy} />;
  if (numberPercent > 60) return <CIcon width={36} name="cil-meh" content={cilMeh} />;
  return <CIcon width={36} name="cil-frown" content={cilFrown} />;
};

const FirmwareDashboard = ({ t, data }) => {
  const columns = [
    { key: 'endpoint', label: t('common.endpoint'), filter: false, sorter: false },
    { key: 'devices', label: t('common.devices') },
    { key: 'percent', label: '' },
  ];

  return (
    <div>
      <CRow>
        <CCol>
          <CWidgetIcon
            text={t('common.last_dashboard_refresh')}
            header={<h2>{data.snapshot ? prettyDate(data.snapshot) : ''}</h2>}
            color="info"
            iconPadding={false}
          >
            <CIcon width={36} name="cil-clock" content={cilClock} />
          </CWidgetIcon>
        </CCol>
        <CCol>
          <CWidgetIcon
            text={t('common.up_to_date')}
            header={<h2>{data.latestSoftwareRate}</h2>}
            color={getLatestColor(data.latestSoftwareRate)}
            iconPadding={false}
          >
            {getLatestIcon(data.latestSoftwareRate)}
          </CWidgetIcon>
        </CCol>
        <CCol>
          <CWidgetIcon
            text={t('common.devices')}
            header={<h2>{data.numberOfDevices}</h2>}
            color="primary"
            iconPadding={false}
          >
            <CIcon width={36} name="cil-router" />
          </CWidgetIcon>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>{t('common.firmware_installed')}</CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={data.firmwareDistribution.datasets}
                labels={data.firmwareDistribution.labels}
                options={{
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>{t('common.devices_using_latest')}</CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={data.latest.datasets}
                labels={data.latest.labels}
                options={{
                  tooltips: {
                    mode: 'index',
                    intersect: false,
                  },
                  hover: {
                    mode: 'index',
                    intersect: false,
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>Unknown Firmware</CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={data.unknownFirmwares.datasets}
                labels={data.unknownFirmwares.labels}
                options={{
                  tooltips: {
                    mode: 'index',
                    intersect: false,
                  },
                  hover: {
                    mode: 'index',
                    intersect: false,
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>{t('common.device_status')}</CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={data.status.datasets}
                labels={data.status.labels}
                options={{
                  tooltips: {
                    callbacks: {
                      title: (item, ds) => ds.labels[item[0].index],
                      label: (item, ds) => `${ds.datasets[0].data[item.index]}%`,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>{t('firmware.device_types')}</CCardHeader>
            <CCardBody>
              <CChartPie
                datasets={data.deviceType.datasets}
                labels={data.deviceType.labels}
                options={{
                  tooltips: {
                    callbacks: {
                      title: (item, ds) => ds.labels[item[0].index],
                      label: (item, ds) =>
                        `${ds.datasets[0].data[item.index]} ${t('common.devices')}`,
                    },
                  },
                  legend: {
                    display: true,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol>
          <CCard>
            <CCardHeader>OUIs</CCardHeader>
            <CCardBody>
              <CChartBar
                datasets={data.ouis.datasets}
                labels={data.ouis.labels}
                options={{
                  tooltips: {
                    mode: 'index',
                    intersect: false,
                  },
                  hover: {
                    mode: 'index',
                    intersect: false,
                  },
                  legend: {
                    display: false,
                    position: 'right',
                  },
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>{t('common.endpoints')}</CCardHeader>
            <CCardBody>
              <CDataTable items={data.endpoints ?? []} fields={columns} hover border />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol />
        <CCol />
      </CRow>
    </div>
  );
};

FirmwareDashboard.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(FirmwareDashboard);
