package br.com.techshirt.modules.qrcode.dto;

import jakarta.validation.constraints.NotBlank;

public record QrCodeRequestDTO(
        @NotBlank(message = "The field [name] cannot be null or empty")
        String name,

        @NotBlank(message = "The field [link] cannot be null or empty")
        String link
) {
}
