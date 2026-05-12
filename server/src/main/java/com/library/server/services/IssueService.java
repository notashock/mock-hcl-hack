package com.library.backend.services;

import com.library.backend.models.Book;
import com.library.backend.models.IssueRecord;
import com.library.backend.models.Member;
import com.library.backend.repositories.IssueRecordRepository;
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

    public IssueRecord issueBook(Long memberId, Long bookId) {
        Member member = memberService.getMemberById(memberId);
        Book book = bookService.getBookById(bookId);

        if (member == null || book == null) {
            throw new IllegalArgumentException("Invalid Member ID or Book ID");
        }

        if (!book.getAvailability()) {
            throw new IllegalStateException("Book is currently not available");
        }

        long activeIssues = issueRecordRepository.countByMemberAndReturnDateIsNull(member);
        if (activeIssues >= 3) {
            throw new IllegalStateException("Member has already issued the maximum number of books (3)");
        }

        book.setAvailability(false);
        bookService.updateBook(book);

        IssueRecord issueRecord = new IssueRecord(member, book, LocalDate.now());
        return issueRecordRepository.save(issueRecord);
    }

    public IssueRecord returnBook(Long issueId) {
        IssueRecord issueRecord = issueRecordRepository.findById(issueId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Issue ID"));

        if (issueRecord.getReturnDate() != null) {
            throw new IllegalStateException("Book has already been returned");
        }

        issueRecord.setReturnDate(LocalDate.now());

        Book book = issueRecord.getBook();
        book.setAvailability(true);
        bookService.updateBook(book);

        return issueRecordRepository.save(issueRecord);
    }

    public List<IssueRecord> getIssuesByMember(Long memberId) {
        Member member = memberService.getMemberById(memberId);
        if (member == null) {
            throw new IllegalArgumentException("Invalid Member ID");
        }
        return issueRecordRepository.findByMember(member);
    }
}
