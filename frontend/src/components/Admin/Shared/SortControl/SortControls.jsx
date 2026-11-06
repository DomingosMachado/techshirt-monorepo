import React from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import styles from './sortControls.module.css';

export function SortControls({ 
  sortConfig, 
  onSort,
  options = [],
  isMobile = false 
}) {
  
  const handleSelectChange = (e) => {
    const [key, direction] = e.target.value.split('-');
    onSort(key, direction);
  };

  if (isMobile) {
    return (
      <div className={styles.mobileSortContainer}>
        <label htmlFor="sortSelect" className={styles.sortLabel}>
          Ordenar por:
        </label>
        <select
          id="sortSelect"
          className={styles.sortSelect}
          value={`${sortConfig.key}-${sortConfig.direction}`}
          onChange={handleSelectChange}
        >
          {options.map(option => (
            <React.Fragment key={option.key}>
              <option value={`${option.key}-asc`}>
                {option.label} ↑
              </option>
              <option value={`${option.key}-desc`}>
                {option.label} ↓
              </option>
            </React.Fragment>
          ))}
        </select>
      </div>
    );
  }

  return null;
}

// Componente para uso em cabeçalhos de tabela
export function SortableTableHeader({ 
  label, 
  sortKey, 
  sortConfig, 
  onSort,
  className = '' 
}) {
  const isActive = sortConfig.key === sortKey;
  const direction = isActive ? sortConfig.direction : null;

  const handleClick = () => {
    const newDirection = !isActive ? 'asc' : 
                        direction === 'asc' ? 'desc' : 'asc';
    onSort(sortKey, newDirection);
  };

  const getSortIcon = () => {
    if (!isActive) {
      return <FaSort className={styles.sortIcon} />;
    }
    return direction === 'asc' 
      ? <FaSortUp className={styles.sortIconActive} />
      : <FaSortDown className={styles.sortIconActive} />;
  };

  return (
    <th 
      className={`${styles.sortableHeader} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-sort={
        !isActive ? 'none' : 
        direction === 'asc' ? 'ascending' : 'descending'
      }
    >
      <div className={styles.headerContent}>
        <span>{label}</span>
        {getSortIcon()}
      </div>
    </th>
  );
}