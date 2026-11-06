package br.com.techshirt.modules.orders.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

public record OrdersRequestDTO(
        @PositiveOrZero(message = "The field [discount] cannot be negative")
        @NotNull(message = "The field [discount] cannot be null")
        Double discount,

        @Max(value = 12, message = "The field [installment] have the value 12 like limit")
        @Min(value = 1, message = "The field [installment] have the value 1 like base")
        @NotNull(message = "The field [installment] cannot be null")
        Integer installment,

        @NotNull(message = "The field [paymentMethodId] cannot be null")
        Long paymentMethodId,

        @NotNull(message = "The field [houseId] cannot be null")
        Long houseId,

        @NotNull(message = "The field [products] cannot be null")
        List<OrderItemRequestDTO> products
) {
}
