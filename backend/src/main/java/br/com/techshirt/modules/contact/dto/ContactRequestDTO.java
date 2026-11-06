package br.com.techshirt.modules.contact.dto;

import jakarta.validation.constraints.NotBlank;

public record ContactRequestDTO(
        @NotBlank(message = "The field [message] cannot be null or empty")
        String message
){
}
