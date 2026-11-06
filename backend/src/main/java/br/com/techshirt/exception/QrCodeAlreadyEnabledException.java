package br.com.techshirt.exception;

public class QrCodeAlreadyEnabledException extends RuntimeException {
    public QrCodeAlreadyEnabledException(String message) {
        super(message);
    }
}
