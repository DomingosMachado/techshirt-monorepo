package br.com.techshirt.modules.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import org.hibernate.validator.constraints.Length;

public record UserUpdateDTO(
        @NotBlank(message = "The field [password] cannot be null or empty")
        @Length(min = 8, max = 100, message = "The minimum and maximum password length is 8 to 100 characters")
        @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
                message = "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
        )
        String password
) {
}
