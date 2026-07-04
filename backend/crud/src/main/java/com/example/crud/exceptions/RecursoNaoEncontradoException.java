package com.example.crud.exceptions;

public class RecursoNaoEncontradoException extends RuntimeException{
    
    public RecursoNaoEncontradoException(String mensagem){
        super(mensagem);
    }
}
