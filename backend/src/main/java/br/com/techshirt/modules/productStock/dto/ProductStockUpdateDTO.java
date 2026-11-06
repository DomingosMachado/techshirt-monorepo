package br.com.techshirt.modules.productStock.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductStockUpdateDTO(
        @Positive(message = "The field [stock] must be positive")
        @NotNull(message = "The field [stock] cannot be null")
        Integer stock
) {
}
