package br.com.techshirt.exception;

public class ContactAlreadyEnabledException extends RuntimeException {
    public ContactAlreadyEnabledException(String message) {
        super(message);
    }
}
