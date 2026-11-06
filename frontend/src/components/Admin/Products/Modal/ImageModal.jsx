import React, { useState, useEffect } from 'react';
import styles from './imageModal.module.css';

export function ImageModal({ isOpen, onClose, onSubmit, productName }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setImagePreview(null);
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Alterar Imagem - {productName}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="newImage">Nova Imagem *</label>
            <input type="file" id="newImage" accept="image/*" onChange={handleFileChange} required />
            {imagePreview && (<div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>)}
          </div>
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton} disabled={!selectedFile}>Alterar Imagem</button>
          </div>
        </form>
      </div>
    </div>
  );
}