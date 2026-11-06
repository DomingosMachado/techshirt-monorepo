package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.HouseAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.NonProprietaryException;
import br.com.techshirt.modules.house.repository.HouseRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class DisableHouse {

    @Autowired
    private HouseRepository repository;

    @Transactional
    public void execute(Long id, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        var house = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [house] not found for id: " + id));

        if (!house.getUser().getId().equals(userId)) {
            throw new NonProprietaryException("User does not have permission to disable this house");
        }

        if(house.getStatus().equals(false)) {
            throw new HouseAlreadyEnabledException("House already disabled");
        }

        house.setStatus(false);
        repository.save(house);
    }
}