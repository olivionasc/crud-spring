package com.example.crud.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.crud.exceptions.RecursoNaoEncontradoException;
import com.example.crud.model.Usuario;
import com.example.crud.repository.UserRepository;

@Service
public class UserService {
    

    @Autowired
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public List<Usuario> listarUsuarios(){
        return userRepository.findAll();
    }

    public Usuario buscaPorId(Long id){
        return userRepository.findById(id)
        .orElseThrow(() -> new RecursoNaoEncontradoException("Usuario com Id "+id+" não encontrado."));
    }

    public Usuario salvarUsuario(String nome, String senha){
        String senhaCripto = passwordEncoder.encode(senha);
        Usuario usuario = new Usuario(nome, senhaCripto);
        return userRepository.save(usuario);
    }

    public void deletarUsuario(Long id){
        if(!userRepository.existsById(id)){
            throw new RecursoNaoEncontradoException("Usuario com Id "+id+" não encontrado.");
        }
        userRepository.deleteById(id);
    }

    public List<Usuario> buscarPorNome(String nome){
        List<Usuario> usuarios = userRepository.findByNomeContainingIgnoreCase(nome);
        
        if(usuarios.isEmpty()){
            throw new RecursoNaoEncontradoException("Nenhum usuário foi encoontrado.");
        }

        return usuarios;
    }

    public Optional<Usuario> buscarPorNomeCompleto(String nome){
        return userRepository.findByNome(nome);
    }

    public Usuario atualizarUsuario(Long id, Usuario novosDados){
        Usuario usuario = buscaPorId(id);

        usuario.setNome(novosDados.getNome());
        usuario.setSenha(novosDados.getSenha());

        return userRepository.save(usuario);
    }
}
