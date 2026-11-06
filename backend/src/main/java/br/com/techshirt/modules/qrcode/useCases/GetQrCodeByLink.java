package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetQrCodeByLink {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public QrCodeResponseDTO execute(String link) {
        QrCodeEntity qrCodeEntity = qrCodeRepository.findByLink(link)
                .orElseThrow(()-> new IdNotFoundException("Link [QrCode] not found for link: " + link));

        return new QrCodeResponseDTO(qrCodeEntity);
    }
}
