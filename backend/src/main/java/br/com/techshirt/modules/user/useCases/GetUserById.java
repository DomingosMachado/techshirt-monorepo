package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetUserById {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public UserResponseDTO execute(Long id) {
        UserEntity userEntity = userRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [user] not found for id: " + id));

        return new UserResponseDTO(userEntity);
    }
}
