package com.example.crud.security;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    
    private static final Key chave = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 1000 * 60 * 60;

    public static String gerarToken(String nome){
        return Jwts.builder()
        .setSubject(nome)
        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
        .signWith(chave, SignatureAlgorithm.HS256).compact();
    }
    
    public static String extrairNome(String token){
        return Jwts.parserBuilder()
        .setSigningKey(chave).build()
        .parseClaimsJws(token).getBody()
        .getSubject();
    }

    public static boolean validarToken(String token){
        try {
            Jwts.parserBuilder().setSigningKey(chave).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }
}
