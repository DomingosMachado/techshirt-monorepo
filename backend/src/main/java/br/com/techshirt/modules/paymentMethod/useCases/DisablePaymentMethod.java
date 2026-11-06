package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.paymentMethod.PaymentMethodEntity;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisablePaymentMethod {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public void execute(Long id) {
        PaymentMethodEntity paymentMethodEntity = this.paymentMethodRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [paymentMethod] not found for id: " + id));

        paymentMethodEntity.setStatus(false);

        this.paymentMethodRepository.save(paymentMethodEntity);
    }
}
