package br.com.techshirt.modules.productStock.repository;

import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.enums.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductStockRepository extends JpaRepository<ProductStockEntity, Long> {
    List<ProductStockEntity> findByProduct(ProductEntity productEntity);
    List<ProductStockEntity> findByProductSize(ProductSize productSize);
    Optional<ProductStockEntity> findByProductAndProductSize(ProductEntity productEntity, ProductSize productSize);
}
