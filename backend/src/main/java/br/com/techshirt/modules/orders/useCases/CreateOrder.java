package br.com.techshirt.modules.orders.useCases;

import br.com.techshirt.core.email.orders.OrdersUserEmail;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.NonProprietaryException;
import br.com.techshirt.exception.PaymentMethodDisabledException;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.house.repository.HouseRepository;
import br.com.techshirt.modules.orders.OrderItemEntity;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.orders.dto.OrdersRequestDTO;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.orders.repository.OrdersRepository;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Service
public class CreateOrder {
    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Autowired
    private HouseRepository houseRepository;

    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private OrdersUserEmail ordersUserEmail;

    @Transactional
    public OrdersResponseDTO execute(OrdersRequestDTO ordersRequestDTO, HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity userEntity = this.userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        if (ordersRequestDTO.products().isEmpty()) {
            throw new IllegalArgumentException("To be valid, the order needs to have products.");
        }

        PaymentMethodEntity paymentMethodEntity = this.paymentMethodRepository.findById(ordersRequestDTO.paymentMethodId())
                .orElseThrow(()-> new IdNotFoundException("Id [paymentMethod] not found for id: " + ordersRequestDTO.paymentMethodId()));

        if(!paymentMethodEntity.getStatus()) {
            throw new PaymentMethodDisabledException("The payment method " + paymentMethodEntity.getMethod() + " is disabled");
        }

        HouseEntity houseEntity = this.houseRepository.findById(ordersRequestDTO.houseId())
                .orElseThrow(()-> new IdNotFoundException("Id [house] not found for id: " + ordersRequestDTO.houseId()));

        if(!houseEntity.getUser().getId().equals(userEntity.getId())) {
            throw new NonProprietaryException("This house does not belong to the user.");
        }

        OrdersEntity ordersEntity = new OrdersEntity();
        ordersEntity.setUser(userEntity);
        ordersEntity.setStatus(OrderStatus.WAITING);
        ordersEntity.setCreatedAt(LocalDateTime.now());
        ordersEntity.setPaymentMethod(paymentMethodEntity);
        ordersEntity.setHouse(houseEntity);
        ordersEntity.setTotal(0.0);
        ordersEntity.setItems(new ArrayList<>());

        ordersRequestDTO.products().forEach(itemDTO -> {
            ProductEntity productEntity = this.productRepository.findById(itemDTO.productId())
                    .orElseThrow(() -> new IdNotFoundException("Id [product] not found for id: " + itemDTO.productId()));

            ProductStockEntity productStockEntity = this.productStockRepository.findByProductAndProductSize(productEntity, itemDTO.productSize())
                    .orElseThrow(()-> new IdNotFoundException("Id [productStock] not found for id: " + itemDTO.productId() + " and size: " + itemDTO.productSize()));

            if (productStockEntity.getStock() < itemDTO.quantity()) {
                throw new IllegalArgumentException(
                        "The stock of product [" + productEntity.getName() + "] is not enough. Available: "
                                + productStockEntity.getStock() + ", Requested: " + itemDTO.quantity()
                );
            }
            productStockEntity.setStock(productStockEntity.getStock() - itemDTO.quantity());

            OrderItemEntity orderItem = new OrderItemEntity();
            orderItem.setProduct(productEntity);
            orderItem.setProductSize(itemDTO.productSize());
            orderItem.setQuantity(itemDTO.quantity());
            orderItem.setPricePerUnit(productEntity.getPrice());
            orderItem.setOrder(ordersEntity);
            ordersEntity.getItems().add(orderItem);

            Double subtotal = productEntity.getPrice() * itemDTO.quantity();
            ordersEntity.setTotal(ordersEntity.getTotal() + subtotal);

            this.productStockRepository.save(productStockEntity);
        });

        if (ordersEntity.getTotal() <= 0) {
            throw new IllegalArgumentException("For the order to be valid, the amount must be greater than zero.");
        }

        Double finalTotal = ordersEntity.getTotal() - ordersRequestDTO.discount();
        if (finalTotal <= 0) {
            throw new IllegalArgumentException("The total value after discount cannot be less than or equal to zero.");
        }

        if (ordersRequestDTO.installment() >= 3) {
            double totalInterestRate = 0.03 * ordersRequestDTO.installment();
            finalTotal = finalTotal * (1 + totalInterestRate);
        }

        ordersEntity.setDiscount(ordersRequestDTO.discount());
        ordersEntity.setInstallment(ordersRequestDTO.installment());
        ordersEntity.setInstallmentPrice(round(finalTotal/ordersEntity.getInstallment()));
        ordersEntity.setTotal(round(finalTotal));

        this.ordersRepository.save(ordersEntity);

        ordersUserEmail.execute(
                userEntity.getEmail(),
                userEntity.getName(),
                ordersEntity,
                houseEntity
        );

        return new OrdersResponseDTO(ordersEntity);
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
