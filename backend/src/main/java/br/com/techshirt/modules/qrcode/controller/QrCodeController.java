package br.com.techshirt.modules.qrcode.controller;

import br.com.techshirt.modules.qrcode.dto.QrCodeRequestDTO;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.dto.QrCodeUpdateDTO;
import br.com.techshirt.modules.qrcode.useCases.*;
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
@RequestMapping("/qrcode")
public class QrCodeController {
    @Autowired
    private GetAllQrCodes getAllQrCodes;

    @Autowired
    private GetQrCodeById getQrCodeById;

    @Autowired
    private GetQrCodeByLink getQrCodeByLink;

    @Autowired
    private CreateQrCode createQrCode;

    @Autowired
    private UpdateQrCode updateQrCode;

    @Autowired
    private ActiveQrCode activeQrCode;

    @Autowired
    private DisableQrCode disableQrCode;

    @Operation(summary = "Lista todos os QrCodes", description = "A requisição lista todos os QrCodes")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os QrCodes"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<QrCodeResponseDTO>> getAllQrCodes() {
        return ResponseEntity.ok().body(getAllQrCodes.execute());
    }

    @Operation(summary = "Lista um QrCode baseado na busca por id", description = "A requisição lista o QrCode que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o QrCode que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<QrCodeResponseDTO> getQrCodeById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getQrCodeById.execute(id));
    }

    @Operation(summary = "Lista um QrCode baseado na busca por link", description = "A requisição lista o QrCode que foi buscado através do link do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o QrCode que foi buscado através do link do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/link")
    public ResponseEntity<QrCodeResponseDTO> getQrCodeByLink(@Valid @RequestParam String link) {
        return ResponseEntity.ok().body(getQrCodeByLink.execute(link));
    }

    @Operation(summary = "Cria um novo QrCode", description = "A requisição cria um novo QrCode")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo QrCode"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<QrCodeResponseDTO> createQrCode(@Valid @RequestBody QrCodeRequestDTO qrCodeRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createQrCode.execute(qrCodeRequestDTO));
    }

    @Operation(summary = "Atualiza o nome de QrCode", description = "A requisição atualiza o nome de um QrCode através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo QrCode"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<QrCodeResponseDTO> updateQrCode(@Valid @RequestBody QrCodeUpdateDTO qrCodeUpdateDTO, @Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(updateQrCode.execute(qrCodeUpdateDTO, id));
    }

    @Operation(summary = "Ativa um QrCode desativado", description = "A requisição ativa novamente um QrCode desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = QrCodeResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um QrCode desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<QrCodeResponseDTO> activeQrCode(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(activeQrCode.execute(id));
    }

    @Operation(summary = "Desativa um QrCode ativo", description = "A requisição desativa um QrCode ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa um QrCode ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disableQrCode(@Valid @PathVariable Long id) {
        disableQrCode.execute(id);
        return ResponseEntity.noContent().build();
    }
}
