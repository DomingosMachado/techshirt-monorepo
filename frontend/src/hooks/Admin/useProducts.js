import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [qrCodes, setQrCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const [productsRes, categoriesRes, qrCodesRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories'),
        api.get('/qrcode')
      ]);
      setProducts(productsRes.data.sort((a, b) => a.id - b.id));
      setCategories(categoriesRes.data);
      setQrCodes(qrCodesRes.data);
      setError(null);
    } catch (err) {
      setError("Não foi possível carregar os dados da página.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const createProduct = async (productData, imageFile) => {
    const formData = new FormData();
    formData.append('productRequestDTO', JSON.stringify(productData));
    formData.append('file', imageFile);

    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Produto criado com sucesso!');
      fetchAll(); // Re-sincroniza os dados
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao criar produto.');
      throw err; // Propaga o erro para o componente poder reagir
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      await api.put(`/products/${productId}`, productData);
      toast.success('Produto atualizado com sucesso!');
      fetchAll();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao atualizar produto.');
      throw err;
    }
  };

  const updateProductImage = async (productId, imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    try {
      await api.put(`/products/image/${productId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Imagem atualizada com sucesso!');
      fetchAll();
    } catch (err) {
      toast.error('Erro ao atualizar imagem.');
      throw err;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      toast.success('Produto deletado com sucesso!');
      fetchAll();
    } catch (err) {
      toast.error('Erro ao deletar produto.');
      throw err;
    }
  };

  return { products, categories, qrCodes, isLoading, error, fetchAll, createProduct, updateProduct, updateProductImage, deleteProduct };
}