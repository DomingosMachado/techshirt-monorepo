package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.exception.ContactAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.techshirt.modules.contact.ContactEntity;

@Service
public class DisableContact {

    @Autowired
    private ContactRepository contactRepository;

    @Transactional
    public void execute(Long id) {
        ContactEntity contactEntity = contactRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [contact] not found for id: " + id));

        if(contactEntity.getStatus().equals(false)){
            throw new ContactAlreadyEnabledException("Contact already disabled");
        }

        contactEntity.setStatus(false);
        contactRepository.save(contactEntity);
    }
}
