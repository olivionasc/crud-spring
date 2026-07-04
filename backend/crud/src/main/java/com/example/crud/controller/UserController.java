package com.example.crud.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.crud.model.Usuario;
import com.example.crud.service.UserService;


@RestController
@RequestMapping("/api/usuarios")
public class UserController {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;


    public UserController(UserService userService){
        this.userService = userService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @GetMapping
    public List<Usuario> listarUsuarios(){
        return userService.listarUsuarios();
    }

    @GetMapping("buscaId/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long id){
        Usuario usuario = userService.buscaPorId(id);
        return ResponseEntity.ok(usuario);
    }

    @GetMapping("buscaNome/{nome}")
    public ResponseEntity<?> buscarUsuario(@PathVariable String nome){
        List<Usuario> usuariosNome = userService.buscarPorNome(nome);
        return ResponseEntity.ok(usuariosNome);
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario){
        return userService.salvarUsuario(usuario.getNome(), usuario.getSenha());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deletarUsuario(@PathVariable Long id){
        userService.deletarUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("{id}")
    public Usuario atualizarUsuario(@PathVariable Long id,@RequestBody Usuario novosDados){
        System.out.println("Nome: " + novosDados.getNome());
        System.out.println("Senha: " + novosDados.getSenha());

        Usuario usuario = userService.buscaPorId(id);

        
        usuario.setNome(novosDados.getNome());

       
        if (novosDados.getSenha() != null && !novosDados.getSenha().isEmpty()) {
            String senhaCripto = passwordEncoder.encode(novosDados.getSenha());
            usuario.setSenha(senhaCripto);
        }

        return userService.atualizarUsuario(id, usuario);
    }
    
}
