import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  children: any;
  isOpen: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, isOpen, setIsOpen }) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#FEEAC5',
          color: '#65493D',
          borderRadius: '8px',
          width: 'calc(100vw - 710px)',
          minWidth: '400px',
          maxHeight: 'calc(100vh - 210px)',
          overflowY: 'auto',
          border: 'none',

        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
