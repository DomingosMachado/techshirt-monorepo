package br.com.techshirt.modules.category.useCases;

import br.com.techshirt.exception.CategoryDisabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.dto.CategoryRequestDTO;
import br.com.techshirt.modules.category.dto.CategoryResponseDTO;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateCategory {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public CategoryResponseDTO execute(CategoryRequestDTO categoryRequestDTO, Long id) {
        CategoryEntity categoryEntity = this.categoryRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [category] not found for id: " + id));

        if(categoryEntity.getStatus().equals(false)) {
            throw new CategoryDisabledException("It is not allowed to update a disabled category");
        }

        categoryEntity.setName(categoryRequestDTO.name());

        this.categoryRepository.save(categoryEntity);

        return new CategoryResponseDTO(categoryEntity);
    }
}
