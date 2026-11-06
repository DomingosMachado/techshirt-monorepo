package br.com.techshirt.exception;

public class ContactDisabledException extends RuntimeException {
    public ContactDisabledException(String message) {
        super(message);
    }
}
