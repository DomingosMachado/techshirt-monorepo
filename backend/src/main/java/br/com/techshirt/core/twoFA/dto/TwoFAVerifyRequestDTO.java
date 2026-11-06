package br.com.techshirt.core.twoFA.dto;

public record TwoFAVerifyRequestDTO(
        String tempToken,
        String code
) {
}
