package br.com.techshirt.modules.product.dto;

import jakarta.validation.constraints.Positive;

public record ProductUpdateDTO(
        String name,
        String description,
        String color,
        String material,
        String stamp,

        @Positive(message = "The field [price] cannot be negative")
        Double price,

        @Positive(message = "The field [stock] cannot be negative")
        Integer stock,

        Long categoryId,

        Long qrCodeId
) {
}