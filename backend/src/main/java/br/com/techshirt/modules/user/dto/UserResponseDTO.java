package br.com.techshirt.modules.user.dto;

import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.user.UserEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record UserResponseDTO(
    Long id,
    String name,
    String email,
    Boolean status,
    List<OrdersResponseDTO> orders,
    List<ContactResponseDTO> contacts,
    List<HouseResponseDTO> houses
) {
    public UserResponseDTO(UserEntity userEntity){
        this(userEntity.getId(),
             userEntity.getName(),
             userEntity.getEmail(),
             userEntity.getStatus(),
             userEntity.getOrders() == null
                     ? Collections.emptyList()
                     : userEntity.getOrders().stream().map(OrdersResponseDTO::new).collect(Collectors.toList()),
             userEntity.getContacts() == null
                     ? Collections.emptyList()
                     : userEntity.getContacts().stream().map(ContactResponseDTO::new).collect(Collectors.toList()),
             userEntity.getHouses() == null
                     ? Collections.emptyList()
                     : userEntity.getHouses().stream().map(HouseResponseDTO::new).collect(Collectors.toList())
        );
    }
}
