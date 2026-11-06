package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllHouses {

    @Autowired
    private HouseRepository repository;

    public List<HouseResponseDTO> execute() {
        return repository
                .findAll()
                .stream()
                .map(HouseResponseDTO::new)
                .collect(Collectors.toList());
    }
}