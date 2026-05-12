package com.library.server.controllers;

import com.library.server.models.Member;
import com.library.server.models.IssueRecord;
import com.library.server.services.MemberService;
import com.library.server.services.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private IssueService issueService;

    @PostMapping
    public ResponseEntity<Member> registerMember(@RequestBody Member member) {
        return ResponseEntity.ok(memberService.registerMember(member));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMemberDetails(@PathVariable Long id) {
        Member member = memberService.getMemberById(id);
        if (member == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(member);
    }

    @GetMapping("/{id}/issues")
    public ResponseEntity<List<IssueRecord>> getMemberIssues(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(issueService.getIssuesByMember(id));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping
public ResponseEntity<List<Member>> getAllMembers() {

    return ResponseEntity.ok(
            memberService.getAllMembers()
    );
}
}
