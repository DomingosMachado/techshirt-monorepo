import React from 'react';
import styles from './qrCodeModal.module.css';

export function QRCodeModal({ isOpen, onClose, onSubmit, title, qrCode, onChange, isEdit = false }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange({ ...qrCode, [field]: value });
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do QR Code *</label>
            <input
              type="text"
              id="name"
              value={qrCode?.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              required
              placeholder="Ex: Campanha de Marketing"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="link">Link de Redirecionamento *</label>
            <input
              type="url"
              id="link"
              value={qrCode?.link || ''}
              onChange={(e) => handleFieldChange('link', e.target.value)}
              required
              placeholder="https://exemplo.com/pagina-de-destino"
            />
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton}>{isEdit ? 'Atualizar' : 'Criar'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}