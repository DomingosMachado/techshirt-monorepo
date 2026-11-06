package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllProducts {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public List<ProductResponseDTO> execute() {
        return this.productRepository
                .findAll()
                .stream()
                .map(ProductResponseDTO::new)
                .collect(Collectors.toList());
    }
}