import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CImg } from '@coreui/react';

const ImgWithFallback = ({ src, fallback }) => {
  const [error, setError] = useState(false);

  if (error) {
    return <div className="avatar bg-secondary">{fallback()}</div>;
  }

  return <CImg className="avatar" src={src} onError={() => setError(true)} />;
};

ImgWithFallback.propTypes = {
  src: PropTypes.string.isRequired,
  fallback: PropTypes.func.isRequired,
};
export default React.memo(ImgWithFallback);
