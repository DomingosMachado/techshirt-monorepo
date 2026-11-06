package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UpdateImageProduct {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductResponseDTO execute(MultipartFile file, Long id) {
        ProductEntity productEntity = this.productRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [product] not found for id: " + id));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }
        if (file.getSize() > 15_000_000) {
            throw new IllegalArgumentException("Image file too large");
        }

        try {
            productEntity.setPrimaryImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        this.productRepository.save(productEntity);

        return new ProductResponseDTO(productEntity);
    }
}