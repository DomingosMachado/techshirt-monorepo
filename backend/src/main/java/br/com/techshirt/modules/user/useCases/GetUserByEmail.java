package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.exception.EmailNotFoundException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetUserByEmail {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserResponseDTO execute(String email) {
        UserEntity userEntity = this.userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("Email [user] not found for email: " + email));

        return new UserResponseDTO(userEntity);
    }
}
