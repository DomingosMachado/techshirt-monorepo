package br.com.techshirt.core.twoFA.useCases;

import br.com.techshirt.core.email.twoFA.TwoFAActiveEmail;
import br.com.techshirt.core.twoFA.dto.TwoFAResponseDTO;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.TwoFAFailureException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import dev.samstevens.totp.exceptions.QrGenerationException;
import dev.samstevens.totp.qr.QrData;
import dev.samstevens.totp.qr.QrGenerator;
import dev.samstevens.totp.qr.ZxingPngQrGenerator;
import dev.samstevens.totp.secret.SecretGenerator;
import dev.samstevens.totp.util.Utils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SetupDeviceTwoFA {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecretGenerator secretGenerator;

    @Autowired
    private TwoFAActiveEmail twoFAActiveEmail;

    @Transactional
    public TwoFAResponseDTO execute(HttpServletRequest request) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity user  = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        String secret = secretGenerator.generate();

        String qrCodeUri = generateQrCodeImageUri(secret, user.getEmail());

        user.setTwoFactorSecret(secret);
        user.setIsTwoFactorEnabled(false);
        userRepository.save(user);

        twoFAActiveEmail.execute(
                user.getEmail(),
                user.getName(),
                secret,
                qrCodeUri,
                request
        );

        return new TwoFAResponseDTO(secret, qrCodeUri);
    }

    private String generateQrCodeImageUri(String secret, String email) {
        try {
            QrData data = new QrData.Builder()
                    .label(email)
                    .secret(secret)
                    .issuer("TechShirt")
                    .build();

            QrGenerator generator = new ZxingPngQrGenerator();
            byte[] imageData = generator.generate(data);
            return Utils.getDataUriForImage(imageData, generator.getImageMimeType());
        } catch (QrGenerationException e) {
            e.printStackTrace();
            throw new TwoFAFailureException("Error generating QR Code for 2FA");
        }
    }
}