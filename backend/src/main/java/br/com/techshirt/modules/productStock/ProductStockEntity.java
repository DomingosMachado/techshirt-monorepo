package br.com.techshirt.modules.productStock;

import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.productStock.enums.ProductSize;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "product_stock")
public class ProductStockEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    ProductSize productSize;

    @JsonBackReference("product-product-stock")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;

    @Column(nullable = false)
    Integer stock;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false)
    private LocalDateTime createdAt;
}
