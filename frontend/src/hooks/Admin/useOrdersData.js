import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/api';

export function useOrdersData() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/orders');
      setOrders(
        response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
    } catch (err) {
      setError('Não foi possível carregar os pedidos.');
      console.error('Erro ao buscar pedidos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // A API espera o status em MAIÚSCULAS
      await api.put(`/orders/${orderId}`, { status: newStatus });
      
      // Atualiza o estado local
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      toast.success(`Pedido #${orderId} atualizado com sucesso!`);
      return { success: true };
    } catch (err) {
      toast.error(`Erro ao atualizar o pedido #${orderId}.`);
      console.error('Erro ao atualizar status:', err.response?.data || err.message);
      return { success: false };
    }
  };

  return { orders, isLoading, error, updateOrderStatus };
}