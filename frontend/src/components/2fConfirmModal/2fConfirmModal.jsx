import styles from "./2fConfirmModal.module.css"
import { Modal } from '../modal/Modal';

export function Confirm2FModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalContent}>
            <h2 className={styles.title}>Confirmação</h2>
            <div>
                {children}
            </div>
        </div>
    </Modal>
  );
}