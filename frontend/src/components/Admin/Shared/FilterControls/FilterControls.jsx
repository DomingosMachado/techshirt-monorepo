import React from 'react';
import { MdFilterList, MdClose } from 'react-icons/md';
import styles from './filterControls.module.css';

export function FilterControls({ 
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  showClearButton = true
}) {
  
  const hasActiveFilters = Object.values(activeFilters).some(value => 
    value !== '' && value !== null && value !== undefined
  );

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>
          <MdFilterList className={styles.filterIcon} />
          Filtros
        </h3>
        {showClearButton && hasActiveFilters && (
          <button
            className={styles.clearFiltersButton}
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros"
          >
            <MdClose />
            Limpar
          </button>
        )}
      </div>
      
      <div className={styles.filterGrid}>
        {filters.map((filter) => (
          <div key={filter.key} className={styles.filterItem}>
            <label 
              htmlFor={`filter-${filter.key}`}
              className={styles.filterLabel}
            >
              {filter.label}
            </label>
            
            {filter.type === 'select' ? (
              <select
                id={`filter-${filter.key}`}
                className={styles.filterSelect}
                value={activeFilters[filter.key] || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
              >
                <option value="">Todos</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : filter.type === 'date' ? (
              <input
                id={`filter-${filter.key}`}
                type="date"
                className={styles.filterInput}
                value={activeFilters[filter.key] || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
              />
            ) : filter.type === 'range' ? (
              <div className={styles.rangeInputs}>
                <input
                  type="number"
                  placeholder="Min"
                  className={styles.filterInput}
                  value={activeFilters[`${filter.key}Min`] || ''}
                  onChange={(e) => onFilterChange(`${filter.key}Min`, e.target.value)}
                />
                <span className={styles.rangeSeparator}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className={styles.filterInput}
                  value={activeFilters[`${filter.key}Max`] || ''}
                  onChange={(e) => onFilterChange(`${filter.key}Max`, e.target.value)}
                />
              </div>
            ) : (
              <input
                id={`filter-${filter.key}`}
                type="text"
                className={styles.filterInput}
                placeholder={filter.placeholder}
                value={activeFilters[filter.key] || ''}
                onChange={(e) => onFilterChange(filter.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
      
      {hasActiveFilters && (
        <div className={styles.activeFiltersInfo}>
          <span className={styles.activeFiltersText}>
            Filtros ativos: {Object.keys(activeFilters).filter(key => activeFilters[key]).length}
          </span>
        </div>
      )}
    </div>
  );
}