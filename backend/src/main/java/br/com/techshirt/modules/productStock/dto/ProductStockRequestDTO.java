package br.com.techshirt.modules.productStock.dto;

import br.com.techshirt.modules.productStock.enums.ProductSize;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductStockRequestDTO(
        @NotNull(message = "The field [productStock] cannot be null")
        ProductSize productSize,

        @NotNull(message = "The field [productId] cannot be null")
        Long productId,

        @Positive(message = "The field [stock] must be positive")
        @NotNull(message = "The field [stock] cannot be null")
        Integer stock
) {
}
