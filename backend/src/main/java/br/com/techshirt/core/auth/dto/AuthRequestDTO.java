package br.com.techshirt.core.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthRequestDTO(
        @NotBlank(message = "The field [username] cannot be null or empty")
        String username,

        @NotBlank(message = "The field [password] cannot be null or empty")
        String password
) {
}
