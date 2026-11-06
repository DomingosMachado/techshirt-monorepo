package br.com.techshirt.exception;

public class TwoFAFailureException extends RuntimeException {
    public TwoFAFailureException(String message) {
        super(message);
    }
}
