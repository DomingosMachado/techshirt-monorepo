package br.com.techshirt.provider;

import br.com.techshirt.modules.roles.RolesEntity;
import br.com.techshirt.modules.user.UserEntity;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtProvider {
    @Value("${security.token.secret}")
    private String secretKey;

    public DecodedJWT validateToken(String token) {
        String jwtToken = token.replace("Bearer ", "");
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        try {
            return JWT.require(algorithm)
                    .build()
                    .verify(jwtToken);
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            return null;
        }
    }

    public String generateFinalToken(UserEntity user) {
        List<String> roles = user.getRoles()
                .stream()
                .map(RolesEntity::getName)
                .collect(Collectors.toList());

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        var expiresIn = Instant.now().plus(Duration.ofHours(2));

        return JWT.create()
                .withIssuer("TechShirt")
                .withExpiresAt(expiresIn)
                .withSubject(user.getId().toString())
                .withClaim("roles", roles)
                .sign(algorithm);
    }
}
