import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';
import { CChartBar, CChartPie } from '@coreui/react-chartjs';

const DeviceDashboard = ({ t, data }) => (
  <div>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.device_status')}</CCardHeader>
          <CCardBody>
            <CChartPie datasets={data.status.datasets} labels={data.status.labels} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.device_health')}</CCardHeader>
          <CCardBody>
            <CChartPie datasets={data.healths.datasets} labels={data.healths.labels} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.uptimes')}</CCardHeader>
          <CCardBody>
            <CChartBar datasets={data.upTimes.datasets} labels={data.upTimes.labels} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.vendors')}</CCardHeader>
          <CCardBody>
            <CChartBar datasets={data.vendors.datasets} labels={data.vendors.labels} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>{t('firmware.device_types')}</CCardHeader>
          <CCardBody>
            <CChartPie datasets={data.deviceType.datasets} labels={data.deviceType.labels} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.certificates')}</CCardHeader>
          <CCardBody>
            <CChartPie datasets={data.certificates.datasets} labels={data.certificates.labels} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.commands')}</CCardHeader>
          <CCardBody>
            <CChartBar datasets={data.commands.datasets} labels={data.commands.labels} />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol>
        <CCard>
          <CCardHeader>{t('common.memory_used')}</CCardHeader>
          <CCardBody>
            <CChartBar datasets={data.memoryUsed.datasets} labels={data.memoryUsed.labels} />
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
