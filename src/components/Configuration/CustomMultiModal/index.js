import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CFormGroup,
  CCol,
  CLabel,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CPopover,
  CDataTable,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMinus, cilPlus, cilSave, cilX } from '@coreui/icons';
import useToggle from '../../../hooks/useToggle';

const CustomMultiModal = ({
  children,
  t,
  columns,
  label,
  value,
  updateValue,
  save,
  firstCol,
  secondCol,
  length,
  modalSize,
  itemName,
  noTable,
  toggleAdd,
  reset,
  disabled,
}) => {
  const [show, toggle] = useToggle();

  const getLabel = () => {
    if (length === 0) return `Manage ${itemName}`;

    return `Manage ${itemName} (${length})`;
  };

  const remove = (v) => {
    const key = Object.keys(v)[0];
    const index = value.findIndex((obj) => obj[key] === v[key]);
    if (index > -1) {
      const newList = [...value];
      newList.splice(index, 1);

      updateValue(newList);
    }
  };

  const closeAndSave = () => {
    save();
    toggle();
  };

  useEffect(() => {
    if (show && reset !== null) reset();
  }, [show]);

  return (
    <CFormGroup row className="py-1">
      <CLabel col sm={firstCol} htmlFor="name">
        {label}
      </CLabel>
      <CCol sm={secondCol} onClick={toggle}>
        <CButton color="link" className="ml-0 pl-0" onClick={toggle}>
          {getLabel()}
        </CButton>
      </CCol>
      <CModal size={modalSize} show={show} onClose={toggle}>
        <CModalHeader className="p-1">
          <CModalTitle className="pl-1 pt-1">{label}</CModalTitle>
          <div className="text-right">
            <CPopover content={t('common.add')}>
              <CButton
                color="primary"
                hidden={toggleAdd === null}
                variant="outline"
                className="ml-2"
                onClick={toggleAdd}
                disabled={disabled}
              >
                <CIcon content={cilPlus} />
              </CButton>
            </CPopover>
            <CPopover content={t('common.save')}>
              <CButton
                color="primary"
                variant="outline"
                className="ml-2"
                onClick={closeAndSave}
                disabled={disabled}
              >
                <CIcon content={cilSave} />
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
          {children}
          {!noTable ? (
            <CDataTable
              addTableClasses="ignore-overflow"
              items={value ?? []}
              fields={columns}
              hover
              border
              scopedSlots={{
                remove: (item) => (
                  <td className="align-middle text-center">
                    <CButton
                      color="primary"
                      variant="outline"
                      size="sm"
                      onClick={() => remove(item)}
                    >
                      <CIcon content={cilMinus} />
                    </CButton>
                  </td>
                ),
              }}
            />
          ) : null}
        </CModalBody>
      </CModal>
    </CFormGroup>
  );
};

CustomMultiModal.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.func.isRequired,
  columns: PropTypes.instanceOf(Array).isRequired,
  value: PropTypes.instanceOf(Array).isRequired,
  updateValue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  firstCol: PropTypes.string,
  secondCol: PropTypes.string,
  length: PropTypes.number.isRequired,
  modalSize: PropTypes.string,
  itemName: PropTypes.string.isRequired,
  noTable: PropTypes.bool,
  toggleAdd: PropTypes.func,
  reset: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
};

CustomMultiModal.defaultProps = {
  firstCol: 6,
  secondCol: 6,
  modalSize: 'lg',
  noTable: false,
  toggleAdd: null,
  reset: null,
};

export default CustomMultiModal;
