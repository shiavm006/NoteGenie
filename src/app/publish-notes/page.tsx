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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPublicNotes, UserNote } from '@/lib/firebase-db';

// Mock data for community notes
const mockNotes: UserNote[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'Complete React.js Development Guide',
    content: 'A comprehensive guide covering React fundamentals, hooks, state management with Redux, component lifecycle, performance optimization, and modern development practices. Includes real-world examples, best practices, and common pitfalls to avoid.',
    subject: 'Web Development',
    isPublic: true,
    author: { name: 'Sarah Chen', avatar: 'sarahchen' },
    tags: ['react', 'javascript', 'frontend', 'web-development', 'hooks', 'redux'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    views: 1245,
    likes: 89,
    rating: 4.8,
    attachments: [{ name: 'react_complete_guide.pdf', size: 5242880, url: 'https://example.com/react_guide.pdf' }]
  },
  {
    id: '2',
    userId: 'user2',
    title: 'Python for Data Science & Machine Learning',
    content: 'Complete Python guide for data science including NumPy, Pandas, Matplotlib, Scikit-learn, and TensorFlow. Covers data preprocessing, visualization, statistical analysis, and building ML models from scratch. Includes real datasets and hands-on projects.',
    subject: 'Data Science',
    isPublic: true,
    author: { name: 'Michael Rodriguez', avatar: 'mrodriguez' },
    tags: ['python', 'data-science', 'machine-learning', 'pandas', 'numpy', 'tensorflow'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18'),
    views: 2156,
    likes: 156,
    rating: 4.9,
    attachments: [{ name: 'python_data_science.pdf', size: 8388608, url: 'https://example.com/python_ds.pdf' }]
  },
  {
    id: '3',
    userId: 'user3',
    title: 'AWS Cloud Architecture & DevOps',
    content: 'Comprehensive AWS guide covering EC2, S3, Lambda, RDS, CloudFormation, and CI/CD pipelines. Includes real-world deployment strategies, security best practices, cost optimization, and monitoring. Perfect for cloud engineers and DevOps professionals.',
    subject: 'Cloud Computing',
    isPublic: true,
    author: { name: 'Alex Thompson', avatar: 'alexthompson' },
    tags: ['aws', 'cloud', 'devops', 'ec2', 's3', 'lambda', 'ci-cd'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-22'),
    views: 1890,
    likes: 134,
    rating: 4.7,
    attachments: [{ name: 'aws_devops_guide.pdf', size: 6291456, url: 'https://example.com/aws_guide.pdf' }]
  },
  {
    id: '4',
    userId: 'user4',
    title: 'Complete JavaScript ES6+ & Modern Web APIs',
    content: 'Modern JavaScript guide covering ES6+ features, async/await, Promises, Web APIs, DOM manipulation, Fetch API, WebSockets, and Progressive Web Apps. Includes practical examples and real-world applications.',
    subject: 'Web Development',
    isPublic: true,
    author: { name: 'Emma Wilson', avatar: 'emmawilson' },
    tags: ['javascript', 'es6', 'async-await', 'web-apis', 'dom', 'pwa'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-19'),
    views: 1678,
    likes: 98,
    rating: 4.6,
    attachments: [{ name: 'modern_javascript.pdf', size: 4194304, url: 'https://example.com/modern_js.pdf' }]
  },
  {
    id: '5',
    userId: 'user5',
    title: 'Docker & Kubernetes Complete Guide',
    content: 'Comprehensive containerization guide covering Docker fundamentals, multi-stage builds, Docker Compose, Kubernetes architecture, pods, services, deployments, and production deployment strategies. Includes real-world examples and best practices.',
    subject: 'DevOps',
    isPublic: true,
    author: { name: 'David Kim', avatar: 'davidkim' },
    tags: ['docker', 'kubernetes', 'containers', 'devops', 'deployment', 'microservices'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-25'),
    views: 1456,
    likes: 112,
    rating: 4.8,
    attachments: [{ name: 'docker_kubernetes_guide.pdf', size: 7340032, url: 'https://example.com/docker_k8s.pdf' }]
  },
  {
    id: '6',
    userId: 'user6',
    title: 'Node.js & Express.js Backend Development',
    content: 'Complete backend development guide with Node.js and Express.js. Covers RESTful APIs, middleware, authentication with JWT, database integration with MongoDB/PostgreSQL, error handling, testing with Jest, and deployment strategies. Includes real-world project examples.',
    subject: 'Backend Development',
    isPublic: true,
    author: { name: 'Lisa Park', avatar: 'lisapark' },
    tags: ['nodejs', 'express', 'backend', 'api', 'jwt', 'mongodb', 'postgresql'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-21'),
    views: 1892,
    likes: 145,
    rating: 4.7,
    attachments: [{ name: 'nodejs_backend_guide.pdf', size: 6291456, url: 'https://example.com/nodejs_guide.pdf' }]
  },
  {
    id: '7',
    userId: 'user7',
    title: 'SQL Database Design & Optimization',
    content: 'Complete SQL guide covering database design principles, normalization, indexing strategies, query optimization, stored procedures, triggers, and performance tuning. Includes real-world case studies and best practices for MySQL, PostgreSQL, and SQL Server.',
    subject: 'Database',
    isPublic: true,
    author: { name: 'James Brown', avatar: 'jamesbrown' },
    tags: ['sql', 'database', 'mysql', 'postgresql', 'optimization', 'design'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-17'),
    views: 1234,
    likes: 87,
    rating: 4.5,
    attachments: [{ name: 'sql_database_guide.pdf', size: 4194304, url: 'https://example.com/sql_guide.pdf' }]
  },
  {
    id: '8',
    userId: 'user8',
    title: 'System Design & Architecture Patterns',
    content: 'Complete system design guide covering scalability patterns, microservices architecture, load balancing, caching strategies, database sharding, message queues, and distributed systems. Includes real-world case studies from tech giants and interview preparation.',
    subject: 'System Design',
    isPublic: true,
    author: { name: 'Nina Patel', avatar: 'ninapatel' },
    tags: ['system-design', 'architecture', 'microservices', 'scalability', 'distributed-systems'],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-24'),
    views: 2567,
    likes: 198,
    rating: 4.9,
    attachments: [{ name: 'system_design_guide.pdf', size: 10485760, url: 'https://example.com/system_design.pdf' }]
  },
  {
    id: '9',
    userId: 'user9',
    title: 'TypeScript Complete Developer Guide',
    content: 'Comprehensive TypeScript guide covering type system, interfaces, generics, decorators, modules, and advanced patterns. Includes practical examples for React, Node.js, and Angular development. Perfect for JavaScript developers transitioning to TypeScript.',
    subject: 'Web Development',
    isPublic: true,
    author: { name: 'Rachel Green', avatar: 'rachelgreen' },
    tags: ['typescript', 'javascript', 'types', 'interfaces', 'generics', 'react', 'angular'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-23'),
    views: 1876,
    likes: 134,
    rating: 4.6,
    attachments: [{ name: 'typescript_complete_guide.pdf', size: 5242880, url: 'https://example.com/typescript_guide.pdf' }]
  },
  {
    id: '10',
    userId: 'user10',
    title: 'GraphQL API Development & Best Practices',
    content: 'Complete GraphQL guide covering schema design, resolvers, subscriptions, authentication, caching, and performance optimization. Includes real-world examples with Apollo Server, Prisma, and React Apollo Client. Perfect for modern API development.',
    subject: 'API Development',
    isPublic: true,
    author: { name: 'Carlos Mendez', avatar: 'carlosmendez' },
    tags: ['graphql', 'api', 'apollo', 'prisma', 'schema', 'resolvers', 'subscriptions'],
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-26'),
    views: 1456,
    likes: 98,
    rating: 4.7,
    attachments: [{ name: 'graphql_guide.pdf', size: 5242880, url: 'https://example.com/graphql_guide.pdf' }]
  },
  {
    id: '11',
    userId: 'user11',
    title: 'Economics: Microeconomic Theory',
    content: 'Fundamental microeconomic concepts including supply, demand, market structures, and consumer behavior.',
    subject: 'Economics',
    isPublic: true,
    author: { name: 'Amanda Foster', avatar: 'amandafoster' },
    tags: ['economics', 'microeconomics', 'supply-demand', 'markets'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-20'),
    views: 189,
    likes: 14,
    rating: 4.3,
    attachments: [{ name: 'microeconomics.pdf', size: 1792000, url: 'https://example.com/microeconomics.pdf' }]
  },
  {
    id: '12',
    userId: 'user12',
    title: 'Biology: Cell Biology & Genetics',
    content: 'Comprehensive notes on cell structure, DNA, genetics, and molecular biology processes.',
    subject: 'Biology',
    isPublic: true,
    author: { name: 'Kevin Zhang', avatar: 'kevinzhang' },
    tags: ['biology', 'cells', 'genetics', 'DNA', 'molecular'],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-25'),
    views: 245,
    likes: 19,
    rating: 4.5,
    attachments: [{ name: 'cell_biology.pdf', size: 2560000, url: 'https://example.com/cell_biology.pdf' }]
  },
  {
    id: '13',
    userId: 'user13',
    title: 'Philosophy: Ethics & Moral Theory',
    content: 'Analysis of ethical theories, moral reasoning, and philosophical approaches to right and wrong.',
    subject: 'Philosophy',
    isPublic: true,
    author: { name: 'Sophie Anderson', avatar: 'sophieanderson' },
    tags: ['philosophy', 'ethics', 'moral-theory', 'reasoning'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-18'),
    views: 145,
    likes: 10,
    rating: 4.1,
    attachments: [{ name: 'ethics_philosophy.pdf', size: 1280000, url: 'https://example.com/ethics_philosophy.pdf' }]
  },
  {
    id: '14',
    userId: 'user14',
    title: 'Statistics: Probability & Inference',
    content: 'Statistical methods, probability theory, hypothesis testing, and data analysis techniques.',
    subject: 'Statistics',
    isPublic: true,
    author: { name: 'Marcus Johnson', avatar: 'marcusjohnson' },
    tags: ['statistics', 'probability', 'inference', 'hypothesis-testing'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-27'),
    views: 267,
    likes: 20,
    rating: 4.6,
    attachments: [{ name: 'statistics_notes.pdf', size: 2304000, url: 'https://example.com/statistics_notes.pdf' }]
  },
  {
    id: '15',
    userId: 'user15',
    title: 'Art History: Renaissance Period',
    content: 'Comprehensive study of Renaissance art, artists, techniques, and cultural significance.',
    subject: 'Art History',
    isPublic: true,
    author: { name: 'Isabella Martinez', avatar: 'isabellamartinez' },
    tags: ['art-history', 'renaissance', 'artists', 'techniques'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-19'),
    views: 178,
    likes: 12,
    rating: 4.2,
    attachments: [{ name: 'renaissance_art.pdf', size: 2048000, url: 'https://example.com/renaissance_art.pdf' }]
  },
  {
    id: '16',
    userId: 'user16',
    title: 'Political Science: International Relations',
    content: 'Analysis of international politics, diplomacy, global governance, and foreign policy.',
    subject: 'Political Science',
    isPublic: true,
    author: { name: 'Daniel Lee', avatar: 'daniellee' },
    tags: ['political-science', 'international-relations', 'diplomacy', 'governance'],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-28'),
    views: 198,
    likes: 15,
    rating: 4.3,
    attachments: [{ name: 'international_relations.pdf', size: 1792000, url: 'https://example.com/international_relations.pdf' }]
  },
  {
    id: '17',
    userId: 'user17',
    title: 'Linguistics: Language Acquisition',
    content: 'Theories of language learning, cognitive development, and linguistic analysis methods.',
    subject: 'Linguistics',
    isPublic: true,
    author: { name: 'Maria Garcia', avatar: 'mariagarcia' },
    tags: ['linguistics', 'language-acquisition', 'cognitive', 'analysis'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-16'),
    views: 156,
    likes: 9,
    rating: 4.0,
    attachments: [{ name: 'linguistics_notes.pdf', size: 1536000, url: 'https://example.com/linguistics_notes.pdf' }]
  },
  {
    id: '18',
    userId: 'user18',
    title: 'Astronomy: Solar System & Beyond',
    content: 'Comprehensive study of planets, stars, galaxies, and the universe\'s structure and evolution.',
    subject: 'Astronomy',
    isPublic: true,
    author: { name: 'Robert Taylor', avatar: 'roberttaylor' },
    tags: ['astronomy', 'solar-system', 'planets', 'stars', 'galaxies'],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-29'),
    views: 234,
    likes: 18,
    rating: 4.4,
    attachments: [{ name: 'astronomy_notes.pdf', size: 2560000, url: 'https://example.com/astronomy_notes.pdf' }]
  },
  {
    id: '19',
    userId: 'user19',
    title: 'Sociology: Social Theory & Research',
    content: 'Social theories, research methodologies, and analysis of social structures and institutions.',
    subject: 'Sociology',
    isPublic: true,
    author: { name: 'Jennifer White', avatar: 'jenniferwhite' },
    tags: ['sociology', 'social-theory', 'research', 'institutions'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-30'),
    views: 167,
    likes: 11,
    rating: 4.2,
    attachments: [{ name: 'sociology_notes.pdf', size: 1792000, url: 'https://example.com/sociology_notes.pdf' }]
  },
  {
    id: '20',
    userId: 'user20',
    title: 'Engineering: Thermodynamics',
    content: 'Principles of thermodynamics, heat transfer, energy systems, and engineering applications.',
    subject: 'Engineering',
    isPublic: true,
    author: { name: 'Thomas Clark', avatar: 'thomasclark' },
    tags: ['engineering', 'thermodynamics', 'heat-transfer', 'energy'],
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-31'),
    views: 289,
    likes: 22,
    rating: 4.7,
    attachments: [{ name: 'thermodynamics.pdf', size: 2560000, url: 'https://example.com/thermodynamics.pdf' }]
  },
  {
    id: '15',
    userId: 'user15',
    title: 'Next.js 14 Full-Stack Development',
    content: 'Complete Next.js 14 guide covering App Router, Server Components, API routes, middleware, authentication, database integration, and deployment. Includes real-world projects and best practices for modern React applications.',
    subject: 'Web Development',
    isPublic: true,
    author: { name: 'Jennifer Liu', avatar: 'jenniferliu' },
    tags: ['nextjs', 'react', 'fullstack', 'app-router', 'server-components', 'api-routes'],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-27'),
    views: 2134,
    likes: 167,
    rating: 4.8,
    attachments: [{ name: 'nextjs_14_guide.pdf', size: 7340032, url: 'https://example.com/nextjs_guide.pdf' }]
  },
  {
    id: '16',
    userId: 'user16',
    title: 'MongoDB & NoSQL Database Design',
    content: 'Comprehensive MongoDB guide covering document modeling, aggregation pipelines, indexing strategies, sharding, replication, and performance optimization. Includes real-world examples and best practices for scalable applications.',
    subject: 'Database',
    isPublic: true,
    author: { name: 'Ahmed Hassan', avatar: 'ahmedhassan' },
    tags: ['mongodb', 'nosql', 'database', 'aggregation', 'sharding', 'replication'],
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-28'),
    views: 1567,
    likes: 112,
    rating: 4.6,
    attachments: [{ name: 'mongodb_complete_guide.pdf', size: 6291456, url: 'https://example.com/mongodb_guide.pdf' }]
  },
  {
    id: '17',
    userId: 'user17',
    title: 'Cybersecurity & Ethical Hacking',
    content: 'Complete cybersecurity guide covering network security, penetration testing, vulnerability assessment, cryptography, incident response, and security best practices. Includes hands-on labs and real-world scenarios.',
    subject: 'Cybersecurity',
    isPublic: true,
    author: { name: 'Maria Garcia', avatar: 'mariagarcia' },
    tags: ['cybersecurity', 'ethical-hacking', 'penetration-testing', 'network-security', 'cryptography'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-29'),
    views: 2890,
    likes: 234,
    rating: 4.9,
    attachments: [{ name: 'cybersecurity_guide.pdf', size: 10485760, url: 'https://example.com/cybersecurity_guide.pdf' }]
  },
  {
    id: '18',
    userId: 'user18',
    title: 'Vue.js 3 & Composition API',
    content: 'Complete Vue.js 3 guide covering Composition API, reactivity system, component lifecycle, routing with Vue Router, state management with Pinia, and building scalable applications. Includes modern development practices.',
    subject: 'Web Development',
    isPublic: true,
    author: { name: 'Kevin Zhang', avatar: 'kevinzhang' },
    tags: ['vuejs', 'composition-api', 'reactivity', 'vue-router', 'pinia', 'frontend'],
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-01-30'),
    views: 1234,
    likes: 89,
    rating: 4.5,
    attachments: [{ name: 'vuejs3_guide.pdf', size: 5242880, url: 'https://example.com/vuejs_guide.pdf' }]
  },
  {
    id: '19',
    userId: 'user19',
    title: 'Blockchain & Web3 Development',
    content: 'Complete blockchain development guide covering smart contracts, Solidity, Ethereum, DeFi protocols, NFTs, and Web3 integration. Includes hands-on projects and real-world dApp development examples.',
    subject: 'Blockchain',
    isPublic: true,
    author: { name: 'Priya Patel', avatar: 'priyapatel' },
    tags: ['blockchain', 'web3', 'solidity', 'ethereum', 'defi', 'nft', 'smart-contracts'],
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-31'),
    views: 3456,
    likes: 287,
    rating: 4.8,
    attachments: [{ name: 'blockchain_web3_guide.pdf', size: 12582912, url: 'https://example.com/blockchain_guide.pdf' }]
  },
  {
    id: '20',
    userId: 'user20',
    title: 'Git & GitHub Advanced Workflow',
    content: 'Advanced Git and GitHub guide covering branching strategies, merge conflicts, rebasing, cherry-picking, hooks, CI/CD integration, and team collaboration workflows. Includes real-world scenarios and best practices.',
    subject: 'Version Control',
    isPublic: true,
    author: { name: 'Thomas Anderson', avatar: 'thomasanderson' },
    tags: ['git', 'github', 'version-control', 'branching', 'ci-cd', 'collaboration'],
    createdAt: new Date('2024-01-26'),
    updatedAt: new Date('2024-02-01'),
    views: 1789,
    likes: 145,
    rating: 4.7,
    attachments: [{ name: 'git_github_guide.pdf', size: 4194304, url: 'https://example.com/git_guide.pdf' }]
  }
];

export default function CommunityNotes() {
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<UserNote[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(6); // 6 notes per page for better layout
  const [selectedNote, setSelectedNote] = useState<UserNote | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  useEffect(() => {
    // Combine mock data with real Firestore data
    const loadNotes = async () => {
      try {
        // Get real notes from Firestore
        const realNotes = await getPublicNotes();
        
        // Combine mock data with real notes, avoiding duplicates by ID
        const allNotes = [...mockNotes];
        
        // Add real notes that aren't already in mock data
        realNotes.forEach(realNote => {
          const exists = allNotes.find(note => note.id === realNote.id);
          if (!exists) {
            allNotes.push(realNote);
          }
        });
        
        setNotes(allNotes);
        setFilteredNotes(allNotes);
      } catch (error) {
        console.error('Error loading notes:', error);
        // Fallback to mock data only if Firestore fails
        setNotes(mockNotes);
        setFilteredNotes(mockNotes);
      }
    };
    
    loadNotes();
    
    // Set up real-time listener for new notes (refresh every 30 seconds)
    const interval = setInterval(() => {
      loadNotes();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

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

  const handleViewNote = (note: UserNote) => {
    setSelectedNote(note);
    setIsViewModalOpen(true);
  };

  const handleDownload = (note: UserNote) => {
    // Create PDF content using jsPDF
    import('jspdf').then((jsPDF) => {
      const { default: jsPDFClass } = jsPDF;
      const doc = new jsPDFClass();
      
      // Set font and styling
      doc.setFont('helvetica');
      doc.setFontSize(20);
      doc.setTextColor(0, 0, 0);
      
      // Title
      doc.text(note.title, 20, 30);
      
      // Subject
      doc.setFontSize(14);
      doc.setTextColor(100, 100, 100);
      doc.text(`Subject: ${note.subject}`, 20, 45);
      
      // Author
      doc.text(`Author: ${note.author.name}`, 20, 55);
      
      // Date
      doc.text(`Created: ${note.createdAt.toLocaleDateString()}`, 20, 65);
      doc.text(`Updated: ${note.updatedAt.toLocaleDateString()}`, 20, 75);
      
      // Stats
      doc.text(`Views: ${note.views} | Likes: ${note.likes} | Rating: ${note.rating}/5`, 20, 85);
      
      // Tags
      doc.text(`Tags: ${note.tags.join(', ')}`, 20, 95);
      
      // Content
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      
      // Split content into lines that fit the page width
      const maxWidth = 170; // PDF width minus margins
      const lines = doc.splitTextToSize(note.content, maxWidth);
      
      let yPosition = 115;
      const lineHeight = 7;
      
      for (let i = 0; i < lines.length; i++) {
        // Check if we need a new page
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.text(lines[i], 20, yPosition);
        yPosition += lineHeight;
      }
      
      // Add attachments info if any
      if (note.attachments.length > 0) {
        yPosition += 10;
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Attachments:', 20, yPosition);
        yPosition += 5;
        
        note.attachments.forEach((attachment, index) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 20;
          }
          doc.text(`• ${attachment.name} (${formatFileSize(attachment.size)})`, 25, yPosition);
          yPosition += 5;
        });
      }
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Generated by NoteGenie', 20, 280);
      
      // Save the PDF
      const fileName = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      doc.save(fileName);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      // Fallback to text file if PDF generation fails
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
    });
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
          <Avatar className="w-8 h-8">
            <AvatarImage src={`https://github.com/${note.author.avatar.toLowerCase()}.png`} alt={note.author.name} />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-xs">
              {note.author.avatar}
            </AvatarFallback>
          </Avatar>
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
              handleViewNote(note);
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

      {/* View Note Modal */}
      {isViewModalOpen && selectedNote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedNote.title}</h2>
                <p className="text-gray-400 mt-1">Subject: {selectedNote.subject}</p>
              </div>
              <Button
                onClick={() => setIsViewModalOpen(false)}
                variant="outline"
                className="text-gray-400 hover:text-white"
              >
                ✕
              </Button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={`https://github.com/${selectedNote.author.avatar.toLowerCase()}.png`} alt={selectedNote.author.name} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                    {selectedNote.author.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{selectedNote.author.name}</p>
                  <p className="text-gray-400 text-sm">
                    Created: {selectedNote.createdAt.toLocaleDateString()} | 
                    Updated: {selectedNote.updatedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedNote.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedNote.likes} likes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>{selectedNote.rating}/5 rating</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedNote.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {selectedNote.content}
                </div>
              </div>

              {/* Attachments */}
              {selectedNote.attachments.length > 0 && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Attachments</h3>
                  <div className="space-y-2">
                    {selectedNote.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-3 text-gray-300">
                        <FileText className="w-4 h-4" />
                        <span className="flex-1">{attachment.name}</span>
                        <span className="text-gray-400 text-sm">{formatFileSize(attachment.size)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-700">
                <Button
                  onClick={() => handleDownload(selectedNote)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={() => setIsViewModalOpen(false)}
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 