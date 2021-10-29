import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetIcon } from '@coreui/react';
import { CChartBar, CChartPie } from '@coreui/react-chartjs';
import { cilClock, cilMedicalCross, cilThumbUp, cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { prettyDate } from '../../utils/formatting';

const getColor = (health) => {
  const numberHealth = health ? Number(health.replace('%', '')) : 0;
  if (numberHealth >= 90) return 'success';
  if (numberHealth >= 60) return 'warning';
  return 'danger';
};

const getIcon = (health) => {
  const numberHealth = health ? Number(health.replace('%', '')) : 0;
  if (numberHealth >= 90) return <CIcon width={36} name="cil-thumbs-up" content={cilThumbUp} />;
  if (numberHealth >= 60) return <CIcon width={36} name="cil-warning" content={cilWarning} />;
  return <CIcon width={36} name="cil-medical-cross" content={cilMedicalCross} />;
};

const DeviceDashboard = ({ t, data }) => (
  <div>
    <CRow className="mt-3">
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
          text={t('common.overall_health')}
          header={<h2>{data.overallHealth}</h2>}
          color={getColor(data.overallHealth)}
          iconPadding={false}
        >
          {getIcon(data.overallHealth)}
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
          <CCardHeader className="dark-header">{t('common.device_status')}</CCardHeader>
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
          <CCardHeader className="dark-header">{t('common.device_health')}</CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={data.healths.datasets}
              labels={data.healths.labels}
              options={{
                tooltips: {
                  callbacks: {
                    title: (item, ds) => ds.labels[item[0].index],
                    label: (item, ds) =>
                      `${ds.datasets[0].data[item.index]}${t('common.of_connected')}`,
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
          <CCardHeader className="dark-header">
            {data.totalAssociations}{' '}
            {data.totalAssociations === 1
              ? t('wifi_analysis.association')
              : t('wifi_analysis.associations')}
          </CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={data.associations.datasets}
              labels={data.associations.labels}
              options={{
                tooltips: {
                  callbacks: {
                    title: (item, ds) => ds.labels[item[0].index],
                    label: (item, ds) =>
                      `${ds.datasets[0].data[item.index]}% of ${
                        data.totalAssociations
                      } associations`,
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
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="dark-header">{t('common.vendors')}</CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={data.vendors.datasets}
              labels={data.vendors.labels}
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
          <CCardHeader className="dark-header">{t('firmware.device_types')}</CCardHeader>
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
          <CCardHeader className="dark-header">{t('common.uptimes')}</CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={data.upTimes.datasets}
              labels={data.upTimes.labels}
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
          <CCardHeader className="dark-header">{t('common.certificates')}</CCardHeader>
          <CCardBody>
            <CChartPie
              datasets={data.certificates.datasets}
              labels={data.certificates.labels}
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
          <CCardHeader className="dark-header">{t('common.commands')}</CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={data.commands.datasets}
              labels={data.commands.labels}
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
          <CCardHeader className="dark-header">{t('common.memory_used')}</CCardHeader>
          <CCardBody>
            <CChartBar
              datasets={data.memoryUsed.datasets}
              labels={data.memoryUsed.labels}
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
  </div>
);

DeviceDashboard.propTypes = {
  t: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(DeviceDashboard);
