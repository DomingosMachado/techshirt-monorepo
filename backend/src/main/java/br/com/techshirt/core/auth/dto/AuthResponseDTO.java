package br.com.techshirt.core.auth.dto;

public record AuthResponseDTO(
        String accessToken,
        Long expiresIn,
        Boolean twoFactorRequired
) {
}
