import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { v4 as createUuid } from 'uuid';
import { CButton, CCardBody, CCardHeader, CRow, CCol, CPopover, CButtonClose } from '@coreui/react';
import { cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import PropTypes from 'prop-types';
import LoadingButton from '../LoadingButton';

import styles from './index.module.scss';

const DeleteButton = ({ t, venue, deleteVenue, hideTooltips }) => {
  const [tooltipId] = useState(createUuid());

  return (
    <CPopover content={t('common.delete')}>
      <div className="d-inline">
        <CButton
          disabled={venue.children.length > 0 || venue.devices.length > 0}
          color="primary"
          variant="outline"
          shape="square"
          size="sm"
          className="mx-1"
          data-tip
          data-for={tooltipId}
          data-event="click"
          style={{ width: '33px', height: '30px' }}
        >
          <CIcon name="cil-trash" content={cilTrash} size="sm" />
        </CButton>
        <ReactTooltip
          id={tooltipId}
          place="top"
          effect="solid"
          globalEventOff="click"
          clickable
          className={[styles.unassignTooltip, 'tooltipRight'].join(' ')}
          border
          borderColor="#321fdb"
          arrowColor="white"
          overridePosition={({ left, top }) => {
            const element = document.getElementById(tooltipId);
            const tooltipWidth = element ? element.offsetWidth : 0;
            const newLeft = left - tooltipWidth * 0.25;
            return { top, left: newLeft };
          }}
        >
          <CCardHeader color="primary" className={styles.tooltipHeader}>
            {t('inventory.delete_venue')}
            <CButtonClose
              style={{ color: 'white' }}
              onClick={(e) => {
                e.target.parentNode.parentNode.classList.remove('show');
                hideTooltips();
              }}
            />
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <LoadingButton
                  data-toggle="dropdown"
                  variant="outline"
                  color="danger"
                  label={t('common.confirm')}
                  isLoadingLabel={t('user.deleting')}
                  isLoading={false}
                  action={() => deleteVenue(venue.id)}
                  block
                  disabled={false}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </ReactTooltip>
      </div>
    </CPopover>
  );
};

DeleteButton.propTypes = {
  t: PropTypes.func.isRequired,
  venue: PropTypes.instanceOf(Object).isRequired,
  deleteVenue: PropTypes.func.isRequired,
  hideTooltips: PropTypes.func.isRequired,
};

export default DeleteButton;