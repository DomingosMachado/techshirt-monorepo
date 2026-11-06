package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.HouseAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.NonProprietaryException;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import br.com.techshirt.modules.house.repository.HouseRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class ActiveHouse {
    @Autowired

    private HouseRepository repository;

    @Transactional
    public HouseResponseDTO execute(Long id, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        HouseEntity houseEntity = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [house] not found for id: " + id));

        if (!houseEntity.getUser().getId().equals(userId)) {
            throw new NonProprietaryException("User does not have permission to enable this house");
        }

        if(houseEntity.getStatus().equals(true)) {
            throw new HouseAlreadyEnabledException("House already enabled");
        }

        houseEntity.setStatus(true);
        repository.save(houseEntity);

        return new HouseResponseDTO(houseEntity);
    }
}
