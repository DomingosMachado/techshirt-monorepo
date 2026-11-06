import { useState, useEffect, useCallback } from 'react';
import { api } from '../../services/api'; 

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await api.get('/users');
      const filteredUsers = response.data.filter(
        (user) => user.email !== 'admin@example.com'
      );
      setCustomers(filteredUsers);
    } catch (err) {
      setError('Não foi possível carregar os clientes.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const fetchCustomerDetails = useCallback(async (customerId) => {
    try {
      const [customerResponse, ordersResponse] = await Promise.allSettled([
        api.get(`/users/${customerId}`),
        api.get(`/orders/user/${customerId}`),
      ]);

      let customerDetails = customerResponse.status === 'fulfilled' ? customerResponse.value.data : {};
      let orders = ordersResponse.status === 'fulfilled' ? ordersResponse.value.data : [];

      return { ...customerDetails, orders };
    } catch (err) {
      console.error('Erro ao carregar detalhes do cliente:', err);
      return null;
    }
  }, []);


  return { customers, isLoading, error, fetchCustomers, fetchCustomerDetails };
}