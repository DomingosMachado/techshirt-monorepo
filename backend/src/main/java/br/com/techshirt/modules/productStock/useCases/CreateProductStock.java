package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.ProductStockAlreadyExistsException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockRequestDTO;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CreateProductStock {
    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductStockResponseDTO execute(ProductStockRequestDTO productStockRequestDTO) {
        ProductEntity productEntity = this.productRepository.findById(productStockRequestDTO.productId())
                .orElseThrow(()-> new IdNotFoundException("Id [product] not found for id: " + productStockRequestDTO.productId()));

        this.productStockRepository.findByProductAndProductSize(productEntity, productStockRequestDTO.productSize())
                .ifPresent(productStock -> {
                    throw new ProductStockAlreadyExistsException("The " + productEntity.getName() + " stock with size" + productStockRequestDTO.productSize() + " already exists");
                });

        ProductStockEntity productStockEntity = new ProductStockEntity();
        productStockEntity.setProductSize(productStockRequestDTO.productSize());
        productStockEntity.setProduct(productEntity);
        productStockEntity.setStock(productStockRequestDTO.stock());
        productStockEntity.setStatus(true);
        productStockEntity.setCreatedAt(LocalDateTime.now());

        this.productStockRepository.save(productStockEntity);

        return new ProductStockResponseDTO(productStockEntity);
    }
}
