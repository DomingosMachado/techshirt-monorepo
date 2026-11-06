package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.exception.ContactAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import br.com.techshirt.modules.contact.ContactEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveContact {

    @Autowired
    private ContactRepository contactRepository;

    public ContactResponseDTO execute(Long id) {
        ContactEntity contactEntity = contactRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [contact] not found for id: " + id));

        if(contactEntity.getStatus().equals(true)){
            throw new ContactAlreadyEnabledException("Contact already enabled");
        }

        contactEntity.setStatus(true);
        contactRepository.save(contactEntity);

        return new ContactResponseDTO(contactEntity);
    }
}
