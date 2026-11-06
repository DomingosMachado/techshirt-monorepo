import React from 'react';
import { CardProduto } from './CardProdutos/CardProdutos';
import styles from './gridProdutos.module.css';

export function GridProdutos({ produtos, onOpenModal }) {
  if (!produtos || produtos.length === 0) {
    return (
      <div className={styles.nenhumProduto} role="status" aria-live="polite">
        <h3>Nenhum produto encontrado</h3>
        <p>Tente ajustar os filtros ou o termo de pesquisa.</p>
      </div>
    );
  }

  return (
    <section className={styles.container} aria-labelledby="produtos-titulo">
      <div className={styles.resultadoInfo} role="status" aria-live="polite">
        <span id="produtos-titulo" className={styles.contadorProdutos}>
          {produtos.length} {produtos.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </span>
      </div>
      
      <ul className={styles.grid} aria-label={`Lista de ${produtos.length} produtos`}>
        {produtos.map(item => (
          <li key={item.id}>
            <CardProduto product={item} onOpenModal={onOpenModal} />
          </li>
        ))}
      </ul>
    </section>
  );
}