package br.com.techshirt.modules.roles.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.roles.repository.RolesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeleteRule {
    @Autowired
    private RolesRepository rolesRepository;

    @Transactional
    public void execute(Long id) {
        this.rolesRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [roles] not found for id: " + id));

        this.rolesRepository.deleteById(id);
    }
}
