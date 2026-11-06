package br.com.techshirt.modules.house.repository;

import br.com.techshirt.modules.house.HouseEntity;
import br.com.techshirt.modules.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseRepository extends JpaRepository<HouseEntity, Long> {
    List<HouseEntity> findByUser(UserEntity user);
}
