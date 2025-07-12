'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Search,
  Filter,
  Users,
  Calendar,
  Tag,
  Eye,
  Download,
  Heart,
  Star,
  User,
  FileText,
} from "lucide-react";
import DashboardLayout from '@/components/layout/dashboard-layout';
import PageHeader from '@/components/layout/page-header';

interface CommunityNote {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    email: string;
  };
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  rating: number;
  attachments: {
    type: 'file' | 'image';
    name: string;
    url: string;
    size: number;
  }[];
}

// Mock data for community notes
const mockCommunityNotes: CommunityNote[] = [
  {
    id: "1",
    title: "Advanced Calculus: Derivatives and Integrals",
    content: "Comprehensive notes covering advanced calculus concepts including derivatives, integrals, and their applications in real-world scenarios. These notes include step-by-step solutions and examples.",
    subject: "Mathematics",
    tags: ["calculus", "derivatives", "integrals", "math"],
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
      email: "sarah.j@university.edu"
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    views: 245,
    likes: 32,
    rating: 4.8,
    attachments: [
      { type: 'file', name: 'calculus_formulas.pdf', url: '#', size: 2048000 },
      { type: 'image', name: 'graph_examples.png', url: '#', size: 512000 }
    ]
  },
  {
    id: "2",
    title: "Data Structures and Algorithms",
    content: "Essential data structures including arrays, linked lists, trees, and graphs. Covers sorting algorithms, search algorithms, and time complexity analysis with practical examples.",
    subject: "Computer Science",
    tags: ["algorithms", "data-structures", "programming", "computer-science"],
    author: {
      name: "Mike Chen",
      avatar: "MC",
      email: "mike.c@techuniv.edu"
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-18"),
    views: 189,
    likes: 28,
    rating: 4.6,
    attachments: [
      { type: 'file', name: 'algorithms_code.py', url: '#', size: 1024000 }
    ]
  },
  {
    id: "3",
    title: "Organic Chemistry Reactions",
    content: "Detailed study of organic chemistry reactions including substitution, elimination, and addition reactions. Includes reaction mechanisms and stereochemistry.",
    subject: "Chemistry",
    tags: ["organic-chemistry", "reactions", "mechanisms", "chemistry"],
    author: {
      name: "Dr. Emily Rodriguez",
      avatar: "ER",
      email: "e.rodriguez@chemlab.edu"
    },
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-16"),
    views: 156,
    likes: 24,
    rating: 4.9,
    attachments: [
      { type: 'image', name: 'reaction_diagrams.jpg', url: '#', size: 768000 },
      { type: 'file', name: 'practice_problems.pdf', url: '#', size: 1536000 }
    ]
  },
  {
    id: "4",
    title: "World History: Industrial Revolution",
    content: "Comprehensive overview of the Industrial Revolution, its causes, major innovations, social impacts, and long-term consequences on modern society.",
    subject: "History",
    tags: ["history", "industrial-revolution", "social-studies", "modern-history"],
    author: {
      name: "Prof. David Thompson",
      avatar: "DT",
      email: "d.thompson@historyuni.edu"
    },
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-14"),
    views: 134,
    likes: 19,
    rating: 4.5,
    attachments: [
      { type: 'file', name: 'timeline.pdf', url: '#', size: 896000 }
    ]
  },
  {
    id: "5",
    title: "Introduction to Machine Learning",
    content: "Beginner-friendly introduction to machine learning concepts, supervised and unsupervised learning, neural networks, and practical applications using Python.",
    subject: "Computer Science",
    tags: ["machine-learning", "ai", "python", "data-science"],
    author: {
      name: "Alex Kumar",
      avatar: "AK",
      email: "a.kumar@aitech.edu"
    },
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-12"),
    views: 298,
    likes: 45,
    rating: 4.7,
    attachments: [
      { type: 'file', name: 'ml_algorithms.py', url: '#', size: 2048000 },
      { type: 'file', name: 'datasets.csv', url: '#', size: 3072000 }
    ]
  },
  {
    id: "6",
    title: "Linear Algebra Fundamentals",
    content: "Essential linear algebra concepts including vectors, matrices, eigenvalues, and eigenvectors. Covers applications in computer graphics, machine learning, and engineering.",
    subject: "Mathematics",
    tags: ["linear-algebra", "vectors", "matrices", "mathematics"],
    author: {
      name: "Dr. Lisa Wang",
      avatar: "LW",
      email: "l.wang@mathuni.edu"
    },
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-30"),
    views: 187,
    likes: 31,
    rating: 4.6,
    attachments: [
      { type: 'file', name: 'matrix_operations.pdf', url: '#', size: 1792000 }
    ]
  },
  {
    id: "7",
    title: "Thermodynamics and Heat Transfer",
    content: "Comprehensive study of thermodynamics laws, heat transfer mechanisms, and their applications in engineering systems. Includes practical examples and problem-solving techniques.",
    subject: "Physics",
    tags: ["thermodynamics", "heat-transfer", "physics", "engineering"],
    author: {
      name: "Prof. Robert Garcia",
      avatar: "RG",
      email: "r.garcia@physicstech.edu"
    },
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-28"),
    views: 143,
    likes: 22,
    rating: 4.8,
    attachments: [
      { type: 'file', name: 'thermodynamics_formulas.pdf', url: '#', size: 1344000 },
      { type: 'image', name: 'heat_transfer_diagrams.png', url: '#', size: 896000 }
    ]
  },
  {
    id: "8",
    title: "Financial Accounting Principles",
    content: "Fundamental accounting principles including balance sheets, income statements, cash flow analysis, and financial ratios. Essential for business and finance students.",
    subject: "Business",
    tags: ["accounting", "finance", "business", "financial-analysis"],
    author: {
      name: "CPA Jennifer Martinez",
      avatar: "JM",
      email: "j.martinez@businessschool.edu"
    },
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-26"),
    views: 216,
    likes: 38,
    rating: 4.5,
    attachments: [
      { type: 'file', name: 'accounting_basics.pdf', url: '#', size: 2304000 },
      { type: 'file', name: 'financial_statements.xlsx', url: '#', size: 768000 }
    ]
  },
  {
    id: "9",
    title: "Cell Biology and Genetics",
    content: "Detailed study of cell structure, cellular processes, DNA replication, protein synthesis, and genetic inheritance patterns. Includes microscopy techniques and lab procedures.",
    subject: "Biology",
    tags: ["cell-biology", "genetics", "dna", "biology"],
    author: {
      name: "Dr. Maria Santos",
      avatar: "MS",
      email: "m.santos@biolab.edu"
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-24"),
    views: 169,
    likes: 27,
    rating: 4.7,
    attachments: [
      { type: 'file', name: 'cell_biology_notes.pdf', url: '#', size: 3584000 },
      { type: 'image', name: 'cell_diagrams.jpg', url: '#', size: 1280000 }
    ]
  },
  {
    id: "10",
    title: "Shakespeare's Literary Analysis",
    content: "In-depth analysis of Shakespeare's major works including Hamlet, Romeo and Juliet, and Macbeth. Covers themes, character development, and literary techniques.",
    subject: "Literature",
    tags: ["shakespeare", "literature", "drama", "literary-analysis"],
    author: {
      name: "Prof. Catherine Brown",
      avatar: "CB",
      email: "c.brown@englishlit.edu"
    },
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-22"),
    views: 124,
    likes: 18,
    rating: 4.4,
    attachments: [
      { type: 'file', name: 'shakespeare_analysis.pdf', url: '#', size: 1920000 }
    ]
  },
  {
    id: "11",
    title: "Statistics and Data Analysis",
    content: "Comprehensive guide to statistical methods, hypothesis testing, regression analysis, and data visualization. Includes R and Python code examples for practical applications.",
    subject: "Mathematics",
    tags: ["statistics", "data-analysis", "hypothesis-testing", "r-programming"],
    author: {
      name: "Dr. James Wilson",
      avatar: "JW",
      email: "j.wilson@statsuni.edu"
    },
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20"),
    views: 203,
    likes: 35,
    rating: 4.8,
    attachments: [
      { type: 'file', name: 'statistics_guide.pdf', url: '#', size: 2816000 },
      { type: 'file', name: 'r_code_examples.R', url: '#', size: 512000 }
    ]
  },
  {
    id: "12",
    title: "Database Systems and SQL",
    content: "Complete guide to relational databases, SQL queries, database design, normalization, and optimization. Includes practical exercises and real-world database examples.",
    subject: "Computer Science",
    tags: ["database", "sql", "database-design", "programming"],
    author: {
      name: "Senior Dev Tom Anderson",
      avatar: "TA",
      email: "t.anderson@techcorp.com"
    },
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-18"),
    views: 267,
    likes: 42,
    rating: 4.9,
    attachments: [
      { type: 'file', name: 'database_design.pdf', url: '#', size: 2048000 },
      { type: 'file', name: 'sql_queries.sql', url: '#', size: 256000 }
    ]
  },
  {
    id: "13",
    title: "Microeconomics Theory",
    content: "Fundamental microeconomic concepts including supply and demand, market structures, consumer behavior, and price theory. Essential for economics and business students.",
    subject: "Economics",
    tags: ["microeconomics", "supply-demand", "market-theory", "economics"],
    author: {
      name: "Prof. Susan Taylor",
      avatar: "ST",
      email: "s.taylor@econuni.edu"
    },
    createdAt: new Date("2024-01-06"),
    updatedAt: new Date("2024-01-16"),
    views: 156,
    likes: 23,
    rating: 4.6,
    attachments: [
      { type: 'file', name: 'microeconomics_notes.pdf', url: '#', size: 1664000 }
    ]
  },
  {
    id: "14",
    title: "Art History: Renaissance Masters",
    content: "Comprehensive study of Renaissance art and artists including Leonardo da Vinci, Michelangelo, and Raphael. Covers artistic techniques, historical context, and cultural impact.",
    subject: "Art History",
    tags: ["renaissance", "art-history", "leonardo-da-vinci", "michelangelo"],
    author: {
      name: "Dr. Isabella Romano",
      avatar: "IR",
      email: "i.romano@arthistory.edu"
    },
    createdAt: new Date("2024-01-04"),
    updatedAt: new Date("2024-01-14"),
    views: 98,
    likes: 15,
    rating: 4.7,
    attachments: [
      { type: 'file', name: 'renaissance_art.pdf', url: '#', size: 4096000 },
      { type: 'image', name: 'renaissance_paintings.jpg', url: '#', size: 2048000 }
    ]
  },
  {
    id: "15",
    title: "Cognitive Psychology",
    content: "Study of mental processes including perception, memory, attention, and problem-solving. Covers cognitive development theories and applications in education and therapy.",
    subject: "Psychology",
    tags: ["cognitive-psychology", "memory", "perception", "psychology"],
    author: {
      name: "Dr. Michael Chang",
      avatar: "MC",
      email: "m.chang@psychuni.edu"
    },
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-12"),
    views: 178,
    likes: 29,
    rating: 4.5,
    attachments: [
      { type: 'file', name: 'cognitive_psychology.pdf', url: '#', size: 2560000 }
    ]
  }
];

export default function CommunityNotes() {
  const [notes, setNotes] = useState<CommunityNote[]>(mockCommunityNotes);
  const [filteredNotes, setFilteredNotes] = useState<CommunityNote[]>(mockCommunityNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6); // 6 notes per page for better layout

  const subjects = ['all', ...Array.from(new Set(notes.map(note => note.subject)))];

  useEffect(() => {
    let filtered = notes;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        note.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by subject
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(note => note.subject === selectedSubject);
    }

    // Sort notes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.updatedAt.getTime() - a.updatedAt.getTime();
        case 'popular':
          return b.views - a.views;
        case 'liked':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    setFilteredNotes(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedSubject, sortBy, notes]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
      />
    ));
  };

  const handleDownload = (note: CommunityNote) => {
    // Create a downloadable text file with the note content
    const noteContent = `Title: ${note.title}\n\nSubject: ${note.subject}\n\nAuthor: ${note.author.name}\n\nContent:\n${note.content}\n\nTags: ${note.tags.join(', ')}\n\nCreated: ${note.createdAt.toLocaleDateString()}\nUpdated: ${note.updatedAt.toLocaleDateString()}`;
    
    const blob = new Blob([noteContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const endIndex = startIndex + notesPerPage;
  const currentNotes = filteredNotes.slice(startIndex, endIndex);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show 5 page numbers at most
    
    if (totalPages <= showPages) {
      // Show all pages if total is less than or equal to showPages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis logic
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('ellipsis');
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the notes section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Transform notes data for HoverEffect component
  const hoverEffectItems = currentNotes.map((note) => ({
    title: note.title,
    description: note.content,
    link: note.id,
    children: (
      <div className="space-y-4">
        {/* Subject and Rating */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
            {note.subject}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(note.rating)}
            <span className="text-gray-400 text-xs ml-1">({note.rating})</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">{note.author.avatar}</span>
          </div>
          <div>
            <p className="text-white text-sm font-medium">{note.author.name}</p>
            <p className="text-gray-400 text-xs">{note.updatedAt.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {note.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
              #{tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Attachments */}
        {note.attachments.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 mb-2">
              {note.attachments.length} attachment(s)
            </p>
            <div className="space-y-1">
              {note.attachments.slice(0, 2).map((attachment, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs text-gray-400">
                  <FileText className="w-3 h-3" />
                  <span className="truncate">{attachment.name}</span>
                  <span>({formatFileSize(attachment.size)})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3" />
              <span>{note.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{note.likes}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              // Handle view action
            }}
          >
            <Eye className="w-4 h-4 mr-2" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(note);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    )
  }));

  return (
    <DashboardLayout>
      <PageHeader 
        title="Community Notes" 
        description="Discover and access notes shared by students worldwide" 
      />

      {/* Search and Filter Bar */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search notes, subjects, authors, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white text-sm"
              title="Filter by subject"
              aria-label="Filter by subject"
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white text-sm"
              title="Sort notes by"
              aria-label="Sort notes by"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Viewed</option>
              <option value="liked">Most Liked</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="mb-8">
        <div className="mb-4 text-gray-400 text-sm">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredNotes.length)} of {filteredNotes.length} notes
          {filteredNotes.length !== notes.length && ` (filtered from ${notes.length} total)`}
        </div>
        
        <HoverEffect items={hoverEffectItems} className="gap-6" />
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    className={currentPage <= 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {getPageNumbers().map((page, index) => (
                  <PaginationItem key={index}>
                    {page === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => handlePageChange(page as number)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    className={currentPage >= totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No notes found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('all');
                setSortBy('recent');
                setCurrentPage(1);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 