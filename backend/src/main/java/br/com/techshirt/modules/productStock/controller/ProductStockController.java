package br.com.techshirt.modules.productStock.controller;

import br.com.techshirt.modules.productStock.dto.ProductStockRequestDTO;
import br.com.techshirt.modules.productStock.dto.ProductStockResponseDTO;
import br.com.techshirt.modules.productStock.dto.ProductStockUpdateDTO;
import br.com.techshirt.modules.productStock.enums.ProductSize;
import br.com.techshirt.modules.productStock.useCases.*;
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
@RequestMapping("/productsStock")
public class ProductStockController {
    @Autowired
    private GetAllProductsStock getAllProductsStock;

    @Autowired
    private GetProductStockById getProductStockById;

    @Autowired
    private GetProductStockByProduct getProductStockByProduct;

    @Autowired
    private GetProductsStocksBySize getProductsStocksBySize;

    @Autowired
    private CreateProductStock createProductStock;

    @Autowired
    private UpdateProductStock updateProductStock;

    @Autowired
    private ActiveProductStock activeProductStock;

    @Autowired
    private DisableProductStock disableProductStock;

    @Operation(summary = "Lista todos os estoques dos produtos", description = "A requisição lista todos os estoques dos produtos")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os estoques dos produtos"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<ProductStockResponseDTO>> getAllProductsStock() {
        return ResponseEntity.ok().body(getAllProductsStock.execute());
    }

    @Operation(summary = "Lista o estoque do produto baseado na busca por id",
            description = "A requisição lista o estoque do produto que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o estoque do produto que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProductStockResponseDTO> getProductStockById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getProductStockById.execute(id));
    }

    @Operation(summary = "Lista todos os estoques do produto baseado na busca pelo id do produto",
            description = "A requisição lista todos os estoques do produto que foi buscado através do id do produto")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os estoques do produto que foi buscado através do id do produto"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/product/{id}")
    public ResponseEntity<List<ProductStockResponseDTO>> getProductStockByProduct(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getProductStockByProduct.execute(id));
    }

    @Operation(summary = "Lista todos os estoques dos produtos baseado na busca por tamanho",
            description = "A requisição lista todos os estoques dos produtos que foram buscados através do tamanho")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os estoques dos produtos que foram buscados através do tamanho"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/size")
    public ResponseEntity<List<ProductStockResponseDTO>> getProductsStockBySize(@Valid @RequestParam ProductSize productSize) {
        return ResponseEntity.ok().body(getProductsStocksBySize.execute(productSize));
    }

    @Operation(summary = "Cria um novo tamanho com estoque para um produto",
            description = "A requisição cria um novo tamanho com estoque para um produto que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo tamanho com estoque para um produto que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<ProductStockResponseDTO> createProductStock(@Valid @RequestBody ProductStockRequestDTO productStockRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createProductStock.execute(productStockRequestDTO));
    }

    @Operation(summary = "Atualiza o tamanho e estoque de um produto",
            description = "A requisição atualiza o tamanho e estoque de um produto que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza o tamanho e estoque de um produto que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping
    public ResponseEntity<ProductStockResponseDTO> updateProductStock(@Valid @RequestBody ProductStockUpdateDTO productStockUpdateDTO,
                                                                      @Valid @RequestParam Long productId,
                                                                      @Valid @RequestParam ProductSize productSize) {
        return ResponseEntity.ok().body(updateProductStock.execute(productStockUpdateDTO, productId, productSize));
    }

    @Operation(summary = "Ativa o tamanho e estoque de um produto desativado",
            description = "A requisição ativa novamente o tamanho e estoque de um produto desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ProductStockResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente o tamanho e estoque de um produto desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<ProductStockResponseDTO> activeProductStock(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(activeProductStock.execute(id));
    }

    @Operation(summary = "Desativa o tamanho e estoque de um produto ativo",
            description = "A requisição desativa o tamanho e estoque de um produto ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa o tamanho e estoque de um produto ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disableProductStock(@Valid @PathVariable Long id) {
        disableProductStock.execute(id);
        return ResponseEntity.noContent().build();
    }
}
