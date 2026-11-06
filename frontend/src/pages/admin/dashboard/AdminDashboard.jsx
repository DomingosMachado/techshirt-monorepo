import React from 'react';
import { useDashboardData } from '../../../hooks/Admin/useDashboardData';
import { StatCard } from '../../../components/Admin/Dashboard/StatCard/StatCard';
import { formatCurrency } from '../../../util/formatters';
import styles from './adminDashboard.module.css';

export function AdminDashboard() {
  const { stats, isLoading, error } = useDashboardData();

  if (error) {
    return <div className={styles.container}><p className={styles.errorText}>{error}</p></div>;
  }

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.statsGrid}>
        <StatCard 
          title="Total de Pedidos" 
          value={stats.pedidos} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Total de Clientes" 
          value={stats.clientes} 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Faturamento Total" 
          value={formatCurrency(stats.faturamento)} 
          isLoading={isLoading} 
        />
      </div>
    </div>
  );
}