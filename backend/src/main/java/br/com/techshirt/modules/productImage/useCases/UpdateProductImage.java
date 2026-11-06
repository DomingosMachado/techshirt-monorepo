package br.com.techshirt.modules.productImage.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.productImage.ProductImageEntity;
import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productImage.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UpdateProductImage {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Transactional
    public ProductImageResponseDTO execute(MultipartFile file, Long id){
        ProductImageEntity productImageEntity = this.productImageRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [productImage] not found for id: " + id));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }
        if (file.getSize() > 15_000_000) {
            throw new IllegalArgumentException("Image file too large");
        }

        try {
            productImageEntity.setImage(file.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

        this.productImageRepository.save(productImageEntity);

        return new ProductImageResponseDTO(productImageEntity);
    }
}
