package br.com.techshirt.exception;

public class AuthInvalidException extends RuntimeException {
    public AuthInvalidException(String message) {
        super(message);
    }
}
