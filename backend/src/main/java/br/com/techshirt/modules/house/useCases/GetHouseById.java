package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetHouseById {

    @Autowired
    private HouseRepository repository;

    public HouseResponseDTO execute(Long id) {
        var house = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [house] not found for id: " + id));

        return new HouseResponseDTO(house);
    }
}