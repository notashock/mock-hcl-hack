package com.library.backend.repositories;

import com.library.backend.models.IssueRecord;
import com.library.backend.models.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRecordRepository extends JpaRepository<IssueRecord, Long> {
    long countByMemberAndReturnDateIsNull(Member member);
    List<IssueRecord> findByMember(Member member);
}
