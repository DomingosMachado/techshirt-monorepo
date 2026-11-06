package br.com.techshirt.modules.orders.dto;

import br.com.techshirt.modules.orders.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrdersUpdateDTO(
        @NotNull(message = "The field [status] cannot be null")
        OrderStatus status
) {
}
