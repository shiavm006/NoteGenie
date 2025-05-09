'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import the Next.js Image component
import styles from './page.module.css';

// Sample book data with placeholder image URLs
const allBooks = [
  { id: 1, title: 'Algebra Basics', subject: 'Math', class: '9', imageUrl: 'https://via.placeholder.com/100x150.png?text=Algebra' },
  { id: 2, title: 'Introduction to Physics', subject: 'Science', class: '10', imageUrl: 'https://via.placeholder.com/100x150.png?text=Physics' },
  { id: 3, title: 'World History Vol. 1', subject: 'History', class: '9', imageUrl: 'https://via.placeholder.com/100x150.png?text=History+1' },
  { id: 4, title: 'Calculus I', subject: 'Math', class: '11', imageUrl: 'https://via.placeholder.com/100x150.png?text=Calculus' },
  { id: 5, title: 'Chemistry Fundamentals', subject: 'Science', class: '10', imageUrl: 'https://via.placeholder.com/100x150.png?text=Chemistry' },
  { id: 6, title: 'Ancient Civilizations', subject: 'History', class: '9', imageUrl: 'https://via.placeholder.com/100x150.png?text=History+2' },
  { id: 7, title: 'Geometry', subject: 'Math', class: '10', imageUrl: 'https://via.placeholder.com/100x150.png?text=Geometry' },
  { id: 8, title: 'Biology Essentials', subject: 'Science', class: '11', imageUrl: 'https://via.placeholder.com/100x150.png?text=Biology' },
  { id: 9, title: 'Modern History', subject: 'History', class: '11', imageUrl: 'https://via.placeholder.com/100x150.png?text=History+3' },
  { id: 10, title: 'Advanced Physics', subject: 'Science', class: '12', imageUrl: 'https://via.placeholder.com/100x150.png?text=Adv+Physics' },
  { id: 11, title: 'Trigonometry', subject: 'Math', class: '11', imageUrl: 'https://via.placeholder.com/100x150.png?text=Trig' },
  { id: 12, title: 'Organic Chemistry', subject: 'Science', class: '12', imageUrl: 'https://via.placeholder.com/100x150.png?text=Org+Chem' },
];

import styles from './page.module.css';

export default function BooksPage() {
  // Sample book data
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', image: '/placeholder.jpg' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', image: '/placeholder.jpg' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', image: '/placeholder.jpg' },
    { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', image: '/placeholder.jpg' },
    { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', image: '/placeholder.jpg' },
    { id: 6, title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fantasy', image: '/placeholder.jpg' },
  ];

  return (
    <div className={styles.container}>
      <h1>Book Collection</h1>
      
      <div className={styles.filters}>
        <label htmlFor="genre">Filter by Genre:</label>
        <select id="genre" name="genre">
          <option value="">All Genres</option>
          <option value="Classic">Classic</option>
          <option value="Fiction">Fiction</option>
          <option value="Romance">Romance</option>
          <option value="Dystopian">Dystopian</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>
      
      <div className={styles.bookList}>
        {books.map(book => (
          <div key={book.id} className={styles.bookItem}>
            <div className={styles.bookImagePlaceholder} style={{ backgroundColor: '#f0f0f0', height: '150px', width: '100%' }}></div>
            <h3>{book.title}</h3>
            <p>By: {book.author}</p>
            <p>Genre: {book.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
