package br.com.techshirt.infra;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WrongAnswer {
    private Integer status;
    private String title;
    private LocalDateTime timestamp;
    private List<String> errors;
}
