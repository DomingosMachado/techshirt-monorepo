package br.com.techshirt.modules.user.dto;

import br.com.techshirt.modules.user.UserEntity;

public record UserSummaryDTO(
        Long id,
        String name,
        String email
) {
    public UserSummaryDTO(UserEntity userEntity){
        this(
                userEntity.getId(),
                userEntity.getName(),
                userEntity.getEmail()
        );
    }
}
