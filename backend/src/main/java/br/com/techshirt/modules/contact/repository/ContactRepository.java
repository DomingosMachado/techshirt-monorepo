package br.com.techshirt.modules.contact.repository;

import br.com.techshirt.modules.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.techshirt.modules.contact.ContactEntity;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
    List<ContactEntity> findByUser(UserEntity user);
}