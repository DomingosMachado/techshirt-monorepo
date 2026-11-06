package br.com.techshirt.exception;

public class CategoryAlreadyEnabledException extends RuntimeException {
    public CategoryAlreadyEnabledException(String message) {
        super(message);
    }
}
