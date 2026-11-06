package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.enums.ProductSize;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetProductsStocksBySize {
    @Autowired
    private ProductStockRepository productStockRepository;

    @Transactional
    public List<ProductStockResponseDTO> execute(ProductSize productSize) {
        List<ProductStockEntity> productStockEntities = productStockRepository.findByProductSize(productSize);

        return productStockEntities
                .stream()
                .map(ProductStockResponseDTO::new)
                .collect(Collectors.toList());
    }
}
