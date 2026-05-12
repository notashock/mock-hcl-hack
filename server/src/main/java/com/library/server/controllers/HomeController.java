package com.library.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("service", "Library Book Issue & Return Service");
        response.put("status", "Running");

        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("POST /books", "Add a new book");
        endpoints.put("GET /books", "View all books");
        endpoints.put("GET /books/available", "View available books");
        endpoints.put("GET /books/search?title=&author=", "Search books");
        endpoints.put("POST /members", "Register a member");
        endpoints.put("GET /members/{id}", "View member details");
        endpoints.put("GET /members/{id}/issues", "View books issued to a member");
        endpoints.put("POST /issues/issue", "Issue a book (body: memberId, bookId)");
        endpoints.put("PUT /issues/return/{issueId}", "Return an issued book");

        response.put("endpoints", endpoints);
        return response;
    }
}
