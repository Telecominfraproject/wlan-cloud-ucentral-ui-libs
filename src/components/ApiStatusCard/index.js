import React from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';

const ApiStatusCard = ({ t, info }) => (
  <CCard>
    <CCardHeader>{info.title}</CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="4">
          <div block="true">{t('common.endpoint')}:</div>
          <div block="true">{t('common.start')}:</div>
          <div block="true">{t('status.uptime')}:</div>
          <div block="true">{t('footer.version')}:</div>
        </CCol>
        <CCol>
          <div block="true">{info.endpoint}</div>
          <div block="true">{info.start}</div>
          <div block="true">{info.uptime}</div>
          <div block="true">{info.version}</div>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
);

ApiStatusCard.propTypes = {
  t: PropTypes.func.isRequired,
  info: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(ApiStatusCard);
