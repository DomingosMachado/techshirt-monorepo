package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetProductById {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductResponseDTO execute(Long id) {
        ProductEntity productEntity = this.productRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [product] not found for id: " + id));

        return new ProductResponseDTO(productEntity);
    }
}