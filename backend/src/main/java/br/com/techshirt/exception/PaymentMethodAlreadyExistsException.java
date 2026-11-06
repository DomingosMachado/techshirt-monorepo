package br.com.techshirt.exception;

public class PaymentMethodAlreadyExistsException extends RuntimeException {
    public PaymentMethodAlreadyExistsException(String message) {
        super(message);
    }
}
