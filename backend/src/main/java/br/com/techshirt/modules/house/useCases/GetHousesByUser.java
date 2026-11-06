package br.com.techshirt.modules.house.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetHousesByUser {
    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<HouseResponseDTO> execute(HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        List<HouseEntity> houses = this.houseRepository.findByUser(userEntity);

        return houses
                .stream()
                .map(HouseResponseDTO::new)
                .collect(Collectors.toList());
    }
}
