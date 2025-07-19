"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2, Settings, ExternalLink } from 'lucide-react';

interface EbookReaderProps {
  book: {
    id: string;
    title: string;
    authors: string[];
    infoLink?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function EbookReader({ book, isOpen, onClose }: EbookReaderProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [viewerError, setViewerError] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      loadBookPreview();
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, book.id]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;
      
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'f' || event.key === 'F') {
        toggleFullscreen();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const loadBookPreview = async () => {
    setIsLoading(true);
    setViewerError(false);
    setPreviewUrl(null);

    console.log('🔍 Loading book preview for:', book.title);

    // Set a timeout to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      console.log('⏰ Loading timeout - switching to error state');
      setViewerError(true);
      setIsLoading(false);
    }, 3000); // 3 second timeout

    try {
      // Create different preview URL options using proper Google Books preview URLs
      const previewOptions = [
        // Google Books reader URL (same as clicking "Preview" on Google Books)
        book.id ? `https://books.google.com/books?id=${book.id}&lpg=PP1&pg=PP1&output=embed` : null,
        // Alternative with different parameters
        book.id ? `https://books.google.com/books?id=${book.id}&printsec=frontcover&output=embed&hl=en` : null,
        // Using info link with embed parameters
        book.infoLink ? `${book.infoLink.replace('/books?', '/books/reader?')}&output=embed` : null,
        // Fallback to standard info link
        book.infoLink
      ].filter(Boolean);

      console.log('🔗 Trying preview URLs:', previewOptions);

      if (previewOptions.length > 0) {
        // Use the first available option
        const selectedUrl = previewOptions[0] as string;
        console.log('✅ Using preview URL:', selectedUrl);
        
        setPreviewUrl(selectedUrl);
        clearTimeout(loadingTimeout);
        
        // The iframe onLoad event will handle setting isLoading to false
        // But also set a backup timeout in case onLoad doesn't fire
        setTimeout(() => {
          if (isLoading) {
            console.log('⏰ Iframe load timeout - assuming it loaded');
            setIsLoading(false);
          }
        }, 2000);
      } else {
        throw new Error('No preview URL available');
      }
    } catch (error) {
      clearTimeout(loadingTimeout);
      console.error('💥 Error loading book preview:', error);
      setViewerError(true);
      setIsLoading(false);
    }
  };



  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const getBookCover = () => {
    return book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '/api/placeholder/400/600';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 ${isFullscreen ? 'bg-white' : 'bg-black/80'}`}
      >
        <div className={`${isFullscreen ? 'h-full' : 'h-full p-4'} flex flex-col`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 ${isFullscreen ? 'bg-white border-b' : 'bg-gray-900'} ${isFullscreen ? 'text-gray-900' : 'text-white'}`}>
            <div className="flex items-center space-x-4">
              <BookOpen className="w-6 h-6" />
              <div>
                <h2 className="font-semibold text-lg truncate max-w-md">{book.title}</h2>
                <p className={`text-sm ${isFullscreen ? 'text-gray-600' : 'text-gray-400'}`}>by {book.authors.join(', ')}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${isFullscreen ? 'hover:bg-gray-100' : ''}`}
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={toggleFullscreen}
                className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${isFullscreen ? 'hover:bg-gray-100' : ''}`}
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={onClose}
                className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${isFullscreen ? 'hover:bg-gray-100' : ''}`}
                title="Close reader"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-4 ${isFullscreen ? 'bg-gray-50 border-b' : 'bg-gray-800'} ${isFullscreen ? 'text-gray-900' : 'text-white'}`}
            >
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Font Size:</span>
                  <button
                    onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                    className={`px-2 py-1 rounded text-sm ${isFullscreen ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    A-
                  </button>
                  <span className="text-sm w-8 text-center">{fontSize}</span>
                  <button
                    onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                    className={`px-2 py-1 rounded text-sm ${isFullscreen ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    A+
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Use the controls in the book viewer to navigate pages
                </div>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <div className="flex-1 relative">
            {isLoading ? (
              <div className={`flex items-center justify-center h-full ${isFullscreen ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-current mx-auto mb-4"></div>
                  <p>Loading book content...</p>
                </div>
              </div>
            ) : viewerError ? (
              <div className={`flex items-center justify-center h-full ${isFullscreen ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                <div className="text-center max-w-md">
                  <div className="mb-6">
                    <img
                      src={getBookCover()}
                      alt={book.title}
                      className="w-32 h-40 object-cover rounded-lg mx-auto mb-4 shadow-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-500 mb-4">by {book.authors.join(', ')}</p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <p className="text-yellow-800 text-sm">
                      <strong>Preview Not Available</strong><br />
                      This book doesn't have a readable preview available through Google Books, or it may not be available in your region. Some books only show basic information instead of full content.
                    </p>
                  </div>
                  <div className="flex flex-col space-y-3">
                    {book.infoLink && (
                      <a
                        href={book.infoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        View on Google Books
                      </a>
                    )}
                    <button
                      onClick={() => {
                        console.log('🔄 Retrying to load book...');
                        loadBookPreview();
                      }}
                      className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                {previewUrl ? (
                  <iframe
                    src={previewUrl}
                    className={`w-full h-full border-0 ${isFullscreen ? 'bg-white' : 'bg-white rounded-lg'}`}
                    title={`${book.title} - Book Preview`}
                    allowFullScreen
                    loading="lazy"
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    onLoad={() => {
                      console.log('📖 Book preview iframe loaded successfully');
                      setIsLoading(false);
                    }}
                    onError={() => {
                      console.log('❌ Book preview iframe failed to load');
                      setViewerError(true);
                      setIsLoading(false);
                    }}
                  />
                ) : (
                  <div className={`flex items-center justify-center h-full ${isFullscreen ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}>
                    <div className="text-center">
                      <p>Preparing book preview...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

 