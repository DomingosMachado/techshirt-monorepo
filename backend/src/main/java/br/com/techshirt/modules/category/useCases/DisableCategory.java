package br.com.techshirt.modules.category.useCases;

import br.com.techshirt.exception.CategoryAlreadyEnabledException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.category.CategoryEntity;
import br.com.techshirt.modules.category.repository.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisableCategory {
    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public void execute(Long id){
        CategoryEntity categoryEntity = this.categoryRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [category] not found for id: " + id));

        if(categoryEntity.getStatus().equals(false)){
            throw new CategoryAlreadyEnabledException("Category already disabled");
        }

        categoryEntity.setId(id);
        categoryEntity.setStatus(false);

        this.categoryRepository.save(categoryEntity);
    }
}
