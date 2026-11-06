package br.com.techshirt.modules.orders.dto;

import br.com.techshirt.modules.productStock.enums.ProductSize;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record OrderItemRequestDTO(
        @NotNull(message = "The field [productId] cannot be null")
        Long productId,

        @NotNull(message = "The field [productSize] cannot be null")
        ProductSize productSize,

        @Positive(message = "The field [quantity] must be positive")
        @NotNull(message = "The field [quantity] cannot be null")
        Integer quantity
) {
}
