import React, { useMemo } from 'react';
import styles from './qrCodeStats.module.css';

export function QRCodeStats({ qrCodes }) {
  const stats = useMemo(() => {
    const total = qrCodes.length;
    const active = qrCodes.filter(qr => qr.status).length;
    const inactive = total - active;
    return { total, active, inactive };
  }, [qrCodes]);

  return (
    <div className={styles.statsContainer}>
      <div className={styles.statCard}>
        <h3>Total de QR Codes</h3>
        <span className={styles.statNumber}>{stats.total}</span>
      </div>
      <div className={styles.statCard}>
        <h3>QR Codes Ativos</h3>
        <span className={styles.statNumber}>{stats.active}</span>
      </div>
      <div className={styles.statCard}>
        <h3>QR Codes Inativos</h3>
        <span className={styles.statNumber}>{stats.inactive}</span>
      </div>
    </div>
  );
}