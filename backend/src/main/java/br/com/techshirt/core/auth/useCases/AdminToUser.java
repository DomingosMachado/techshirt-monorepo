package br.com.techshirt.core.auth.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.UserChangeRolesException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminToUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository rolesRepository;

    @Transactional
    public UserSummaryDTO execute(Long id) {
        UserEntity userEntity = this.userRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + id));

        RolesEntity adminRole = this.rolesRepository.findByName("ROLE_ADMIN")
                .orElseThrow(() -> new IdNotFoundException("Name [roles] not found for name: ROLE_ADMIN"));

        boolean removed = userEntity.getRoles().remove(adminRole);

        if (removed) {
            this.userRepository.save(userEntity);
        } else {
            throw new UserChangeRolesException("This user isn't an admin");
        }

        return new UserSummaryDTO(userEntity);
    }
}
