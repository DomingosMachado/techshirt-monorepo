package br.com.techshirt.modules.orders.useCases;

import br.com.techshirt.core.email.orders.OrdersUpdateEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.InvalidOrderStatusException;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.dto.OrdersUpdateDTO;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.orders.repository.OrdersRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateOrder {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private OrdersUpdateEmail ordersUpdateEmail;

    @Transactional
    public OrdersResponseDTO execute(OrdersUpdateDTO ordersUpdateDTO, Long id) {
        OrdersEntity ordersEntity = ordersRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [orders] not found for id: " + id));

        if(ordersUpdateDTO.status().equals(OrderStatus.CANCELED)) {
            throw new InvalidOrderStatusException("It is not allowed to cancel an order, only to update its status");
        }

        if(ordersUpdateDTO.status().equals(ordersEntity.getStatus())) {
            throw new InvalidOrderStatusException("The status sent is the same as the product");
        }

        HouseEntity houseEntity = this.houseRepository.findById(ordersEntity.getHouse().getId())
                        .orElseThrow(()-> new IdNotFoundException("Id [house] not found for id: " + ordersEntity.getHouse().getId()));

        ordersEntity.setStatus(ordersUpdateDTO.status());

        this.ordersRepository.save(ordersEntity);

        ordersUpdateEmail.execute(
                ordersEntity.getUser().getEmail(),
                ordersEntity.getUser().getName(),
                ordersEntity,
                houseEntity
        );

        return new OrdersResponseDTO(ordersEntity);
    }
}
