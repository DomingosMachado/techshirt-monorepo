package br.com.techshirt.modules.product.controller;

import br.com.techshirt.modules.product.dto.ProductRequestDTO;
import br.com.techshirt.modules.product.dto.ProductResponseDTO;
import br.com.techshirt.modules.product.dto.ProductUpdateDTO;
import br.com.techshirt.modules.product.useCases.*;
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
@RequestMapping("/products")
public class ProductController {
    @Autowired
    private GetAllProducts getAllProducts;

    @Autowired
    private GetProductById getProductById;

    @Autowired
    private CreateProduct createProduct;

    @Autowired
    private UpdateProduct updateProduct;

    @Autowired
    private UpdateImageProduct updateImageProduct;

    @Autowired
    private ActiveProduct activeProduct;

    @Autowired
    private DisableProduct disableProduct;

    @Operation(summary = "Lista todos os produtos", description = "A requisição lista todos os produtos")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os produtos"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts(){
        return ResponseEntity.ok().body(getAllProducts.execute());
    }

    @Operation(summary = "Lista um produto baseado pela busca por id", description = "A requisição lista o produto que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o produto que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@Valid @PathVariable Long id){
        return ResponseEntity.ok().body(getProductById.execute(id));
    }

    @Operation(summary = "Cria um novo produto", description = "A requisição cria um novo produto")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo produto"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> createProduct(@Valid @RequestParam("productRequestDTO") String productRequestDTO,
                                                            @Valid @RequestParam MultipartFile file) {
        ObjectMapper objectMapper = new ObjectMapper();
        ProductRequestDTO dto;

        try {
            dto = objectMapper.readValue(productRequestDTO, ProductRequestDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(createProduct.execute(dto, file));
    }

    @Operation(summary = "Atualiza o conteúdo de um produto", description = "A requisição atualiza o conteúdo de um produto através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza o conteúdo de um produto através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> updateProduct(@Valid @RequestBody ProductUpdateDTO productUpdateDTO, @Valid @PathVariable Long id){
        return ResponseEntity.ok().body(updateProduct.execute(productUpdateDTO, id));
    }

    @Operation(summary = "Atualiza a imagem de um produto", description = "A requisição atualiza a imagem principal de um produto através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza a imagem principal de um produto através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping(path = "/image/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProductResponseDTO> updateImageProduct(@Valid @RequestParam MultipartFile file, @Valid @PathVariable Long id){
        return ResponseEntity.ok().body(updateImageProduct.execute(file, id));
    }

    @Operation(summary = "Ativa um produto desativado", description = "A requisição ativa novamente um produto desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um produto desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<ProductResponseDTO> activeProduct(@Valid @PathVariable Long id){
        return ResponseEntity.ok().body(activeProduct.execute(id));
    }

    @Operation(summary = "Desativa um produto ativo", description = "A requisição desativa um produto ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa um produto ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disableProduct(@Valid @PathVariable Long id){
        disableProduct.execute(id);
        return ResponseEntity.noContent().build();
    }
}
