package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.QrCodeAlreadyEnabledException;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DisableQrCode {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public void execute(Long id) {
        QrCodeEntity qrCodeEntity = this.qrCodeRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [QrCode] not found for id: " + id));

        if(!qrCodeEntity.getStatus()) {
            throw new QrCodeAlreadyEnabledException("QrCode already disabled");
        }

        qrCodeEntity.setStatus(false);

        this.qrCodeRepository.save(qrCodeEntity);
    }
}
