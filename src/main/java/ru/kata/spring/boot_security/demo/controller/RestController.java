package ru.kata.spring.boot_security.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepo;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.List;
import java.util.NoSuchElementException;


@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private final UserService userService;
    private final RoleRepo roleRepo;

    public RestController(UserService userService, RoleRepo roleRepo) {
        this.userService = userService;
        this.roleRepo = roleRepo;
    }

    @GetMapping("/getUser")
    public ResponseEntity<User> getUser() {
        String name = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userService.findUserByUsername(name);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @GetMapping("/getUsers")
    public List<User> listUsers() {
        return userService.findAll();
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        try {
            User user = userService.findById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.save(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PutMapping("/edit")
    public ResponseEntity<User> edit(@RequestBody User user) {
        userService.update(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        userService.delete(userService.findById(id));
    }
}