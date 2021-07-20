import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';

const ImgWithFallback = ({ src, fallback }) => {
  const [error, setError] = useState(false);

  if (src === '' || error) {
    return <div className="avatar bg-secondary">{fallback()}</div>;
  }

  return <CImg className="avatar" src={src} onError={() => setError(true)} />;
};

ImgWithFallback.propTypes = {
  src: PropTypes.string,
  fallback: PropTypes.func.isRequired,
};

ImgWithFallback.defaultProps = {
  src: '',
};

export default React.memo(ImgWithFallback);
