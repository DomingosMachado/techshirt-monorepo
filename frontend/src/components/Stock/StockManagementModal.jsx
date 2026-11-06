import React from 'react';
import styles from './StockManagementModal.module.css';

export function StockManagementModal({
  isOpen,
  onClose,
  productName,
  productStocks,
  newStocks,
  availableSizes,
  onExistingStockChange,
  onNewStockChange,
  onAddNewStock,
  onRemoveNewStock,
  onSaveStocks,
  onDeleteStock,
  getAvailableSizesForNew
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveStocks();
  };

  const hasChanges = newStocks.length > 0 || productStocks.some(stock => stock.hasChanges);

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Gerenciar Estoques</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.productInfo}>
          <h3>{productName}</h3>
          <p>Configure os estoques disponíveis por tamanho</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          
          {/* Estoques Existentes */}
          {productStocks.length > 0 && (
            <div className={styles.section}>
              <h4>Estoques Existentes</h4>
              <div className={styles.stocksList}>
                {productStocks.map(stock => (
                  <div key={stock.id} className={styles.stockItem}>
                    <div className={styles.stockInfo}>
                      <span className={styles.sizeLabel}>{stock.productSize}</span>
                      <input
                        type="number"
                        min="0"
                        value={stock.stock || 0}
                        onChange={(e) => onExistingStockChange(stock.id, 'stock', e.target.value)}
                        className={styles.stockInput}
                        placeholder="Quantidade"
                      />
                      <span className={styles.unitLabel}>unidades</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onDeleteStock(stock.id)}
                      className={styles.deleteButton}
                      title="Remover este estoque"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Novos Estoques */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4>Adicionar Novos Estoques</h4>
              <button
                type="button"
                onClick={onAddNewStock}
                className={styles.addButton}
                disabled={getAvailableSizesForNew().length === 0}
              >
                + Adicionar Tamanho
              </button>
            </div>

            {newStocks.length > 0 && (
              <div className={styles.stocksList}>
                {newStocks.map((stock, index) => (
                  <div key={index} className={styles.stockItem}>
                    <div className={styles.stockInfo}>
                      <select
                        value={stock.productSize || ''}
                        onChange={(e) => onNewStockChange(index, 'productSize', e.target.value)}
                        className={styles.sizeSelect}
                        required
                      >
                        <option value="">Selecione</option>
                        {getAvailableSizesForNew().map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                        {/* Permitir manter o tamanho já selecionado */}
                        {stock.productSize && !getAvailableSizesForNew().includes(stock.productSize) && (
                          <option value={stock.productSize}>{stock.productSize}</option>
                        )}
                      </select>
                      <input
                        type="number"
                        min="0"
                        value={stock.stock || 0}
                        onChange={(e) => onNewStockChange(index, 'stock', e.target.value)}
                        className={styles.stockInput}
                        placeholder="Quantidade"
                      />
                      <span className={styles.unitLabel}>unidades</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveNewStock(index)}
                      className={styles.deleteButton}
                      title="Remover este item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {getAvailableSizesForNew().length === 0 && newStocks.length === 0 && productStocks.length === availableSizes.length && (
              <div className={styles.noMoreSizes}>
                <p>Todos os tamanhos disponíveis já possuem estoque configurado.</p>
              </div>
            )}
          </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button 
              type="submit" 
              className={styles.saveButton}
              disabled={!hasChanges && newStocks.length === 0}
            >
              Salvar Estoques
            </button>
          </div>

          <div className={styles.stockHelp}>
            <p> <strong>Dica:</strong> Você pode definir estoque 0 para tamanhos que não estão disponíveis no momento.</p>
          </div>
        </form>
      </div>
    </div>
  );
}