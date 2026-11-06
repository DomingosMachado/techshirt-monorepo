package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import br.com.techshirt.modules.contact.ContactEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class GetContactById {

    @Autowired
    private ContactRepository contactRepository;

    public ContactResponseDTO execute(Long id) {
        Optional<ContactEntity> contactEntity = contactRepository.findById(id);
        return contactEntity.map(ContactResponseDTO::new)
                .orElseThrow(() -> new IdNotFoundException("Id [contacts] not found for id: " + id)); // Lançando exceção se não encontrar o contato
    }
}
