import { useState, useMemo, useCallback } from 'react';

export function useSorting(data, defaultSortConfig = { key: 'id', direction: 'desc' }) {
  const [sortConfig, setSortConfig] = useState(defaultSortConfig);

  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return data;
    
    let sortableData = [...data];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = getSortValue(a, sortConfig.key);
        let bValue = getSortValue(b, sortConfig.key);
        
        // Tratar valores null/undefined
        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        
        // Comparação para strings
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }
        
        // Comparação para datas
        if (aValue instanceof Date && bValue instanceof Date) {
          aValue = aValue.getTime();
          bValue = bValue.getTime();
        }
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = useCallback((key, direction = null) => {
    if (direction) {
      // Se a direção foi especificada, usar ela
      setSortConfig({ key, direction });
    } else {
      // Toggle entre asc/desc
      let newDirection = 'asc';
      if (sortConfig.key === key && sortConfig.direction === 'asc') {
        newDirection = 'desc';
      }
      setSortConfig({ key, direction: newDirection });
    }
  }, [sortConfig]);

  const resetSort = useCallback(() => {
    setSortConfig(defaultSortConfig);
  }, [defaultSortConfig]);

  return {
    sortedData,
    sortConfig,
    handleSort,
    resetSort
  };
}

// Função auxiliar para extrair valores de objetos aninhados
function getSortValue(obj, key) {
  switch (key) {
    case 'id':
      return obj.id;
    case 'client':
      return obj.user?.name || '';
    case 'date':
      return obj.createdAt ? new Date(obj.createdAt) : null;
    case 'total':
      return obj.total || 0;
    case 'status':
      return obj.status || '';
    default:
      // Suporte para caminhos aninhados (ex: 'user.email')
      return key.split('.').reduce((acc, part) => acc?.[part], obj);
  }
}