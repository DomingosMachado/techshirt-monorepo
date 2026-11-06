package br.com.techshirt.modules.orders.useCases;

import br.com.techshirt.core.email.orders.OrdersCancelEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.InvalidOrderStatusException;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.orders.repository.OrdersRepository;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CancelOrder {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private OrdersCancelEmail ordersCancelEmail;

    @Transactional
    public OrdersResponseDTO execute(Long id) {
        OrdersEntity ordersEntity = ordersRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [order] not found for id: " + id));

        if (ordersEntity.getStatus() == OrderStatus.CANCELED) {
            throw new InvalidOrderStatusException("Order cannot be canceled because it is already " + ordersEntity.getStatus().name().toLowerCase());
        }

        ordersEntity.getItems().forEach(item -> {
            ProductStockEntity productStockEntity = this.productStockRepository.findByProductAndProductSize(item.getProduct(), item.getProductSize())
                    .orElseThrow(()-> new IdNotFoundException("Id [productStock] not found for id: " + item.getProduct().getId() + " and size: " + item.getProductSize()));

            productStockEntity.setStock(productStockEntity.getStock() + item.getQuantity());

            this.productStockRepository.save(productStockEntity);
        });

        ordersEntity.setStatus(OrderStatus.CANCELED);

        this.ordersRepository.save(ordersEntity);

        ordersCancelEmail.execute(
                ordersEntity.getUser().getEmail(),
                ordersEntity.getUser().getName(),
                ordersEntity
        );

        return new OrdersResponseDTO(ordersEntity);
    }
}
