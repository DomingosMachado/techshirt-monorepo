import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

// Enum de tamanhos que corresponde ao ProductSize do backend
const PRODUCT_SIZES = [
  { id: 'PP', name: 'PP' },
  { id: 'P', name: 'P' },
  { id: 'M', name: 'M' },
  { id: 'G', name: 'G' },
  { id: 'GG', name: 'GG' },
  { id: 'XGG', name: 'XGG' }
];

export function useStockManagement() {
  const [productStocks, setProductStocks] = useState([]);
  const [newStocks, setNewStocks] = useState([]);
  const [isManagingStocks, setIsManagingStocks] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [availableSizes] = useState(PRODUCT_SIZES);

  const resetStockForm = () => {
    setProductStocks([]);
    setNewStocks([]);
    setIsManagingStocks(false);
    setCurrentProductId(null);
  };

  // Carregar estoques de um produto específico
  const loadProductStocks = async (productId) => {
    try {
      setCurrentProductId(productId);
      
      // Carregar estoques existentes do produto
      const response = await api.get(`/productsStock/product/${productId}`);
      setProductStocks(response.data || []);
      
      // Limpar novos estoques
      setNewStocks([]);
      
    } catch (err) {
      console.error('Erro ao carregar estoques:', err);
      toast.error('Erro ao carregar informações de estoque.');
      setProductStocks([]);
    }
  };

  // Manipular mudanças em novos estoques
  const handleNewStockChange = (index, field, value) => {
    setNewStocks(prev => prev.map((stock, i) => 
      i === index ? { ...stock, [field]: value } : stock
    ));
  };

  // Manipular mudanças em estoques existentes
  const handleExistingStockChange = (stockId, field, value) => {
    setProductStocks(prev => prev.map(stock => 
      stock.id === stockId ? { ...stock, [field]: value } : stock
    ));
  };

  // Adicionar nova entrada de estoque
  const addNewStockEntry = () => {
    const newStock = {
      productSize: '',
      stock: 0,
      tempId: Date.now() // ID temporário para identificação
    };
    setNewStocks(prev => [...prev, newStock]);
  };

  // Remover entrada de novo estoque
  const removeNewStockEntry = (index) => {
    setNewStocks(prev => prev.filter((_, i) => i !== index));
  };

  // Obter tamanhos disponíveis para novos estoques
  const getAvailableSizesForNew = () => {
    // Tamanhos já utilizados nos estoques existentes
    const usedSizes = productStocks.map(stock => stock.productSize);
    
    // Tamanhos já selecionados nos novos estoques
    const selectedNewSizes = newStocks
      .map(stock => stock.productSize)
      .filter(size => size); // Remove valores vazios
    
    // Filtrar tamanhos disponíveis
    return availableSizes.filter(size => 
      !usedSizes.includes(size.id) && !selectedNewSizes.includes(size.id)
    );
  };

  // Criar novos estoques para um produto
  const createProductStocks = async (productId, stocksToCreate) => {
    const results = [];
    
    for (const stock of stocksToCreate) {
      if (!stock.productSize || stock.stock === '' || stock.stock < 0) {
        toast.error('Todos os campos de estoque devem ser preenchidos corretamente.');
        results.push({ success: false });
        continue;
      }

      try {
        const stockData = {
          productId: productId,
          productSize: stock.productSize,
          stock: Number(stock.stock)
        };

        await api.post('/productsStock', stockData);
        results.push({ success: true });
      } catch (err) {
        console.error('Erro ao criar estoque:', err);
        toast.error(`Erro ao criar estoque: ${err.response?.data?.message || 'Erro desconhecido'}`);
        results.push({ success: false });
      }
    }
    
    return results;
  };

  // Atualizar estoques existentes
  const updateProductStocks = async () => {
    const results = [];
    
    for (const stock of productStocks) {
      try {
        // A API espera: PUT /productsStock/{productId}/{productSize}
        await api.put(`/productsStock/${currentProductId}/${stock.productSize}`, {
          stock: Number(stock.stock)
        });
        results.push({ success: true });
      } catch (err) {
        console.error('Erro ao atualizar estoque:', err);
        toast.error(`Erro ao atualizar estoque: ${err.response?.data?.message || 'Erro desconhecido'}`);
        results.push({ success: false });
      }
    }
    
    return results;
  };

  // Deletar um estoque específico
  const deleteProductStock = async (stockId) => {
    if (window.confirm('Tem certeza que deseja remover este item do estoque?')) {
      try {
        await api.delete(`/productsStock/${stockId}`);
        toast.success('Item de estoque removido com sucesso!');
        return true;
      } catch (err) {
        console.error('Erro ao remover estoque:', err);
        toast.error('Erro ao remover item do estoque.');
        return false;
      }
    }
    return false;
  };

  // Salvar todas as alterações de estoque
  const saveAllStockChanges = async () => {
    const results = [];
    
    // Atualizar estoques existentes
    if (productStocks.length > 0) {
      const updateResults = await updateProductStocks();
      results.push(...updateResults);
    }
    
    // Criar novos estoques
    if (newStocks.length > 0) {
      const createResults = await createProductStocks(currentProductId, newStocks);
      results.push(...createResults);
    }
    
    // Verificar se todas as operações foram bem-sucedidas
    const hasErrors = results.some(r => !r.success);
    
    if (!hasErrors && results.length > 0) {
      toast.success('Estoques atualizados com sucesso!');
      // Recarregar estoques após salvar
      await loadProductStocks(currentProductId);
      return true;
    } else if (results.length === 0) {
      toast.info('Nenhuma alteração foi feita.');
      return true;
    }
    
    return false;
  };

  return {
    // Estados
    productStocks,
    newStocks,
    isManagingStocks,
    currentProductId,
    availableSizes,
    
    // Setters
    setIsManagingStocks,
    
    // Operações principais
    loadProductStocks,
    saveAllStockChanges,
    resetStockForm,
    
    // Manipuladores de mudança
    handleNewStockChange,
    handleExistingStockChange,
    
    // Operações de entrada
    addNewStockEntry,
    removeNewStockEntry,
    
    // Utilitários
    getAvailableSizesForNew,
    
    // Operações CRUD individuais
    createProductStocks,
    updateProductStocks,
    deleteProductStock
  };
}