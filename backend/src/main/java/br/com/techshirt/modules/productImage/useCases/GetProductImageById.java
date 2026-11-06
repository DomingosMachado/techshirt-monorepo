package br.com.techshirt.modules.productImage.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.productImage.ProductImageEntity;
import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productImage.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetProductImageById {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Transactional
    public ProductImageResponseDTO execute(Long id) {
        ProductImageEntity productImageEntity = this.productImageRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [productImage] not found for id: " + id));

        return new ProductImageResponseDTO(productImageEntity);
    }
}
