package ru.kata.spring.boot_security.demo.service.impl;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.repositories.RoleRepo;
import ru.kata.spring.boot_security.demo.service.RoleService;

import java.util.List;


@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepo roleRepo;

    public RoleServiceImpl(RoleRepo roleRepo) {
        this.roleRepo = roleRepo;
    }

    @Override
    @Transactional
    public boolean existsByName(String roleName) {
        return roleRepo.existsByName(roleName);
    }

    @Transactional
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

    @Transactional
    public Role getRoleByName(String name) {
        return roleRepo.getRoleByName(name);
    }

    @Override
    @Transactional
    public Role getRoleById(Long id) {
        return roleRepo.getRoleById(id);
    }

    @Override
    @Transactional
    public void save(Role role) {
        roleRepo.save(role);
    }
}