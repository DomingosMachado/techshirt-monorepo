package br.com.techshirt.core.twoFA.dto;

public record TwoFAResponseDTO(
        String secret,
        String qrCodeImageUri
) {
}
