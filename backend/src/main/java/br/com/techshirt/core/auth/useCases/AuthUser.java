package br.com.techshirt.core.auth.useCases;

import br.com.techshirt.core.auth.dto.AuthRequestDTO;
import br.com.techshirt.core.auth.dto.AuthResponseDTO;
import br.com.techshirt.core.email.auth.AuthUserEmail;
import br.com.techshirt.exception.AuthInvalidException;
import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.user.UserEntity;
import br.com.techshirt.modules.user.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthUser {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private AuthUserEmail authUserEmail;

    @Value("${security_token_secret}")
    private String secretKey;

    public AuthResponseDTO execute(AuthRequestDTO authRequestDTO, HttpServletRequest request) throws AuthenticationException {
        Object userIdObject = request.getAttribute("user_id");

        if (userIdObject != null) {
            throw new AuthInvalidException("There is already an authenticated user");
        }

        UserEntity user = this.userRepository.findByEmail(authRequestDTO.username())
                .orElseThrow(() -> new AuthenticationException("username/password incorrect"));

        if(user.getStatus().equals(false)) {
            throw new AuthInvalidException("This user is disabled");
        }

        var passwordMatches = bCryptPasswordEncoder.matches(authRequestDTO.password(), user.getPassword());

        if (!passwordMatches) {
            throw new AuthenticationException("invalid username or password");
        }

        if (user.getIsTwoFactorEnabled()) {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            var expiresIn = Instant.now().plus(Duration.ofMinutes(5));

            var tempToken = JWT.create()
                    .withIssuer("TechShirt-2FA")
                    .withExpiresAt(expiresIn)
                    .withSubject(user.getId().toString())
                    .withClaim("type", "2FA_TEMP_TOKEN")
                    .sign(algorithm);

            return new AuthResponseDTO(tempToken, expiresIn.toEpochMilli(), true);

        } else {
            List<String> roles = user.getRoles()
                    .stream()
                    .map(RolesEntity::getName)
                    .collect(Collectors.toList());

            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            var expiresIn = Instant.now().plus(Duration.ofHours(2));

            var finalToken = JWT.create()
                    .withIssuer("TechShirt")
                    .withExpiresAt(expiresIn)
                    .withSubject(user.getId().toString())
                    .withClaim("roles", roles)
                    .sign(algorithm);

            authUserEmail.execute(user.getEmail(), user.getName(), request);

            return new AuthResponseDTO(finalToken, expiresIn.toEpochMilli(), false);
        }
    }
}
