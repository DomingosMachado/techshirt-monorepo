package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetAddressById {

    @Autowired
    private AddressRepository repository;

    public AddressResponseDTO execute(Long id) {
        var address = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [address] not found for id: " + id));

        return new AddressResponseDTO(address);
    }
}