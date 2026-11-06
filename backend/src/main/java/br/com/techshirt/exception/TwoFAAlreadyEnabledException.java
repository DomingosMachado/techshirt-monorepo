package br.com.techshirt.exception;

public class TwoFAAlreadyEnabledException extends RuntimeException {
    public TwoFAAlreadyEnabledException(String message) {
        super(message);
    }
}
