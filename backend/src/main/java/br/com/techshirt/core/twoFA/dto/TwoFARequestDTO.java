package br.com.techshirt.core.twoFA.dto;

import jakarta.validation.constraints.NotBlank;

public record TwoFARequestDTO(
        @NotBlank(message = "The field [code] cannot be null or empty")
        String code
) {
}
