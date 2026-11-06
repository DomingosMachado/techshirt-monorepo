import React from 'react';
import styles from './qrCodeList.module.css';

function QRCodeImage({ qrCodeData, name }) {
  if (!qrCodeData) {
    return <div className={styles.qrCodePlaceholder}>QR</div>;
  }
  return <img src={`data:image/png;base64,${qrCodeData}`} alt={name} className={styles.qrCodeImage} />;
}

export function QRCodeList({ qrCodes, onEdit, onToggleStatus }) {
  return (
    <div className={styles.tableContainer}>
      <div className={styles.mobileQRCodeList}>
        {qrCodes.map(qrCode => (
          <div key={qrCode.id} className={styles.mobileQRCodeCard}>
            <div className={styles.qrCodeHeader}>
              <div className={styles.qrCodeImageContainer}>
                <QRCodeImage qrCodeData={qrCode.qrCodeData} name={qrCode.name} />
              </div>
              <div className={styles.qrCodeInfo}>
                <h3>{qrCode.name}</h3>
                <span className={qrCode.status ? styles.statusActive : styles.statusInactive}>
                  {qrCode.status ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
            <div className={styles.qrCodeMeta}>
                <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>Link</span>
                    <span className={styles.metaValue}>{qrCode.link}</span>
                </div>
            </div>
            <div className={styles.qrCodeActions}>
              <button onClick={() => onEdit(qrCode)} className={`${styles.actionButton} ${styles.editButton}`}>
                Editar
              </button>
              <button onClick={() => onToggleStatus(qrCode)} className={`${styles.actionButton} ${qrCode.status ? styles.deactivateButton : styles.activateButton}`}>
                {qrCode.status ? 'Desativar' : 'Ativar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>QR Code</th>
            <th>Nome</th>
            <th>Link</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {qrCodes.map(qrCode => (
            <tr key={qrCode.id}>
              <td className={styles.qrCodeImageContainer}><QRCodeImage qrCodeData={qrCode.qrCodeData} name={qrCode.name} /></td>
              <td>{qrCode.name}</td>
              <td className={styles.urlCell}><a href={qrCode.link} target="_blank" rel="noopener noreferrer">{qrCode.link}</a></td>
              <td><span className={qrCode.status ? styles.statusActive : styles.statusInactive}>{qrCode.status ? 'Ativo' : 'Inativo'}</span></td>
              <td>
                <div className={styles.actions}>
                  <button onClick={() => onEdit(qrCode)} className={`${styles.actionButton} ${styles.editButton}`}>Editar</button>
                  <button onClick={() => onToggleStatus(qrCode)} className={`${styles.actionButton} ${qrCode.status ? styles.deactivateButton : styles.activateButton}`}>
                    {qrCode.status ? 'Desativar' : 'Ativar'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}