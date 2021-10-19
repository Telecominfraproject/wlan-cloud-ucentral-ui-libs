import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilCloudUpload, cilSave, cilTrash, cilX } from '@coreui/icons';
import PropTypes from 'prop-types';
import {
  CButton,
  CPopover,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CInputFile,
  CAlert,
} from '@coreui/react';
import useToggle from '../../hooks/useToggle';

const validatePem = (value) =>
  (value.includes('---BEGIN CERTIFICATE---') && value.includes('---END CERTIFICATE---')) ||
  (value.includes('---BEGIN PRIVATE KEY---') && value.includes('---END PRIVATE KEY---'));

const FileToStringButton = ({ t, save, title, explanations, acceptedFileTypes, size }) => {
  const [show, toggle] = useToggle(false);
  const [value, setValue] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState(false);
  const [key, setKey] = useState(0);

  let fileReader;

  const saveValue = () => {
    save(value, fileName);
    toggle();
  };

  const deleteValue = () => {
    save('', '');
    toggle();
  };

  const clear = () => {
    setValue('');
    setFileError(false);
    setFileName('');
    setKey(key + 1);
  };

  const handleFileRead = () => {
    setFileError(false);
    const content = fileReader.result;
    if (content && validatePem(content)) {
      setValue(window.btoa(content));
    } else {
      setFileError(true);
    }
  };

  const handleFile = (file) => {
    fileReader = new FileReader();
    if (file?.name !== undefined) setFileName(file.name);
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  useEffect(() => {
    if (show) clear();
  }, [show]);

  return (
    <div>
      <CPopover content="Import from PEM file">
        <CButton
          onClick={toggle}
          color="primary"
          variant="outline"
          style={{ height: '35px', width: '35px' }}
          size={size}
        >
          <CIcon content={cilCloudUpload} />
        </CButton>
      </CPopover>
      <CModal size="lg" show={show} onClose={toggle}>
        <CModalHeader className="p-1">
          <CModalTitle className="pl-1 pt-1">{title}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.save')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={saveValue}>
                <CIcon content={cilSave} />
              </CButton>
            </CPopover>
            <CPopover content={t('common.delete')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={deleteValue}>
                <CIcon content={cilTrash} />
              </CButton>
            </CPopover>
            <CPopover content={t('common.close')}>
              <CButton color="primary" variant="outline" className="ml-2" onClick={toggle}>
                <CIcon content={cilX} />
              </CButton>
            </CPopover>
          </div>
        </CModalHeader>
        <CModalBody>
          <h6>{explanations}</h6>
          <CInputFile
            className="my-3"
            key={key}
            id="file-input"
            name="file-input"
            accept={acceptedFileTypes}
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <CAlert className="my-3" hidden={!fileError} color="danger">
            {acceptedFileTypes === '.pem' ? t('common.invalid_pem') : t('common.invalid_file')}
          </CAlert>
        </CModalBody>
      </CModal>
    </div>
  );
};

FileToStringButton.propTypes = {
  t: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  explanations: PropTypes.string.isRequired,
  acceptedFileTypes: PropTypes.string.isRequired,
  size: PropTypes.string,
};

FileToStringButton.defaultProps = {
  size: 'md',
};

export default React.memo(FileToStringButton);
