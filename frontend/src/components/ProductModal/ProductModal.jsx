import React from 'react';
import styles from './ProductModal.module.css';

export function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  product,
  categories,
  onChange,
  onImageChange,
  imagePreview,
  isEdit = false,
  hideStockField = false
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (onImageChange) {
      onImageChange(file);
    }
  };

  const handleFieldChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={(e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    }}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Produto *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product?.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              required
              placeholder="Digite o nome do produto"
              autoFocus
              tabIndex={1}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição *</label>
            <textarea
              id="description"
              name="description"
              value={product?.description || ''}
              onChange={(e) => handleFieldChange('description', e.target.value)}
              required
              placeholder="Descreva o produto"
              rows={3}
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="color">Cor *</label>
              <input
                type="text"
                id="color"
                name="color"
                value={product?.color || ''}
                onChange={(e) => handleFieldChange('color', e.target.value)}
                required
                placeholder="Ex: Azul"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="material">Material *</label>
              <input
                type="text"
                id="material"
                name="material"
                value={product?.material || ''}
                onChange={(e) => handleFieldChange('material', e.target.value)}
                required
                placeholder="Ex: Algodão"
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="stamp">Estampa</label>
              <input
                type="text"
                id="stamp"
                name="stamp"
                value={product?.stamp || ''}
                onChange={(e) => handleFieldChange('stamp', e.target.value)}
                placeholder="Ex: Listras"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="price">Preço *</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                min="0"
                value={product?.price || ''}
                onChange={(e) => handleFieldChange('price', e.target.value)}
                required
                placeholder="0.00"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Categoria *</label>
            <select
              id="category"
              name="category"
              value={product?.category?.id || product?.category || ''}
              onChange={(e) => handleFieldChange('category', e.target.value)}
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories?.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {!isEdit && (
            <div className={styles.formGroup}>
              <label htmlFor="image">Imagem do Produto *</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageInputChange}
                required={!isEdit}
              />
              {imagePreview && (
                <div className={styles.imagePreview}>
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>
          )}

          {isEdit && product?.primaryImage && (
            <div className={styles.formGroup}>
              <label>Imagem Atual</label>
              <div className={styles.currentImage}>
                <img 
                  src={`data:image/jpeg;base64,${product.primaryImage}`} 
                  alt={product.name}
                />
                <p className={styles.imageNote}>
                  Para alterar a imagem, use a opção "Alterar Imagem" na lista de produtos.
                </p>
              </div>
            </div>
          )}

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              {isEdit ? 'Atualizar Produto' : 'Criar Produto'}
            </button>
          </div>

          {!isEdit && !hideStockField && (
            <div className={styles.stockNote}>
              <p> Após criar o produto, você poderá configurar os estoques por tamanho.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}