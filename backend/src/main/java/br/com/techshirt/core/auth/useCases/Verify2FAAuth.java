package br.com.techshirt.core.auth.useCases;

import br.com.techshirt.core.twoFA.dto.TwoFAVerifyRequestDTO;
import br.com.techshirt.core.auth.dto.AuthResponseDTO;
import br.com.techshirt.exception.AuthInvalidException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import br.com.techshirt.provider.JwtProvider;
import com.auth0.jwt.interfaces.DecodedJWT;
import dev.samstevens.totp.code.CodeVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;

@Service
public class Verify2FAAuth {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CodeVerifier codeVerifier;

    public AuthResponseDTO execute(TwoFAVerifyRequestDTO requestDTO) {
        DecodedJWT decodedTempJWT = jwtProvider.validateToken(requestDTO.tempToken());

        String tokenType = decodedTempJWT.getClaim("type").asString();
        if (!"2FA_TEMP_TOKEN".equals(tokenType)) {
            throw new AuthInvalidException("Invalid token for 2FA verification");
        }

        Long userId = Long.parseLong(decodedTempJWT.getSubject());
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        if (!codeVerifier.isValidCode(user.getTwoFactorSecret(), requestDTO.code())) {
            throw new AuthInvalidException("Invalid 2FA code");
        }

        String finalToken = jwtProvider.generateFinalToken(user);

        var expiresIn = Instant.now().plus(Duration.ofHours(2));
        return new AuthResponseDTO(finalToken, expiresIn.toEpochMilli(), false);
    }
}
