package br.com.techshirt.exception;

public class ProductStockAlreadyEnableException extends RuntimeException {
    public ProductStockAlreadyEnableException(String message) {
        super(message);
    }
}
