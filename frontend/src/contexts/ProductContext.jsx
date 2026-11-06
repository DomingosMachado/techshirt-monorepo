import React, { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        if (err.response && err.response.status === 403) {
            setError("Você não tem permissão para ver os produtos.");
        } else {
            setError("Não foi possível carregar os produtos. Verifique a conexão com a API.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};
