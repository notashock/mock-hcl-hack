package com.library.backend.controllers;

import com.library.backend.models.IssueRecord;
import com.library.backend.services.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping("/issue")
    public ResponseEntity<?> issueBook(@RequestBody Map<String, Long> payload) {
        try {
            Long memberId = payload.get("memberId");
            Long bookId = payload.get("bookId");
            IssueRecord record = issueService.issueBook(memberId, bookId);
            return ResponseEntity.ok(record);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/return/{issueId}")
    public ResponseEntity<?> returnBook(@PathVariable Long issueId) {
        try {
            IssueRecord record = issueService.returnBook(issueId);
            return ResponseEntity.ok(record);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
