import React from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import styles from './searchBar.module.css';

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Pesquisar...",
  resultsCount,
  showResults = true,
  showClearButton = true,
  onClear,
  size = "medium", // "small", "medium", "large"
  fullWidth = true,
  autoFocus = false,
  disabled = false,
  inputRef
}) {
  const handleClear = () => {
    onChange('');
    if (onClear) onClear();
  };

  const sizeClass = styles[`searchBox--${size}`] || '';

  return (
    <div className={`${styles.searchContainer} ${fullWidth ? styles.fullWidth : ''}`}>
      <div className={`${styles.searchBox} ${sizeClass}`}>
        <MdSearch className={styles.searchIcon} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.searchInput}
          aria-label={placeholder}
          autoFocus={autoFocus}
          disabled={disabled}
        />
        {showClearButton && value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Limpar pesquisa"
          >
            <MdClose />
          </button>
        )}
      </div>
      {showResults && value && resultsCount !== undefined && (
        <div className={styles.searchResults}>
          <span className={styles.resultsText}>
            {resultsCount} resultado{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}
          </span>
        </div>
      )}
    </div>
  );
}