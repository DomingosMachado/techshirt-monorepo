import React from 'react';
import { getStatusLabel, getStatusClass } from '../../../../util/orderHelpers';
import { formatCurrency, formatDate } from '../../../../util/formatters';
import styles from './orderCard.module.css';

export function OrderCard({ 
  order, 
  isExpanded, 
  onToggle, 
  onStatusChange,
  statusOptions 
}) {
  return (
    <div className={styles.mobileOrderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderInfo}>
          <h3>Pedido #{order.id}</h3>
          <span className={styles.customerName}>{order.user.name}</span>
        </div>
        <span className={`${styles.statusBadge} ${styles[getStatusClass(order.status)]}`}>
          {getStatusLabel(order.status)}
        </span>
      </div>

      <div className={styles.basicInfo}>
        <div className={styles.orderMeta}>
          <span className={styles.metaLabel}>Total:</span>
          <span className={styles.metaValue}>{formatCurrency(order.total)}</span>
        </div>
        {/* <div className={styles.dateInfo}>
          <span className={styles.dateValue}>{formatDate(order.createdAt)}</span>
        </div> */}
      </div>

      {isExpanded && (
        <div className={styles.expandedDetails}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email do Cliente:</span>
            <span className={styles.detailValue}>{order.user.email || 'N/A'}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Criado em:</span>
            {/* <span className={styles.detailValue}>
              {new Date(order.createdAt).toLocaleString('pt-BR')}
            </span> */}
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Itens:</span>
            <span className={styles.detailValue}>
              {order.items?.length || 0} item(s)
            </span>
          </div>
        </div>
      )}

      <div className={styles.cardActions}>
        <button
          className={styles.expandButton}
          onClick={onToggle}
          aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}
        >
          {isExpanded ? '▲ Menos' : '▼ Mais'}
        </button>
        <select
          className={styles.statusSelectMobile}
          value={order.status}
          onChange={(e) => onStatusChange(order.id, e.target.value)}
          aria-label={`Alterar status do pedido ${order.id}`}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {getStatusLabel(status)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}