package br.com.techshirt.modules.product.dto;

import jakarta.validation.constraints.*;

public record ProductRequestDTO(
        @NotBlank(message = "The field [name] cannot be null or empty")
        String name,

        @NotBlank(message = "The field [description] cannot be null or empty")
        String description,

        @NotBlank(message = "The field [color] cannot be null or empty")
        String color,

        @NotBlank(message = "The field [material] cannot be null or empty")
        String material,

        String stamp,

        @NotNull(message = "The field [price] cannot be null")
        @Positive(message = "The field [price] cannot be negative")
        Double price,

        @NotNull(message = "The field [QrCodeId] cannot be null")
        Long qrCodeId,

        @NotNull(message = "The field [category] cannot be null")
        Long categoryId
) {}