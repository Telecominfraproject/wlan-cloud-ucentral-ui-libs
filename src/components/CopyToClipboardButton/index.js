import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilClone } from '@coreui/icons';
import PropTypes from 'prop-types';
import { CButton, CPopover } from '@coreui/react';
import { useToast } from 'contexts/ToastProvider';

const CopyToClipboardButton = ({ t, content, size }) => {
  const { addToast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    addToast({
      title: t('common.success'),
      body: t('common.copied_to_clipboard'),
      color: 'success',
      autohide: true,
    });
  };

  return (
    <CPopover content={t('common.copy_to_clipboard')}>
      <CButton onClick={copyToClipboard} size={size} className="py-0">
        <CIcon content={cilClone} />
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
