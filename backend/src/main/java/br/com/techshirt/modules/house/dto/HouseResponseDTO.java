package br.com.techshirt.modules.house.dto;

import br.com.techshirt.modules.address.dto.AddressSummaryDTO;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;

public record HouseResponseDTO(
        Long id,
        String name,
        Integer number,
        String complement,
        String cep,
        Boolean status,
        UserSummaryDTO user,
        AddressSummaryDTO address
) {
    public HouseResponseDTO(HouseEntity houseEntity) {
        this(
                houseEntity.getId(),
                houseEntity.getName(),
                houseEntity.getNumber(),
                houseEntity.getComplement(),
                houseEntity.getCep(),
                houseEntity.getStatus(),
                new UserSummaryDTO(houseEntity.getUser()),
                new AddressSummaryDTO(houseEntity.getAddress())
        );
    }
}