package br.com.techshirt.modules.address.controller;

import br.com.techshirt.modules.address.dto.AddressRequestDTO;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import br.com.techshirt.modules.address.useCases.*;
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
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private CreateAddress createAddress;

    @Autowired
    private GetAllAddress getAllAddress;

    @Autowired
    private GetAddressById getAddressById;

    @Autowired
    private GetAddressByCep getAddressByCep;

    @Autowired
    private UpdateAddress updateAddress;

    @Autowired
    private DisableAddress disableAddress;

    @Autowired
    private ActiveAddress activeAddress;

    @Operation(summary = "Lista todos os endereços", description = "A requisição lista todos os endereços")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os endereços"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<AddressResponseDTO>> getAll() {
        return ResponseEntity.ok().body(getAllAddress.execute());
    }

    @Operation(summary = "Lista um endereço baseado pela busca por id",
            description = "A requisição lista o endereço que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o endereço que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> getById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getAddressById.execute(id));
    }

    @Operation(summary = "Lista um endereço baseado pela busca por cep",
            description = "A requisição lista o endereço que foi buscado através do cep do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o endereço que foi buscado através do cep do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/cep")
    public ResponseEntity<AddressResponseDTO> getByCep(@Valid @RequestParam String cep) {
        return ResponseEntity.ok().body(getAddressByCep.execute(cep));
    }

    @Operation(summary = "Cria um novo endereço", description = "A requisição cria um novo endereço")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo endereço"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<AddressResponseDTO> create(@Valid @RequestBody AddressRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createAddress.execute(dto));
    }

    @Operation(summary = "Atualiza os dados de um endereço",
            description = "A requisição atualiza os dados de um endereço através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza os dados de um endereço através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDTO> update(@Valid @PathVariable Long id, @Valid @RequestBody AddressRequestDTO dto) {
        return ResponseEntity.ok().body(updateAddress.execute(id, dto));
    }

    @Operation(summary = "Ativa um endereço desativado", description = "A requisição ativa novamente um endereço desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um endereço desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}/activate")
    public ResponseEntity<AddressResponseDTO> activate(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(activeAddress.execute(id));
    }

    @Operation(summary = "Desativa um endereço ativo", description = "A requisição desativa um endereço ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AddressResponseDTO.class), mediaType = "application/json") },
            description = "A requisição desativa um endereço ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disable(@Valid @PathVariable Long id) {
        disableAddress.execute(id);
        return ResponseEntity.noContent().build();
    }
}
