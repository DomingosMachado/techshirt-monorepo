import React from "react";
import { usePaymentMethods } from "../../../hooks/Admin/usePaymentMethods";
import { PaymentCard } from "../../../components/Admin/Payment/PaymentCard";
import styles from "./adminPayments.module.css";
import { MdCreditCard } from "react-icons/md";

export function AdminPayments() {
  const { paymentMethods, isLoading, error, togglePaymentMethodStatus } = usePaymentMethods();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Carregando métodos de pagamento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Métodos de Pagamento</h1>
        <p className={styles.subtitle}>
          Habilite ou desabilite os métodos de pagamento disponíveis para os seus clientes.
        </p>
      </div>

      {paymentMethods.length > 0 ? (
        <div className={styles.paymentGrid}>
          {paymentMethods.map((method) => (
            <PaymentCard
              key={method.id}
              method={method}
              onToggleStatus={togglePaymentMethodStatus}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}><MdCreditCard /></div>
          <h3>Nenhum método encontrado</h3>
          <p>Não há métodos de pagamento para serem exibidos.</p>
        </div>
      )}
    </div>
  );
}