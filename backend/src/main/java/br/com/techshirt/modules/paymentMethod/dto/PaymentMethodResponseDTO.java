package br.com.techshirt.modules.paymentMethod.dto;

import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record PaymentMethodResponseDTO(
        Long id,
        String method,
        Boolean status,
        List<OrdersResponseDTO> orders
) {
    public PaymentMethodResponseDTO(PaymentMethodEntity paymentMethodEntity) {
        this(
                paymentMethodEntity.getId(),
                paymentMethodEntity.getMethod(),
                paymentMethodEntity.getStatus(),
                paymentMethodEntity.getOrders() == null
                    ? Collections.emptyList()
                    : paymentMethodEntity.getOrders().stream().map(OrdersResponseDTO::new).collect(Collectors.toList())
        );
    }
}
