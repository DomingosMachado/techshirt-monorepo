package br.com.techshirt.modules.paymentMethod.controller;

import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodRequestDTO;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodSummaryDTO;
import br.com.techshirt.modules.paymentMethod.useCases.*;
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
@RequestMapping("/paymentMethods")
public class PaymentMethodController {
    @Autowired
    private GetAllPaymentMethods getAllPaymentMethods;

    @Autowired
    private GetPaymentMethodById getPaymentMethodById;

    @Autowired
    private GetPaymentMethodByMethod getPaymentMethodByMethod;

    @Autowired
    private GetPaymentMethodForUser getPaymentMethodForUser;

    @Autowired
    private CreatePaymentMethod createPaymentMethod;

    @Autowired
    private UpdatePaymentMethod updatePaymentMethod;

    @Autowired
    private ActivePaymentMethod activePaymentMethod;

    @Autowired
    private DisablePaymentMethod disablePaymentMethod;

    @Operation(summary = "Lista todos os métodos de pagamento", description = "A requisição lista todos os métodos de pagamento")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os métodos de pagamento"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<PaymentMethodResponseDTO>> getAllPaymentMethods() {
        return ResponseEntity.ok().body(getAllPaymentMethods.execute());
    }

    @Operation(summary = "Lista um método de pagamento baseado pela busca por id",
            description = "A requisição lista o método de pagamento que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o método de pagamento que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethodResponseDTO> getPaymentMethodById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getPaymentMethodById.execute(id));
    }

    @Operation(summary = "Lista um método de pagamento baseado pela busca por método",
            description = "A requisição lista o método de pagamento que foi buscado através do método do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o método de pagamento que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/method")
    public ResponseEntity<PaymentMethodResponseDTO> getPaymentMethodByMethod(@Valid @RequestParam String method) {
        return ResponseEntity.ok().body(getPaymentMethodByMethod.execute(method));
    }

    @Operation(summary = "Lista todos os métodos de pagamento para um usuário comum",
            description = "A requisição lista todos os métodos de pagamento para usuários com o role (ROLE_USER)")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os métodos de pagamento para usuários com o role (ROLE_USER)"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/user")
    public ResponseEntity<List<PaymentMethodSummaryDTO>> getPaymentMethodForUser() {
        return ResponseEntity.ok().body(getPaymentMethodForUser.execute());
    }

    @Operation(summary = "Cria um novo método de pagamento", description = "A requisição cria um novo método de pagamento")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo método de pagamento"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<PaymentMethodResponseDTO> createPaymentMethod(@Valid @RequestBody PaymentMethodRequestDTO paymentMethodRequestDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createPaymentMethod.execute(paymentMethodRequestDTO));
    }

    @Operation(summary = "Atualiza um método de pagamento", description = "A requisição atualiza um método de pagamento através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza um método de pagamento através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<PaymentMethodResponseDTO> updatePaymentMethod(@Valid @RequestBody PaymentMethodRequestDTO paymentMethodRequestDTO,
                                                                        @Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(updatePaymentMethod.execute(paymentMethodRequestDTO, id));
    }

    @Operation(summary = "Ativa um método de pagamento desativado", description = "A requisição ativa novamente um método de pagamento desabilitado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = PaymentMethodResponseDTO.class), mediaType = "application/json") },
            description = "A requisição ativa novamente um método de pagamento desabilitado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/active/{id}")
    public ResponseEntity<PaymentMethodResponseDTO> activePaymentMethod(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(activePaymentMethod.execute(id));
    }

    @Operation(summary = "Desativa um método de pagamento ativo", description = "A requisição desativa um método de pagamento ativo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(mediaType = "application/json") },
            description = "A requisição desativa um método de pagamento ativo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> disablePaymentMethod(@Valid @PathVariable Long id) {
        disablePaymentMethod.execute(id);
        return ResponseEntity.noContent().build();
    }
}
