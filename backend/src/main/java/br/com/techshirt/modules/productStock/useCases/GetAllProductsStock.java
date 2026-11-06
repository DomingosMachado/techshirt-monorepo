package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllProductsStock {
    @Autowired
    private ProductStockRepository productStockRepository;

    public List<ProductStockResponseDTO> execute() {
        return this.productStockRepository
                .findAll()
                .stream()
                .map(ProductStockResponseDTO::new)
                .collect(Collectors.toList());
    }
}
