import React, { useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilClone } from '@coreui/icons';
import PropTypes from 'prop-types';
import { CButton, CPopover } from '@coreui/react';

const CopyToClipboardButton = ({ t, content, size }) => {
  const [result, setResult] = useState('');

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setResult(t('common.copied'));
  };

  return (
    <CPopover content={t('common.copy_to_clipboard')}>
      <CButton onClick={copyToClipboard} size={size} className="py-0">
        <CIcon content={cilClone} />
        {'   '}
        {result || ''}
      </CButton>
    </CPopover>
  );
};

CopyToClipboardButton.propTypes = {
  t: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  size: PropTypes.string,
};

CopyToClipboardButton.defaultProps = {
  size: 'sm',
};

export default React.memo(CopyToClipboardButton);
