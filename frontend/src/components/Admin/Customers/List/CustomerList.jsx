import React, { useState } from 'react';
import styles from './customerList.module.css'; 

export function CustomerList({ customers, onViewDetails, isLoadingDetails }) {
  const [expandedCards, setExpandedCards] = useState(new Set());

  const toggleCardExpansion = (customerId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedCards(newExpanded);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.mobileCustomerList}>
        {customers.map((customer) => (
          <div key={customer.id} className={styles.mobileCustomerCard}>
            <div className={styles.customerHeader}>
              <div className={styles.customerInfo}>
                <h3>{customer.name}</h3>
                <span className={styles.customerId}>#{customer.id}</span>
              </div>
              <span className={customer.status ? styles.statusActive : styles.statusInactive}>
                {customer.status ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className={styles.basicInfo}>
              <span className={styles.email}>{customer.email}</span>
            </div>
            {expandedCards.has(customer.id) && (
              <div className={styles.expandedDetails}>
              </div>
            )}
            <div className={styles.cardActions}>
              <button className={styles.expandButton} onClick={() => toggleCardExpansion(customer.id)}>
                {expandedCards.has(customer.id) ? '▲ Menos' : '▼ Mais'}
              </button>
              <button className={styles.actionButton} onClick={() => onViewDetails(customer)} disabled={isLoadingDetails}>
                Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>#{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>
                <span className={customer.status ? styles.statusActive : styles.statusInactive}>
                  {customer.status ? 'Ativo' : 'Inativo'}
                </span>
              </td>
              <td>
                <button className={styles.actionButton} onClick={() => onViewDetails(customer)} disabled={isLoadingDetails}>
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}