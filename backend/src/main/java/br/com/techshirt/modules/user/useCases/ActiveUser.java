package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.core.email.user.WelcomeUserEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.UserAlreadyEnabledException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WelcomeUserEmail welcomeUserEmail;

    @Transactional
    public UserResponseDTO execute(Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + id));

        if(userEntity.getStatus().equals(true)){
            throw new UserAlreadyEnabledException("User already enabled");
        }

        userEntity.setStatus(true);

        this.userRepository.save(userEntity);

        welcomeUserEmail.execute(userEntity.getEmail(), userEntity.getName());

        return new UserResponseDTO(userEntity);
    }
}
