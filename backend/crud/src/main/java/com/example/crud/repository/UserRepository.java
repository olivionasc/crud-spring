package com.example.crud.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.crud.model.Usuario;

@Repository
public interface UserRepository extends JpaRepository<Usuario, Long>{

    List<Usuario> findByNomeContainingIgnoreCase(String nome);

    Optional<Usuario> findByNome(String nome);
    
}
