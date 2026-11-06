package br.com.techshirt.modules.user.controller;

import br.com.techshirt.modules.user.dto.UserRequestDTO;
import br.com.techshirt.modules.user.dto.UserResponseDTO;
import br.com.techshirt.modules.user.dto.UserUpdateDTO;
import br.com.techshirt.modules.user.useCases.*;
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
@RequestMapping("/users")
public class UserController {
    @Autowired
    private GetAllUsers getAllUsers;

    @Autowired
    private GetUserById getUserById;

    @Autowired
    private GetUserByEmail getUserByEmail;

    @Autowired
    private GetUserByUser getUserByUser;

    @Autowired
    private CreateUser createUser;

    @Autowired
    private UpdateUser updateUser;

    @Autowired
    private ActiveUser activeUser;

    @Autowired
    private DisableUser disableUser;

    @Operation(summary = "Lista todos os usuários", description = "A requisição lista todos os usuários")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os usuários"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    private ResponseEntity<List<UserResponseDTO>> getAllUsers(){
        return ResponseEntity.ok().body(getAllUsers.execute());
    }

    @Operation(summary = "Lista um usuário baseado na busca por id", description = "A requisição lista o usuário que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o usuário que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    private ResponseEntity<UserResponseDTO> getUserById(@Valid @PathVariable Long id){
        return ResponseEntity.ok().body(getUserById.execute(id));
    }

    @Operation(summary = "Lista um usuário baseado na busca por email", description = "A requisição lista o usuário que foi buscado através do email do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o usuário que foi buscado através do email do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/email")
    private ResponseEntity<UserResponseDTO> getUserByEmail(@Valid @RequestParam String email){
        return ResponseEntity.ok().body(getUserByEmail.execute(email));
    }

    @Operation(summary = "Lista um usuário baseado no usuário autenticado", description = "A requisição lista o usuário que foi buscado através da autenticação")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o usuário que foi buscado através da autenticação"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/user")
    private ResponseEntity<UserResponseDTO> getUserByUser(@Valid HttpServletRequest request) {
        return ResponseEntity.ok().body(getUserByUser.execute(request));
    }

    @Operation(summary = "Cria um novo usuário", description = "A requisição cria um novo usuário")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo usuário"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    private ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserRequestDTO userRequestDTO, HttpServletRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(createUser.execute(userRequestDTO, request));
    }

    @Operation(summary = "Atualiza a senha do usuário autenticado", description = "A requisição atualiza a senha do usuário autenticado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza a senha do usuário autenticado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping
    private ResponseEntity<UserResponseDTO> updateUser(@Valid @RequestBody UserUpdateDTO userUpdateDTO, @Valid HttpServletRequest request) {
        return ResponseEntity.ok().body(updateUser.execute(userUpdateDTO, request));
    }

    @Operation(summary = "Ativa um usuário desativado", description = "A requisição ativa novamente um usuário desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = UserResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um usuário desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    private ResponseEntity<UserResponseDTO> activeUser(@Valid @PathVariable Long id){
        return ResponseEntity.ok().body(activeUser.execute(id));
    }

    @Operation(summary = "Desativa um usuário ativo", description = "A requisição desativa um usuário ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa um usuário ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping
    private ResponseEntity<Void> disableUser(@Valid HttpServletRequest request) {
        disableUser.execute(request);
        return ResponseEntity.noContent().build();
    }
}
