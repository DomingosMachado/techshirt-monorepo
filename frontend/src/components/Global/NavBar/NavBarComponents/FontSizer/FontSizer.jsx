import React from 'react';
import { useFontSize } from '../../../../../contexts/FontSizeContext';
import styles from './FontSizer.module.css';

export function FontSizer() {
  const { increase, decrease, reset } = useFontSize();

  return (
    <div className={styles.fontSizerContainer}>
      <button onClick={decrease} aria-label="Diminuir tamanho da fonte" title="Diminuir Fonte">A-</button>
      <button onClick={reset} aria-label="Restaurar tamanho da fonte padrão" title="Fonte Padrão">A</button>
      <button onClick={increase} aria-label="Aumentar tamanho da fonte" title="Aumentar Fonte">A+</button>
    </div>
  );
}