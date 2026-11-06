package br.com.techshirt.modules.address.dto;

import br.com.techshirt.modules.address.AddressEntity;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record AddressResponseDTO(
        Long id,
        String name,
        String neighborhood,
        String locality,
        String state,
        String cep,
        Boolean status,
        List<HouseResponseDTO> houses
) {
    public AddressResponseDTO(AddressEntity addressEntity) {
        this(
                addressEntity.getId(),
                addressEntity.getName(),
                addressEntity.getNeighborhood(),
                addressEntity.getLocality(),
                addressEntity.getState(),
                addressEntity.getCep(),
                addressEntity.getStatus(),
                addressEntity.getHouses() == null
                    ? Collections.emptyList()
                    : addressEntity.getHouses().stream().map(HouseResponseDTO::new).collect(Collectors.toList())
        );
    }
}