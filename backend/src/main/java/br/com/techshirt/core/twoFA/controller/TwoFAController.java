package br.com.techshirt.core.twoFA.controller;

import br.com.techshirt.core.twoFA.dto.TwoFARequestDTO;
import br.com.techshirt.core.twoFA.dto.TwoFAResponseDTO;
import br.com.techshirt.core.twoFA.useCases.SetupConfirmTwoFA;
import br.com.techshirt.core.twoFA.useCases.SetupDeviceTwoFA;
import br.com.techshirt.core.twoFA.useCases.SetupDisableTwoFA;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/2fa")
public class TwoFAController {
    @Autowired
    private SetupDeviceTwoFA setupDeviceTwoFA;

    @Autowired
    private SetupConfirmTwoFA setupConfirmTwoFA;

    @Autowired
    private SetupDisableTwoFA setupDisableTwoFA;

    @Operation(summary = "Inicia o processo de 2FA",
            description = "A requisição gera uma chave secreta para ser usada no Google Authenticator que é vinculada ao usuário")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = TwoFAResponseDTO.class), mediaType = "application/json") },
            description = "A requisição gera uma chave secreta para ser usada no google Authenticator que é vinculada ao usuário"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/setup")
    public ResponseEntity<TwoFAResponseDTO> setupDeviceTwoFA(HttpServletRequest request) {
        return ResponseEntity.ok(setupDeviceTwoFA.execute(request));
    }

    @Operation(summary = "Confirma o processo de 2FA",
            description = "A requisição recebe o codigo do Google Authenticator e ativa o 2FA do usuário autenticado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição recebe o codigo do Google Authenticator e ativa o 2FA do usuário autenticado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/confirm")
    public ResponseEntity<Void> setupConfirmTwoFA(HttpServletRequest request, @RequestBody TwoFARequestDTO twoFARequestDTO) {
        setupConfirmTwoFA.execute(request, twoFARequestDTO.code());
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Desativa o 2FA",
            description = "A requisição desativa o 2FA e remove a chave secreta")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserSummaryDTO.class), mediaType = "application/json") },
            description = "A requisição desativa o 2FA e remove a chave secreta"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/disable")
    public ResponseEntity<UserSummaryDTO> setupDisableTwoFA(HttpServletRequest request, @RequestBody TwoFARequestDTO twoFARequestDTO) {
        return ResponseEntity.ok().body(setupDisableTwoFA.execute(request, twoFARequestDTO));
    }
}
