import React from 'react';
import PropTypes from 'prop-types';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react';

const EventQueueModal = ({ t, show, toggle, loading, result }) => (
  <CModal size="lg" show={show} onClose={toggle}>
    <CModalHeader>
      <CModalTitle>{t('commands.event_queue')}</CModalTitle>
    </CModalHeader>
    <CModalBody className="text-center">
      {loading ? (
        <CSpinner color="primary" size="lg" />
      ) : (
        <pre className="ignore text-left">{JSON.stringify(result, null, 4)}</pre>
      )}
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" onClick={toggle}>
        {t('common.close')}
      </CButton>
    </CModalFooter>
  </CModal>
);

EventQueueModal.propTypes = {
  t: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  result: PropTypes.instanceOf(Object).isRequired,
};

export default EventQueueModal;
