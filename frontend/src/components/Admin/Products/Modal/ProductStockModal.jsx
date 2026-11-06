import React from 'react';
import { useProductStock } from '../../../../hooks/Admin/useProductStock';
import styles from './productStockModal.module.css';

export function ProductStockModal({ isOpen, onClose, product, onSuccess }) {
  const { stocks, isLoading, isSaving, totalStock, handleStockChange, saveStocks } = useProductStock(product);

  const handleSave = async () => {
    try {
      await saveStocks();
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Gerenciar Estoque - {product?.name}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        {isLoading ? (
          <div className={styles.loadingContainer}><div className={styles.loadingSpinner}></div></div>
        ) : (
          <div className={styles.modalBody}>
            <div className={styles.productInfo}>
              <div className={styles.productImageContainer}>
                {product?.primaryImage && <img src={`data:image/jpeg;base64,${product.primaryImage}`} alt={product.name} className={styles.productImage} />}
              </div>
              <div className={styles.productDetails}>
                <h3>{product?.name}</h3>
                <p className={styles.productPrice}>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product?.price || 0)}</p>
              </div>
            </div>
            <div className={styles.stockSection}>
              <h4>Estoques por Tamanho</h4>
              <div className={styles.stockGrid}>
                {stocks.map(item => (
                  <div key={item.size} className={styles.stockItem}>
                    <label className={styles.sizeLabel}>{item.size}</label>
                    <input type="number" min="0" value={item.stock} onChange={(e) => handleStockChange(item.size, e.target.value)} className={styles.stockInput} />
                  </div>
                ))}
              </div>
              <div className={styles.stockSummary}>
                <p><strong>Total de Itens: {totalStock}</strong></p>
              </div>
            </div>
          </div>
        )}
        <div className={styles.modalActions}>
          <button type="button" onClick={onClose} className={styles.cancelButton} disabled={isSaving}>Cancelar</button>
          <button onClick={handleSave} className={styles.saveButton} disabled={isLoading || isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar Estoques'}
          </button>
        </div>
      </div>
    </div>
  );
}