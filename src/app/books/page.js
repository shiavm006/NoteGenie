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

export default function BooksPage() {
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filteredBooks, setFilteredBooks] = useState(allBooks);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // Get unique classes and subjects
  useEffect(() => {
    const classes = ['all', ...new Set(allBooks.map(book => book.class))];
    const subjects = ['all', ...new Set(allBooks.map(book => book.subject))];
    setAvailableClasses(classes.sort((a, b) => (a === 'all' ? -1 : b === 'all' ? 1 : parseInt(a) - parseInt(b))));
    setAvailableSubjects(subjects.sort((a, b) => (a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b))));
  }, []);

  // Filter books
  useEffect(() => {
    let books = allBooks;
    if (selectedClass !== 'all') {
      books = books.filter(book => book.class === selectedClass);
    }
    if (selectedSubject !== 'all') {
      books = books.filter(book => book.subject === selectedSubject);
    }
    setFilteredBooks(books);
  }, [selectedClass, selectedSubject]);

  return (
    <div className={styles.container || ''}>
      <h1>Books Section</h1>

      {/* Filters */}
      <div className={styles.filters || ''}>
        <label htmlFor="class-select">Filter by Class: </label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          {availableClasses.map(cls => (
            <option key={cls} value={cls}>
              {cls === 'all' ? 'All Classes' : `Class ${cls}`}
            </option>
          ))}
        </select>

        <label htmlFor="subject-select" style={{ marginLeft: '20px' }}>Filter by Subject: </label>
        <select
          id="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          {availableSubjects.map(sub => (
            <option key={sub} value={sub}>{sub === 'all' ? 'All Subjects' : sub}</option>
          ))}
        </select>
      </div>

      {/* Book List */}
      <h2>Available Books</h2>
      <div className={styles.bookList || ''}> {/* Apply grid/flex styles here */}
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <div key={book.id} className={styles.bookItem || ''}> {/* Individual book item */}
              <Image
                src={book.imageUrl} 
                alt={`Cover for ${book.title}`} 
                width={100} // Specify width
                height={150} // Specify height
                className={styles.bookImage || ''} // Optional: for specific image styling
                priority={false} // Set to true for images above the fold
              />
              <h3>{book.title}</h3>
              <p>Class: {book.class}</p>
              <p>Subject: {book.subject}</p>
            </div>
          ))
        ) : (
          <p>No books match the selected filters.</p>
        )}
      </div>
    </div>
  );
}
