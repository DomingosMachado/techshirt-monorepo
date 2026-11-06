package br.com.techshirt.modules.category.controller;

import br.com.techshirt.modules.category.dto.CategoryRequestDTO;
import br.com.techshirt.modules.category.dto.CategoryResponseDTO;
import br.com.techshirt.modules.category.useCases.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    @Autowired
    private GetAllCategories getAllCategories;

    @Autowired
    private GetCategoryById getCategoryById;

    @Autowired
    private CreateCategory createCategory;

    @Autowired
    private UpdateCategory updateCategory;

    @Autowired
    private ActiveCategory activeCategory;

    @Autowired
    private DisableCategory disableCategory;

    @Operation(summary = "Lista todas as categorias", description = "A requisição lista todas as categorias")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = CategoryResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todas as categorias"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<CategoryResponseDTO>> getAllCategories() {
        return ResponseEntity.ok().body(getAllCategories.execute());
    }

    @Operation(summary = "Lista uma categoria baseada pela busca por id", description = "A requisição lista uma categoria que foi buscada através do id da mesma")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = CategoryResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista uma categoria que foi buscada através do id da mesma"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> getCategoryById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getCategoryById.execute(id));
    }

    @Operation(summary = "Cria uma nova categoria", description = "A requisição cria uma nova categoria")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = CategoryResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria uma nova categoria"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> createCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createCategory.execute(categoryRequestDTO));
    }

    @Operation(summary = "Atualiza o nome de uma categoria", description = "A requisição atualiza o nome de uma categoria através do id da mesma")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = CategoryResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza o nome de uma categoria através do id da mesma"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> updateCategory(@Valid @RequestBody CategoryRequestDTO categoryRequestDTO, @PathVariable Long id) {
        return ResponseEntity.ok().body(updateCategory.execute(categoryRequestDTO, id));
    }

    @Operation(summary = "Ativa uma categoria desativada", description = "A requisição ativa novamente uma categoria desativada")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = CategoryResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente uma categoria desativada"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<CategoryResponseDTO> activeCategory(@PathVariable Long id) {
        return ResponseEntity.ok().body(activeCategory.execute(id));
    }

    @Operation(summary = "Desativa uma categoria ativa", description = "A requisição desativa uma categoria ativa")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa uma categoria ativa"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@Valid @PathVariable Long id) {
            disableCategory.execute(id);
            return ResponseEntity.noContent().build();
    }
}
