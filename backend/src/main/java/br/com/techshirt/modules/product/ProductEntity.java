package br.com.techshirt.modules.product;

import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.productImage.ProductImageEntity;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "product")
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private String material;

    private String stamp;

    @Column(nullable = false)
    private Double price;

    @JsonBackReference("product-qrcode")
    @ManyToOne
    @JoinColumn(name = "qrcode_id")
    private QrCodeEntity qrCode;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "category_id")
    private CategoryEntity category;

    @JsonManagedReference("product-product-stock")
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductStockEntity> productsStock;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @Lob
    private byte[] primaryImage;

    @JsonManagedReference
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductImageEntity> images = new ArrayList<>();
}
