package br.com.techshirt.modules.paymentMethod.dto;

import jakarta.validation.constraints.NotBlank;

public record PaymentMethodRequestDTO(
        @NotBlank(message = "The field [method] cannot be null or empty")
        String method
) {
}
