'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';

// Static fallback books for when no search is performed
const fallbackBooks = [
  {
    id: 'fallback-1',
    volumeInfo: {
      title: 'To Kill a Mockingbird',
      authors: ['Harper Lee'],
      publisher: 'J.B. Lippincott & Co.',
      description: 'A novel about racial injustice and moral growth in the American South.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/8228691-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL82563W/To_Kill_a_Mockingbird',
    },
  },
  {
    id: 'fallback-2',
    volumeInfo: {
      title: '1984',
      authors: ['George Orwell'],
      publisher: 'Secker & Warburg',
      description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/7222246-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL7343625W/1984',
    },
  },
  {
    id: 'fallback-3',
    volumeInfo: {
      title: 'Pride and Prejudice',
      authors: ['Jane Austen'],
      publisher: 'T. Egerton',
      description: 'A classic novel of manners and marriage in early 19th-century England.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/8091016-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL14992614W/Pride_and_Prejudice',
    },
  },
  {
    id: 'fallback-4',
    volumeInfo: {
      title: 'The Great Gatsby',
      authors: ['F. Scott Fitzgerald'],
      publisher: 'Charles Scribner\'s Sons',
      description: 'A story of wealth, love, and tragedy in the Jazz Age.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/7222161-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL2765017W/The_Great_Gatsby',
    },
  },
  {
    id: 'fallback-5',
    volumeInfo: {
      title: 'Moby-Dick',
      authors: ['Herman Melville'],
      publisher: 'Harper & Brothers',
      description: 'The epic tale of Captain Ahab\'s obsessive quest to kill the white whale.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/8100921-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL15626906W/Moby-Dick',
    },
  },
  {
    id: 'fallback-6',
    volumeInfo: {
      title: 'The Hobbit',
      authors: ['J.R.R. Tolkien'],
      publisher: 'George Allen & Unwin',
      description: 'A fantasy adventure that precedes The Lord of the Rings.',
      imageLinks: { thumbnail: 'https://covers.openlibrary.org/b/id/6979861-L.jpg' },
      infoLink: 'https://openlibrary.org/works/OL262758W/The_Hobbit',
    },
  },
];

export default function BooksPage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState(fallbackBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef();

  // Fetch books from Google Books API
  const fetchBooks = async (search) => {
    if (!search) {
      setBooks(fallbackBooks);
      setError('');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}&maxResults=20`
      );
      const data = await res.json();
      if (data.items) {
        setBooks(data.items);
      } else {
        setBooks([]);
        setError('No books found.');
      }
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query) {
      setBooks(fallbackBooks);
      setError('');
      return;
    }
    debounceRef.current = setTimeout(() => {
      fetchBooks(query);
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  return (
    <div className={styles.container}>
      <h1 style={{
        fontSize: '2.2rem',
        fontWeight: 700,
        background: 'linear-gradient(135deg, #673AB7, #9C27B0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '2rem',
        letterSpacing: '-0.5px'
      }}>Book Explorer</h1>
      <div className={styles.filters} style={{marginBottom: 32, justifyContent: 'center'}}>
        <input
          className={styles.searchInput}
          style={{
            width: 320,
            maxWidth: '100%',
            padding: '0.85rem 1.2rem',
            borderRadius: 12,
            border: '1.5px solid #673AB7',
            fontSize: '1.1rem',
            background: 'rgba(255,255,255,0.9)',
            color: '#673AB7',
            boxShadow: '0 1px 4px rgba(103, 58, 183, 0.05)',
            outline: 'none',
            marginRight: 12
          }}
          type="text"
          placeholder="Search for books by title, author, or keyword..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      {loading && (
        <div style={{textAlign: 'center', margin: '2rem 0'}}>
          <div className={styles.skeleton} style={{height: 40, width: 200, margin: '0 auto 1rem auto'}} />
          <div className={styles.skeleton} style={{height: 180, width: '100%', maxWidth: 400, margin: '0 auto'}} />
        </div>
      )}
      {error && !loading && (
        <div style={{textAlign: 'center', color: '#c62828', margin: '2rem 0', fontWeight: 500}}>{error}</div>
      )}
      <div className={styles.bookList} style={{marginTop: 0}}>
        {books.map((book) => {
          const info = book.volumeInfo;
          return (
            <div key={book.id} className={styles.bookItem} style={{minHeight: 340}}>
              <div className={styles.bookImagePlaceholder} style={{height: 180, marginBottom: 16, background: 'linear-gradient(135deg, #e0e7ff, #ede7f6)'}}>
                {info.imageLinks && info.imageLinks.thumbnail ? (
                  <img
                    src={info.imageLinks.thumbnail}
                    alt={info.title}
                    style={{maxHeight: 160, maxWidth: '100%', borderRadius: 8, boxShadow: '0 2px 8px rgba(103, 58, 183, 0.08)'}}
                  />
                ) : (
                  <span style={{color: '#b39ddb', fontSize: '2.2rem'}}>📚</span>
                )}
              </div>
              <h3 style={{fontWeight: 700, fontSize: '1.1rem', color: '#1e293b', marginBottom: 6, letterSpacing: '-0.3px'}}>{info.title}</h3>
              <p style={{fontSize: '0.98rem', color: '#666', margin: 0}}>{info.authors ? `By: ${info.authors.join(", ")}` : ""}</p>
              <p style={{fontSize: '0.95rem', color: '#9C27B0', margin: 0, fontWeight: 500}}>{info.publisher ? info.publisher : ""}</p>
              <p style={{fontSize: '0.92rem', color: '#555', margin: '6px 0 0 0', minHeight: 36}}>{info.description ? info.description.slice(0, 80) + (info.description.length > 80 ? '...' : '') : ''}</p>
              <a
                href={info.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{marginTop: 12, fontSize: '0.98rem', padding: '0.6rem 1.2rem', borderRadius: 8, display: 'inline-block'}}
              >
                View Book
              </a>
            </div>
          );
        })}
      </div>
      {!loading && !error && books.length === 0 && query && (
        <div style={{textAlign: 'center', color: '#888', margin: '2rem 0', fontWeight: 500}}>
          No books found for "{query}".
        </div>
      )}
    </div>
  );
}
