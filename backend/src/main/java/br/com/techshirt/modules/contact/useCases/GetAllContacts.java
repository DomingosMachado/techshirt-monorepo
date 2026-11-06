package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllContacts {

    @Autowired
    private ContactRepository contactRepository;

    public List<ContactResponseDTO> execute() {
        return contactRepository.findAll().stream()
                .map(ContactResponseDTO::new) // Convertendo cada entidade para DTO
                .collect(Collectors.toList());
    }
}
