package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.dto.QrCodeUpdateDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UpdateQrCode {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Transactional
    public QrCodeResponseDTO execute(QrCodeUpdateDTO qrCodeUpdateDTO, Long id) {
        QrCodeEntity qrCodeEntity = this.qrCodeRepository.findById(id)
                .orElseThrow(()-> new IdNotFoundException("Id [QrCode] not found for id: " + id));

        qrCodeEntity.setName(qrCodeUpdateDTO.name());

        this.qrCodeRepository.save(qrCodeEntity);

        return new QrCodeResponseDTO(qrCodeEntity);
    }
}
