package br.com.techshirt.modules.user;

import br.com.techshirt.modules.contact.ContactEntity;
import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.roles.RolesEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private Boolean isTwoFactorEnabled;

    @Column(unique = true)
    private String twoFactorSecret;

    @Column(nullable = false)
    private Boolean status;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @JsonManagedReference("user-orders")
    @OneToMany(mappedBy = "user")
    List<OrdersEntity> orders;

    @JsonManagedReference("user-contacts")
    @OneToMany(mappedBy = "user")
    List<ContactEntity> contacts;

    @JsonManagedReference("user-houses")
    @OneToMany(mappedBy = "user")
    List<HouseEntity> houses;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<RolesEntity> roles;
}
