package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetAddressByCep {

    @Autowired
    private AddressRepository repository;

    public AddressResponseDTO execute(String cep) {
        String cepFilter = cep.replaceAll("-", "");

        var address = repository.findByCep(cepFilter)
                .orElseThrow(() -> new IdNotFoundException("Cep [address] not found for cep: " + cepFilter));

        return new AddressResponseDTO(address);
    }
}