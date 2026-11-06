export const statusOptions = ['WAITING', 'SHIPPED', 'CANCELED', 'FINISHED'];

export const getStatusLabel = (status) => {
  const statusLabels = {
    WAITING: 'Aguardando',
    SHIPPED: 'Enviado',
    CANCELED: 'Cancelado',
    FINISHED: 'Finalizado',
  };
  return statusLabels[status] || status;
};

export const getStatusClass = (status) => {
  const statusClasses = {
    WAITING: 'statusWaiting',
    SHIPPED: 'statusShipped',
    CANCELED: 'statusCanceled',
    FINISHED: 'statusFinished',
  };
  return statusClasses[status] || '';
};