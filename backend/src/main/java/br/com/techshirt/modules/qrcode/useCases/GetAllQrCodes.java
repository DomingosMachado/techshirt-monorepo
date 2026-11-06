package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GetAllQrCodes {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public List<QrCodeResponseDTO> execute() {
        return this.qrCodeRepository
                .findAll()
                .stream()
                .map(QrCodeResponseDTO::new)
                .collect(Collectors.toList());
    }
}
