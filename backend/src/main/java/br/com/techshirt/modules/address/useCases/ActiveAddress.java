package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.exception.AddressAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import br.com.techshirt.modules.address.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveAddress {

    @Autowired
    private AddressRepository repository;

    public AddressResponseDTO execute(Long id) {
        var address = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [address] not found for id: " + id));

        if(address.getStatus().equals(true)) {
            throw new AddressAlreadyEnabledException("Address already enabled");
        }

        address.setStatus(true);
        repository.save(address);

        return new AddressResponseDTO(address);
    }
}
