import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';
import { emailToName } from '../../utils/formatting';

const Avatar = ({ src, fallback }) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src && src !== '' && src !== 'data:;base64,') {
      setError(false);
    }
  }, [src]);

  if (!src || src === '' || src === 'data:;base64,' || error) {
    return (
      <div className="c-avatar avatar">
        <div className="avatar bg-secondary">
          {fallback === 'N/A' ? fallback : emailToName(fallback)}
        </div>
      </div>
    );
  }

  return (
    <div className="c-avatar avatar">
      <CImg className="avatar" src={src} onError={() => setError(true)} />
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.string,
};

Avatar.defaultProps = {
  src: '',
  fallback: 'N/A',
};

export default React.memo(Avatar);
