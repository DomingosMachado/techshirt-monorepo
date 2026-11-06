package br.com.techshirt.core.auth.controller;

import br.com.techshirt.core.twoFA.dto.TwoFAVerifyRequestDTO;
import br.com.techshirt.core.auth.useCases.Verify2FAAuth;
import br.com.techshirt.core.auth.dto.AuthRequestDTO;
import br.com.techshirt.core.auth.dto.AuthResponseDTO;
import br.com.techshirt.core.auth.useCases.AdminToUser;
import br.com.techshirt.core.auth.useCases.AuthUser;
import br.com.techshirt.core.auth.useCases.UserToAdmin;
import br.com.techshirt.modules.address.dto.AddressResponseDTO;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;
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

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private AuthUser authUser;

    @Autowired
    private UserToAdmin userToAdmin;

    @Autowired
    private AdminToUser adminToUser;

    @Autowired
    private Verify2FAAuth verify2FAAuth;

    @Operation(summary = "Realiza o login de um usuário",
            description = "A requisição realiza o login de um usuário através do email e senha do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AuthResponseDTO.class), mediaType = "application/json") },
            description = "A requisição realiza o login de um usuário através do email e senha do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/user")
    public ResponseEntity<Object> authUser(@Valid @RequestBody AuthRequestDTO authRequestDTO, @Valid HttpServletRequest request) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(authUser.execute(authRequestDTO, request));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @Operation(summary = "Realiza o login através do 2FA",
            description = "A requisição realiza o login de um usuário através do token temporario e o codigo do Authenticator")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = AuthResponseDTO.class), mediaType = "application/json") },
            description = "A requisição realiza o login de um usuário através do token temporario e o codigo do Authenticator"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/verify-2fa")
    public ResponseEntity<AuthResponseDTO> verify(@RequestBody TwoFAVerifyRequestDTO requestDTO) {
        AuthResponseDTO response = verify2FAAuth.execute(requestDTO);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Transforma um usuário em administrador",
            description = "A requisição transforma um usuário comum (ROLE_USER) em um usuário administrador (ROLE_ADMIN)")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserSummaryDTO.class), mediaType = "application/json") },
            description = "A requisição transforma um usuário comum (ROLE_USER) em um usuário administrador (ROLE_ADMIN)"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/usertoadmin/{id}")
    public ResponseEntity<UserSummaryDTO> userToAdmin(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(userToAdmin.execute(id));
    }

    @Operation(summary = "Transforma um administrador em usuário",
            description = "A requisição transforma um usuário administrador (ROLE_ADMIN) em um usuário comum (ROLE_USER)")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserSummaryDTO.class), mediaType = "application/json") },
            description = "A requisição transforma um usuário administrador (ROLE_ADMIN) em um usuário comum (ROLE_USER)"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping("/admintouser/{id}")
    public ResponseEntity<UserSummaryDTO> adminToUser(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(adminToUser.execute(id));
    }
}
