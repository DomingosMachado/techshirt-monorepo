package br.com.techshirt.modules.roles.controller;

import br.com.techshirt.modules.roles.dto.RolesRequestDTO;
import br.com.techshirt.modules.roles.dto.RolesResponseDTO;
import br.com.techshirt.modules.roles.useCases.*;
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
@RequestMapping("/roles")
public class RolesController {
    @Autowired
    private GetAllRoles getAllRoles;

    @Autowired
    private GetRuleById getRuleById;

    @Autowired
    private GetRuleByName getRuleByName;

    @Autowired
    private CreateRule createRule;

    @Autowired
    private UpdateRule updateRule;

    @Autowired
    private DeleteRule deleteRule;

    @Operation(summary = "Lista todos os roles", description = "A requisição lista todos os roles")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = RolesResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os roles"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<RolesResponseDTO>> getAllRoles() {
        return ResponseEntity.ok().body(getAllRoles.execute());
    }

    @Operation(summary = "Lista um rule baseado na busca por id", description = "A requisição lista o rule que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = RolesResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o rule que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<RolesResponseDTO> getRuleById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getRuleById.execute(id));
    }

    @Operation(summary = "Lista um rule baseado na busca por nome", description = "A requisição lista o rule que foi buscado através do nome do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = RolesResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o rule que foi buscado através do nome do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/name")
    public ResponseEntity<RolesResponseDTO> getRuleByName(@Valid @RequestParam String name) {
        return ResponseEntity.ok().body(getRuleByName.execute(name));
    }

    @Operation(summary = "Cria um novo rule", description = "A requisição cria um novo rule")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = RolesResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo role"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<RolesResponseDTO> createRule(@Valid @RequestBody RolesRequestDTO rolesRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createRule.execute(rolesRequestDTO));
    }

    @Operation(summary = "Atualiza o nome de um rule", description = "A requisição atualiza o nome de um rule através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = RolesResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza o nome de um rule através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<RolesResponseDTO> updateRule(@Valid @RequestBody RolesRequestDTO rolesRequestDTO, @Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(updateRule.execute(rolesRequestDTO, id));
    }

    @Operation(summary = "Deleta um rule", description = "A requisição deleta um rule através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição deleta um rule através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRule(@Valid @PathVariable Long id) {
        deleteRule.execute(id);
        return ResponseEntity.noContent().build();
    }
}
