package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetPaymentMethodById {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public PaymentMethodResponseDTO execute(Long id) {
        PaymentMethodEntity paymentMethodEntity = this.paymentMethodRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [paymentMethod] not found for id: " + id));

        return new PaymentMethodResponseDTO(paymentMethodEntity);
    }
}
