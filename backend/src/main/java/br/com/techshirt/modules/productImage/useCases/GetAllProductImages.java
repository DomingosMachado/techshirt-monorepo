package br.com.techshirt.modules.productImage.useCases;

import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productImage.repository.ProductImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllProductImages {
    @Autowired
    private ProductImageRepository productImageRepository;

    @Transactional
    public List<ProductImageResponseDTO> execute(){
        return this.productImageRepository
                .findAll()
                .stream()
                .map(ProductImageResponseDTO::new)
                .collect(Collectors.toList());
    }
}
