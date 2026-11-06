import React, { useMemo } from 'react';
import styles from './customerStats.module.css'; 

export function CustomerStats({ customers }) {
  const stats = useMemo(() => {
    const total = customers.length;
    const active = customers.filter((customer) => customer.status).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [customers]);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <h3>Total de Clientes</h3>
        <span className={styles.statNumber}>{stats.total}</span>
      </div>
      <div className={styles.statCard}>
        <h3>Clientes Ativos</h3>
        <span className={styles.statNumber}>{stats.active}</span>
      </div>
      <div className={styles.statCard}>
        <h3>Clientes Inativos</h3>
        <span className={styles.statNumber}>{stats.inactive}</span>
      </div>
    </div>
  );
}