import React, { useState } from 'react';

// Hooks customizados
import { useCustomers } from '../../../hooks/Admin/useCustomers';
import { useSearchAndPagination } from '../../../hooks/Admin/Shared/useSearchAndPagination';

// Componentes modulares
import { SearchBar } from '../../../components/Admin/Shared/SearchBar/SearchBar';
import { CustomerStats } from '../../../components/Admin/Customers/Stats/CustomerStats';
import { CustomerList } from '../../../components/Admin/Customers/List/CustomerList';
import { Pagination } from '../../../components/Admin/Shared/Pagination/Pagination';
import { CustomerModal } from '../../../components/Admin/Customers/Modal/CustomerModal';

import styles from './adminCustomers.module.css';

const ITEMS_PER_PAGE = 10;
const SEARCH_FIELDS = ['name', 'email', 'id'];

export function AdminCustomers() {
  const { customers, isLoading, error, fetchCustomerDetails } = useCustomers();

  const {
    searchTerm,
    handleSearchChange,
    paginatedData,
    currentPage,
    totalPages,
    handlePageChange,
    filteredItems,
    startIndex,
  } = useSearchAndPagination(customers, ITEMS_PER_PAGE, SEARCH_FIELDS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const handleViewDetails = async (customer) => {
    setIsLoadingDetails(true);
    setIsModalOpen(true);
    
    const details = await fetchCustomerDetails(customer.id);
    
    setSelectedCustomer(details ? details : customer);
    
    setIsLoadingDetails(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  if (isLoading) return <div className={styles.container}><p>Carregando clientes...</p></div>;
  if (error) return <div className={styles.container}><p>{error}</p></div>;

  return (
    <>
      <div className={styles.container}>
        <h1>Gerenciamento de Clientes</h1>

        <CustomerStats customers={customers} />

        <SearchBar 
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pesquisar por nome, email ou ID..."
          resultsCount={filteredItems}
        />
        
        {paginatedData.length > 0 ? (
          <>
            <CustomerList 
              customers={paginatedData}
              onViewDetails={handleViewDetails}
              isLoadingDetails={isLoadingDetails}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={ITEMS_PER_PAGE}
              totalItems={filteredItems}
            />
          </>
        ) : (
          <div className={styles.noResults}>
            <p>{searchTerm ? `Nenhum cliente encontrado para "${searchTerm}"` : 'Nenhum cliente cadastrado.'}</p>
            {searchTerm && (
              <button className={styles.clearSearch} onClick={() => handleSearchChange('')}>
                Limpar pesquisa
              </button>
            )}
          </div>
        )}
      </div>

      <CustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        customer={selectedCustomer}
      />
    </>
  );
}