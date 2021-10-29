import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';
import { emailToName } from '../../utils/formatting';

const getSize = (size) => {
  if (size === 'lg') {
    return 'avatar-lg';
  }

  return '';
};

const Avatar = ({ src, fallback, size }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src && src !== '' && src !== 'data:;base64,') {
      setError(false);
    }
  }, [src]);

  if (!src || src === '' || src === 'data:;base64,' || error) {
    return (
      <div className={`c-avatar avatar ${getSize(size)}`}>
        <div className={`avatar bg-secondary ${getSize(size)}`}>
          {fallback === 'N/A' ? fallback : emailToName(fallback)}
        </div>
      </div>
    );
  }

  return (
    <div className={`c-avatar avatar ${getSize(size)}`}>
      <CImg className={`avatar ${getSize(size)}`} src={src} onError={() => setError(true)} />
    </div>
  );
};

Avatar.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  fallback: PropTypes.string,
};

Avatar.defaultProps = {
  size: 'md',
  src: '',
  fallback: 'N/A',
};

export default React.memo(Avatar);
