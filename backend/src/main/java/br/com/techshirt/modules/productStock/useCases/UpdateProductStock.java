package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.dto.ProductStockUpdateDTO;
import br.com.techshirt.modules.productStock.enums.ProductSize;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateProductStock {
    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductStockResponseDTO execute(ProductStockUpdateDTO productStockUpdateDTO, Long productId, ProductSize productSize) {
        ProductEntity productEntity = this.productRepository.findById(productId)
                .orElseThrow(()-> new IdNotFoundException("Id [product] not found for id: " + productId));

        ProductStockEntity productStockEntity = this.productStockRepository.findByProductAndProductSize(productEntity, productSize)
                .orElseThrow(()-> new IdNotFoundException("Id [productStock] not found for id: " + productId + " and size: " + productSize));

        productStockEntity.setStock(productStockUpdateDTO.stock());

        this.productStockRepository.save(productStockEntity);

        return new ProductStockResponseDTO(productStockEntity);
    }
}
