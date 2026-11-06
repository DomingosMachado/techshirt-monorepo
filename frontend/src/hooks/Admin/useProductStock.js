import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

const PRODUCT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

export function useProductStock(product) {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProductStocks = useCallback(async () => {
    if (!product?.id) return;
    setIsLoading(true);
    try {
      const response = await api.get(`/productsStock/product/${product.id}`);
      const existingStocks = response.data;
      const stocksData = PRODUCT_SIZES.map(size => {
        const existingStock = existingStocks.find(s => s.productSize === size);
        return {
          size,
          stock: existingStock?.stock || 0,
          id: existingStock?.id || null,
          exists: !!existingStock,
        };
      });
      setStocks(stocksData);
    } catch (err) {
      setStocks(PRODUCT_SIZES.map(size => ({ size, stock: 0, id: null, exists: false })));
    } finally {
      setIsLoading(false);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      fetchProductStocks();
    }
  }, [product, fetchProductStocks]);
  
  const handleStockChange = (size, value) => {
    const numValue = parseInt(value, 10);
    setStocks(prev => prev.map(s => (s.size === size ? { ...s, stock: isNaN(numValue) ? 0 : numValue } : s)));
  };

  const saveStocks = async () => {
    if (!product?.id) return;
    setIsSaving(true);
    try {
      const stocksToUpdate = stocks.filter(s => s.exists && s.stock > 0);
      const stocksToCreate = stocks.filter(s => !s.exists && s.stock > 0);

      // Usando Promise.all para performance
      await Promise.all([
        ...stocksToUpdate.map(s =>
          api.put(`/productsStock`, { stock: s.stock }, { params: { productId: product.id, productSize: s.size } })
        ),
        ...stocksToCreate.map(s =>
          api.post('/productsStock', { productId: product.id, productSize: s.size, stock: s.stock })
        ),
      ]);
      
      toast.success('Estoques salvos com sucesso!');
    } catch (err) {
      toast.error('Ocorreu um erro ao salvar os estoques.');
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const totalStock = stocks.reduce((acc, s) => acc + (s.stock || 0), 0);

  return { stocks, isLoading, isSaving, totalStock, handleStockChange, saveStocks };
}