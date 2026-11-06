import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';
import {
  MdCreditCard,
  MdSmartphone,
  MdReceipt,
} from "react-icons/md";

const getPaymentMethodDetails = (methodType) => {
    const detailsMap = {
      'CREDIT_CARD': {
        name: 'Cartão de Crédito',
        icon: <MdCreditCard />,
        description: 'Pagamento com as principais bandeiras de cartão de crédito.',
        fee: 3.5,
        min: 1.0,
        max: 10000.0,
      },
      'DEBIT_CARD': {
        name: 'Cartão de Débito',
        icon: <MdCreditCard />,
        description: 'Pagamento direto da conta com seu cartão de débito.',
        fee: 2.0,
        min: 1.0,
        max: 5000.0,
      },
      'PIX': {
        name: 'PIX',
        icon: <MdSmartphone />,
        description: 'Pagamento instantâneo, disponível 24/7, via QR Code ou código.',
        fee: 0.0,
        min: 0.01,
        max: 50000.0,
      },
      'BANK_SLIP': {
        name: 'Boleto Bancário',
        icon: <MdReceipt />,
        description: 'Pagamento via boleto bancário com prazo de vencimento padrão.',
        fee: 2.5,
        min: 5.0,
        max: 20000.0,
      }
    };
    return detailsMap[methodType] || { name: methodType, icon: <MdCreditCard />, description: 'Método de pagamento.', fee: 0, min: 0, max: 0 };
};

export function usePaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentMethods = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/paymentMethods');
      const mappedMethods = response.data.map(method => {
        const details = getPaymentMethodDetails(method.method);
        return {
          id: method.id,
          apiMethod: method.method,
          enabled: method.status,
          name: details.name,
          icon: details.icon,
          description: details.description,
          processingFee: details.fee,
          minAmount: details.min,
          maxAmount: details.max,
        };
      });
      setPaymentMethods(mappedMethods);
    } catch (err) {
      setError("Não foi possível carregar os métodos de pagamento.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const togglePaymentMethodStatus = async (methodToUpdate) => {
    const isEnabling = !methodToUpdate.enabled;
    const actionText = isEnabling ? 'habilitado' : 'desabilitado';
    
    const endpoint = isEnabling
      ? `/paymentMethods/active/${methodToUpdate.id}`
      : `/paymentMethods/${methodToUpdate.id}`;
    
    const apiCall = isEnabling ? api.put : api.delete;

    try {
      await apiCall(endpoint);
      toast.success(`${methodToUpdate.name} foi ${actionText} com sucesso!`);
      await fetchPaymentMethods();
    } catch (err) {
      toast.error(`Erro ao ${actionText.slice(0, -1)}r o método de pagamento.`);
      console.error(`Erro ao mudar status para ${actionText}:`, err);
    }
  };

  return { paymentMethods, isLoading, error, togglePaymentMethodStatus };
}