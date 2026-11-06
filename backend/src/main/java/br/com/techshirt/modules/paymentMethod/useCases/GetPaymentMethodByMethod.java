package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetPaymentMethodByMethod {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public PaymentMethodResponseDTO execute(String method) {
        PaymentMethodEntity paymentMethodEntity = paymentMethodRepository.findByMethod(method)
                .orElseThrow(()-> new IdNotFoundException("Method [paymentMethod] not found for method: " + method));

        return new PaymentMethodResponseDTO(paymentMethodEntity);
    }
}
