package br.com.techshirt.exception;

public class PaymentMethodDisabledException extends RuntimeException {
    public PaymentMethodDisabledException(String message) {
        super(message);
    }
}
