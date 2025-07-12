'use client';
import Link from 'next/link';
import { BookOpen, FileText, Settings, User, Calendar, Trophy, ArrowRight, Plus, Search, X } from "lucide-react";
import DashboardLayout from '@/components/layout/dashboard-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { libraryStorage, LibraryBook } from '@/lib/utils';
import { useState, useEffect } from 'react';
import EbookReader from '@/components/ui/ebook-reader';

export default function General() {
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>([]);
  const [statsData, setStatsData] = useState({
    books: 0,
    notes: 0,
    views: 0,
    days: 0
  });
  const [readerBook, setReaderBook] = useState<LibraryBook | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  useEffect(() => {
    // Load library books
    const books = libraryStorage.getBooks();
    setLibraryBooks(books);
    
    // Update stats
    setStatsData(prev => ({
      ...prev,
      books: books.length
    }));
  }, []);

  const handleRemoveFromLibrary = (bookId: string) => {
    const success = libraryStorage.removeBook(bookId);
    if (success) {
      const updatedBooks = libraryStorage.getBooks();
      setLibraryBooks(updatedBooks);
      setStatsData(prev => ({
        ...prev,
        books: updatedBooks.length
      }));
    }
  };

  const getBookCover = (book: LibraryBook) => {
    return book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '/api/placeholder/400/600';
  };

  const handleReadBook = (book: LibraryBook) => {
    setReaderBook(book);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    setReaderBook(null);
  };

  return (
    <DashboardLayout>
      {/* Minimalist Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-light text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Shivam</p>
      </div>

      {/* Stats Grid - Simplified */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
          <div className="text-2xl font-light text-white mb-1">{statsData.books}</div>
          <div className="text-sm text-gray-400">Books</div>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
          <div className="text-2xl font-light text-white mb-1">{statsData.notes}</div>
          <div className="text-sm text-gray-400">Notes</div>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
          <div className="text-2xl font-light text-white mb-1">{statsData.views}</div>
          <div className="text-sm text-gray-400">Views</div>
        </div>
        <div className="bg-gray-900/30 border border-gray-800/50 rounded-lg p-6">
          <div className="text-2xl font-light text-white mb-1">{statsData.days}</div>
          <div className="text-sm text-gray-400">Days</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Actions */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Actions - Minimal */}
          <div>
            <h2 className="text-xl font-light text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <Link href="/search-books" className="group">
                <div className="border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <BookOpen className="w-6 h-6 text-blue-400" />
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Search Books</h3>
                  <p className="text-gray-400 text-sm">Discover and add books to your collection</p>
                </div>
              </Link>

              <Link href="/upload-notes" className="group">
                <div className="border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <FileText className="w-6 h-6 text-blue-400" />
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-white font-medium mb-2">Upload Notes</h3>
                  <p className="text-gray-400 text-sm">Share your study materials</p>
                </div>
              </Link>

            </div>
          </div>

          {/* Library Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-light text-white">Library</h2>
              <Link href="/search-books" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                Browse →
              </Link>
            </div>
            
            {libraryBooks.length === 0 ? (
              <div className="border border-gray-800 rounded-lg p-12 text-center">
                <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-white font-medium mb-2">No books yet</h3>
                <p className="text-gray-400 text-sm mb-6">Start building your collection</p>
                <Link 
                  href="/search-books" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Books
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {libraryBooks.map((book) => (
                  <div key={book.id} className="bg-gray-900/30 border border-gray-800 rounded-lg p-4 hover:bg-gray-900/50 transition-all duration-300">
                    <div className="flex gap-3">
                      <img
                        src={getBookCover(book)}
                        alt={book.title}
                        className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm mb-1 truncate">{book.title}</h3>
                            <p className="text-gray-400 text-xs mb-2 truncate">by {book.authors.join(', ')}</p>
                            <div className="text-xs text-gray-500">
                              {book.publisher && <p className="truncate">Publisher: {book.publisher}</p>}
                              {book.pageCount && <p>Pages: {book.pageCount}</p>}
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveFromLibrary(book.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                            title="Remove from library"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleReadBook(book)}
                            className="px-3 py-1 text-xs rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                          >
                            Read Book
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column - Profile & Activity */}
        <div className="space-y-8">
          
          {/* Profile Card - Minimal */}
          <div>
            <h2 className="text-xl font-light text-white mb-6">Profile</h2>
            <div className="border border-gray-800 rounded-lg p-6">
              
              <div className="flex items-center space-x-4 mb-6">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="Shivam Mittal" />
                  <AvatarFallback className="bg-gray-800 text-white font-medium">
                    S
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-medium">Shivam Mittal</h3>
                  <p className="text-blue-400 text-sm">Pro Plan</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="text-gray-300">Today</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Level</span>
                  <span className="text-gray-300">Beginner</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <button className="w-full flex items-center justify-center space-x-2 py-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Settings</span>
                </button>
              </div>
              
            </div>
          </div>

          {/* Recent Activity - Minimal */}
          <div>
            <h2 className="text-xl font-light text-white mb-6">Activity</h2>
            <div className="border border-gray-800 rounded-lg p-6">
              
              <div className="text-center py-8">
                <div className="w-12 h-12 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-gray-500" />
                </div>
                <h3 className="text-white font-medium mb-2">No activity yet</h3>
                <p className="text-gray-400 text-sm">Your recent actions will appear here</p>
              </div>
              
            </div>
          </div>

        </div>
      </div>
      
      {/* E-book Reader */}
      {readerBook && (
        <EbookReader
          book={readerBook}
          isOpen={isReaderOpen}
          onClose={handleCloseReader}
        />
      )}
    </DashboardLayout>
  );
} 