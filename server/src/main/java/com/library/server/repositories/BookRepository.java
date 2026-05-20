package com.library.server.repositories;

import com.library.server.models.Book;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Get Available Books
    List<Book> findByAvailableTrue();

    // Search by Title or Author
    List<Book> findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
            String title,
            String author
    );

    // Find by ISBN
    Book findByIsbn(String isbn);
}