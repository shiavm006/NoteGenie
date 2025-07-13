'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  Users,
  LogOut,
  Plus,
  X,
  Edit,
  Trash2,
  Share,
  Tag,
  Image as ImageIcon,
  Paperclip,
  FileText,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Menu items configuration (same as DashboardLayout)
const menuItems = [
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
  },
];

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  attachments: {
    type: 'file' | 'image';
    name: string;
    url: string;
    size: number;
  }[];
}

export default function UploadNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    subject: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'my-notes' | 'create-note'>('my-notes');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      tags: newNote.tags,
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublished: false,
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'file',
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
      })),
    };

    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '', subject: '', tags: [] });
    setAttachments([]);
    setActiveTab('my-notes');
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags,
    });
    setActiveTab('create-note');
  };

  const handleUpdateNote = () => {
    if (!editingNote || !newNote.title.trim() || !newNote.content.trim()) return;

    const updatedNote: Note = {
      ...editingNote,
      title: newNote.title,
      content: newNote.content,
      subject: newNote.subject,
      tags: newNote.tags,
      updatedAt: new Date(),
    };

    setNotes(notes.map(note => note.id === editingNote.id ? updatedNote : note));
    setEditingNote(null);
    setNewNote({ title: '', content: '', subject: '', tags: [] });
    setActiveTab('my-notes');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handlePublishNote = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPublished: !note.isPublished } : note
    ));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote({ ...newNote, tags: [...newNote.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewNote({ ...newNote, tags: newNote.tags.filter(tag => tag !== tagToRemove) });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-1 w-full min-w-0 bg-black text-white">
        {/* Sidebar - Same as DashboardLayout */}
        <Sidebar className="bg-black border-r border-gray-800">
          <SidebarHeader className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="Shivam Mittal" />
                <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                  S
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">Shivam Mittal</p>
                <p className="text-gray-400 text-xs">Pro Plan</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild
                          className={`text-gray-400 hover:text-white hover:bg-gray-800 transition-all duration-200 w-full ${isActive ? 'bg-gray-800 text-white' : ''}`}
                        >
                          <Link href={item.href} className="flex items-center space-x-3 w-full px-3 py-2 rounded-md">
                            <item.icon className="w-4 h-4" />
                            <span className="font-normal text-sm">{item.title}</span>
                          </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    );
                  })}
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
        
        {/* Main Content Area - Full width without padding */}
        <SidebarInset className="flex-1 w-full min-w-0 bg-black">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col">
              {/* Header */}
              <div className="border-b border-gray-800 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-semibold text-white mb-2">Upload Notes</h1>
                    <p className="text-gray-400">Create, manage, and publish your study notes</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setActiveTab('my-notes')}
                      variant={activeTab === 'my-notes' ? 'default' : 'outline'}
                      className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600"
                    >
                      My Notes ({notes.length})
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveTab('create-note');
                        setEditingNote(null);
                        setNewNote({ title: '', content: '', subject: '', tags: [] });
                      }}
                      variant={activeTab === 'create-note' ? 'default' : 'outline'}
                      className="bg-blue-600 hover:bg-blue-700 text-white border-blue-500"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Note
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                {activeTab === 'my-notes' ? (
                  /* My Notes Tab */
                  <div className="w-full">
                    {notes.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-white mb-2">No notes yet</h3>
                        <p className="text-gray-400 mb-4">Start creating your first note to share with the community</p>
                        <Button
                          onClick={() => setActiveTab('create-note')}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Your First Note
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                          <div key={note.id} className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-white font-medium text-lg truncate">{note.title}</h3>
                              <div className="flex items-center space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleEditNote(note)}
                                  className="text-gray-400 hover:text-white p-1"
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="text-gray-400 hover:text-red-400 p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {note.subject && (
                              <p className="text-sm text-blue-400 mb-2">{note.subject}</p>
                            )}
                            
                            <p className="text-gray-400 text-sm mb-3 line-clamp-3">{note.content}</p>
                            
                            {note.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {note.tags.map((tag, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {note.attachments.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-1">{note.attachments.length} attachment(s)</p>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                              <span>Created {note.createdAt.toLocaleDateString()}</span>
                              <span className={`px-2 py-1 rounded ${note.isPublished ? 'bg-green-800 text-green-300' : 'bg-gray-800 text-gray-300'}`}>
                                {note.isPublished ? 'Published' : 'Draft'}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handlePublishNote(note.id)}
                                className={`flex-1 ${note.isPublished ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                              >
                                <Share className="w-4 h-4 mr-2" />
                                {note.isPublished ? 'Unpublish' : 'Publish'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Create Note Tab */
                  <div className="w-full">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                      <h2 className="text-2xl font-semibold text-white mb-6">
                        {editingNote ? 'Edit Note' : 'Create New Note'}
                      </h2>
                      
                      <div className="space-y-6">
                        {/* Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Title *
                          </label>
                          <Input
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            placeholder="Enter note title..."
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          />
                        </div>
                        
                        {/* Subject */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Subject
                          </label>
                          <Input
                            value={newNote.subject}
                            onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
                            placeholder="e.g., Mathematics, Computer Science, Biology..."
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                          />
                        </div>
                        
                        {/* Content */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Content *
                          </label>
                          <Textarea
                            value={newNote.content}
                            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                            placeholder="Write your note content here..."
                            rows={10}
                            className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 resize-none"
                          />
                        </div>
                        
                        {/* Tags */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Tags
                          </label>
                          <div className="flex space-x-2 mb-2">
                            <Input
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                              placeholder="Add a tag..."
                              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            />
                            <Button
                              onClick={handleAddTag}
                              className="bg-gray-700 hover:bg-gray-600 text-white"
                            >
                              <Tag className="w-4 h-4" />
                            </Button>
                          </div>
                          {newNote.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {newNote.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full flex items-center">
                                  {tag}
                                  <button
                                    onClick={() => handleRemoveTag(tag)}
                                    className="ml-2 hover:text-red-300"
                                    title="Remove tag"
                                    aria-label={`Remove ${tag} tag`}
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Attachments */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Attachments
                          </label>
                          <div className="flex space-x-2 mb-4">
                            <Button
                              onClick={() => fileInputRef.current?.click()}
                              variant="outline"
                              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                            >
                              <Paperclip className="w-4 h-4 mr-2" />
                              Upload File
                            </Button>
                            <Button
                              onClick={() => imageInputRef.current?.click()}
                              variant="outline"
                              className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                            >
                              <ImageIcon className="w-4 h-4 mr-2" />
                              Upload Image
                            </Button>
                          </div>
                          
                          {attachments.length > 0 && (
                            <div className="space-y-2">
                              {attachments.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    {file.type.startsWith('image/') ? (
                                      <ImageIcon className="w-5 h-5 text-blue-400" />
                                    ) : (
                                      <FileText className="w-5 h-5 text-gray-400" />
                                    )}
                                    <div>
                                      <p className="text-white text-sm">{file.name}</p>
                                      <p className="text-gray-400 text-xs">{formatFileSize(file.size)}</p>
                                    </div>
                                  </div>
                                  <Button
                                    onClick={() => removeAttachment(index)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-400 hover:text-red-300"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3 pt-4">
                          <Button
                            onClick={() => {
                              setActiveTab('my-notes');
                              setEditingNote(null);
                              setNewNote({ title: '', content: '', subject: '', tags: [] });
                            }}
                            variant="outline"
                            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={editingNote ? handleUpdateNote : handleCreateNote}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            disabled={!newNote.title.trim() || !newNote.content.trim()}
                          >
                            {editingNote ? 'Update Note' : 'Create Note'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
      
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt,.pdf,.doc,.docx,.md,.ppt,.pptx"
        onChange={handleFileUpload}
        className="hidden"
        title="Upload files"
        aria-label="Upload files"
      />
      <input
        ref={imageInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        title="Upload images"
        aria-label="Upload images"
      />
    </SidebarProvider>
  );
} 
