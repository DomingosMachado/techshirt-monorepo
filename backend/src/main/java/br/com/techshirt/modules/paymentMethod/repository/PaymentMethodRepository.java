package br.com.techshirt.modules.paymentMethod.repository;

import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentMethodRepository extends JpaRepository<PaymentMethodEntity, Long> {
    Optional<PaymentMethodEntity> findByMethod(String method);
}
