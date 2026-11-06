package br.com.techshirt.exception;

public class ProductStockAlreadyExistsException extends RuntimeException {
    public ProductStockAlreadyExistsException(String message) {
        super(message);
    }
}
