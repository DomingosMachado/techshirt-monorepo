import React from 'react';
import { Modal } from '../../../modal/Modal';
import styles from './CustomerModal.module.css';

export function CustomerModal({ isOpen, onClose, customer }) {
  if (!isOpen || !customer) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPermissions = (permissions) => {
    if (!permissions || permissions.length === 0) return 'Nenhuma permissão';
    return permissions.map(permission => 
      permission.name || permission.authority || 'Permissão desconhecida'
    ).join(', ');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>Detalhes do Cliente</h2>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>ID:</span>
            <span className={styles.value}>{customer.id}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Nome:</span>
            <span className={styles.value}>{customer.name || 'Não informado'}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{customer.email || 'Não informado'}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Status:</span>
            <span className={`${styles.value} ${styles.status} ${customer.status ? styles.active : styles.inactive}`}>
              {customer.status ? 'Ativo' : 'Inativo'}
            </span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Data de Criação:</span>
            <span className={styles.value}>{formatDate(customer.createdAt)}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Última Atualização:</span>
            <span className={styles.value}>{formatDate(customer.updatedAt)}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Permissões:</span>
            <span className={styles.value}>{formatPermissions(customer.permissions)}</span>
          </div>

          {customer.houses && customer.houses.length > 0 && (
            <div className={styles.addressSection}>
              <h3 className={styles.addressTitle}>Endereços Cadastrados</h3>
              {customer.houses.map((house, index) => (
                <div key={house.id || index} className={styles.addressItem}>
                  <div className={styles.addressInfo}>
                    <span className={styles.label}>CEP:</span>
                    <span className={styles.value}>{house.cep || 'Não informado'}</span>
                  </div>
                  <div className={styles.addressInfo}>
                    <span className={styles.label}>Número:</span>
                    <span className={styles.value}>{house.number || 'Não informado'}</span>
                  </div>
                  {house.complement && (
                    <div className={styles.addressInfo}>
                      <span className={styles.label}>Complemento:</span>
                      <span className={styles.value}>{house.complement}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {customer.orders && customer.orders.length > 0 && (
            <div className={styles.ordersSection}>
              <h3 className={styles.ordersTitle}>Pedidos Recentes</h3>
              <div className={styles.ordersList}>
                {customer.orders.slice(0, 5).map((order) => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderInfo}>
                      <span className={styles.label}>Pedido #</span>
                      <span className={styles.value}>{order.id}</span>
                    </div>
                    <div className={styles.orderInfo}>
                      <span className={styles.label}>Data:</span>
                      <span className={styles.value}>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className={styles.orderInfo}>
                      <span className={styles.label}>Total:</span>
                      <span className={styles.value}>
                        {new Intl.NumberFormat('pt-BR', { 
                          style: 'currency', 
                          currency: 'BRL' 
                        }).format(order.total || 0)}
                      </span>
                    </div>
                    <div className={styles.orderInfo}>
                      <span className={styles.label}>Status:</span>
                      <span className={`${styles.value} ${styles.orderStatus}`}>
                        {order.status || 'Pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {customer.orders.length > 5 && (
                <p className={styles.moreOrders}>
                  E mais {customer.orders.length - 5} pedido(s)...
                </p>
              )}
            </div>
          )}
        </div>

        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.closeButton}>
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}