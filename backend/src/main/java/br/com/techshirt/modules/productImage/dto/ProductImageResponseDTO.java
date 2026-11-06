package br.com.techshirt.modules.productImage.dto;

import br.com.techshirt.modules.product.dto.ProductSummaryDTO;
import br.com.techshirt.modules.productImage.ProductImageEntity;

public record ProductImageResponseDTO(
        Long id,
        byte[] image,
        ProductSummaryDTO product
) {
    public ProductImageResponseDTO(ProductImageEntity productImageEntity) {
        this(productImageEntity.getId(),
                productImageEntity.getImage(),
                new ProductSummaryDTO(productImageEntity.getProduct())
        );
    }
}
