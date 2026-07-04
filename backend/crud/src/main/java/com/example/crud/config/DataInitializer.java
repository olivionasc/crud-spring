package com.example.crud.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.crud.repository.UserRepository;
import com.example.crud.service.UserService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserService userService;

    public DataInitializer(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {

        String nomePadrao = "@admin";

        if (userRepository.findByNome(nomePadrao).isEmpty()) {
            System.out.println("Criando usuário padrão...");

            userService.salvarUsuario(nomePadrao, "Admin@123");

            System.out.println("Usuário padrão criado!");
        } else {
            System.out.println("Usuário padrão já existe.");
        }
    }
}