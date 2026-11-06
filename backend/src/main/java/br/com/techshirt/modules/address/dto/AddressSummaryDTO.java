package br.com.techshirt.modules.address.dto;

import br.com.techshirt.modules.address.AddressEntity;

public record AddressSummaryDTO(
        Long id,
        String name,
        String locality,
        String state,
        String cep
) {
    public AddressSummaryDTO(AddressEntity addressEntity) {
        this(
                addressEntity.getId(),
                addressEntity.getName(),
                addressEntity.getLocality(),
                addressEntity.getState(),
                addressEntity.getCep()
        );
    }
}