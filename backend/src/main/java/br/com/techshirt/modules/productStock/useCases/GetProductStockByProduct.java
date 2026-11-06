package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetProductStockByProduct {
    @Autowired
    private ProductStockRepository productStockRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<ProductStockResponseDTO> execute(Long productId) {
        ProductEntity productEntity = this.productRepository.findById(productId)
                .orElseThrow(()-> new IdNotFoundException("Id [product] not found for id: " + productId));

        List<ProductStockEntity> productStockEntities = this.productStockRepository.findByProduct(productEntity);

        return productStockEntities
                .stream()
                .map(ProductStockResponseDTO::new)
                .collect(Collectors.toList());
    }
}
