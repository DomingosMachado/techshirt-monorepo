package br.com.techshirt.exception;

public class FailedSendEmailException extends RuntimeException {
    public FailedSendEmailException(String message) {
        super(message);
    }
}
