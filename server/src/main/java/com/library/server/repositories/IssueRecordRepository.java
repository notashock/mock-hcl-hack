package com.library.server.repositories;

import com.library.server.models.IssueRecord;
import com.library.server.models.Member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository
        extends JpaRepository<IssueRecord, Long> {

    long countByMemberAndReturnDateIsNull(
            Member member
    );

    List<IssueRecord> findByMember(
            Member member
    );
}