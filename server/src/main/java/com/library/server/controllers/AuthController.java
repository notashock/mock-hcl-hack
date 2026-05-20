package com.library.server.controllers;

import com.library.server.dto.LoginRequestDTO;
import com.library.server.models.Member;
import com.library.server.security.JwtUtil;
import com.library.server.services.MemberService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Member member
    ) {

        try {

            Member savedMember =
                    memberService.registerMember(member);

            return ResponseEntity.ok(savedMember);

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequestDTO request
    ) {

        try {

            Member member =
                    memberService.getMemberByEmail(
                            request.getEmail()
                    );

            if (!passwordEncoder.matches(
                    request.getPassword(),
                    member.getPassword()
            )) {

                return ResponseEntity
                        .badRequest()
                        .body(Map.of(
                                "error",
                                "Invalid credentials"
                        ));
            }

            String token =
                    jwtUtil.generateToken(member.getEmail());

            return ResponseEntity.ok(
                    Map.of(
                            "token", token,
                            "role", member.getRole(),
                            "email", member.getEmail()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of(
                            "error",
                            e.getMessage()
                    ));
        }
    }
}