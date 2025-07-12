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
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
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
} from "lucide-react";

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
    title: "Community Notes",
    icon: Users,
    href: "/publish-notes",
    active: true,
  },
];

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

  // Transform notes data for HoverEffect component
  const hoverEffectItems = filteredNotes.map((note) => ({
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
        
        <SidebarInset className="flex-1 w-full min-w-0 bg-black">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-800 p-6">
                <div className="mb-6">
                  <h1 className="text-3xl font-semibold text-white mb-2">Community Notes</h1>
                  <p className="text-gray-400">Discover and access notes shared by students worldwide</p>
                </div>

                {/* Search and Filter Bar */}
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
              <div className="flex-1 p-6">
                <div className="mb-4 text-gray-400 text-sm">
                  Showing {filteredNotes.length} of {notes.length} notes
                </div>
                
                <HoverEffect items={hoverEffectItems} className="gap-6" />

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
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 