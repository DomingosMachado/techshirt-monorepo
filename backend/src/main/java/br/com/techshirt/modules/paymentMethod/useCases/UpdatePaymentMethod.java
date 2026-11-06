package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.PaymentMethodAlreadyExistsException;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodRequestDTO;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdatePaymentMethod {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public PaymentMethodResponseDTO execute(PaymentMethodRequestDTO paymentMethodRequestDTO, Long id) {
        this.paymentMethodRepository.findByMethod(paymentMethodRequestDTO.method())
                .ifPresent(paymentMethod -> {
                    throw new PaymentMethodAlreadyExistsException("The method " + paymentMethodRequestDTO.method() + " already exists");
                });

        PaymentMethodEntity paymentMethodEntity = this.paymentMethodRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [paymentMethod] not found for id: " + id));

        paymentMethodEntity.setMethod(paymentMethodRequestDTO.method());

        this.paymentMethodRepository.save(paymentMethodEntity);

        return new PaymentMethodResponseDTO(paymentMethodEntity);
    }
}
