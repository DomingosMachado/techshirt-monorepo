package br.com.techshirt.modules.productImage.dto;

import jakarta.validation.constraints.NotNull;

public record ProductImageRequestDTO(
        @NotNull(message = "The field [product] cannot be null")
        Long productId
) {
}
