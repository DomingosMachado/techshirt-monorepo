package br.com.techshirt.core.twoFA.useCases;

import br.com.techshirt.core.email.twoFA.TwoFADisableEmail;
import br.com.techshirt.core.twoFA.dto.TwoFARequestDTO;
import br.com.techshirt.exception.AuthInvalidException;
import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.TwoFAAlreadyEnabledException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.dto.UserSummaryDTO;
import br.com.techshirt.modules.user.repository.UserRepository;
import dev.samstevens.totp.code.CodeVerifier;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SetupDisableTwoFA {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CodeVerifier codeVerifier;

    @Autowired
    private TwoFADisableEmail twoFADisableEmail;

    @Transactional
    public UserSummaryDTO execute(HttpServletRequest request, TwoFARequestDTO twoFARequestDTO) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());
        UserEntity user  = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        if (!user.getIsTwoFactorEnabled()) {
            throw new TwoFAAlreadyEnabledException("Two factor is already disabled for this user.");
        }

        String providedCode = twoFARequestDTO.code();
        String userSecret = user.getTwoFactorSecret();

        if (!codeVerifier.isValidCode(userSecret, providedCode)) {
            throw new AuthInvalidException("Invalid 2FA code.");
        }

        user.setIsTwoFactorEnabled(false);
        user.setTwoFactorSecret(null);

        userRepository.save(user);

        twoFADisableEmail.execute(
                user.getEmail(),
                user.getName(),
                request
        );

        return new UserSummaryDTO(user);
    }
}
