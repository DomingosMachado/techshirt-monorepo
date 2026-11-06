package br.com.techshirt.modules.orders.dto;

import br.com.techshirt.modules.orders.OrderItemEntity;
import br.com.techshirt.modules.product.dto.ProductSummaryDTO;
import br.com.techshirt.modules.productStock.enums.ProductSize;

public record OrderItemResponseDTO(
        Integer quantity,
        Double pricePerUnit,
        ProductSize productSize,
        ProductSummaryDTO product
) {
    public OrderItemResponseDTO(OrderItemEntity orderItem) {
        this(
                orderItem.getQuantity(),
                orderItem.getPricePerUnit(),
                orderItem.getProductSize(),
                new ProductSummaryDTO(orderItem.getProduct())
        );
    }
}
