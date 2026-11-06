package br.com.techshirt.modules.roles.useCases;

import br.com.techshirt.modules.roles.dto.RolesResponseDTO;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllRoles {
    @Autowired
    private RolesRepository rolesRepository;

    public List<RolesResponseDTO> execute() {
        return this.rolesRepository
                .findAll()
                .stream()
                .map(RolesResponseDTO::new)
                .collect(Collectors.toList());
    }
}
