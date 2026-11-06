package br.com.techshirt.modules.category.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.dto.CategoryResponseDTO;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetCategoryById {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public CategoryResponseDTO execute(Long id){
        CategoryEntity categoryEntity = categoryRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [category] not found for id: " + id));

        return new CategoryResponseDTO(categoryEntity);
    }
}
