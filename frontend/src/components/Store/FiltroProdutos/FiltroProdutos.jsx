import React, { useState, useEffect } from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { useSizes } from '../../../hooks/useSizes';
import styles from './filtroProdutos.module.css';

export function FiltroProdutos({ onFilterChange, isMobile, onClose, filtros }) {
  const { categories, loading: loadingCategories, error: errorCategories } = useCategories();
  const { sizes, loading: loadingSizes, error: errorSizes } = useSizes();
  
  // Estados locais que sincronizam com os filtros externos
  const [selectedCategories, setSelectedCategories] = useState(filtros?.categories || []);
  const [selectedSizes, setSelectedSizes] = useState(filtros?.sizes || []);
  const [priceFilter, setPriceFilter] = useState(filtros?.preco || '');
  
  // Estados para controlar abrir/fechar seções no mobile
  const [openSections, setOpenSections] = useState({
    categorias: true,
    tamanhos: true,
    preco: true
  });

  // Sincronizar com filtros externos quando mudarem
  useEffect(() => {
    if (filtros) {
      setSelectedCategories(filtros.categories || []);
      setSelectedSizes(filtros.sizes || []);
      setPriceFilter(filtros.preco || '');
    }
  }, [filtros]);

  const handleCategoryChange = (categoryId) => {
    const categoryIdStr = categoryId.toString();
    const newCategories = selectedCategories.includes(categoryIdStr)
      ? selectedCategories.filter(id => id !== categoryIdStr)
      : [...selectedCategories, categoryIdStr];
    
    setSelectedCategories(newCategories);
    onFilterChange({ 
      categories: newCategories, 
      sizes: selectedSizes,
      preco: priceFilter 
    });
  };

  const handleSizeChange = (size) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    onFilterChange({ 
      categories: selectedCategories, 
      sizes: newSizes,
      preco: priceFilter 
    });
  };

  const handlePriceChange = (price) => {
    const newPrice = price === priceFilter ? '' : price;
    setPriceFilter(newPrice);
    onFilterChange({ 
      categories: selectedCategories, 
      sizes: selectedSizes,
      preco: newPrice 
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setPriceFilter('');
    onFilterChange({ 
      categories: [], 
      sizes: [],
      preco: '' 
    });
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (loadingCategories || loadingSizes) {
    return <div className={styles.container}>Carregando filtros...</div>;
  }

  if (errorCategories || errorSizes) {
    return <div className={styles.container}>Erro ao carregar filtros.</div>;
  }

  const hasActiveFilters = selectedCategories.length > 0 || selectedSizes.length > 0 || priceFilter;

  const content = (
    <>
      <div className={styles.header}>
        <h3 className={styles.titulo} id="filtros-titulo">Filtros</h3>
        {hasActiveFilters && (
          <button 
            className={styles.limparButton} 
            onClick={clearFilters}
            aria-label="Limpar todos os filtros"
          >
            Limpar
          </button>
        )}
      </div>

      <div className={styles.filtrosList}>
        {/* Filtro de Categorias */}
        <div className={styles.filtroGrupo}>
          <button 
            className={styles.filtroTrigger}
            onClick={() => toggleSection('categorias')}
            aria-expanded={openSections.categorias}
            aria-controls="categorias-opcoes"
          >
            <h4 className={styles.filtroLabel}>Categorias</h4>
            <svg 
              className={`${styles.chevronIcon} ${openSections.categorias ? styles.iconRotate : ''}`} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div 
            id="categorias-opcoes"
            className={`${styles.opcoesContainer} ${openSections.categorias ? styles.opcoesContainerAberto : ''}`}
          >
            <div className={styles.opcoesWrapper}>
              <fieldset className={styles.fieldset}>
                <legend className="sr-only">Selecione as categorias</legend>
                {categories.filter(cat => cat.status).map((category) => (
                  <label key={category.id} className={styles.opcaoCheckbox}>
                    <input
                      type="checkbox"
                      value={category.id}
                      checked={selectedCategories.includes(category.id.toString())}
                      onChange={() => handleCategoryChange(category.id)}
                      aria-label={`Filtrar por categoria ${category.name}`}
                    />
                    <span className={styles.checkboxCustom} aria-hidden="true"></span>
                    <span>{category.name}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>
        </div>

        {/* Filtro de Tamanhos */}
        <div className={styles.filtroGrupo}>
          <button 
            className={styles.filtroTrigger}
            onClick={() => toggleSection('tamanhos')}
            aria-expanded={openSections.tamanhos}
            aria-controls="tamanhos-opcoes"
          >
            <h4 className={styles.filtroLabel}>Tamanhos</h4>
            <svg 
              className={`${styles.chevronIcon} ${openSections.tamanhos ? styles.iconRotate : ''}`} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div 
            id="tamanhos-opcoes"
            className={`${styles.opcoesContainer} ${openSections.tamanhos ? styles.opcoesContainerAberto : ''}`}
          >
            <div className={styles.opcoesWrapper}>
              <fieldset className={styles.fieldset}>
                <legend className="sr-only">Selecione os tamanhos</legend>
                {sizes.map((size) => (
                  <label key={size} className={styles.opcaoCheckbox}>
                    <input
                      type="checkbox"
                      value={size}
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      aria-label={`Filtrar por tamanho ${size}`}
                    />
                    <span className={styles.checkboxCustom} aria-hidden="true"></span>
                    <span>{size}</span>
                  </label>
                ))}
              </fieldset>
            </div>
          </div>
        </div>

        {/* Filtro de Preço */}
        <div className={styles.filtroGrupo}>
          <button 
            className={styles.filtroTrigger}
            onClick={() => toggleSection('preco')}
            aria-expanded={openSections.preco}
            aria-controls="preco-opcoes"
          >
            <h4 className={styles.filtroLabel}>Preço</h4>
            <svg 
              className={`${styles.chevronIcon} ${openSections.preco ? styles.iconRotate : ''}`} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div 
            id="preco-opcoes"
            className={`${styles.opcoesContainer} ${openSections.preco ? styles.opcoesContainerAberto : ''}`}
          >
            <div className={styles.opcoesWrapper}>
              <fieldset className={styles.fieldset}>
                <legend className="sr-only">Selecione a faixa de preço</legend>
                <label className={styles.opcaoRadio}>
                  <input
                    type="radio"
                    name="preco"
                    value="ate-30"
                    checked={priceFilter === 'ate-30'}
                    onChange={() => handlePriceChange('ate-30')}
                    aria-label="Filtrar preços até 30 reais"
                  />
                  <span className={styles.radioCustom} aria-hidden="true"></span>
                  <span>Até R$ 30</span>
                </label>
                <label className={styles.opcaoRadio}>
                  <input
                    type="radio"
                    name="preco"
                    value="30-40"
                    checked={priceFilter === '30-40'}
                    onChange={() => handlePriceChange('30-40')}
                    aria-label="Filtrar preços entre 30 e 40 reais"
                  />
                  <span className={styles.radioCustom} aria-hidden="true"></span>
                  <span>R$ 30 - R$ 40</span>
                </label>
                <label className={styles.opcaoRadio}>
                  <input
                    type="radio"
                    name="preco"
                    value="acima-40"
                    checked={priceFilter === 'acima-40'}
                    onChange={() => handlePriceChange('acima-40')}
                    aria-label="Filtrar preços acima de 40 reais"
                  />
                  <span className={styles.radioCustom} aria-hidden="true"></span>
                  <span>Acima de R$ 40</span>
                </label>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // Versão Mobile
  if (isMobile) {
    return (
      <div 
        className={styles.mobileOverlay} 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filtros-titulo"
      >
        <div className={styles.mobileContainer} onClick={(e) => e.stopPropagation()}>
          {content}
          <div className={styles.mobileFooter}>
            <button 
              className={styles.limparButtonMobile} 
              onClick={clearFilters}
              disabled={!hasActiveFilters}
            >
              Limpar
            </button>
            <button className={styles.applyButton} onClick={onClose}>
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <div className={styles.container}>{content}</div>;
}