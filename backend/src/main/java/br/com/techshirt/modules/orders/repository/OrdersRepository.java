package br.com.techshirt.modules.orders.repository;

import br.com.techshirt.modules.orders.OrdersEntity;
import br.com.techshirt.modules.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<OrdersEntity, Long> {
    List<OrdersEntity> findByUser(UserEntity user);
}
