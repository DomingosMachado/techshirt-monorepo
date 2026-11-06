package br.com.techshirt.modules.address.dto;

import jakarta.validation.constraints.NotBlank;

public record AddressRequestDTO(
        @NotBlank(message = "The field [cep] cannot be null or empty")
        String cep
) {
}