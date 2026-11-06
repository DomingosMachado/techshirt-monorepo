import React from 'react';
import styles from './statCard.module.css';

export function StatCard({ title, value, isLoading }) {
  return (
    <div className={styles.statCard}>
      <h2>{title}</h2>
      {isLoading ? <p className={styles.loadingText}>Carregando...</p> : <p>{value}</p>}
    </div>
  );
}