package br.com.techshirt.modules.roles.dto;

import br.com.techshirt.modules.roles.RolesEntity;

public record RolesResponseDTO(
        Long id,
        String name
) {
    public RolesResponseDTO(RolesEntity rolesEntity) {
        this(
                rolesEntity.getId(),
                rolesEntity.getName()
        );
    }
}
