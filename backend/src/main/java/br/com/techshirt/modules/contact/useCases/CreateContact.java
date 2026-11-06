package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.core.email.contact.ContactUserEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.dto.ContactRequestDTO;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import br.com.techshirt.modules.contact.ContactEntity;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CreateContact {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContactUserEmail contactUserEmail;

    @Transactional
    public ContactResponseDTO execute(ContactRequestDTO contactRequestDTO, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

         UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(()-> new IdNotFoundException("Id [contacts] not found for id: " + userId));

        ContactEntity contactEntity = new ContactEntity();

        contactEntity.setUser(userEntity);
        contactEntity.setMessage(contactRequestDTO.message());
        contactEntity.setStatus(true);
        contactEntity.setCreatedAt(LocalDateTime.now());

        contactRepository.save(contactEntity);

        contactUserEmail.execute(
                userEntity.getEmail(),
                userEntity.getName(),
                contactEntity.getMessage()
        );

        return new ContactResponseDTO(contactEntity);
    }
}
