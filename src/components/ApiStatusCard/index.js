import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CCard, CCardBody, CCardHeader, CRow, CCol, CButton, CPopover } from '@coreui/react';
import Select from 'react-select';
import CIcon from '@coreui/icons-react';
import { cilSync } from '@coreui/icons';

const ApiStatusCard = ({ t, info, reload }) => {
  const [types, setTypes] = useState([]);

  const submit = () => {
    reload(
      types.map((v) => v.value),
      info.endpoint,
    );
  };

  return (
    <CCard>
      <CCardHeader>{info.title}</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('common.endpoint')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.endpoint}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('system.hostname')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.hostname}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('system.os')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.os}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('system.processors')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.processors}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('common.start')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.start}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('status.uptime')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.uptime}</div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="4">
            <div block="true">{t('footer.version')}:</div>
          </CCol>
          <CCol>
            <div block="true">{info.version}</div>
          </CCol>
        </CRow>
        <CRow className="pt-3">
          <CCol sm="4" className="pt-1">
            <div block="true">{t('system.reload_subsystems')}:</div>
          </CCol>
          <CCol>
            <div block="true">
              {info.subsystems.length === 0 ? (
                t('common.unknown')
              ) : (
                <div>
                  <div className="float-left" style={{ width: '85%' }}>
                    <Select
                      isMulti
                      closeMenuOnSelect={false}
                      name="Subsystems"
                      options={info.subsystems.map((sys) => ({ value: sys, label: sys }))}
                      onChange={setTypes}
                      value={types}
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="float-left text-right" style={{ width: '15%' }}>
                    <CPopover content={t('system.reload')}>
                      <CButton
                        color="primary"
                        variant="outline"
                        onClick={submit}
                        disabled={types.length === 0}
                      >
                        <CIcon content={cilSync} />
                      </CButton>
                    </CPopover>
                  </div>
                </div>
              )}
            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

ApiStatusCard.propTypes = {
  t: PropTypes.func.isRequired,
  info: PropTypes.instanceOf(Object).isRequired,
  reload: PropTypes.func.isRequired,
};

export default React.memo(ApiStatusCard);
