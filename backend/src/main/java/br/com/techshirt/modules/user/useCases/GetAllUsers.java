package br.com.techshirt.modules.user.useCases;

import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllUsers {
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public List<UserResponseDTO> execute() {
        return this.userRepository
                .findAll()
                .stream()
                .map(UserResponseDTO::new)
                .collect(Collectors.toList());
    }
}
