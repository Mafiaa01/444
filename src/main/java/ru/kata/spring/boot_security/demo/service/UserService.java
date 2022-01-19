package ru.kata.spring.boot_security.demo.service;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findById(long id);

    User save(User user);

    void update(User user);

    void delete(User user);

    User findUserByUsername(String username);
}