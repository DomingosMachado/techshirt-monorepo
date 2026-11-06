package br.com.techshirt.modules.house.controller;

import br.com.techshirt.modules.house.dto.HouseRequestDTO;
import br.com.techshirt.modules.house.dto.HouseResponseDTO;
import br.com.techshirt.modules.house.useCases.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/houses")
public class HouseController {

    @Autowired
    private GetAllHouses getAllHouses;

    @Autowired
    private GetHouseById getHouseById;

    @Autowired
    private GetHousesByUser getHousesByUser;

    @Autowired
    private CreateHouse createHouse;

    @Autowired
    private UpdateHouse updateHouse;

    @Autowired
    private ActiveHouse activeHouse;

    @Autowired
    private DisableHouse disableHouse;

    @Operation(summary = "Lista todas as casas", description = "A requisição lista todas as casas")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todas as casas"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<HouseResponseDTO>> getAllHouses() {
        return ResponseEntity.ok().body(getAllHouses.execute());
    }

    @Operation(summary = "Lista uma casa baseado pela busca por id", description = "A requisição lista uma casa que foi buscada através do id da mesma")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista uma casa que foi buscada através do id da mesma"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<HouseResponseDTO> getHouseById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getHouseById.execute(id));
    }

    @Operation(summary = "Lista as casas do usuário autenticado", description = "A requisição lista todas as casas do usuário autenticado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todas as casas do usuário autenticado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/user")
    public ResponseEntity<List<HouseResponseDTO>> getHouseById(HttpServletRequest request) {
        return ResponseEntity.ok().body(getHousesByUser.execute(request));
    }

    @Operation(summary = "Cria uma nova casa", description = "A requisição cria uma nova casa")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria uma nova casa"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<HouseResponseDTO> createHouse(@Valid @RequestBody HouseRequestDTO houseRequestDTO, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createHouse.execute(houseRequestDTO, request));
    }

    @Operation(summary = "Atualiza os dados de uma casa",
            description = "A requisição atualiza os dados de uma casa através do id da mesma")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza os dados de uma casa através do id da mesma"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<HouseResponseDTO> updateHouse(@Valid @RequestBody HouseRequestDTO houseRequestDTO,
                                                        @Valid @PathVariable Long id,
                                                        HttpServletRequest request) {
        return ResponseEntity.ok().body(updateHouse.execute(houseRequestDTO, id, request));
    }

    @Operation(summary = "Ativa uma casa desativada", description = "A requisição ativa novamente uma casa desativada")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = HouseResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente uma casa desativada"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<HouseResponseDTO> activeHouse(@Valid @PathVariable Long id, HttpServletRequest request) {
        return ResponseEntity.ok().body(activeHouse.execute(id, request));
    }

    @Operation(summary = "Desativa uma casa ativa", description = "A requisição desativa uma casa ativa")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa uma casa ativa"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disableHouse(@Valid @PathVariable Long id, HttpServletRequest request) {
        disableHouse.execute(id, request);
        return ResponseEntity.noContent().build();
    }
}