package br.com.techshirt.modules.category.dto;

import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.dto.ProductSummaryDTO;

import java.util.Collections;
import java.util.List;

public record CategoryResponseDTO(
        Long id,
        String name,
        List<ProductSummaryDTO> products,
        Boolean status
) {
    public CategoryResponseDTO(CategoryEntity categoryEntity){
        this(categoryEntity.getId(),
             categoryEntity.getName(),
             categoryEntity.getProducts() == null
                ? Collections.emptyList()
                : categoryEntity.getProducts().stream().map(ProductSummaryDTO::new).toList(),
             categoryEntity.getStatus()
        );
    }
}
