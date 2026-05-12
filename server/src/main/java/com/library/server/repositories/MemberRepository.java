package com.library.server.repositories;

import com.library.server.models.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // Find member by email
    Optional<Member> findByEmail(String email);

    // Check duplicate email
    boolean existsByEmail(String email);
}