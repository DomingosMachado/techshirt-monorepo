package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.core.email.user.DisableUserEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.UserAlreadyEnabledException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisableUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DisableUserEmail disableUserEmail;

    @Transactional
    public UserResponseDTO execute(HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + userId));

        if(userEntity.getStatus().equals(false)) {
            throw new UserAlreadyEnabledException("User already disabled");
        }

        userEntity.setStatus(false);

        this.userRepository.save(userEntity);

        disableUserEmail.execute(userEntity.getEmail(), userEntity.getName());

        return new UserResponseDTO(userEntity);
    }
}
