import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export function useDashboardData() {
  const [stats, setStats] = useState({
    pedidos: 0,
    clientes: 0,
    faturamento: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [ordersResponse, usersResponse] = await Promise.all([
          api.get('/orders'),
          api.get('/users')
        ]);

        const orders = ordersResponse.data;
        const users = usersResponse.data;

        const totalFaturamento = orders.reduce((sum, order) => sum + order.total, 0);

        setStats({
          pedidos: orders.length,
          clientes: users.length,
          faturamento: totalFaturamento,
        });
      } catch (err) {
        setError('Não foi possível carregar os dados do dashboard.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  return { stats, isLoading, error };
}