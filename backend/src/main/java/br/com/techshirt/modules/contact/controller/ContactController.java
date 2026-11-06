package br.com.techshirt.modules.contact.controller;

import br.com.techshirt.modules.contact.dto.ContactRequestDTO;
import br.com.techshirt.modules.contact.dto.ContactResponseDTO;
import br.com.techshirt.modules.contact.useCases.*;
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
@RequestMapping("/contacts")
public class ContactController {

    @Autowired
    private GetAllContacts getAllContacts;

    @Autowired
    private GetContactById getContactById;

    @Autowired
    private GetContactByUser getContactByUser;

    @Autowired
    private CreateContact createContact;

    @Autowired
    private UpdateContact updateContact;

    @Autowired
    private ActiveContact activeContact;

    @Autowired
    private DisableContact disableContact;

    @Operation(summary = "Lista todos os contatos", description = "A requisição lista todos os contatos")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os contatos"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<ContactResponseDTO>> getAllContacts() {
        return ResponseEntity.ok().body(getAllContacts.execute());
    }

    @Operation(summary = "Lista um contato baseado pela busca por id", description = "A requisição lista um contato que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista um contato que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> getContactById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getContactById.execute(id));
    }

    @Operation(summary = "Lista os contatos do usuário autenticado", description = "A requisição lista todos os contatos do usuário autenticado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os contatos do usuário autenticado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/user")
    public ResponseEntity<List<ContactResponseDTO>> getContactByUser(HttpServletRequest request) {
        return ResponseEntity.ok().body(getContactByUser.execute(request));
    }

    @Operation(summary = "Cria um novo contato", description = "A requisição cria um novo contato")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo contato"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<ContactResponseDTO> createContact(@Valid @RequestBody ContactRequestDTO contactRequestDTO, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createContact.execute(contactRequestDTO, request));
    }

    @Operation(summary = "Atualiza a mensagem de contato",
            description = "A requisição atualiza a mensagem de contato através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza a mensagem de contato através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> updateContact(@Valid @RequestBody ContactRequestDTO contactRequestDTO, @PathVariable Long id) {
        return ResponseEntity.ok().body(updateContact.execute(contactRequestDTO, id));
    }

    @Operation(summary = "Ativa um contato desativado", description = "A requisição ativa novamente um contato desativado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = ContactResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um contato desativado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<ContactResponseDTO> activeContact(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(activeContact.execute(id));
    }

    @Operation(summary = "Desativa um contato ativo", description = "A requisição desativa um contato ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa um contato ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@Valid @PathVariable Long id) {
        disableContact.execute(id);
        return ResponseEntity.noContent().build();
    }
}
