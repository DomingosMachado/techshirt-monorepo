package br.com.techshirt.exception;

public class CategoryDisabledException extends RuntimeException {
    public CategoryDisabledException(String message) {
        super(message);
    }
}
