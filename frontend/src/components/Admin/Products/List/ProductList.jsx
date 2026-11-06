import React, { useState } from 'react';
import { useBase64Image } from '../../../../hooks/useImageConverter';
import styles from './productList.module.css';

function ProductImage({ base64Image, productName }) {
  const { imageUrl, imageError } = useBase64Image(base64Image);

  const getImageSrc = () => {
    if (imageError) {
      return 'https://placehold.co/80x80/e9ecef/6c757d?text=Sem+Imagem';
    }
    if (!imageUrl) {
      return 'https://placehold.co/80x80/e9ecef/6c757d?text=Carregando...';
    }
    return imageUrl;
  };

  return <img src={getImageSrc()} alt={productName} className={styles.productImage} />;
}

export function ProductList({ products, onEdit, onDelete, onImageEdit, onStockEdit }) {
  const [expandedProductId, setExpandedProductId] = useState(null);

  const toggleExpand = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        <p>Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      {/* Layout Mobile - Lista Compacta */}
      <div className={styles.mobileProductsList}>
        {products.map(product => (
          <div key={product.id} className={styles.mobileProductItem}>
            <div 
              className={styles.productRow} 
              onClick={() => toggleExpand(product.id)}
            >
              <div className={styles.productImageContainer}>
                <ProductImage base64Image={product.primaryImage} productName={product.name} />
              </div>
              <div className={styles.productBasicInfo}>
                <h3>{product.name}</h3>
                <p className={styles.productPrice}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
              </div>
              <div className={styles.productId}>
                #{product.id}
              </div>
              <button className={styles.expandButton}>
                {expandedProductId === product.id ? '−' : '+'}
              </button>
            </div>
            
            {expandedProductId === product.id && (
              <div className={styles.expandedContent}>
                <div className={styles.productDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Categoria:</span>
                    <span className={styles.detailValue}>{product.category?.name || 'N/A'}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Cor:</span>
                    <span className={styles.detailValue}>{product.color}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Material:</span>
                    <span className={styles.detailValue}>{product.material}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>QR Code:</span>
                    <span className={styles.detailValue}>{product.qrCode?.name || 'N/A'}</span>
                  </div>
                </div>
                
                <div className={styles.productActions}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onEdit(product); }} 
                    className={`${styles.actionButton} ${styles.editButton}`}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onStockEdit(product); }} 
                    className={`${styles.actionButton} ${styles.stockButton}`}
                  >
                    Estoque
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onImageEdit(product); }} 
                    className={`${styles.actionButton} ${styles.imageButton}`}
                  >
                    Imagem
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(product.id); }} 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Layout Desktop - Tabela */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>QR Code</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <ProductImage base64Image={product.primaryImage} productName={product.name} />
              </td>
              <td>{product.name}</td>
              <td className={styles.description}>{product.description}</td>
              <td>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
              </td>
              <td>{product.category?.name}</td>
              <td>{product.qrCode?.name || 'N/A'}</td>
              <td>
                <div className={styles.actions}>
                  <button 
                    onClick={() => onEdit(product)} 
                    className={`${styles.actionButton} ${styles.editButton}`}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onStockEdit(product)} 
                    className={`${styles.actionButton} ${styles.stockButton}`}
                  >
                    Estoque
                  </button>
                  <button 
                    onClick={() => onImageEdit(product)} 
                    className={`${styles.actionButton} ${styles.imageButton}`}
                  >
                    Imagem
                  </button>
                  <button 
                    onClick={() => onDelete(product.id)} 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                  >
                    Deletar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}