package br.com.techshirt.modules.roles.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.roles.dto.RolesResponseDTO;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetRuleByName {
    @Autowired
    private RolesRepository rolesRepository;

    public RolesResponseDTO execute(String name) {
        RolesEntity rolesEntity = this.rolesRepository.findByName(name)
                .orElseThrow(() -> new IdNotFoundException("Name [roles] not found for name: " + name));

        return new RolesResponseDTO(rolesEntity);
    }
}
