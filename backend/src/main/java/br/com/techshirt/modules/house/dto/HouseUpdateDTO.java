package br.com.techshirt.modules.house.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record HouseUpdateDTO(
        @NotNull(message = "The field [name] cannot be null")
        String name,

        @Positive(message = "The field [number] must be positive")
        Integer number,

        String complement
) {
}
