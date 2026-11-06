package br.com.techshirt.modules.category.dto;

import jakarta.validation.constraints.NotBlank;

public record CategoryRequestDTO(
        @NotBlank(message = "The field [name] cannot be null or empty")
        String name
) {
}
