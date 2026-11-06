package br.com.techshirt.exception;

public class QrCodeAlreadyExistsException extends RuntimeException {
    public QrCodeAlreadyExistsException(String message) {
        super(message);
    }
}
