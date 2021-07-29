import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CDataTable,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CRow,
  CCol,
  CInput,
} from '@coreui/react';
import { cleanBytesString, prettyDate } from '../../utils/formatting';
import LoadingButton from '../LoadingButton';

const DeviceFirmwareModal = ({
  t,
  device,
  show,
  toggle,
  firmwareVersions,
  upgradeToVersion,
  loading,
  upgradeStatus,
}) => {
  const [filter, setFilter] = useState('');

  const fields = [
    { key: 'imageDate', label: t('firmware.image_date'), _style: { width: '17%' }, filter: false },
    { key: 'size', label: t('firmware.size'), _style: { width: '8%' }, filter: false },
    { key: 'revision', label: t('firmware.revision'), _style: { width: '60%' } },
    { key: 'show_details', label: '', _style: { width: '15%' }, filter: false },
  ];

  useEffect(() => {
    setFilter('');
  }, [show]);

  return (
    <CModal show={show} onClose={toggle} size="xl">
      <CModalHeader>
        <CModalTitle>#{device?.serialNumber}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {show ? (
          <div>
            <CRow>
              <CCol sm="2" className="pt-2">
                {t('firmware.installed_firmware')}
              </CCol>
              <CCol className="pt-2">{device.firmware}</CCol>
            </CRow>
            <CRow className="my-4">
              <CCol sm="5">
                <CInput
                  type="text"
                  placeholder="Search"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                />
              </CCol>
              <CCol />
            </CRow>
            <CRow className="mb-4">
              <CCol>
                <div className="overflow-auto" style={{ height: '600px' }}>
                  <CDataTable
                    items={firmwareVersions}
                    fields={fields}
                    loading={loading}
                    hover
                    tableFilterValue={filter}
                    border
                    scopedSlots={{
                      imageDate: (item) => <td>{prettyDate(item.imageDate)}</td>,
                      size: (item) => <td>{cleanBytesString(item.size)}</td>,
                      show_details: (item) => (
                        <td className="text-center">
                          <LoadingButton
                            label={t('firmware.upgrade')}
                            isLoadingLabel={t('firmware.upgrading')}
                            isLoading={false}
                            action={() => upgradeToVersion(item.uri)}
                            block={false}
                            disabled={upgradeStatus.loading}
                          />
                        </td>
                      ),
                    }}
                  />
                </div>
              </CCol>
            </CRow>
          </div>
        ) : (
          <div />
        )}
      </CModalBody>
    </CModal>
  );
};

DeviceFirmwareModal.propTypes = {
  t: PropTypes.func.isRequired,
  device: PropTypes.instanceOf(Object).isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  firmwareVersions: PropTypes.instanceOf(Array).isRequired,
  upgradeToVersion: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  upgradeStatus: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(DeviceFirmwareModal);
