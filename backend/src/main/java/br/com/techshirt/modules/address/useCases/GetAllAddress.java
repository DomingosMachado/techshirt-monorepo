package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllAddress {

    @Autowired
    private AddressRepository repository;

    public List<AddressResponseDTO> execute() {
        return repository
                .findAll()
                .stream()
                .map(AddressResponseDTO::new)
                .collect(Collectors.toList());
    }
}