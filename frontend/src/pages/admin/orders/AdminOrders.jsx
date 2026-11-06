import React, { useState } from 'react';
// Componentes compartilhados
import { SuccessModal } from '../../../components/Admin/Shared/Modal/SuccessModal/SuccessModal';
import { SearchBar } from '../../../components/Admin/Shared/SearchBar/SearchBar';
import { Pagination } from '../../../components/Admin/Shared/Pagination/Pagination';
import { SortControls, SortableTableHeader } from '../../../components/Admin/Shared/SortControl/SortControls';
import { FilterControls } from '../../../components/Admin/Shared/FilterControls/FilterControls';

// Hooks compartilhados
import { useSearchAndPagination } from '../../../hooks/Admin/Shared/useSearchAndPagination';
import { useSorting } from '../../../hooks/Admin/Shared/useSorting';
import { useFiltering } from '../../../hooks/Admin/Shared/useFiltering';

// Componentes e hooks locais
import { useOrdersData } from '../../../hooks/Admin/useOrdersData';
import { OrderCard } from '../../../components/Admin/Orders/OrderCard/OrderCard';
import styles from './adminOrders.module.css';

// Util
import { getStatusLabel } from '../../../util/orderHelpers';
import { formatCurrency, formatDate } from '../../../util/formatters';

export function AdminOrders() {
  const { orders, isLoading, error, updateOrderStatus } = useOrdersData();
  const [isUpdateSuccessModalOpen, setIsUpdateSuccessModalOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  
  // Status devem estar em MAIÚSCULAS para corresponder com a API
  const statusOptions = ['WAITING', 'SHIPPED', 'FINISHED', 'CANCELED'];

  // Filtro por status
  const {
    filteredData: statusFilteredOrders,
    filterValue: statusFilter,
    setFilterValue: setStatusFilter,
    resetFilter: resetStatusFilter,
  } = useFiltering(orders, (order, value) => value === '' || order.status === value);

  // Busca
  const searchFields = [
    (order) => order.user.name,
    (order) => order.user.email,
    (order) => order.id.toString(),
    (order) => getStatusLabel(order.status),
  ];

  // Ordenação
  const {
    sortedData,
    sortBy,
    sortDirection,
    handleSort,
    sortConfig,
  } = useSorting(statusFilteredOrders, [
    { key: 'id', fn: (a, b) => a.id - b.id },
    { key: 'name', fn: (a, b) => a.user.name.localeCompare(b.user.name) },
    // { key: 'createdAt', fn: (a, b) => new Date(a.createdAt) - new Date(b.createdAt) },
    { key: 'total', fn: (a, b) => a.total - b.total },
    { key: 'status', fn: (a, b) => a.status.localeCompare(b.status) },
  ]);

  // Paginação e busca
  const {
    searchTerm,
    currentPage,
    totalPages,
    paginatedData,
    filteredItems,
    handlePageChange,
    handleSearchChange,
    resetSearch,
  } = useSearchAndPagination(sortedData, 10, searchFields);

  const handleStatusChange = async (orderId, newStatus) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      setIsUpdateSuccessModalOpen(true);
    }
  };

  const toggleCardExpansion = (orderId) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedCards(newExpanded);
  };

  if (isLoading) return <div className={styles.container}><p>Carregando pedidos...</p></div>;
  if (error) return <div className={styles.container}><p>{error}</p></div>;

  return (
    <>
      <SuccessModal
        isOpen={isUpdateSuccessModalOpen}
        onClose={() => setIsUpdateSuccessModalOpen(false)}
        message="Status do pedido atualizado!"
      />
      <div className={styles.container}>
        <h1>Gerenciamento de Pedidos</h1>

        <FilterControls
          filterLabel="Status"
          filterValue={statusFilter}
          onFilterChange={setStatusFilter}
          options={[
            { value: '', label: 'Todos' },
            ...statusOptions.map((status) => ({
              value: status,
              label: getStatusLabel(status),
            })),
          ]}
          onReset={resetStatusFilter}
        />

        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={resetSearch}
          placeholder="Pesquisar por cliente, ID ou status..."
          resultsCount={filteredItems}
          showResults={!!searchTerm}
        />

        <SortControls
          sortConfig={sortConfig}
          onSort={handleSort}
          options={[
            { key: 'id', label: 'ID' },
            { key: 'client', label: 'Cliente' },
            { key: 'date', label: 'Data' },
            { key: 'total', label: 'Total' },
            { key: 'status', label: 'Status' },
          ]}
        />

        <div className={styles.mobileOrdersList}>
          {paginatedData.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isExpanded={expandedCards.has(order.id)}
              onToggle={() => toggleCardExpansion(order.id)}
              onStatusChange={handleStatusChange}
              statusOptions={statusOptions}
            />
          ))}
        </div>

        <table className={styles.table} role="table" aria-label="Lista de pedidos">
          <thead>
            <tr>
              <SortableTableHeader label="Pedido ID" sortKey="id" sortConfig={sortConfig} onSort={handleSort} />
              <SortableTableHeader label="Cliente" sortKey="client" sortConfig={sortConfig} onSort={handleSort} />
              {/* <SortableTableHeader label="Data" sortKey="date" sortConfig={sortConfig} onSort={handleSort} /> */}
              <SortableTableHeader label="Total" sortKey="total" sortConfig={sortConfig} onSort={handleSort} />
              <SortableTableHeader label="Status" sortKey="status" sortConfig={sortConfig} onSort={handleSort} />
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order) => (
              <tr key={order.id}>
                <td>#{order.id}</td>
                <td>{order.user.name}</td>
                {/* <td>{formatDate(order.createdAt)}</td> */}
                <td>{formatCurrency(order.total)}</td>
                <td>
                  <select
                    className={styles.statusSelect}
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    aria-label={`Alterar status do pedido ${order.id}`}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
           <Pagination
             currentPage={currentPage}
             totalPages={totalPages}
             onPageChange={handlePageChange}
             itemsPerPage={10}
             totalItems={filteredItems}
           />
        )}

        {filteredItems === 0 && searchTerm && (
          <div className={styles.noResults}>
            <p>Nenhum pedido encontrado para "{searchTerm}"</p>
            <button className={styles.clearSearch} onClick={resetSearch}>
              Limpar pesquisa
            </button>
          </div>
        )}

        {orders.length === 0 && !searchTerm && (
          <div className={styles.noOrders}>
            <p>Nenhum pedido encontrado.</p>
          </div>
        )}
      </div>
    </>
  );
}