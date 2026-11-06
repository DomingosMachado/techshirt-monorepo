package br.com.techshirt.infra;

import br.com.techshirt.exception.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ExceptionHandlerController extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        List<String> errors = new ArrayList<>();

        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.add(error.getField() + ":" + error.getDefaultMessage());
        }

        WrongAnswer wrongAnswer = new WrongAnswer(status.value(), "Exists invalid field(s)", LocalDateTime.now(), errors);

        return super.handleExceptionInternal(ex, wrongAnswer, headers, status, request);
    }

    @ExceptionHandler(IdNotFoundException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(IdNotFoundException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(CategoryAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(CategoryAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(CategoryAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(EmailAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(EmailNotFoundException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(UserAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(UserAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(UserAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(InvalidOrderStatusException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(InvalidOrderStatusException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(ContactDisabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(ContactDisabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(ContactAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(ContactAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(HouseAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(HouseAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(AddressAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(AddressAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(NonProprietaryException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(NonProprietaryException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(FailedSendEmailException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(FailedSendEmailException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(AuthInvalidException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(AuthInvalidException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(CategoryDisabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(CategoryDisabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(UserChangeRolesException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(UserChangeRolesException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(TwoFAFailureException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(TwoFAFailureException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(TwoFAAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(TwoFAAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(PaymentMethodAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(PaymentMethodAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(PaymentMethodAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(PaymentMethodAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(PaymentMethodDisabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(PaymentMethodDisabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(ProductStockAlreadyEnableException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(ProductStockAlreadyEnableException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(ProductStockAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(ProductStockAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(QrCodeAlreadyEnabledException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(QrCodeAlreadyEnabledException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(QrCodeAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(QrCodeAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }

    @ExceptionHandler(RoleAlreadyExistsException.class)
    public ResponseEntity<WrongAnswer> handlePerfilException(RoleAlreadyExistsException ex) {
        WrongAnswer wrongAnswer = new WrongAnswer(HttpStatus.INTERNAL_SERVER_ERROR.value(), "An invalid value was entered in the request", LocalDateTime.now(), ex.getMessage().lines().toList());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(wrongAnswer);
    }
}
