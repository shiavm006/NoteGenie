'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css';

const GOOGLE_BOOKS_API = 'https://www.googleapis.com/books/v1/volumes';
const RANDOM_TOPICS = [
  'science', 'history', 'technology', 'art', 'mathematics', 'fiction', 'adventure', 'education', 'nature', 'biography', 'mystery', 'fantasy', 'health', 'business', 'philosophy', 'psychology', 'travel', 'sports', 'music', 'engineering'
];

function getRandomTopic() {
  return RANDOM_TOPICS[Math.floor(Math.random() * RANDOM_TOPICS.length)];
}

function mapGoogleBookToBook(item) {
  const volume = item.volumeInfo || {};
  return {
    id: item.id,
    title: volume.title || 'Untitled',
    author: (volume.authors && volume.authors.join(', ')) || 'Unknown',
    genre: (volume.categories && volume.categories[0]) || 'General',
    class: 'N/A', // Google Books does not provide class
    subject: (volume.categories && volume.categories[0]) || 'General',
    interests: volume.categories || [],
    image: (volume.imageLinks && (volume.imageLinks.thumbnail || volume.imageLinks.smallThumbnail)) || '/placeholder.jpg',
    rating: volume.averageRating || 0,
    year: (volume.publishedDate && volume.publishedDate.slice(0, 4)) || 'N/A',
    description: volume.description || 'No description available.',
    difficulty: 'N/A', // Not available from Google Books
    pages: volume.pageCount || 'N/A',
    previewLink: volume.previewLink || item.selfLink || '',
  };
}

export default function Page() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [randomTopic, setRandomTopic] = useState(getRandomTopic());
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [showDescription, setShowDescription] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    let query = searchQuery.trim() === '' ? randomTopic : searchQuery;
    fetch(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}&maxResults=20`)
      .then(res => res.json())
      .then(data => {
        if (data.items) {
          setBooks(data.items.map(mapGoogleBookToBook));
        } else {
          setBooks([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch books.');
        setLoading(false);
      });
  }, [searchQuery, randomTopic]);

  // When the search bar is cleared, pick a new random topic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setRandomTopic(getRandomTopic());
    }
  }, [searchQuery]);

  // Extract unique values for filters from fetched books
  const classes = useMemo(() => [...new Set(books.map(book => book.class))].filter(Boolean).sort(), [books]);
  const subjects = useMemo(() => [...new Set(books.map(book => book.subject))].filter(Boolean).sort(), [books]);
  const interests = useMemo(() => [...new Set(books.flatMap(book => book.interests))].filter(Boolean).sort(), [books]);
  const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'N/A'];

  const filteredBooks = useMemo(() => {
    return books
      .filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            book.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesClass = selectedClass === 'all' || book.class === selectedClass;
        const matchesSubject = selectedSubject === 'all' || book.subject === selectedSubject;
        const matchesInterests = selectedInterests.length === 0 || 
                               selectedInterests.some(interest => book.interests.includes(interest));
        const matchesDifficulty = selectedDifficulty === 'all' || book.difficulty === selectedDifficulty;
        return matchesSearch && matchesClass && matchesSubject && matchesInterests && matchesDifficulty;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'title':
            return a.title.localeCompare(b.title);
          case 'year':
            return b.year > b.year ? -1 : 1;
          case 'rating':
            return b.rating - a.rating;
          case 'pages':
            return b.pages - a.pages;
          default:
            return 0;
        }
      });
  }, [books, searchQuery, selectedClass, selectedSubject, selectedInterests, selectedDifficulty, sortBy]);

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Book Collection</h1>
        <p className={styles.subtitle}>Discover and explore books from Google Books API</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search books, authors, or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Classes</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>{difficulty}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="title">Sort by Title</option>
            <option value="year">Sort by Year</option>
            <option value="rating">Sort by Rating</option>
            <option value="pages">Sort by Pages</option>
          </select>
        </div>
      </div>

      <div className={styles.interestsFilter}>
        <h3>Filter by Interests</h3>
        <div className={styles.interestsList}>
          {interests.map(interest => (
            <button
              key={interest}
              onClick={() => handleInterestToggle(interest)}
              className={`${styles.interestTag} ${selectedInterests.includes(interest) ? styles.interestTagActive : ''}`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className={styles.noResults}><p>Loading books...</p></div>
      ) : error ? (
        <div className={styles.noResults}><p>{error}</p></div>
      ) : filteredBooks.length === 0 ? (
        <div className={styles.noResults}><p>No books found matching your criteria</p></div>
      ) : (
        <div className={styles.bookList}>
          {filteredBooks.map((book) => (
            <div key={book.id} className={styles.bookItem + ' ' + styles.bookItemImproved}>
              <div className={styles.bookImageContainer}>
                <img
                  src={book.image}
                  alt={book.title}
                  className={styles.bookImage}
                />
                <div className={styles.bookOverlay}>
                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.previewButton}
                    >
                      Preview
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.author}>By: {book.author}</p>
                <div className={styles.bookMeta}>
                  <span className={styles.bookTag}>{book.genre}</span>
                  <span className={styles.bookClass}>{book.class}</span>
                  <span className={styles.bookSubject}>{book.subject}</span>
                  <span className={styles.bookDifficulty}>{book.difficulty}</span>
                </div>
                <div className={styles.interests}>
                  {book.interests.map(interest => (
                    <span key={interest} className={styles.interestChip}>{interest}</span>
                  ))}
                </div>
                <div className={styles.bookDetails}>
                  <span className={styles.bookPages}>{book.pages} pages</span>
                  <span className={styles.bookYear}>{book.year}</span>
                </div>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(book.rating) ? styles.starFilled : styles.starEmpty}>
                      ★
                    </span>
                  ))}
                  <span className={styles.ratingValue}>{book.rating}</span>
                </div>
                <button 
                  className={styles.descriptionButton}
                  onClick={() => setShowDescription(showDescription === book.id ? null : book.id)}
                >
                  {showDescription === book.id ? 'Hide Description' : 'Show Description'}
                </button>
                {showDescription === book.id && (
                  <p className={styles.description}>{book.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
} 