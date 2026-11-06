package br.com.techshirt.modules.product.dto;

import br.com.techshirt.modules.category.dto.CategorySummaryDTO;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeSummaryDTO;

public record ProductSummaryDTO(
        Long id,
        String name,
        String description,
        String color,
        String material,
        String stamp,
        Double price,
        QrCodeSummaryDTO qrCode,
        CategorySummaryDTO category
) {
    public ProductSummaryDTO(ProductEntity productEntity){
        this(
                productEntity.getId(),
                productEntity.getName(),
                productEntity.getDescription(),
                productEntity.getColor(),
                productEntity.getMaterial(),
                productEntity.getStamp(),
                productEntity.getPrice(),
                new QrCodeSummaryDTO(productEntity.getQrCode()),
                new CategorySummaryDTO(
                        productEntity.getCategory().getId(),
                        productEntity.getCategory().getName(),
                        productEntity.getCategory().getStatus()
                )
        );
    }
}
