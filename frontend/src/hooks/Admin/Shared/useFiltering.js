import { useState, useMemo, useCallback } from 'react';

export function useFiltering(data, filterConfigs = []) {
  const [activeFilters, setActiveFilters] = useState({});

  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return data;
    
    // Se não há filtros ativos, retornar todos os dados
    const hasActiveFilters = Object.values(activeFilters).some(value => 
      value !== '' && value !== null && value !== undefined
    );
    
    if (!hasActiveFilters) return data;
    
    return data.filter(item => {
      return Object.entries(activeFilters).every(([key, filterValue]) => {
        // Pular filtros vazios
        if (!filterValue || filterValue === '') return true;
        
        // Encontrar a configuração do filtro
        const filterConfig = filterConfigs.find(f => 
          f.key === key || 
          f.key === key.replace('Min', '').replace('Max', '')
        );
        
        if (!filterConfig) return true;
        
        // Aplicar lógica de filtragem baseada no tipo
        return applyFilter(item, key, filterValue, filterConfig);
      });
    });
  }, [data, activeFilters, filterConfigs]);

  const handleFilterChange = useCallback((key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  const clearFilter = useCallback((key) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  return {
    filteredData,
    activeFilters,
    handleFilterChange,
    clearFilters,
    clearFilter,
    hasActiveFilters: Object.values(activeFilters).some(v => v !== '' && v !== null)
  };
}

// Função auxiliar para aplicar filtros
function applyFilter(item, filterKey, filterValue, filterConfig) {
  const itemValue = getFilterValue(item, filterConfig.key);
  
  switch (filterConfig.type) {
    case 'select':
      return itemValue === filterValue;
      
    case 'text':
      return itemValue?.toLowerCase().includes(filterValue.toLowerCase());
      
    case 'date':
      const itemDate = new Date(itemValue);
      const filterDate = new Date(filterValue);
      return itemDate.toDateString() === filterDate.toDateString();
      
    case 'range':
      const numValue = parseFloat(itemValue);
      if (filterKey.endsWith('Min')) {
        return numValue >= parseFloat(filterValue);
      }
      if (filterKey.endsWith('Max')) {
        return numValue <= parseFloat(filterValue);
      }
      return true;
      
    default:
      return true;
  }
}

// Função auxiliar para extrair valores
function getFilterValue(obj, key) {
  switch (key) {
    case 'status':
      return obj.status;
    case 'client':
      return obj.user?.name || '';
    case 'date':
      return obj.createdAt;
    case 'total':
      return obj.total;
    default:
      // Suporte para caminhos aninhados
      return key.split('.').reduce((acc, part) => acc?.[part], obj);
  }
}