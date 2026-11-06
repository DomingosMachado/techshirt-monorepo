package br.com.techshirt.modules.productImage.repository;

import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.productImage.ProductImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImageEntity, Long> {
    ProductImageEntity product(ProductEntity product);
}
