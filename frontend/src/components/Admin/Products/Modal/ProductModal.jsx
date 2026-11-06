import React from 'react';
import styles from './productModal.module.css';

export function ProductModal({ isOpen, onClose, onSubmit, title, product, categories, qrCodes, onFieldChange, onImageChange, imagePreview, isEdit = false }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
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
            <label htmlFor="name">Nome do Produto *</label>
            <input type="text" id="name" value={product?.name || ''} onChange={(e) => onFieldChange('name', e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição *</label>
            <textarea id="description" value={product?.description || ''} onChange={(e) => onFieldChange('description', e.target.value)} required rows={3} />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="color">Cor *</label>
              <input type="text" id="color" value={product?.color || ''} onChange={(e) => onFieldChange('color', e.target.value)} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="material">Material *</label>
              <input type="text" id="material" value={product?.material || ''} onChange={(e) => onFieldChange('material', e.target.value)} required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="stamp">Estampa</label>
              <input type="text" id="stamp" value={product?.stamp || ''} onChange={(e) => onFieldChange('stamp', e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="price">Preço *</label>
              <input type="number" id="price" step="0.01" min="0" value={product?.price || ''} onChange={(e) => onFieldChange('price', e.target.value)} required />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="category">Categoria *</label>
              <select id="category" value={product?.categoryId || ''} onChange={(e) => onFieldChange('categoryId', e.target.value)} required>
                <option value="">Selecione</option>
                {categories?.map(cat => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="qrCode">QR Code *</label>
              <select id="qrCode" value={product?.qrCodeId || ''} onChange={(e) => onFieldChange('qrCodeId', e.target.value)} required>
                <option value="">Selecione</option>
                {qrCodes?.map(qr => (<option key={qr.id} value={qr.id}>{qr.name}</option>))}
              </select>
            </div>
          </div>
          {!isEdit && (
            <div className={styles.formGroup}>
              <label htmlFor="image">Imagem do Produto *</label>
              <input type="file" id="image" accept="image/*" onChange={(e) => onImageChange(e.target.files[0])} required />
              {imagePreview && (<div className={styles.imagePreview}><img src={imagePreview} alt="Preview" /></div>)}
            </div>
          )}
          {isEdit && product?.primaryImage && (
            <div className={styles.formGroup}>
              <label>Imagem Atual</label>
              <div className={styles.currentImage}>
                <img src={`data:image/jpeg;base64,${product.primaryImage}`} alt={product.name} />
                <p className={styles.imageNote}>Para alterar a imagem, use a opção "Alterar Imagem" na lista.</p>
              </div>
            </div>
          )}
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
            <button type="submit" className={styles.submitButton}>{isEdit ? 'Atualizar Produto' : 'Criar Produto'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}