import React from 'react';
import PropTypes from 'prop-types';
import { CPopover } from '@coreui/react';
import { formatDaysAgo, prettyDate } from 'utils/formatting';

const FormattedDate = ({ date }) => (
  <CPopover content={prettyDate(date)}>
    <span className="d-inline-block">{date === 0 ? '-' : formatDaysAgo(date)}</span>
  </CPopover>
);

FormattedDate.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormattedDate.defaultProps = {
  date: 0,
};

export default FormattedDate;
