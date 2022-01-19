package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.Role;

import java.util.List;


public interface RoleService {
    boolean existsByName(String roleName);

    List<Role> getAllRoles();

    Role getRoleByName(String name);

    Role getRoleById(Long id);

    void save(Role role);


}

