package br.com.techshirt.modules.house.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record HouseRequestDTO(
        @NotBlank(message = "The field [name] cannot be null or empty")
        String name,

        @NotNull(message = "The field [number] cannot be null")
        @Positive(message = "The field [number] must be positive")
        Integer number,

        String complement,

        @NotBlank(message = "The field [cep] cannot be null or empty")
        String cep
) {
}