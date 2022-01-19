package ru.kata.spring.boot_security.demo.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

    Role getRoleByName(String name);

    boolean existsByName(String roleName);

    Role getRoleById(Long id);
}
