"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import EbookReader from "./ebook-reader";

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

interface ExpandableBookCardProps {
  books: Book[];
  onAddToLibrary: (book: Book) => void;
}

export default function ExpandableBookCard({ books, onAddToLibrary }: ExpandableBookCardProps) {
  const [active, setActive] = useState<Book | boolean | null>(null);
  const [readerBook, setReaderBook] = useState<Book | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      // Use a more React-friendly approach to prevent body scroll
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const getBookCover = (book: Book) => {
    return book.imageLinks?.thumbnail || book.imageLinks?.smallThumbnail || '/api/placeholder/400/600';
  };

  const getBookISBN = (book: Book) => {
    return book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || 
           book.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || 
           'Not available';
  };

  const truncateDescription = (description: string | undefined, maxLength: number = 200) => {
    if (!description) return 'No description available';
    return description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
  };

  const handlePreview = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    setReaderBook(book);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    setReaderBook(null);
  };

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-gray-900 border border-gray-800 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={getBookCover(active)}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.id}-${id}`}
                      className="font-medium text-white mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-gray-400 mb-2"
                    >
                      by {active.authors.join(', ')}
                    </motion.p>
                    <div className="text-sm text-gray-500 space-y-1">
                      {active.publisher && <p>Publisher: {active.publisher}</p>}
                      {active.publishedDate && <p>Published: {active.publishedDate}</p>}
                      {active.pageCount && <p>Pages: {active.pageCount}</p>}
                      <p>ISBN: {getBookISBN(active)}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToLibrary(active);
                      }}
                      className="px-4 py-2 text-sm rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors text-center"
                    >
                      Add to Library
                    </motion.button>
                    <motion.button
                      onClick={(e) => handlePreview(active, e)}
                      className="px-4 py-2 text-sm rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center"
                    >
                      Read Book
                    </motion.button>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-400 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>{active.description || 'No description available'}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="w-full space-y-4">
        {books.map((book) => (
          <motion.div
            layoutId={`card-${book.id}-${id}`}
            key={`card-${book.id}-${id}`}
            onClick={() => setActive(book)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-gray-900/50 bg-gray-900/30 border border-gray-800 rounded-lg cursor-pointer transition-all duration-300"
          >
            <div className="flex gap-4 flex-col md:flex-row">
              <motion.div layoutId={`image-${book.id}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={getBookCover(book)}
                  alt={book.title}
                  className="h-24 w-16 md:h-20 md:w-14 rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  layoutId={`title-${book.id}-${id}`}
                  className="font-medium text-white text-center md:text-left mb-1"
                >
                  {book.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${book.id}-${id}`}
                  className="text-gray-400 text-center md:text-left text-sm mb-2"
                >
                  by {book.authors.join(', ')}
                </motion.p>
                <div className="text-xs text-gray-500 space-y-1">
                  {book.publisher && <p>Publisher: {book.publisher}</p>}
                  {book.publishedDate && <p>Published: {book.publishedDate}</p>}
                  {book.pageCount && <p>Pages: {book.pageCount}</p>}
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {truncateDescription(book.description)}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToLibrary(book);
                }}
                className="px-4 py-2 text-sm rounded-lg font-medium bg-green-600 hover:bg-green-700 text-white transition-colors border border-green-500/50"
              >
                Add to Library
              </motion.button>
              <motion.button
                layoutId={`button-preview-${book.id}-${id}`}
                onClick={(e) => handlePreview(book, e)}
                className="px-4 py-2 text-sm rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors border border-blue-500/50"
              >
                Read Book
              </motion.button>
            </div>
          </motion.div>
        )        )}
      </div>
      
      {/* E-book Reader */}
      {readerBook && (
        <EbookReader
          book={readerBook}
          isOpen={isReaderOpen}
          onClose={handleCloseReader}
        />
      )}
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="m18 6l-12 12" />
      <path d="m6 6l12 12" />
    </motion.svg>
  );
}; 