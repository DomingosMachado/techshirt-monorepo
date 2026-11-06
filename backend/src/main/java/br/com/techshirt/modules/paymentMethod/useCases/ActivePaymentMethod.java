package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.PaymentMethodAlreadyEnabledException;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivePaymentMethod {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public PaymentMethodResponseDTO execute(Long id) {
        PaymentMethodEntity paymentMethodEntity = this.paymentMethodRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [paymentMethod] not found for id: " + id));

        if(paymentMethodEntity.getStatus()) {
            throw new PaymentMethodAlreadyEnabledException("Payment method already enabled");
        }

        paymentMethodEntity.setStatus(true);

        return new PaymentMethodResponseDTO(paymentMethodEntity);
    }
}
