import React from 'react';
import styles from './modal.module.css';
import { RiCloseLine } from 'react-icons/ri';

function Modal({
  setIsOpen,
  modalContent,
  overwriteStyle,
  overWriteStyleModalContent,
}) {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal} style={overwriteStyle}>
          <button
            className={styles.closeBtn}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <RiCloseLine style={{ marginBottom: '-3px' }} />
          </button>
          <div
            className={styles.modalContent}
            style={overWriteStyleModalContent}
          >
            {modalContent}
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
