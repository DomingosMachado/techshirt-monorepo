package br.com.techshirt.modules.paymentMethod;

import br.com.techshirt.modules.orders.OrdersEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "payment_method")
public class PaymentMethodEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String method;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @JsonManagedReference("orders-payment-method")
    @OneToMany(mappedBy = "paymentMethod")
    private List<OrdersEntity> orders;
}
