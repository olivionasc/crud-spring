package com.example.crud.service;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.crud.model.Usuario;
import com.example.crud.repository.UserRepository;

@Service
public class UsuarioDetailsService implements UserDetailsService{

    private final UserRepository userRepository;

    public UsuarioDetailsService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {

    Usuario usuario = userRepository.findByNome(username)
        .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

    return User.builder()
        .username(usuario.getNome())
        .password(usuario.getSenha())
        .roles("USER")
        .build();
}
    

}
