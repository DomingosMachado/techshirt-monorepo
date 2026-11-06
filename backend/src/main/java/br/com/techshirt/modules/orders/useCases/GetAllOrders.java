package br.com.techshirt.modules.orders.useCases;

import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.repository.OrdersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllOrders {
    @Autowired
    private OrdersRepository ordersRepository;

    @Transactional
    public List<OrdersResponseDTO> execute() {
        return this.ordersRepository
                .findAll()
                .stream()
                .map(OrdersResponseDTO::new)
                .collect(Collectors.toList());
    }
}
