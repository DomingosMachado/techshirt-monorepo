package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetUserByUser {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserResponseDTO execute(HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + userId));

        return new UserResponseDTO(userEntity);
    }
}
