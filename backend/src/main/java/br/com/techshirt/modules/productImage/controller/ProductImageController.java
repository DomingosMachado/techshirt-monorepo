package br.com.techshirt.modules.productImage.controller;

import br.com.techshirt.modules.productImage.dto.ProductImageRequestDTO;
import br.com.techshirt.modules.productImage.dto.ProductImageResponseDTO;
import br.com.techshirt.modules.productImage.useCases.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/product_images")
public class ProductImageController {
    @Autowired
    private GetAllProductImages getAllProductImages;

    @Autowired
    private GetProductImageById getProductImageById;

    @Autowired
    private CreateProductImage createProductImage;

    @Autowired
    private UpdateProductImage updateProductImage;

    @Autowired
    private DeleteProductImage deleteProductImage;

    @Operation(summary = "Lista todos as imagens dos produtos", description = "A requisição lista todos as imagens dos produtos")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductImageResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos as imagens dos produtos"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<ProductImageResponseDTO>> getAllProductImages() {
        return ResponseEntity.ok().body(getAllProductImages.execute());
    }

    @Operation(summary = "Lista a imagem de um produto baseado na busca por id", description = "A requisição lista a imagem do produto que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductImageResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista a imagem do produto que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProductImageResponseDTO> getProductImageById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getProductImageById.execute(id));
    }

    @Operation(summary = "Cria uma nova imagem para um produto", description = "A requisição cria uma nova imagem secundaria para um produto")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductImageResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria uma nova imagem secundaria para um produto"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductImageResponseDTO> createProductImage(@Valid @RequestParam("productImageRequestDTO") String productImageRequestDTO, @Valid @RequestParam MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductImageRequestDTO dto;

        try {
            dto = objectMapper.readValue(productImageRequestDTO, ProductImageRequestDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createProductImage.execute(dto, file));
    }

    @Operation(summary = "Atualiza a imagem de um produto", description = "A requisição atualiza a imagem secundaria de um produto através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductImageResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza a imagem secundaria de um produto através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductImageResponseDTO> updateProductImage(@Valid @RequestParam MultipartFile file, @Valid @PathVariable Long id){
        return ResponseEntity.ok().body(updateProductImage.execute(file, id));
    }

    @Operation(summary = "Deleta a imagem de um produto", description = "A requisição deleta a imagem secundaria de um produto através do id")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição deleta a imagem secundaria de um produto através do id"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProductImage(@Valid @PathVariable Long id) {
        deleteProductImage.execute(id);
        return ResponseEntity.noContent().build();
    }
}
