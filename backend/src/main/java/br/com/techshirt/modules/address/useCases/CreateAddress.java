package br.com.techshirt.modules.address.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.AddressEntity;
import br.com.techshirt.modules.address.dto.ViaCepResponseDTO;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.dto.AddressRequestDTO;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CreateAddress {
    @Autowired
    private AddressRepository repository;

    @Autowired
    private RestTemplate restTemplate;

    @Transactional
    public AddressResponseDTO execute(AddressRequestDTO dto) {
        Optional<AddressEntity> existingAddress = repository.findByCep(dto.cep());
        if (existingAddress.isPresent()) {
            return new AddressResponseDTO(existingAddress.get());
        }

        String viaCepUrl = "https://viacep.com.br/ws/" + dto.cep() + "/json/";
        ViaCepResponseDTO viaCepData = restTemplate.getForObject(viaCepUrl, ViaCepResponseDTO.class);

        if (viaCepData == null || viaCepData.cep() == null) {
            throw new IdNotFoundException("CEP not found: " + dto.cep());
        }

        AddressEntity newAddress = new AddressEntity();
        newAddress.setName(viaCepData.logradouro());
        newAddress.setNeighborhood(viaCepData.bairro());
        newAddress.setLocality(viaCepData.localidade());
        newAddress.setState(viaCepData.uf());
        newAddress.setCep(viaCepData.cep().replace("-", ""));
        newAddress.setStatus(true);
        newAddress.setCreatedAt(LocalDateTime.now());

        repository.save(newAddress);

        return new AddressResponseDTO(newAddress);
    }
}
