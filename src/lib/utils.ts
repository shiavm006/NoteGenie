import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface LibraryBook {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  publishedDate?: string;
  publisher?: string;
  pageCount?: number;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  infoLink?: string;
  addedAt: string;
}

const LIBRARY_STORAGE_KEY = 'note-ginie-library';

export const libraryStorage = {
  getBooks: (): LibraryBook[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(LIBRARY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading library from localStorage:', error);
      return [];
    }
  },

  addBook: (book: Omit<LibraryBook, 'addedAt'>): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const books = libraryStorage.getBooks();
      const bookExists = books.some(b => b.id === book.id);
      
      if (bookExists) {
        return false;
      }

      const newBook: LibraryBook = {
        ...book,
        addedAt: new Date().toISOString()
      };

      books.push(newBook);
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(books));
      return true;
    } catch (error) {
      console.error('Error adding book to library:', error);
      return false;
    }
  },

  removeBook: (bookId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const books = libraryStorage.getBooks();
      const filteredBooks = books.filter(b => b.id !== bookId);
      localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(filteredBooks));
      return true;
    } catch (error) {
      console.error('Error removing book from library:', error);
      return false;
    }
  },

  isBookInLibrary: (bookId: string): boolean => {
    if (typeof window === 'undefined') return false;
    const books = libraryStorage.getBooks();
    return books.some(b => b.id === bookId);
  },

  clearLibrary: (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(LIBRARY_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing library:', error);
      return false;
    }
  }
};
