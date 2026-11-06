package br.com.techshirt.modules.orders.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.repository.OrdersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetOrderById {
    @Autowired
    private OrdersRepository ordersRepository;

    @Transactional
    public OrdersResponseDTO execute(Long id) {
        OrdersEntity ordersEntity = this.ordersRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [orders] not found for id: " + id));

        return new OrdersResponseDTO(ordersEntity);
    }
}
