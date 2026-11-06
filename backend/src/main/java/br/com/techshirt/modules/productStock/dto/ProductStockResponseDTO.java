package br.com.techshirt.modules.productStock.dto;

import br.com.techshirt.modules.product.dto.ProductSummaryDTO;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.enums.ProductSize;

public record ProductStockResponseDTO(
        Long id,
        ProductSize productSize,
        ProductSummaryDTO product,
        Integer stock,
        Boolean status
) {
    public ProductStockResponseDTO(ProductStockEntity productStockEntity) {
        this (
                productStockEntity.getId(),
                productStockEntity.getProductSize(),
                new ProductSummaryDTO(productStockEntity.getProduct()),
                productStockEntity.getStock(),
                productStockEntity.getStatus()
        );
    }
}
