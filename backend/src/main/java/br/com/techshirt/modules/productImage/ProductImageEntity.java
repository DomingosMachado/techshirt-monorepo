package br.com.techshirt.modules.productImage;

import br.com.techshirt.modules.product.ProductEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "product_image")
public class ProductImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Lob
    private byte[] image;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "product_id")
    private ProductEntity product;
}
