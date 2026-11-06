package br.com.techshirt.modules.house;

import br.com.techshirt.modules.address.AddressEntity;
import br.com.techshirt.modules.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "house")
public class HouseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer number;

    @Column(nullable = false)
    private String complement;

    @Column(nullable = false)
    private String cep;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonBackReference("user-houses")
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @JsonBackReference("house-address")
    @ManyToOne
    @JoinColumn(name = "address_id")
    private AddressEntity address;
}
