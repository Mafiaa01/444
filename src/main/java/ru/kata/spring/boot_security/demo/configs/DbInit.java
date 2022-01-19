package ru.kata.spring.boot_security.demo.configs;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Component
public class DbInit {

    private final UserService userService;
    private final RoleService roleService;

    public DbInit(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    private void createDefaultusers() {
        Set<Role> rolesadmin = new HashSet<>();
        Set<Role> rolesuser = new HashSet<>();
        roleService.save(new Role("ROLE_ADMIN"));
        roleService.save(new Role("ROLE_USER"));
        rolesadmin.add(roleService.getRoleById(1L));
        rolesuser.add(roleService.getRoleById(2L));

        User admin = new User("admin", "admin", "1234", Collections.emptySet());
        admin.setRoles(rolesadmin);
        userService.save(admin);

        User user = new User("user", "user", "1234", Collections.emptySet());
        user.setRoles(rolesuser);
        userService.save(user);
    }

}