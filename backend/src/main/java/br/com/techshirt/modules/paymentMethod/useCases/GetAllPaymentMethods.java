package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodResponseDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllPaymentMethods {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    @Transactional
    public List<PaymentMethodResponseDTO> execute() {
        return this.paymentMethodRepository
                .findAll()
                .stream()
                .map(PaymentMethodResponseDTO::new)
                .collect(Collectors.toList());
    }
}
