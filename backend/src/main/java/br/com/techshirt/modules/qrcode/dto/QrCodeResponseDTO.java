package br.com.techshirt.modules.qrcode.dto;

import br.com.techshirt.modules.product.dto.ProductSummaryDTO;
import br.com.techshirt.modules.qrcode.QrCodeEntity;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public record QrCodeResponseDTO(
        Long id,
        String name,
        String link,
        String qrcodeUrl,
        Boolean status,
        List<ProductSummaryDTO> products
) {
    public QrCodeResponseDTO(QrCodeEntity qrCodeEntity) {
        this (
                qrCodeEntity.getId(),
                qrCodeEntity.getName(),
                qrCodeEntity.getLink(),
                qrCodeEntity.getQrcodeUrl(),
                qrCodeEntity.getStatus(),
                qrCodeEntity.getProducts() == null
                    ? Collections.emptyList()
                    : qrCodeEntity.getProducts().stream().map(ProductSummaryDTO::new).collect(Collectors.toList())
        );
    }
}
