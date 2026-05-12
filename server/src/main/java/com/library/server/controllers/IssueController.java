package com.library.server.controllers;

import com.library.server.dto.IssueRequestDTO;
import com.library.server.models.IssueRecord;
import com.library.server.services.IssueService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {

    @Autowired
    private IssueService issueService;

    // Issue Book
    @PostMapping("/issue")
    public ResponseEntity<?> issueBook(
            @RequestBody IssueRequestDTO payload
    ) {

        try {

            Long memberId =
                    payload.getMemberId();

            Long bookId =
                    payload.getBookId();

            IssueRecord record =
                    issueService.issueBook(
                            memberId,
                            bookId
                    );

            return ResponseEntity.ok(record);

        } catch (
                IllegalArgumentException |
                IllegalStateException e
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }

    // Return Book
    @PutMapping("/return/{issueId}")
    public ResponseEntity<?> returnBook(
            @PathVariable Long issueId
    ) {

        try {

            IssueRecord record =
                    issueService.returnBook(issueId);

            return ResponseEntity.ok(record);

        } catch (
                IllegalArgumentException |
                IllegalStateException e
        ) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            Map.of(
                                    "error",
                                    e.getMessage()
                            )
                    );
        }
    }

    // Get All Issues
    @GetMapping
    public ResponseEntity<List<IssueRecord>>
    getAllIssues() {

        return ResponseEntity.ok(
                issueService.getAllIssues()
        );
    }
}