package br.com.techshirt.modules.orders.dto;

import br.com.techshirt.modules.house.dto.HouseSummaryDTO;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodSummaryDTO;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record OrdersResponseDTO(
        Long id,
        UserSummaryDTO user,
        Double discount,
        Integer installment,
        Double installmentPrice,
        Double total,
        PaymentMethodSummaryDTO paymentMethod,
        HouseSummaryDTO house,
        OrderStatus status,
        List<OrderItemResponseDTO> items
) {
    public OrdersResponseDTO(OrdersEntity ordersEntity) {
        this(
                ordersEntity.getId(),
                new UserSummaryDTO(ordersEntity.getUser()),
                ordersEntity.getDiscount(),
                ordersEntity.getInstallment(),
                ordersEntity.getInstallmentPrice(),
                ordersEntity.getTotal(),
                new PaymentMethodSummaryDTO(ordersEntity.getPaymentMethod()),
                new HouseSummaryDTO(ordersEntity.getHouse()),
                ordersEntity.getStatus(),
                ordersEntity.getItems() == null
                        ? Collections.emptyList()
                        : ordersEntity.getItems()
                            .stream()
                            .map(OrderItemResponseDTO::new)
                            .collect(Collectors.toList())
        );
    }
}
