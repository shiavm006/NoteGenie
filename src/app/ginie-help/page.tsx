'use client';

import React, { useState, useRef, useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import {
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
  Paperclip,
  Image,
  X,
  Bot,
  User,
  Copy,
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
    active: true,
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

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  attachments?: {
    type: 'file' | 'image';
    name: string;
    url: string;
    size?: number;
  }[];
}

export default function GinieHelp() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      attachments: attachments.map(file => ({
        type: file.type.startsWith('image/') ? 'image' : 'file',
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
      })),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setMessage('');
    setAttachments([]);
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual Gemini API call)
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: generateAIResponse(message, attachments),
          timestamp: new Date(),
        };

        setMessages([...updatedMessages, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
    }
  };

  const generateAIResponse = (userMessage: string, files: File[]): string => {
    // This is a mock response - replace with actual Gemini API integration
    const responses = [
      "I'd be happy to help you with that! Based on your message, here are some suggestions for improving your notes...",
      "Great question! Let me analyze your document and provide some insights...",
      "I can help you refine and organize your notes. Here's what I recommend...",
      "Thanks for sharing that with me. I can help you generate comprehensive notes from this content...",
      "I see you've uploaded some files. Let me process them and provide you with structured notes...",
    ];

    if (files.length > 0) {
      return `I've received your ${files.length} file(s). Let me analyze the content and help you create comprehensive notes. Based on the files you've shared, I can help you:\n\n• Extract key information and concepts\n• Create structured summaries\n• Generate study guides\n• Organize the content for better understanding\n\nWould you like me to focus on any specific aspect of the content?`;
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar - Clean without search bar */}
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
        
        {/* Main Chat Area - Full width without black space */}
        <SidebarInset className="flex-1 bg-black">
          <div className="h-full flex flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto">
              {messages.length === 0 ? (
                /* Welcome Screen - Centered */
                <div className="h-full flex items-center justify-center px-8">
                  <div className="text-center max-w-2xl">
                    <h1 className="text-4xl font-bold text-white mb-4">Welcome to Note Ginie</h1>
                    <p className="text-xl text-gray-400 mb-2">What do you want to explore today?</p>
                    <p className="text-lg text-gray-500">
                      I can help you <span className="italic text-gray-400">summarise, code, create images</span> & more.
                    </p>
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <div className="h-full p-6">
                  <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-2xl ${msg.type === 'user' ? 'ml-12' : 'mr-12'}`}>
                          <div className="flex items-start space-x-3">
                            {msg.type === 'ai' && (
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                            )}
                            <div className="flex-1">
                              <div className={`p-4 rounded-lg ${
                                msg.type === 'user' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-gray-800 text-white'
                              }`}>
                                {msg.attachments && msg.attachments.length > 0 && (
                                  <div className="mb-3 space-y-2">
                                    {msg.attachments.map((attachment, index) => (
                                      <div key={index} className="flex items-center space-x-2 p-2 bg-black/20 rounded">
                                        {attachment.type === 'image' ? (
                                          <Image className="w-4 h-4" />
                                        ) : (
                                          <FileText className="w-4 h-4" />
                                        )}
                                        <span className="text-sm">{attachment.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-400">
                                  {msg.timestamp.toLocaleTimeString()}
                                </span>
                                <button
                                  onClick={() => copyMessage(msg.content)}
                                  title="Copy message"
                                  className="p-1 hover:bg-gray-800 rounded transition-colors"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            {msg.type === 'user' && (
                              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-2xl mr-12">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <Bot className="w-4 h-4 text-white" />
                            </div>
                            <div className="bg-gray-800 p-4 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t border-gray-800 p-6 bg-black">
              <div className="max-w-4xl mx-auto">
                {/* Attachments Preview */}
                {attachments.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg">
                        {file.type.startsWith('image/') ? (
                          <Image className="w-4 h-4" />
                        ) : (
                          <FileText className="w-4 h-4" />
                        )}
                        <span className="text-sm">{file.name}</span>
                        <button
                          onClick={() => removeAttachment(index)}
                          title="Remove attachment"
                          className="p-1 hover:bg-gray-700 rounded"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input Container */}
                <div className="relative">
                  <div className="flex items-end bg-gray-900 rounded-2xl border border-gray-700 p-2">
                    {/* File Upload Buttons */}
                    <div className="flex items-center space-x-1 ml-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Upload file"
                      >
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => imageInputRef.current?.click()}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                        title="Upload image"
                      >
                        <Image className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Textarea */}
                    <div className="flex-1 mx-2">
                      <Textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message here."
                        className="min-h-[44px] max-h-[200px] resize-none bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-500"
                        rows={1}
                      />
                    </div>
                    
                    {/* Ask Button */}
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim() && attachments.length === 0}
                      title="Send message"
                      className="mr-2 px-6 py-2 bg-white text-black rounded-xl font-medium hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      Ask
                    </button>
                  </div>
                  
                  {/* Disclaimer Text */}
                  <p className="text-center text-xs text-gray-500 mt-3">
                    Note Ginie may make mistakes. Check important info and please report any bugs.
                  </p>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.pdf,.doc,.docx,.md"
                  onChange={handleFileUpload}
                  title="Upload files"
                  aria-label="Upload files"
                  className="hidden"
                />
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  title="Upload images"
                  aria-label="Upload images"
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 