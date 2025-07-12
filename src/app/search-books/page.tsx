'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import ExpandableBookCard from "@/components/ui/expandable-book-card";

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

// Menu items
const items = [
  {
    title: "General",
    icon: Settings,
    href: "/general",
  },
  {
    title: "Search Books",
    icon: BookOpen,
    href: "/search-books",
    active: true,
  },
  {
    title: "Ginie Help",
    icon: HelpCircle,
    href: "/ginie-help",
  },
  {
    title: "Upload Notes",
    icon: Upload,
    href: "/upload-notes",
  },
  {
    title: "Publish Notes",
    icon: FileText,
    href: "/publish-notes",
  },
];

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
    // TODO: Implement add to library functionality
    console.log('Adding to library:', book.title);
    // For now, just show a notification
    alert(`"${book.title}" has been added to your library!`);
  };

  const displayBooks = searchResults.length > 0 ? searchResults : randomBooks;
  const showingSearchResults = searchResults.length > 0;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-black text-white">
        <Sidebar className="bg-black border-r border-gray-800">
          <SidebarHeader className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div>
                <p className="text-white font-medium text-sm">abhardw7@kent.edu</p>
                <p className="text-gray-400 text-xs">Pro Plan</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                        className={`text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 w-full ${item.active ? 'bg-gray-800 text-white' : ''}`}
                      >
                        <Link href={item.href} className="flex items-center space-x-3 w-full px-3 py-2 rounded-md">
                          <item.icon className="w-4 h-4" />
                          <span className="font-normal text-sm">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-gray-800">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="text-gray-400 hover:text-white hover:bg-red-800 transition-all duration-200"
                >
                  <Link href="/auth" className="flex items-center space-x-3 w-full px-3 py-2 rounded-md">
                    <LogOut className="w-4 h-4" />
                    <span className="font-normal text-sm">Log Out</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <SidebarInset className="flex-1 bg-black">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col">
              {/* Main Content Container - Full width */}
              <div className="flex-1 w-full px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                  <h1 className="text-3xl font-semibold text-white mb-2">Search Books</h1>
                  <p className="text-gray-400">Discover and add books to your library</p>
                </div>

                {/* Search Form */}
                <form onSubmit={handleSearch} className="mb-8">
                  <div className="flex gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for books by title, author, or ISBN..."
                        className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </form>

                {/* Results Section */}
                {error && (
                  <div className="mb-6 p-4 bg-red-900 border border-red-700 rounded-lg">
                    <p className="text-red-200">{error}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-medium text-white mb-4">
                    {showingSearchResults ? `Search Results (${searchResults.length})` : 'Recommended Books'}
                  </h2>
                  
                  {isLoadingRandom && !showingSearchResults && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                      <p className="text-gray-400">Loading recommended books...</p>
                    </div>
                  )}

                  {displayBooks.length > 0 && (
                    <div className="w-full">
                      <ExpandableBookCard
                        books={displayBooks}
                        onAddToLibrary={handleAddToLibrary}
                      />
                    </div>
                  )}

                  {displayBooks.length === 0 && !isLoading && !isLoadingRandom && (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white mb-2">No books found</h3>
                      <p className="text-gray-400">Try searching with different keywords</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 