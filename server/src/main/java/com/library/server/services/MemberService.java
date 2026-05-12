package com.library.server.services;

import com.library.server.models.Member;
import com.library.server.repositories.MemberRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    // Register Member
    public Member registerMember(Member member) {

        // Check duplicate email
        if (memberRepository.existsByEmail(member.getEmail())) {

            throw new IllegalArgumentException(
                    "Email already registered"
            );
        }

        // Encrypt password
        member.setPassword(
                passwordEncoder.encode(member.getPassword())
        );

        // Default role
        if (member.getRole() == null ||
                member.getRole().isEmpty()) {

            member.setRole("USER");
        }

        return memberRepository.save(member);
    }

    // Get Member By ID
    public Member getMemberById(Long id) {

        return memberRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Member not found"
                        ));
    }

    // Get All Members
    public List<Member> getAllMembers() {

        return memberRepository.findAll();
    }

    // Get Member By Email
    public Member getMemberByEmail(String email) {

        return memberRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Member not found"
                        ));
    }
}