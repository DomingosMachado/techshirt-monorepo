package br.com.techshirt.modules.qrcode.useCases;

import br.com.techshirt.exception.QrCodeAlreadyExistsException;
import br.com.techshirt.modules.qrcode.QrCodeEntity;
import br.com.techshirt.modules.qrcode.dto.QrCodeRequestDTO;
import br.com.techshirt.modules.qrcode.dto.QrCodeResponseDTO;
import br.com.techshirt.modules.qrcode.repository.QrCodeRepository;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.common.BitMatrix;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CreateQrCode {
    @Autowired
    private QrCodeRepository qrCodeRepository;

    @Autowired
    private Bucket firebaseBucket;

    @Transactional
    public QrCodeResponseDTO execute(QrCodeRequestDTO qrCodeRequestDTO) {
        validateLinkNotExists(qrCodeRequestDTO.link());

        byte[] qrCodeBytes = generateQRCodeImage(qrCodeRequestDTO.link(), 300, 300);

        String publicUrl = uploadToFirebase(qrCodeBytes);

        QrCodeEntity qrCodeEntity = new QrCodeEntity();
        qrCodeEntity.setName(qrCodeRequestDTO.name());
        qrCodeEntity.setLink(qrCodeRequestDTO.link());
        qrCodeEntity.setQrcodeUrl(publicUrl);
        qrCodeEntity.setStatus(true);
        qrCodeEntity.setCreatedAt(LocalDateTime.now());

        qrCodeRepository.save(qrCodeEntity);

        return new QrCodeResponseDTO(qrCodeEntity);
    }

    private void validateLinkNotExists(String link) {
        qrCodeRepository.findByLink(link).ifPresent(qr -> {
            throw new QrCodeAlreadyExistsException("There is already a qrCode with link " + qr.getLink());
        });
    }

    private byte[] generateQRCodeImage(String text, int width, int height) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(text, BarcodeFormat.QR_CODE, width, height);

            try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
                MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
                return outputStream.toByteArray();
            }
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Error generating QR code image", e);
        }
    }

    private String uploadToFirebase(byte[] imageData) {
        try {
            String bucketName = this.firebaseBucket.getName();
            String fileName = "qrcodes/" + UUID.randomUUID() + ".png";

            Blob blob = this.firebaseBucket.create(fileName, imageData, "image/png");

            return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    bucketName, fileName.replace("/", "%2F"));

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error uploading QR code to Firebase", e);
        }
    }
}
