import styles from './ordenacaoProdutos.module.css';

export function OrdenacaoProdutos({ isOpen, onClose, onSortChange, currentSort }) {
  if (!isOpen) return null;

  const opcoesOrdenacao = [
    { key: 'padrao', label: 'Padrão' },
    { key: 'preco-asc', label: 'Menor Preço' },
    { key: 'preco-desc', label: 'Maior Preço' },
    { key: 'nome-asc', label: 'Nome (A-Z)' },
  ];

  const handleSelectOption = (key) => {
    onSortChange(key);
    onClose();
  };

  const handleKeyDown = (event, key) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSelectOption(key);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.titulo} id="ordenacao-titulo">Ordenar por</h2>
          <button 
            onClick={onClose} 
            className={styles.closeButton} 
            aria-label="Fechar ordenação"
            autoFocus
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className={styles.listaOpcoes} role="radiogroup" aria-labelledby="ordenacao-titulo">
          {opcoesOrdenacao.map(opcao => (
            <div key={opcao.key} className={styles.opcaoItem}>
              <button
                className={`${styles.opcaoButton} ${currentSort === opcao.key ? styles.opcaoAtiva : ''}`}
                onClick={() => handleSelectOption(opcao.key)}
                onKeyDown={(e) => handleKeyDown(e, opcao.key)}
                role="radio"
                aria-checked={currentSort === opcao.key}
                aria-label={`Ordenar por ${opcao.label}`}
              >
                <span className={styles.radioIndicator} aria-hidden="true">
                  {currentSort === opcao.key && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  )}
                </span>
                {opcao.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}