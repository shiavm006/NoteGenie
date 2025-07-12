'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, BookOpen, Plus, ExternalLink } from "lucide-react";
import ExpandableBookCard from "@/components/ui/expandable-book-card";
import DashboardLayout from '@/components/layout/dashboard-layout';
import { libraryStorage } from '@/lib/utils';

interface Book {
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
}

const randomSearchTerms = [
  'programming', 'javascript', 'react', 'python', 'design', 'business', 
  'science', 'history', 'fiction', 'biography', 'technology', 'art'
];

export default function SearchBooks() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [randomBooks, setRandomBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  // Load random books on component mount
  useEffect(() => {
    loadRandomBooks();
  }, []);

  const loadRandomBooks = async () => {
    setIsLoadingRandom(true);
    try {
      const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&maxResults=12&orderBy=relevance`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch random books');
      }
      
      const data = await response.json();
      
      if (data.items) {
        const books: Book[] = data.items.map((item: { id: string; volumeInfo: { [key: string]: unknown } }) => ({
          id: item.id,
          title: (item.volumeInfo.title as string) || 'Unknown Title',
          authors: (item.volumeInfo.authors as string[]) || ['Unknown Author'],
          description: item.volumeInfo.description as string,
          publishedDate: item.volumeInfo.publishedDate as string,
          publisher: item.volumeInfo.publisher as string,
          pageCount: item.volumeInfo.pageCount as number,
          imageLinks: item.volumeInfo.imageLinks as { thumbnail?: string; smallThumbnail?: string },
          industryIdentifiers: item.volumeInfo.industryIdentifiers as Array<{ type: string; identifier: string }>,
          infoLink: item.volumeInfo.infoLink as string,
        }));
        setRandomBooks(books);
      }
    } catch (error) {
      console.error('Error loading random books:', error);
    } finally {
      setIsLoadingRandom(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=20`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      
      if (data.items) {
        const books: Book[] = data.items.map((item: { id: string; volumeInfo: { [key: string]: unknown } }) => ({
          id: item.id,
          title: (item.volumeInfo.title as string) || 'Unknown Title',
          authors: (item.volumeInfo.authors as string[]) || ['Unknown Author'],
          description: item.volumeInfo.description as string,
          publishedDate: item.volumeInfo.publishedDate as string,
          publisher: item.volumeInfo.publisher as string,
          pageCount: item.volumeInfo.pageCount as number,
          imageLinks: item.volumeInfo.imageLinks as { thumbnail?: string; smallThumbnail?: string },
          industryIdentifiers: item.volumeInfo.industryIdentifiers as Array<{ type: string; identifier: string }>,
          infoLink: item.volumeInfo.infoLink as string,
        }));
        setSearchResults(books);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching books:', error);
      setError('Failed to search books. Please try again.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToLibrary = (book: Book) => {
    const success = libraryStorage.addBook(book);
    if (success) {
      alert(`"${book.title}" has been added to your library!`);
    } else {
      alert(`"${book.title}" is already in your library!`);
    }
  };

  const displayBooks = searchResults.length > 0 ? searchResults : randomBooks;
  const showingSearchResults = searchResults.length > 0;

  return (
    <DashboardLayout>
      {/* Minimalist Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light text-white mb-2">Search Books</h1>
        <p className="text-gray-400">Discover and add books to your collection</p>
      </div>

      {/* Search Section */}
      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/30 border-gray-800 text-white placeholder-gray-500 focus:border-blue-500"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 border border-blue-500/50"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </form>

        {error && (
          <div className="bg-red-900/30 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {showingSearchResults && (
          <div className="flex items-center justify-between">
            <p className="text-gray-400">
              Found {searchResults.length} results for "{searchQuery}"
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
              }}
              variant="outline"
              size="sm"
              className="text-gray-400 border-gray-700 hover:bg-gray-800"
            >
              Clear Results
            </Button>
          </div>
        )}
      </div>

      {/* Books Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-light text-white">
            {showingSearchResults ? 'Search Results' : 'Recommended Books'}
          </h2>
          {!showingSearchResults && (
            <Button 
              onClick={loadRandomBooks}
              disabled={isLoadingRandom}
              variant="outline"
              size="sm"
              className="text-gray-400 border-gray-700 hover:bg-gray-800"
            >
              {isLoadingRandom ? 'Loading...' : 'Refresh'}
            </Button>
          )}
        </div>

        {(isLoadingRandom && !showingSearchResults) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-800 h-48 rounded-md mb-4"></div>
                <div className="bg-gray-800 h-4 rounded mb-2"></div>
                <div className="bg-gray-800 h-3 rounded mb-2"></div>
                <div className="bg-gray-800 h-3 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : displayBooks.length > 0 ? (
          <ExpandableBookCard books={displayBooks} onAddToLibrary={handleAddToLibrary} />
        ) : (
          <div className="text-center py-12">
            <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-gray-500" />
            </div>
            <h3 className="text-white font-medium mb-2">No books found</h3>
            <p className="text-gray-400 mb-4">
              {showingSearchResults 
                ? 'Try searching with different keywords' 
                : 'Unable to load recommended books'}
            </p>
            {showingSearchResults && (
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                variant="outline"
                className="text-gray-400 border-gray-700 hover:bg-gray-800"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 