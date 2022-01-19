package ru.kata.spring.boot_security.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.RoleService;

@Controller
@RequestMapping("/")
public class AdminController {


    private final RoleService roleService;

    public AdminController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/user")
    public String getUserPage() {
        return "userPage";
    }


    @GetMapping("/admin")
    public String getAdminPage(Model model) {
        model.addAttribute("allRoles", roleService.getAllRoles());
        return "allUsers";
    }
}