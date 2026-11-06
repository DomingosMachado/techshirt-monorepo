package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GetQrCodeById {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public QrCodeResponseDTO execute(Long id) {
        QrCodeEntity qrCodeEntity = this.qrCodeRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("id [QrCode] not found for id: " + id));

        return new QrCodeResponseDTO(qrCodeEntity);
    }
}
