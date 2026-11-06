import React from 'react';
import styles from './pagination.module.css';

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0
}) {
  if (totalPages <= 1) return null;

  // Calcular startIndex baseado na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    return pages;
  };

  return (
    <>
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        <div className={styles.pageNumbers}>
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={`${styles.pageNumber} ${
                currentPage === pageNum ? styles.activePage : ''
              }`}
              onClick={() => onPageChange(pageNum)}
              aria-label={`Página ${pageNum}`}
              aria-current={currentPage === pageNum ? 'page' : undefined}
            >
              {pageNum}
            </button>
          ))}
        </div>

        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          Próxima →
        </button>
      </div>

      <div className={styles.paginationInfo}>
        <span>
          Mostrando {startIndex + 1} a{' '}
          {Math.min(startIndex + itemsPerPage, totalItems)} de {totalItems} pedidos
        </span>
      </div>
    </>
  );
}