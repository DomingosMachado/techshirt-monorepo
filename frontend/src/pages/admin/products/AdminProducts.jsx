import React, { useState } from 'react';
import { useProducts } from '../../../hooks/Admin/useProducts';
import { ProductList } from '../../../components/Admin/Products/List/ProductList';
import { ProductModal } from '../../../components/Admin/Products/Modal/ProductModal';
import { ImageModal } from '../../../components/Admin/Products/Modal/ImageModal';
import { ProductStockModal } from '../../../components/Admin/Products/Modal/ProductStockModal';
import styles from './adminProducts.module.css';

const INITIAL_PRODUCT_STATE = { name: '', description: '', color: '', material: '', stamp: '', price: '', categoryId: '', qrCodeId: '' };

export function AdminProducts() {
  const { products, categories, qrCodes, isLoading, error, fetchAll, createProduct, updateProduct, updateProductImage, deleteProduct } = useProducts();
  
  const [modal, setModal] = useState({ type: null, data: null });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const handleOpenModal = (type, data) => setModal({ type, data });
  const handleCloseModal = () => {
    setModal({ type: null, data: null });
    setImagePreview(null);
    setSelectedImageFile(null);
  };

  const handleFieldChange = (field, value) => {
    setModal(prev => ({ ...prev, data: { ...prev.data, [field]: value } }));
  };

  const handleImageFileChange = (file) => {
    if (file) {
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImageFile) {
      toast.error('Por favor, selecione uma imagem.');
      return;
    }
    const productData = {
      name: modal.data.name,
      description: modal.data.description,
      color: modal.data.color,
      material: modal.data.material,
      stamp: modal.data.stamp || '',
      price: Number(modal.data.price),
      categoryId: Number(modal.data.categoryId),
      qrCodeId: Number(modal.data.qrCodeId)
    };
    try {
      await createProduct(productData, selectedImageFile);
      handleCloseModal();
    } catch (err) { console.error(err) }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const { id, name, description, color, material, stamp, price, categoryId, qrCodeId } = modal.data;
    const productData = { name, description, color, material, stamp, price: Number(price), categoryId: Number(categoryId), qrCodeId: Number(qrCodeId) };
    try {
      await updateProduct(id, productData);
      handleCloseModal();
    } catch (err) { console.error(err) }
  };

  const handleImageSubmit = async (file) => {
    try {
      await updateProductImage(modal.data.id, file);
      handleCloseModal();
    } catch (err) { console.error(err) }
  };

  if (isLoading) return <div className={styles.container}><p>Carregando...</p></div>;
  if (error) return <div className={styles.container}><p>{error}</p></div>;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Gerenciamento de Produtos</h1>
          <button onClick={() => handleOpenModal('add', INITIAL_PRODUCT_STATE)} className={styles.addButton}>+ Adicionar Produto</button>
        </div>
        <ProductList
          products={products}
          onEdit={(product) => handleOpenModal('edit', { ...product, categoryId: product.category?.id, qrCodeId: product.qrCode?.id })}
          onDelete={deleteProduct}
          onImageEdit={(product) => handleOpenModal('image', product)}
          onStockEdit={(product) => handleOpenModal('stock', product)}
        />
      </div>

      {modal.type === 'add' && (
        <ProductModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleCreateSubmit}
          title="Adicionar Novo Produto"
          product={modal.data}
          categories={categories}
          qrCodes={qrCodes}
          onFieldChange={handleFieldChange}
          onImageChange={handleImageFileChange}
          imagePreview={imagePreview}
        />
      )}

      {modal.type === 'edit' && (
        <ProductModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
          title="Editar Produto"
          product={modal.data}
          categories={categories}
          qrCodes={qrCodes}
          onFieldChange={handleFieldChange}
          isEdit={true}
        />
      )}
      
      {modal.type === 'image' && (
        <ImageModal
          isOpen={true}
          onClose={handleCloseModal}
          onSubmit={handleImageSubmit}
          productName={modal.data?.name}
        />
      )}

      {modal.type === 'stock' && (
        <ProductStockModal
          isOpen={true}
          onClose={handleCloseModal}
          product={modal.data}
          onSuccess={fetchAll}
        />
      )}
    </>
  );
}