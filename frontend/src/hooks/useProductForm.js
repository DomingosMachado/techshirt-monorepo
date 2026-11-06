import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

const initialProductState = {
  name: '',
  description: '',
  color: '',
  material: '',
  stamp: '',
  price: 0,
  categoryId: '',
  qrCodeId: '', // Adicionado campo QR Code
  status: true,
  primaryImage: '',
};

export function useProductForm() {
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const resetForm = () => {
    setNewProduct(initialProductState);
    setImagePreview(null);
  };

  const handleNewProductChange = (field, value) => {
    setNewProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEditProductChange = (field, value) => {
    if (editingProduct) {
        setEditingProduct(prev => ({
             ...prev,
             [field]: value 
        }));
    }
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxSize = 800; 
        let { width, height } = img;

        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataURL = canvas.toDataURL('image/jpeg', 0.7); 
        const base64String = compressedDataURL.split(',')[1];
        
        resolve({ base64String, dataURL: compressedDataURL });
      };
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImageChange = async (file) => {
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Por favor, selecione uma imagem válida (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Limite de 5MB
      toast.error('A imagem deve ter no máximo 5MB.');
      return;
    }

    try {
      const { base64String, dataURL } = await compressImage(file);
      setNewProduct(prev => ({ ...prev, primaryImage: base64String }));
      setImagePreview(dataURL);
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      toast.error('Erro ao processar a imagem.');
    }
  };

  const validateProduct = (product) => {
    if (!product.name || !product.description || !product.color || !product.material || !product.price || !product.categoryId || !product.qrCodeId) {
      toast.error('Por favor, preencha todos os campos obrigatórios (*).');
      return false;
    }
    if (Number(product.price) <= 0) {
      toast.error('O preço deve ser um valor positivo.');
      return false;
    }
    if (!product.primaryImage) {
        toast.error('A imagem do produto é obrigatória.');
        return false;
    }
    return true;
  };

  const createProduct = async () => {
    if (!validateProduct(newProduct)) return { success: false };

    // Estrutura o DTO com os dados do produto incluindo QR Code
    const productRequestDTO = {
        name: newProduct.name,
        description: newProduct.description,
        color: newProduct.color,
        material: newProduct.material,
        stamp: newProduct.stamp || '',
        price: Number(newProduct.price),
        categoryId: Number(newProduct.categoryId),
        qrCodeId: Number(newProduct.qrCodeId) // Incluído QR Code
    };

    const formData = new FormData();

    // Anexa o DTO como uma string JSON
    formData.append('productRequestDTO', JSON.stringify(productRequestDTO));

    // Converte a imagem de base64 para um ficheiro (Blob) e anexa ao FormData
    try {
        const byteCharacters = atob(newProduct.primaryImage);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const imageBlob = new Blob([byteArray], { type: 'image/jpeg' });
        
        formData.append('file', imageBlob, `${newProduct.name.replace(/\s+/g, '-')}.jpg`);
    } catch (error) {
        console.error('Erro ao processar a imagem:', error);
        toast.error('Erro ao processar a imagem.');
        return { success: false };
    }

    try {
        // Envia o FormData
        const response = await api.post('/products', formData);
        
        toast.success('Produto criado com sucesso!');
        resetForm();
        return { success: true, product: response.data, shouldManageStocks: true };
    } catch (err) {
        console.error('Erro completo:', err.response || err);
        const errorMessage = err.response?.data?.message || 'Erro ao criar o produto.';
        toast.error(errorMessage);
        return { success: false };
    }
  };

  const updateProduct = async (productId) => {
    if (!editingProduct) return false;
    
    const productToUpdate = {
        name: editingProduct.name,
        description: editingProduct.description,
        color: editingProduct.color,
        material: editingProduct.material,
        stamp: editingProduct.stamp,
        price: Number(editingProduct.price),
        categoryId: Number(editingProduct.categoryId),
        qrCodeId: Number(editingProduct.qrCodeId) // Incluído QR Code
    };

    try {
      await api.put(`/products/${productId}`, productToUpdate, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Produto atualizado com sucesso!');
      return true;
    } catch (err) {
      console.error('Erro ao atualizar:', err.response || err);
      toast.error(err.response?.data?.message || 'Erro ao salvar as alterações.');
      return false;
    }
  };

  return {
    newProduct,
    editingProduct,
    imagePreview,
    setEditingProduct,
    resetForm,
    handleNewProductChange,
    handleEditProductChange,
    handleImageChange,
    createProduct,
    updateProduct,
  };
}