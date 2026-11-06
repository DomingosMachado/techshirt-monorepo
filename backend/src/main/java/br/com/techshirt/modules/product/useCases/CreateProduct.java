package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.dto.ProductRequestDTO;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.qrcode.QrCodeGenerator;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import com.google.zxing.WriterException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class CreateProduct {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public ProductResponseDTO execute(ProductRequestDTO productRequestDTO, MultipartFile file) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(productRequestDTO.categoryId())
                .orElseThrow(() -> new IdNotFoundException("Id [category] not found for id: " + productRequestDTO.categoryId()));

        QrCodeEntity qrCodeEntity = this.qrCodeRepository.findById(productRequestDTO.qrCodeId())
                .orElseThrow(()-> new IdNotFoundException("Id [qrCode] not found for id: " + productRequestDTO.qrCodeId()));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Image file is required");
        }
        if (file.getSize() > 15_000_000) {
            throw new IllegalArgumentException("Image file too large");
        }

        ProductEntity product = new ProductEntity();
        product.setName(productRequestDTO.name());
        product.setDescription(productRequestDTO.description());
        product.setColor(productRequestDTO.color());
        product.setMaterial(productRequestDTO.material());
        product.setStamp(productRequestDTO.stamp());
        product.setPrice(productRequestDTO.price());
        product.setQrCode(qrCodeEntity);
        product.setCategory(categoryEntity);
        product.setStatus(true);
        product.setCreatedAt(LocalDateTime.now());

        try {
            product.setPrimaryImage(file.getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        this.productRepository.save(product);

        return new ProductResponseDTO(product);
    }
}