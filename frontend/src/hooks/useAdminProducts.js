import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const [productsResponse, stocksResponse] = await Promise.all([
        api.get('/products'),
        api.get('/productsStock')
      ]);
      
      // Enriquecer produtos com informações de estoque
      const productsWithStock = productsResponse.data.map(product => {
        // Filtrar estoques deste produto
        const productStocks = stocksResponse.data.filter(
          stock => stock.product.id === product.id
        );
        
        // Calcular estoque total
        const totalStock = productStocks.reduce(
          (total, stock) => total + (stock.stock || 0), 
          0
        );
        
        // Obter tamanhos disponíveis
        const availableSizes = productStocks
          .filter(stock => stock.stock > 0)
          .map(stock => stock.productSize);
        
        return {
          ...product,
          totalStock,
          availableSizes,
          stockDetails: productStocks
        };
      });
      
      setProducts(productsWithStock.sort((a, b) => a.id - b.id));
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError("Não foi possível carregar os produtos.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error("Erro ao carregar categorias:", err);
      toast.error("Não foi possível carregar as categorias.");
    }
  };

  const deleteProduct = async (productId) => {
    if (window.confirm('Tem certeza que deseja remover este produto? Todos os estoques associados também serão removidos.')) {
      try {
        // Primeiro, buscar e remover todos os estoques do produto
        const stocksResponse = await api.get(`/productsStock/product/${productId}`);
        const productStocks = stocksResponse.data;
        
        // Remover cada estoque
        for (const stock of productStocks) {
          try {
            await api.delete(`/productsStock/${stock.id}`);
          } catch (stockErr) {
            console.warn(`Erro ao remover estoque ${stock.id}:`, stockErr);
          }
        }
        
        // Depois remover o produto
        await api.delete(`/products/${productId}`);
        
        await fetchProducts(); // Reload da lista
        toast.success('Produto e seus estoques removidos com sucesso!');
        return true;
      } catch (err) {
        console.error('Erro ao remover produto:', err);
        toast.error(err.response?.data?.message || 'Erro ao remover o produto.');
        return false;
      }
    }
    return false;
  };

  // Função para obter detalhes de estoque de um produto específico
  const getProductStockDetails = async (productId) => {
    try {
      const response = await api.get(`/productsStock/product/${productId}`);
      return response.data;
    } catch (err) {
      console.error('Erro ao carregar detalhes do estoque:', err);
      return [];
    }
  };

  // Função para obter produtos por categoria
  const getProductsByCategory = (categoryId) => {
    return products.filter(product => product.category.id === categoryId);
  };

  // Função para obter produtos com baixo estoque
  const getLowStockProducts = (threshold = 5) => {
    return products.filter(product => 
      product.totalStock <= threshold && product.totalStock > 0
    );
  };

  // Função para obter produtos sem estoque
  const getOutOfStockProducts = () => {
    return products.filter(product => product.totalStock === 0);
  };

  // Estatísticas gerais
  const getProductStats = () => {
    const totalProducts = products.length;
    const inStock = products.filter(p => p.totalStock > 0).length;
    const outOfStock = products.filter(p => p.totalStock === 0).length;
    const lowStock = getLowStockProducts().length;
    const totalStockValue = products.reduce(
      (total, product) => total + (product.totalStock * product.price), 
      0
    );

    return {
      totalProducts,
      inStock,
      outOfStock,
      lowStock,
      totalStockValue
    };
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    // Estados básicos
    products,
    categories,
    isLoading,
    error,
    
    // Operações principais
    fetchProducts,
    deleteProduct,
    
    // Funções utilitárias
    getProductStockDetails,
    getProductsByCategory,
    getLowStockProducts,
    getOutOfStockProducts,
    getProductStats
  };
}