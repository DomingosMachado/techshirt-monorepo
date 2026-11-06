package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.address.AddressEntity;
import br.com.techshirt.modules.address.dto.AddressRequestDTO;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import br.com.techshirt.modules.address.repository.AddressRepository;
import br.com.techshirt.modules.address.useCases.CreateAddress;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.house.dto.HouseRequestDTO;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CreateHouse {

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CreateAddress createAddress;

    @Transactional
    public HouseResponseDTO execute(HouseRequestDTO dto, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity  = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        AddressResponseDTO addressResponseDTO = this.createAddress.execute(new AddressRequestDTO(dto.cep()));
        AddressEntity addressEntity = this.addressRepository.findById(addressResponseDTO.id())
                .orElseThrow(() -> new IdNotFoundException("Id [address] not found for id: " + addressResponseDTO.id()));

        HouseEntity house = new HouseEntity();
        house.setName(dto.name());
        house.setNumber(dto.number());
        house.setComplement(dto.complement());
        house.setCep(addressEntity.getCep());
        house.setStatus(true);
        house.setCreatedAt(LocalDateTime.now());
        house.setUser(userEntity);
        house.setAddress(addressEntity);

        houseRepository.save(house);
        return new HouseResponseDTO(house);
    }
}