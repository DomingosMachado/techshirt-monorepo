package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.exception.ContactDisabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.dto.ContactRequestDTO;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import br.com.techshirt.modules.contact.ContactEntity;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateContact {

    @Autowired
    private ContactRepository contactRepository;

    @Transactional
    public ContactResponseDTO execute(ContactRequestDTO contactRequestDTO, Long id) {
        ContactEntity contactEntity = this.contactRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [contact] not found for id: " + id)); // Lança exceção se não encontrar o contato

        if (contactEntity.getStatus() == true) {

            contactEntity.setMessage(contactRequestDTO.message());

            this.contactRepository.save(contactEntity);

            return new ContactResponseDTO(contactEntity);
        }
        else {
            throw new ContactDisabledException("It is not possible to update because the status is false");
        }
    }
}