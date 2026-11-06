package br.com.techshirt.modules.category.useCases;

import br.com.techshirt.modules.category.dto.CategoryResponseDTO;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllCategories {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public List<CategoryResponseDTO> execute(){
        return this.categoryRepository
                .findAll()
                .stream()
                .map(CategoryResponseDTO::new)
                .collect(Collectors.toList());
    }
}
