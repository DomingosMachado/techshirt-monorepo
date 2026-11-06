package br.com.techshirt.exception;

public class AddressAlreadyEnabledException extends RuntimeException {
    public AddressAlreadyEnabledException(String message) {
        super(message);
    }
}
