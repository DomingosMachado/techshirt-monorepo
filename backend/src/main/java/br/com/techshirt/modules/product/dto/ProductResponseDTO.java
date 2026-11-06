package br.com.techshirt.modules.product.dto;

import br.com.techshirt.modules.category.dto.CategorySummaryDTO;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productStock.dto.ProductStockSummaryDTO;
import br.com.techshirt.modules.qrcode.dto.QrCodeSummaryDTO;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record ProductResponseDTO(
        Long id,
        String name,
        String description,
        String color,
        String material,
        String stamp,
        Double price,
        QrCodeSummaryDTO qrCode,
        CategorySummaryDTO category,
        List<ProductStockSummaryDTO> productsStockSummary,
        Boolean status,
        byte[] primaryImage,
        List<ProductImageResponseDTO> images
) {
    public ProductResponseDTO(ProductEntity productEntity) {
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
                ),
                productEntity.getProductsStock() == null
                        ? Collections.emptyList()
                        : productEntity.getProductsStock().stream().map(ProductStockSummaryDTO::new).collect(Collectors.toList()),
                productEntity.getStatus(),
                productEntity.getPrimaryImage(),
                productEntity.getImages() == null
                        ? Collections.emptyList()
                        : productEntity.getImages().stream().map(ProductImageResponseDTO::new).collect(Collectors.toList())
        );
    }
}