package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.core.email.user.WelcomeUserEmail;
import br.com.techshirt.exception.AuthInvalidException;
import br.com.techshirt.exception.EmailAlreadyExistsException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserRequestDTO;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
public class CreateUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private WelcomeUserEmail welcomeUserEmail;

    @Transactional
    public UserResponseDTO execute(UserRequestDTO userRequestDTO, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject != null) {
            throw new AuthInvalidException("There is already an authenticated user, it is not possible to create a new one");
        }

        this.userRepository.findByEmail(userRequestDTO.email())
                .ifPresent(user -> {
                    throw new EmailAlreadyExistsException("Email already exists");
                });

        RolesEntity userRole = this.rolesRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new IdNotFoundException("Name [roles] not found for name: ROLE_USER"));

        UserEntity userEntity = new UserEntity();
        userEntity.setName(userRequestDTO.name());
        userEntity.setPassword(bCryptPasswordEncoder.encode(userRequestDTO.password()));
        userEntity.setEmail(userRequestDTO.email());
        userEntity.setIsTwoFactorEnabled(false);
        userEntity.setStatus(true);
        userEntity.setCreatedAt(LocalDateTime.now());
        userEntity.setRoles(Collections.singletonList(userRole));

        this.userRepository.save(userEntity);

        welcomeUserEmail.execute(userEntity.getEmail(), userEntity.getName());

        return new UserResponseDTO(userEntity);
    }
}
