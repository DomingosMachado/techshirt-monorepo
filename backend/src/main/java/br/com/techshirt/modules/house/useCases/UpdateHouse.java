package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.NonProprietaryException;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.house.dto.HouseRequestDTO;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateHouse {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Transactional
    public HouseResponseDTO execute(HouseRequestDTO dto, Long id, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        var house = houseRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [house] not found for id: " + id));

        if (!house.getUser().getId().equals(userId)) {
            throw new NonProprietaryException("User does not have permission to update this house");
        }

        house.setName(dto.name());
        house.setNumber(dto.number());
        house.setComplement(dto.complement());

        houseRepository.save(house);

        return new HouseResponseDTO(house);
    }
}