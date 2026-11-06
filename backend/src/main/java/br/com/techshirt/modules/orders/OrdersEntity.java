package br.com.techshirt.modules.orders;

import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.orders.enums.OrderStatus;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class OrdersEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference("user-orders")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Column(nullable = false)
    private Double discount;

    @Column(nullable = false)
    private Integer installment;

    @Column(nullable = false)
    private Double installmentPrice;

    @Column(nullable = false)
    private Double total;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonBackReference("orders-payment-method")
    @ManyToOne
    @JoinColumn(name = "payment_method_id")
    private PaymentMethodEntity paymentMethod;

    @ManyToOne
    @JoinColumn(name = "house_id")
    private HouseEntity house;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> items;
}
