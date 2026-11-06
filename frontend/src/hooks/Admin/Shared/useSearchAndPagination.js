import { useState, useMemo, useCallback } from 'react';

export function useSearchAndPagination(
  data, 
  itemsPerPage = 10, 
  searchFields = [],
  options = {}
) {
  const {
    initialPage = 1,
    resetPageOnSearch = true,
    caseInsensitive = true,
    debounceTime = 0, // adicionar debounce se necessário
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(initialPage);

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const searchLower = caseInsensitive ? searchTerm.toLowerCase() : searchTerm;

    return data.filter((item) => {
      return searchFields.some((field) => {
        const value = typeof field === 'function' ? field(item) : item[field];
        const stringValue = value?.toString() || '';
        const compareValue = caseInsensitive ? stringValue.toLowerCase() : stringValue;
        return compareValue.includes(searchLower);
      });
    });
  }, [data, searchTerm, searchFields, caseInsensitive]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    if (resetPageOnSearch) {
      setCurrentPage(1);
    }
  }, [resetPageOnSearch]);

  const resetSearch = useCallback(() => {
    setSearchTerm('');
    setCurrentPage(initialPage);
  }, [initialPage]);

  return {
    searchTerm,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    
    filteredData,
    paginatedData,
    
    handlePageChange,
    handleSearchChange,
    resetSearch,
    
    hasResults: filteredData.length > 0,
    isSearching: searchTerm.length > 0,
    totalItems: data.length,
    filteredItems: filteredData.length,
  };
}