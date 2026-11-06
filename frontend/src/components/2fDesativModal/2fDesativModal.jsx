import styles from "./2fDesativModal.module.css"
import { Modal } from '../modal/Modal';

export function Desativ2FModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalContent}>
            <h2 className={styles.title}>Desativação</h2>
            <div>
                {children}
            </div>
        </div>
    </Modal>
  );
}