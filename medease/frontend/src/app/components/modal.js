import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 20, borderRadius: 10, width: '80%', maxWidth: 500 }}>
        <button onClick={onClose} style={{ marginLeft: 'auto', display: 'block' }}>Close</button>
        {children}
      </div>
    </div>
  );
};
export default Modal;