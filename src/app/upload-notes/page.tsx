'use client';

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {
  FileText,
  Edit,
  Trash2,
  Eye,
  Share2,
  Plus,
  X,
  Paperclip,
  Globe,
  Download,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  attachments: File[];
  author: string;
  views: number;
  downloads: number;
}

export default function UploadNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'edit' | 'published'>('create');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [newTag, setNewTag] = useState('');
  const { user } = useAuth();

  // Form state for creating/editing notes
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    tags: [] as string[],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleCreateNote = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: formData.title,
      content: formData.content,
      subject: formData.subject,
      tags: formData.tags,
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      attachments: [...attachments],
      author: getUserDisplayName(),
      views: 0,
      downloads: 0,
    };

    setNotes(prev => [newNote, ...prev]);
    resetForm();
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject,
      tags: note.tags,
    });
    setAttachments([...note.attachments]);
    setActiveTab('edit');
  };

  const handleUpdateNote = () => {
    if (!editingNote || !formData.title.trim() || !formData.content.trim()) return;

    const updatedNote: Note = {
      ...editingNote,
      title: formData.title,
      content: formData.content,
      subject: formData.subject,
      tags: formData.tags,
      updatedAt: new Date(),
      attachments: [...attachments],
    };

    setNotes(prev => prev.map(note => 
      note.id === editingNote.id ? updatedNote : note
    ));
    resetForm();
    setEditingNote(null);
    setActiveTab('create');
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId));
    if (editingNote?.id === noteId) {
      resetForm();
      setEditingNote(null);
      setActiveTab('create');
    }
  };

  const handlePublishNote = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isPublished: true } : note
    ));
  };

  const handleUnpublishNote = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isPublished: false } : note
    ));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      subject: '',
      tags: [],
    });
    setAttachments([]);
    setNewTag('');
  };

  const publishedNotes = notes.filter(note => note.isPublished);
  const unpublishedNotes = notes.filter(note => !note.isPublished);

  return (
    <DashboardLayout fullScreen>
      {/* Header */}
      <div className="border-b border-gray-800 p-6 md:p-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">Upload Notes</h1>
            <p className="text-gray-400 text-sm md:text-base">Create, manage, and publish your study notes</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('create')}
              className={`${activeTab === 'create' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-700 text-gray-300 hover:bg-gray-800'} text-sm`}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Create Note</span>
              <span className="sm:hidden">Create</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('edit')}
              className={`${activeTab === 'edit' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-700 text-gray-300 hover:bg-gray-800'} text-sm`}
            >
              <Edit className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Edit Notes</span>
              <span className="sm:hidden">Edit</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('published')}
              className={`${activeTab === 'published' ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-700 text-gray-300 hover:bg-gray-800'} text-sm`}
            >
              <Globe className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Published</span>
              <span className="sm:hidden">Published</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full h-full" style={{ width: '100%', maxWidth: 'none' }}>
        {activeTab === 'create' && (
          <div className="w-full h-full flex flex-col" style={{ width: '100%', maxWidth: 'none' }}>
            <div className="p-6 md:p-8 w-full h-full flex flex-col" style={{ width: '100%', maxWidth: 'none' }}>
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">Create New Note</h2>
                <p className="text-gray-400 text-sm md:text-base">Write and organize your study materials</p>
              </div>
              <div className="space-y-6" style={{ width: '100%' }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full" style={{ width: '100%' }}>
                  <div style={{ width: '100%' }}>
                    <Label htmlFor="title" className="text-white text-sm font-medium mb-2 block">
                      Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter note title"
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-sm w-full focus:border-blue-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ width: '100%' }}>
                    <Label htmlFor="subject" className="text-white text-sm font-medium mb-2 block">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="e.g., Mathematics, Physics"
                      className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-sm w-full focus:border-blue-500"
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <Label htmlFor="content" className="text-white text-sm font-medium mb-2 block">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your note content here..."
                    rows={8}
                    className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-sm w-full focus:border-blue-500 resize-none"
                    style={{ width: '100%' }}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <Label className="text-white text-sm font-medium mb-2 block">
                    Tags
                  </Label>
                  <div className="mt-2 flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 hover:text-red-300"
                          title={`Remove ${tag} tag`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-500 text-sm w-full focus:border-blue-500"
                      style={{ width: '100%' }}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button 
                      onClick={addTag} 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2"
                    >
                      Add
                    </Button>
                  </div>
                </div>

                <div style={{ width: '100%' }}>
                  <Label className="text-white text-sm font-medium mb-2 block">
                    Attachments
                  </Label>
                  <div className="mt-2">
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 text-sm"
                    >
                      <Paperclip className="w-4 h-4 mr-2" />
                      Add Files
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      title="Upload files"
                    />
                  </div>
                  {attachments.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded border border-gray-700">
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-sm truncate">{file.name}</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(index)}
                            className="text-gray-400 hover:text-red-400 ml-2"
                            title={`Remove ${file.name}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-800">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 text-sm"
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={handleCreateNote}
                    disabled={!formData.title.trim() || !formData.content.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Note
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edit' && (
          <div className="space-y-6 w-full h-full p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <h2 className="text-xl md:text-2xl font-semibold text-white">My Notes</h2>
              <Button
                onClick={() => setActiveTab('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>

            {unpublishedNotes.length === 0 ? (
              <div className="bg-gray-900/30 border border-gray-800 text-center p-8 w-full h-full rounded">
                <FileText className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2 text-lg">No notes yet</h3>
                <p className="text-gray-400 mb-6 text-sm">Create your first note to get started</p>
                <Button
                  onClick={() => setActiveTab('create')}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
                {unpublishedNotes.map((note) => (
                  <div key={note.id} className="bg-gray-900/30 border border-gray-800 p-6 hover:bg-gray-900/50 transition-colors w-full h-full rounded">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-lg font-medium truncate">{note.title}</h3>
                        <p className="text-gray-400 text-sm truncate">{note.subject}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditNote(note)}
                          className="border-gray-700 text-gray-300 hover:bg-gray-800 p-1"
                          title="Edit note"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteNote(note.id)}
                          className="border-gray-700 text-red-400 hover:bg-red-900/20 p-1"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {note.content}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Created {note.createdAt.toLocaleDateString()}</span>
                      <span>{note.attachments.length} attachments</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        onClick={() => handlePublishNote(note.id)}
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Publish
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'published' && (
          <div className="space-y-6 w-full h-full p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-white">Published Notes</h2>
            </div>

            {publishedNotes.length === 0 ? (
              <div className="bg-gray-900/30 border border-gray-800 text-center p-8 w-full h-full rounded">
                <Globe className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white font-medium mb-2 text-lg">No published notes</h3>
                <p className="text-gray-400 mb-6 text-sm">Publish your notes to share them with the community</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full h-full">
                {publishedNotes.map((note) => (
                  <div key={note.id} className="bg-gray-900/30 border border-gray-800 p-6 hover:bg-gray-900/50 transition-colors w-full h-full rounded">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-lg font-medium truncate">{note.title}</h3>
                        <p className="text-gray-400 text-sm truncate">{note.subject}</p>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleUnpublishNote(note.id)}
                          className="border-gray-700 text-yellow-400 hover:bg-yellow-900/20 p-1"
                          title="Unpublish note"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {note.content}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>Published {note.updatedAt.toLocaleDateString()}</span>
                      <span>{note.attachments.length} attachments</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {note.views} views
                      </span>
                      <span className="flex items-center">
                        <Download className="w-3 h-3 mr-1" />
                        {note.downloads} downloads
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 
