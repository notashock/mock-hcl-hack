package com.library.server.services;

import com.library.server.models.Book;
import com.library.server.models.IssueRecord;
import com.library.server.models.Member;

import com.library.server.repositories.IssueRecordRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueRecordRepository issueRecordRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private MemberService memberService;

    // Issue Book
    public IssueRecord issueBook(
            Long memberId,
            Long bookId
    ) {

        Member member =
                memberService.getMemberById(memberId);

        Book book =
                bookService.getBookById(bookId);

        // Validation
        if (member == null || book == null) {

            throw new IllegalArgumentException(
                    "Invalid Member ID or Book ID"
            );
        }

        // Book Availability
        if (!book.getAvailable()) {

            throw new IllegalStateException(
                    "Book is currently unavailable"
            );
        }

        // Max Books Limit
        long activeIssues =
                issueRecordRepository
                        .countByMemberAndReturnDateIsNull(
                                member
                        );

        if (activeIssues >= 3) {

            throw new IllegalStateException(
                    "Maximum issue limit reached"
            );
        }

        // Update Book Availability
        book.setAvailable(false);

        bookService.updateBook(book);

        // Create Issue Record
        IssueRecord issueRecord =
                new IssueRecord();

        issueRecord.setBook(book);

        issueRecord.setMember(member);

        issueRecord.setIssueDate(
                LocalDate.now()
        );

        issueRecord.setDueDate(
                LocalDate.now().plusDays(7)
        );

        issueRecord.setStatus("ISSUED");

        return issueRecordRepository.save(
                issueRecord
        );
    }

    // Return Book
    public IssueRecord returnBook(Long issueId) {

        IssueRecord issueRecord =
                issueRecordRepository.findById(issueId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid Issue ID"
                                )
                        );

        if (issueRecord.getReturnDate() != null) {

            throw new IllegalStateException(
                    "Book already returned"
            );
        }

        // Update Return Details
        issueRecord.setReturnDate(
                LocalDate.now()
        );

        issueRecord.setStatus("RETURNED");

        // Make Book Available Again
        Book book = issueRecord.getBook();

        book.setAvailable(true);

        bookService.updateBook(book);

        return issueRecordRepository.save(
                issueRecord
        );
    }

    // Get All Issues
    public List<IssueRecord> getAllIssues() {

        return issueRecordRepository.findAll();
    }

    // Get Issues By Member
    public List<IssueRecord> getIssuesByMember(
            Long memberId
    ) {

        Member member =
                memberService.getMemberById(memberId);

        if (member == null) {

            throw new IllegalArgumentException(
                    "Invalid Member ID"
            );
        }

        return issueRecordRepository.findByMember(
                member
        );
    }
}