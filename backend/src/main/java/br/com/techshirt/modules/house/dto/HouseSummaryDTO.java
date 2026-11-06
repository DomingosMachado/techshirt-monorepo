package br.com.techshirt.modules.house.dto;

import br.com.techshirt.modules.address.dto.AddressSummaryDTO;
import br.com.techshirt.modules.house.HouseEntity;

public record HouseSummaryDTO(
        Long id,
        String name,
        Integer number,
        String complement,
        AddressSummaryDTO address
) {
    public HouseSummaryDTO(HouseEntity houseEntity) {
        this (
                houseEntity.getId(),
                houseEntity.getName(),
                houseEntity.getNumber(),
                houseEntity.getComplement(),
                new AddressSummaryDTO(houseEntity.getAddress())
        );
    }
}
