package br.com.techshirt.modules.product.useCases;

import br.com.techshirt.exception.CategoryAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.product.ProductEntity;
import br.com.techshirt.modules.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisableProduct {
    @Autowired
    private ProductRepository productRepository;

    @Transactional
    public void execute(Long id){
        ProductEntity productEntity = this.productRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [product] not found for id: " + id));

        if(productEntity.getStatus().equals(false)){
            throw new CategoryAlreadyEnabledException("Product already disabled");
        }

        productEntity.setId(id);
        productEntity.setStatus(false);

        this.productRepository.save(productEntity);
    }
}
