package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetProductStockById {
    @Autowired
    private ProductStockRepository productStockRepository;

    public ProductStockResponseDTO execute(Long id) {
        ProductStockEntity productStockEntity = this.productStockRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [productStock] not found for id: " + id));

        return new ProductStockResponseDTO(productStockEntity);
    }
}
