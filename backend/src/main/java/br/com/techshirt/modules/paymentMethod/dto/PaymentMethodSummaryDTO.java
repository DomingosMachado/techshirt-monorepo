package br.com.techshirt.modules.paymentMethod.dto;

import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;

public record PaymentMethodSummaryDTO(
        Long id,
        String method,
        Boolean status
) {
    public PaymentMethodSummaryDTO(PaymentMethodEntity paymentMethodEntity) {
        this(
                paymentMethodEntity.getId(),
                paymentMethodEntity.getMethod(),
                paymentMethodEntity.getStatus()
        );
    }
}
