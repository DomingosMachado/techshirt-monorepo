import React, { useState } from 'react';
import styles from './paymentCard.module.css';
import {
  MdLock,
  MdLockOpen,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

export function PaymentCard({ method, onToggleStatus }) {
  // Estado único para cada instância do card
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusText = (enabled) => (enabled ? "Habilitado" : "Desabilitado");
  const getStatusClass = (enabled) => (enabled ? styles.statusEnabled : styles.statusDisabled);

  const handleExpandToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className={`${styles.paymentCard} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardMain}>
          <div className={styles.cardIcon}>{method.icon}</div>
          <div className={styles.cardInfo}>
            <h3 className={styles.cardTitle}>{method.name}</h3>
            <span className={styles.cardType}>{method.apiMethod}</span>
          </div>
        </div>
        <div className={styles.cardControls}>
          <span className={`${styles.statusBadge} ${getStatusClass(method.enabled)}`}>
            {getStatusText(method.enabled)}
          </span>
          <button
            onClick={handleExpandToggle}
            className={styles.expandButton}
            aria-label={isExpanded ? 'Fechar' : 'Expandir'}
          >
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className={styles.cardExpanded}>
          <div className={styles.cardDescription}>
            <p>{method.description}</p>
          </div>
          <div className={styles.cardDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Taxa</span>
              <span className={styles.detailValue}>{method.processingFee}%</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Valor Mín.</span>
              <span className={styles.detailValue}>
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(method.minAmount)}
              </span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Valor Máx.</span>
              <span className={styles.detailValue}>
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(method.maxAmount)}
              </span>
            </div>
          </div>
          <div className={styles.cardActions}>
            <button
              onClick={() => onToggleStatus(method)}
              className={`${styles.toggleButton} ${method.enabled ? styles.disableButton : styles.enableButton}`}
            >
              {method.enabled ? <><MdLock /> Desabilitar</> : <><MdLockOpen /> Habilitar</>}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}