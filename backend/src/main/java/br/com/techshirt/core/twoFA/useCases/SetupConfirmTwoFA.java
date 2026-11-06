package br.com.techshirt.core.twoFA.useCases;

import br.com.techshirt.exception.IdNotFoundException;
import br.com.techshirt.exception.TwoFAFailureException;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import dev.samstevens.totp.code.CodeVerifier;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SetupConfirmTwoFA {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CodeVerifier codeVerifier;

    @Transactional
    public void execute(HttpServletRequest request, String code) {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject == null) {
            throw new IdNotFoundException("Servlet failed to retrieve the user id");
        }

        Long userId = Long.parseLong(userIdObject.toString());

        UserEntity user  = userRepository.findById(userId)
                .orElseThrow(() -> new IdNotFoundException("Id [user] not found for id: " + userId));

        if (!codeVerifier.isValidCode(user.getTwoFactorSecret(), code)) {
            throw new TwoFAFailureException("Invalid 2FA verification code.");
        }

        user.setIsTwoFactorEnabled(true);
        userRepository.save(user);
    }
}
