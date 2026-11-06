package br.com.techshirt.modules.qrcode.dto;

import br.com.techshirt.modules.qrcode.QrCodeEntity;

public record QrCodeSummaryDTO(
        Long id,
        String name,
        String link,
        Boolean status,
        String qrcodeUrl
) {
    public QrCodeSummaryDTO(QrCodeEntity qrCodeEntity) {
        this (
                qrCodeEntity.getId(),
                qrCodeEntity.getName(),
                qrCodeEntity.getLink(),
                qrCodeEntity.getStatus(),
                qrCodeEntity.getQrcodeUrl()
        );
    }
}
