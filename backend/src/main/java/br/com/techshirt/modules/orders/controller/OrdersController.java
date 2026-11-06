package br.com.techshirt.modules.orders.controller;

import br.com.techshirt.modules.orders.dto.OrdersRequestDTO;
import br.com.techshirt.modules.orders.dto.OrdersResponseDTO;
import br.com.techshirt.modules.orders.dto.OrdersUpdateDTO;
import br.com.techshirt.modules.orders.useCases.*;
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
@RequestMapping("/orders")
public class OrdersController {
    @Autowired
    private GetAllOrders getAllOrders;

    @Autowired
    private GetOrderById getOrderById;

    @Autowired
    private GetOrdersByUser getOrdersByUser;

    @Autowired
    private CreateOrder createOrder;

    @Autowired
    private UpdateOrder updateOrder;

    @Autowired
    private CancelOrder cancelOrder;

    @Operation(summary = "Lista todos os pedidos", description = "A requisição lista todos os pedidos")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os pedidos"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping
    public ResponseEntity<List<OrdersResponseDTO>> getAllOrders() {
        return ResponseEntity.ok().body(getAllOrders.execute());
    }

    @Operation(summary = "Lista o pedido baseado pela busca por id", description = "A requisição lista o pedido que foi buscado através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista o pedido que foi buscado através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/{id}")
    public ResponseEntity<OrdersResponseDTO> getOrderById(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(getOrderById.execute(id));
    }

    @Operation(summary = "Lista os pedidos do usuário autenticado", description = "A requisição lista todos os pedidos do usuário autenticado")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição lista todos os pedidos do usuário autenticado"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @GetMapping("/user")
    public ResponseEntity<List<OrdersResponseDTO>> getOrdersByUser(@Valid HttpServletRequest request) {
        return ResponseEntity.ok().body(getOrdersByUser.execute(request));
    }

    @Operation(summary = "Cria um novo pedido", description = "A requisição cria um novo pedido")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cria um novo pedido"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PostMapping
    public ResponseEntity<OrdersResponseDTO> createOrder(@Valid @RequestBody OrdersRequestDTO ordersRequestDTO, HttpServletRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(createOrder.execute(ordersRequestDTO, request));
    }

    @Operation(summary = "Atualiza o status de um pedido",
            description = "A requisição atualiza o status de um pedido através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição atualiza o status de um pedido através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/{id}")
    public ResponseEntity<OrdersResponseDTO> updateOrder(@Valid @RequestBody OrdersUpdateDTO ordersUpdateDTO, @Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(updateOrder.execute(ordersUpdateDTO, id));
    }

    @Operation(summary = "Cancela um pedido ativo",
            description = "A requisição cancela um pedido ativo através do id do mesmo")
    @ApiResponses(value = { @ApiResponse(responseCode = "200", content = {
            @Content(schema = @Schema(implementation = OrdersResponseDTO.class), mediaType = "application/json") },
            description = "A requisição cancela um pedido ativo através do id do mesmo"),
            @ApiResponse(responseCode = "401", description = "Erro de autenticação"),
            @ApiResponse(responseCode = "403", description = "Não há permissão para acessar o recurso"),
            @ApiResponse(responseCode = "404", description = "Recurso não encontrado"),
            @ApiResponse(responseCode = "505", description = "Exceção interna da aplicação") }
    )
    @PutMapping("/cancel/{id}")
    public ResponseEntity<OrdersResponseDTO> cancelOrder(@Valid @PathVariable Long id) {
        return ResponseEntity.ok().body(cancelOrder.execute(id));
    }
}
