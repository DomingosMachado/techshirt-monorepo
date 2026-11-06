package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.dto.ProductUpdateDTO;
import br.com.techshirt.modules.product.qrcode.QrCodeGenerator;
import br.com.techshirt.modules.product.repository.ProductRepository;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import com.google.zxing.WriterException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class UpdateProduct {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public ProductResponseDTO execute(ProductUpdateDTO productUpdateDTO, Long id) {
        ProductEntity productEntity = this.productRepository.findById(id)
                .orElseThrow(() -> new IdNotFoundException("Id [product] not found for id: " + id));

        if(productUpdateDTO.categoryId() != null){
            CategoryEntity categoryEntity = this.categoryRepository.findById(productUpdateDTO.categoryId())
                    .orElseThrow(()-> new IdNotFoundException("Id [category] not found for id: " + productUpdateDTO.categoryId()));

            productEntity.setCategory(categoryEntity);
        }

        if(productUpdateDTO.qrCodeId() != null){
            QrCodeEntity qrCodeEntity = this.qrCodeRepository.findById(productUpdateDTO.qrCodeId())
                    .orElseThrow(()-> new IdNotFoundException("Id [QrCode] not found for id: " + productUpdateDTO.qrCodeId()));

            productEntity.setQrCode(qrCodeEntity);
        }

        if (productUpdateDTO.name() != null) {
            productEntity.setName(productUpdateDTO.name());
        }
        if (productUpdateDTO.description() != null) {
            productEntity.setDescription(productUpdateDTO.description());
        }
        if (productUpdateDTO.color() != null) {
            productEntity.setColor(productUpdateDTO.color());
        }
        if (productUpdateDTO.material() != null) {
            productEntity.setMaterial(productUpdateDTO.material());
        }
        if (productUpdateDTO.stamp() != null) {
            productEntity.setStamp(productUpdateDTO.stamp());
        }
        if (productUpdateDTO.price() != null) {
            productEntity.setPrice(productUpdateDTO.price());
        }

        this.productRepository.save(productEntity);

        return new ProductResponseDTO(productEntity);
    }
}