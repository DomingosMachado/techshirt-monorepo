package br.com.techshirt.modules.productImage.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.productImage.ProductImageEntity;
import br.com.techshirt.modules.productImage.dto.ProductImageRequestDTO;
import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productImage.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class CreateProductImage {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public ProductImageResponseDTO execute(ProductImageRequestDTO productImageRequestDTO, MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }
        if (file.getSize() > 15_000_000) {
            throw new IllegalArgumentException("Image file too large");
        }

        ProductEntity productEntity = this.productRepository.findById(productImageRequestDTO.productId())
                        .orElseThrow(()-> new IdNotFoundException("Id [productImage] not found for id: " + productImageRequestDTO.productId()));

        ProductImageEntity productImageEntity = new ProductImageEntity();
        productImageEntity.setProduct(productEntity);

        try {
            productImageEntity.setImage(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        this.productImageRepository.save(productImageEntity);

        return new ProductImageResponseDTO(productImageEntity);
    }
}
