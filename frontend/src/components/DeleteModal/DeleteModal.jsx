import styles from "./DeleteModal.module.css"
import { Modal } from '../modal/Modal';

export function DeleteModal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.modalContent}>
            <h2 className={styles.title}>Deletar Conta</h2>
            <div>
                {children}
            </div>
        </div>
    </Modal>
  );
}