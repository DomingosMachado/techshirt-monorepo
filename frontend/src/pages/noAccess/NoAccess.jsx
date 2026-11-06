import React from 'react';
import { Link } from 'react-router-dom';
import styles from './noAccess.module.css';

export function NoAccess() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Acesso Negado</h1>
      <p className={styles.message}>
        Você não tem permissão para visualizar esta página.
      </p>
      <Link to="/" className={styles.link}>
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};
