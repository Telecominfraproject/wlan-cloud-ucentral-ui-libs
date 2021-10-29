import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CPopover } from '@coreui/react';
import styles from './index.module.scss';

const DeviceBadge = ({ t, device, deviceIcons }) => {
  const [src, setSrc] = useState('');

  const getSrc = () => {
    switch (device.deviceType) {
      case 'AP':
        setSrc(deviceIcons.apIcon);
        break;
      case 'MESH':
        setSrc(deviceIcons.meshIcon);
        break;
      case 'SWITCH':
        setSrc(deviceIcons.internetSwitch);
        break;
      case 'IOT':
        setSrc(deviceIcons.iotIcon);
        break;
      default:
        break;
    }
  };

  const getCertColor = () => {
    switch (device.verifiedCertificate) {
      case 'VALID_CERTIFICATE':
      case 'NO_CERTIFICATE':
        return 'bg-danger';
      case 'MISMATCH_SERIAL':
        return 'bg-warning';
      case 'VERIFIED':
        return 'bg-success';
      default:
        return 'bg-danger';
    }
  };

  useEffect(() => {
    getSrc();
  }, []);

  return (
    <CPopover content={device.verifiedCertificate} placement="top">
      <div
        style={{ height: '35px', width: '35px' }}
        className={`c-avatar c-avatar-lg ${getCertColor()}`}
      >
        <img src={src} className={styles.icon} alt={device.deviceType} />
        <CPopover content={device.connected ? t('common.connected') : t('common.not_connected')}>
          <span
            className={
              device.connected ? 'c-avatar-status bg-success' : 'c-avatar-status bg-danger'
            }
          />
        </CPopover>
      </div>
    </CPopover>
  );
};

DeviceBadge.propTypes = {
  t: PropTypes.func.isRequired,
  device: PropTypes.instanceOf(Object).isRequired,
  deviceIcons: PropTypes.instanceOf(Object).isRequired,
};

export default React.memo(DeviceBadge);
