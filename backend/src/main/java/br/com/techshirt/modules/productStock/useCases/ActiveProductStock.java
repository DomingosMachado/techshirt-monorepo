package br.com.techshirt.modules.productStock.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.ProductStockAlreadyEnableException;
import br.com.techshirt.modules.productStock.ProductStockEntity;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.repository.ProductStockRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveProductStock {
    @Autowired
    private ProductStockRepository productStockRepository;

    @Transactional
    public ProductStockResponseDTO execute(Long id) {
        ProductStockEntity productStockEntity = this.productStockRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [productStock] not found for id: " + id));

        if(productStockEntity.getStatus()) {
            throw new ProductStockAlreadyEnableException("Product stock already enabled");
        }

        productStockEntity.setStatus(true);

        this.productStockRepository.save(productStockEntity);

        return new ProductStockResponseDTO(productStockEntity);
    }
}
