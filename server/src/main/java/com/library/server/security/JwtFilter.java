package com.library.server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        System.out.println("JWT FILTER RUNNING");

        String authHeader =
                request.getHeader("Authorization");

        System.out.println("AUTH HEADER: " + authHeader);

        // No Authorization Header
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        // Extract Token
        String token = authHeader.substring(7);

        System.out.println("TOKEN: " + token);

        // Validate Token
        if (!jwtUtil.validateToken(token)) {

            System.out.println("INVALID TOKEN");

            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("TOKEN VALID");

        // Extract Email
        String email =
                jwtUtil.extractEmail(token);

        System.out.println("EMAIL: " + email);

        // Create Authentication Object
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(
                                new SimpleGrantedAuthority(
                                        "ROLE_USER"
                                )
                        )
                );

        authentication.setDetails(
                new WebAuthenticationDetailsSource()
                        .buildDetails(request)
        );

        // Set Authentication
        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);

        System.out.println("AUTHENTICATION SET");

        // Continue Filter Chain
        filterChain.doFilter(request, response);
    }
}