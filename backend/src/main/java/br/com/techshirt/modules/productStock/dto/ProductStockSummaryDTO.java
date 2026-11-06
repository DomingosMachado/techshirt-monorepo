package br.com.techshirt.modules.productStock.dto;

import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.enums.ProductSize;

public record ProductStockSummaryDTO(
        Long id,
        ProductSize productSize,
        Integer stock,
        Boolean status
) {
    public ProductStockSummaryDTO(ProductStockEntity productStockEntity) {
        this (
                productStockEntity.getId(),
                productStockEntity.getProductSize(),
                productStockEntity.getStock(),
                productStockEntity.getStatus()
        );
    }
}
