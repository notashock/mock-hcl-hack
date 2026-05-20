package com.library.server.services;

import com.library.server.models.Book;
import com.library.server.repositories.BookRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    // Add Book
    public Book addBook(Book book) {

        // Check duplicate ISBN
        if (bookRepository.findByIsbn(book.getIsbn()) != null) {
            throw new IllegalArgumentException("Book with ISBN already exists");
        }

        book.setAvailable(true);

        return bookRepository.save(book);
    }

    // Get All Books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get Available Books
    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailableTrue();
    }

    // Search Books
    public List<Book> searchBooks(String title, String author) {

        return bookRepository
                .findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(
                        title,
                        author
                );
    }

    // Get Book By ID
    public Book getBookById(Long id) {

        return bookRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException("Book not found"));
    }

    // Update Book
    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    // Delete Book
    public void deleteBook(Long id) {

        Book book = getBookById(id);

        bookRepository.delete(book);
    }
}