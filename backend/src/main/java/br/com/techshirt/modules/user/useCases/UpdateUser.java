package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.dto.UserUpdateDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UpdateUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public UserResponseDTO execute(UserUpdateDTO userUpdateDTO, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + userId));

        if(userUpdateDTO.password() != null){
            userEntity.setPassword(bCryptPasswordEncoder.encode(userUpdateDTO.password()));
        }

        this.userRepository.save(userEntity);

        return new UserResponseDTO(userEntity);
    }
}
