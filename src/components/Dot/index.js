import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Dot = ({ className }) => <span className={[styles.dot, className].join(' ')} />;

Dot.propTypes = {
  className: PropTypes.string,
};

Dot.defaultProps = {
  className: '',
};

export default Dot;
