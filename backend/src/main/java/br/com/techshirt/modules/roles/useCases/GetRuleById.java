package br.com.techshirt.modules.roles.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.roles.dto.RolesResponseDTO;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetRuleById {
    @Autowired
    private RolesRepository rolesRepository;

    public RolesResponseDTO execute(Long id) {
        RolesEntity rolesEntity = this.rolesRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [roles] not found for id: " + id));

        return new RolesResponseDTO(rolesEntity);
    }
}
