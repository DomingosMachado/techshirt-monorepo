import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useSizes() {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        // Busca todos os estoques de produtos
        const response = await api.get('/productsStock');
        
        // Filtra apenas os tamanhos disponíveis (com estoque > 0 e status ativo)
        const availableSizes = response.data
          .filter(stock => stock.stock > 0 && stock.status === true)
          .map(stock => stock.productSize)
          .filter((size, index, self) => self.indexOf(size) === index) // Remove duplicados
          .sort((a, b) => {
            // Ordem correta dos tamanhos
            const sizeOrder = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];
            return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
          });
          
        setSizes(availableSizes);
      } catch (err) {
        console.error('Erro ao buscar tamanhos:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSizes();
  }, []);

  return { sizes, loading, error };
}