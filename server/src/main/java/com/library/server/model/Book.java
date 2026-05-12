package com.library.server.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String author;

    @Column(unique = true, nullable = false)
    private String isbn;

    private String publisher;

    private Integer publicationYear;

    private String edition;

    private Double price;

    private boolean available = true;
}