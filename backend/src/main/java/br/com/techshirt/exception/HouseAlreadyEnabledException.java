package br.com.techshirt.exception;

public class HouseAlreadyEnabledException extends RuntimeException {
    public HouseAlreadyEnabledException(String message) {
        super(message);
    }
}
