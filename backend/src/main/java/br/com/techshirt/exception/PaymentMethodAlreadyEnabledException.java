package br.com.techshirt.exception;

public class PaymentMethodAlreadyEnabledException extends RuntimeException {
    public PaymentMethodAlreadyEnabledException(String message) {
        super(message);
    }
}
