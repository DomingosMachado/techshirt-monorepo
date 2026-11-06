package br.com.techshirt.modules.contact.dto;

import br.com.techshirt.modules.contact.ContactEntity;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;

public record ContactResponseDTO(
        Long id,
        String message,
        Boolean status,
        UserSummaryDTO user
) {
    public ContactResponseDTO(ContactEntity contactEntity) {
        this(
                contactEntity.getId(),
                contactEntity.getMessage(),
                contactEntity.getStatus(),
                new UserSummaryDTO(contactEntity.getUser())
        );
    }
}
