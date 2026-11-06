import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const getPaymentMethodDetails = (methodType) => {
    const detailsMap = {
      'CREDIT_CARD': { name: 'Cartão de Crédito' },
      'DEBIT_CARD': { name: 'Cartão de Débito' },
      'PIX': { name: 'PIX' },
      'BANK_SLIP': { name: 'Boleto' },
    };
    return detailsMap[methodType] || { name: methodType };
};

export function usePublicPaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentMethods = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/paymentMethods/user');
      const mappedMethods = response.data.map(method => {
        const details = getPaymentMethodDetails(method.method);
        return {
          id: method.id,
          apiMethod: method.method,
          enabled: method.status,
          name: details.name,
        };
      });
      setPaymentMethods(mappedMethods);
    } catch (err) {
      setError("Não foi possível carregar os métodos de pagamento.");
      console.error("Erro ao buscar métodos de pagamento:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  return { paymentMethods, isLoading, error };
}