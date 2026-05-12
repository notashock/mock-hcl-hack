package com.library.backend.services;

import com.library.backend.models.Book;
import com.library.backend.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book addBook(Book book) {
        book.setAvailability(true);
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findByAvailabilityTrue();
    }

    public List<Book> searchBooks(String title, String author) {
        return bookRepository.findByTitleContainingIgnoreCaseOrAuthorContainingIgnoreCase(title, author);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }
}
