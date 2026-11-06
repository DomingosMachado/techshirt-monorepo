package br.com.techshirt.modules.contact.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.contact.ContactEntity;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.repository.ContactRepository;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetContactByUser {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ContactResponseDTO> execute(HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + userId));

        List<ContactEntity> contacts = this.contactRepository.findByUser(userEntity);

        return contacts
                .stream()
                .map(ContactResponseDTO::new)
                .collect(Collectors.toList());
    }
}
