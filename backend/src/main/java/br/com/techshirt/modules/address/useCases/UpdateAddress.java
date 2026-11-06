package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.dto.AddressRequestDTO;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateAddress {

    @Autowired
    private AddressRepository repository;

    @Transactional
    public AddressResponseDTO execute(Long id, AddressRequestDTO dto) {
        var address = repository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [address] not found for id" + id));

        address.setCep(dto.cep());

        repository.save(address);
        return new AddressResponseDTO(address);
    }
}