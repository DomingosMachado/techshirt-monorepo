package br.com.techshirt.modules.qrcode.dto;

import jakarta.validation.constraints.NotBlank;

public record QrCodeUpdateDTO(
        @NotBlank(message = "The field [name] cannot be null or empty")
        String name
) {
}
