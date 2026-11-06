package br.com.techshirt.modules.category.useCases;

import br.com.techshirt.exception.CategoryAlreadyExistsException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.dto.CategoryRequestDTO;
import br.com.techshirt.modules.category.dto.CategoryResponseDTO;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class CreateCategory {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public CategoryResponseDTO execute(CategoryRequestDTO categoryRequestDTO) {
        this.categoryRepository.findByName(categoryRequestDTO.name())
                .ifPresent(category -> {
                    throw new CategoryAlreadyExistsException("The category " + category.getName() + " already exists");
                });

        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setName(categoryRequestDTO.name());
        categoryEntity.setStatus(true);
        categoryEntity.setCreatedAt(LocalDateTime.now());

        this.categoryRepository.save(categoryEntity);

        return new CategoryResponseDTO(categoryEntity);
    }
}
