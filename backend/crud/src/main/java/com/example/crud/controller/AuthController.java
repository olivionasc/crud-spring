package com.example.crud.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.model.Usuario;
import com.example.crud.security.JwtUtil;
import com.example.crud.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    private final UserService userService;

    public AuthController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registrador(@RequestBody Map<String, String> request){
        Usuario usuario = userService.salvarUsuario(request.get("nome"), request.get("senha"));
        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request){

    try {
    authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            request.get("nome"),
            request.get("senha")
        )
    );
    String token = JwtUtil.gerarToken(request.get("nome"));
    return ResponseEntity.ok(Map.of("token", token));
    
    } catch (Exception e) {
    return ResponseEntity.status(401).body("Credenciais inválidas");
    }
}
    
}
