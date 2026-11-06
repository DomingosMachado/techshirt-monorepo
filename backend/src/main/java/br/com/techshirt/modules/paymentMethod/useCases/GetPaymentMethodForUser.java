package br.com.techshirt.modules.paymentMethod.useCases;

import br.com.techshirt.modules.paymentMethod.dto.PaymentMethodSummaryDTO;
import br.com.techshirt.modules.paymentMethod.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetPaymentMethodForUser {
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;

    public List<PaymentMethodSummaryDTO> execute() {
        return this.paymentMethodRepository
                .findAll()
                .stream()
                .map(PaymentMethodSummaryDTO::new)
                .collect(Collectors.toList());
    }
}
