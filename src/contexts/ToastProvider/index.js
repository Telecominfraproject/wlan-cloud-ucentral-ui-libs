import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CToast, CToastBody, CToaster, CToastHeader } from '@coreui/react';
import { v4 as createUuid } from 'uuid';

const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = ({
    title = '',
    body = '',
    autohide = true,
    closeButton = true,
    color = 'info',
  }) => {
    setToasts([...toasts, { title, body, autohide, closeButton, color, key: createUuid() }]);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div>
        {children}
        <CToaster position="top-right">
          {toasts.map((toast) => (
            <CToast
              key={`toast${toast.key}`}
              autohide={toast.autohide ? 5000 : null}
              fade
              color={toast.color}
              className="text-white align-items-center"
              show
            >
              <CToastHeader closeButton={toast.closeButton}>{toast.title}</CToastHeader>
              <div className="d-flex">
                <CToastBody>{toast.body}</CToastBody>
              </div>
            </CToast>
          ))}
        </CToaster>
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useToast = () => React.useContext(ToastContext);
