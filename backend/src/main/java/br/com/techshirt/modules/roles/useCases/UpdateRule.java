package br.com.techshirt.modules.roles.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.RoleAlreadyExistsException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.roles.dto.RolesRequestDTO;
import br.com.techshirt.modules.roles.dto.RolesResponseDTO;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateRule {
    @Autowired
    private RolesRepository rolesRepository;

    @Transactional
    public RolesResponseDTO execute(RolesRequestDTO rolesRequestDTO, Long id) {
        RolesEntity rolesEntity = this.rolesRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [roles] not found for id: " + id));

        this.rolesRepository.findByName(rolesRequestDTO.name())
                .ifPresent(role -> {
                    throw new RoleAlreadyExistsException("The rule " + role.getName() + " already exists");
                });

        rolesEntity.setName(rolesRequestDTO.name());

        this.rolesRepository.save(rolesEntity);

        return new RolesResponseDTO(rolesEntity);
    }
}
