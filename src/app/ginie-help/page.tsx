'use client';

import { useState, useRef, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import {
  Paperclip,
  Image,
  Bot,
  User,
  Copy,
  FileText,
  LogOut,
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  Users,
} from "lucide-react";
import { useAuth } from '@/hooks/use-auth';
import DashboardLayout from '@/components/layout/dashboard-layout';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

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
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Get user initials for avatar fallback
  const getUserInitials = (displayName: string | null | undefined) => {
    if (!displayName) return 'U';
    return displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return 'Guest';
    return user.displayName || user.email?.split('@')[0] || 'User';
  };

  const handleLogout = async () => {
    try {
      // The original code had logout() here, but useAuth is removed.
      // Assuming this function is no longer needed or will be re-added elsewhere.
      // For now, removing the call as per the new_code.
      // await logout(); 
      // Redirect to auth page after successful logout
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
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
    setInputMessage('');
    setAttachments([]);
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          attachments: attachments.map(file => ({
            name: file.name,
            type: file.type.startsWith('image/') ? 'image' : 'file',
            size: file.size,
          })),
          conversationHistory: messages.slice(-5), // Send last 5 messages for context
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
        };

        setMessages([...updatedMessages, aiMessage]);
      } else {
        // Handle API error
        let errorContent = 'Sorry, I encountered an error. Please try again.';
        
        if (data.error === 'Gemini API key not configured') {
          errorContent = 'AI features are not configured. Please set up your Gemini API key in the environment variables.';
          setApiKeyConfigured(false);
        } else if (data.error) {
          errorContent = `Sorry, I encountered an error: ${data.error}. Please try again.`;
        }

        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: errorContent,
          timestamp: new Date(),
        };

        setMessages([...updatedMessages, errorMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Handle network error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered a network error. Please check your connection and try again.',
        timestamp: new Date(),
      };

      setMessages([...updatedMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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

  const menuItems = [
    { title: 'General', href: '/general', icon: Settings },
    { title: 'Search Books', href: '/search-books', icon: BookOpen },
    { title: 'Ginie Help', href: '/ginie-help', icon: HelpCircle },
    { title: 'Upload Notes', href: '/upload-notes', icon: Upload },
    { title: 'Community Notes', href: '/publish-notes', icon: Users },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-1 w-full min-w-0 bg-black text-white">
        <Sidebar className="bg-black border-r border-gray-800">
          <SidebarHeader className="p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user?.photoURL || undefined} alt={getUserDisplayName()} />
                <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                  {getUserInitials(user?.displayName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-medium text-sm">{getUserDisplayName()}</p>
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
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white hover:bg-red-800 transition-all duration-200 w-full px-3 py-2 rounded-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-normal text-sm">Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 bg-black">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col">
              {/* Mobile Header with Sidebar Trigger */}
              <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user?.photoURL || undefined} alt={getUserDisplayName()} />
                    <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                      {getUserInitials(user?.displayName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium text-sm">{getUserDisplayName()}</p>
                    <p className="text-gray-400 text-xs">Pro Plan</p>
                  </div>
                </div>
                <SidebarTrigger className="md:hidden" />
              </div>
              
              {/* Chat Content - Full Height */}
              <div className="flex-1 flex flex-col">
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto">
                  {messages.length === 0 ? (
                    /* Welcome Screen - Centered */
                    <div className="h-full flex items-center justify-center px-8">
                      <div className="text-center w-full max-w-4xl">
                        {/* Hero Section */}
                        <div className="mb-12">
                          <div className="w-16 h-16 border border-gray-700 rounded-lg flex items-center justify-center mx-auto mb-6">
                            <Bot className="w-8 h-8 text-blue-400" />
                          </div>
                          <h1 className="text-4xl font-light text-white mb-4">Welcome to Note Ginie</h1>
                          <p className="text-xl text-gray-400 mb-3">What do you want to explore today?</p>
                          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                            I can help you <span className="text-blue-400">summarise, code, create images</span> & more.
                          </p>
                        </div>
                        
                        {!apiKeyConfigured && (
                          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 max-w-md mx-auto mb-8">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-6 h-6 text-yellow-400">⚠️</div>
                              <p className="text-yellow-300 font-medium">Configuration Required</p>
                            </div>
                            <p className="text-yellow-200 text-sm">
                              AI features require a Gemini API key. Please check the README for setup instructions.
                            </p>
                          </div>
                        )}
                        
                        {/* Conversation Starters */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                          <button
                            onClick={() => setInputMessage("Can you help me create a study schedule for my upcoming exams?")}
                            className="group border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 text-left"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">📅</span>
                              </div>
                              <h3 className="font-medium text-white">Study Planning</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Create effective study schedules and time management strategies</p>
                          </button>
                          
                          <button
                            onClick={() => setInputMessage("I need help understanding calculus concepts. Can you explain derivatives?")}
                            className="group border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 text-left"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">📚</span>
                              </div>
                              <h3 className="font-medium text-white">Subject Help</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Get explanations for complex topics and concepts</p>
                          </button>
                          
                          <button
                            onClick={() => setInputMessage("How can I improve my note-taking skills?")}
                            className="group border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 text-left"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">📝</span>
                              </div>
                              <h3 className="font-medium text-white">Note Taking</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Learn effective note-taking methods and organization</p>
                          </button>
                          
                          <button
                            onClick={() => setInputMessage("Can you help me analyze this document and create a summary?")}
                            className="group border border-gray-800 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 text-left"
                          >
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm">📄</span>
                              </div>
                              <h3 className="font-medium text-white">Document Analysis</h3>
                            </div>
                            <p className="text-gray-400 text-sm">Upload files for AI-powered analysis and summaries</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Chat Messages */
                    <div className="h-full py-6 px-4">
                      <div className="w-full space-y-6">
                        {messages.map((msg) => (
                          <div key={msg.id} className={`flex w-full ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`${msg.type === 'user' ? 'flex flex-1 justify-end ml-1' : 'flex flex-1 justify-start mr-3'}`}>
                              <div className="flex items-start space-x-3">
                                {msg.type === 'ai' && (
                                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Bot className="w-4 h-4 text-white" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className={`p-4 rounded-lg inline-block ${
                                    msg.type === 'user'
                                      ? 'max-w-[90%] bg-blue-600 text-white'
                                      : 'max-w-[80%] bg-gray-900/30 border border-gray-800 text-white'
                                  }`}>
                                    {msg.attachments && msg.attachments.length > 0 && (
                                      <div className="mb-3 space-y-2">
                                        {msg.attachments.map((attachment, index) => (
                                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-800/50 rounded border border-gray-700">
                                            {attachment.type === 'image' ? (
                                              <Image className="w-4 h-4 text-blue-400" />
                                            ) : (
                                              <FileText className="w-4 h-4 text-green-400" />
                                            )}
                                            <span className="text-sm text-gray-300">{attachment.name}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                  </div>
                                  <div className="flex items-center justify-between mt-2 w-max">
                                    <span className="text-xs text-gray-400">
                                      {msg.timestamp.toLocaleTimeString()}
                                    </span>
                                    <button
                                      onClick={() => copyMessage(msg.content)}
                                      title="Copy message"
                                      className="p-1 hover:bg-gray-800 rounded transition-colors"
                                    >
                                      <Copy className="w-3 h-3 text-gray-400 hover:text-white" />
                                    </button>
                                  </div>
                                </div>
                                {msg.type === 'user' && (
                                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <User className="w-4 h-4 text-white" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {isLoading && (
                          <div className="flex w-full justify-start">
                            <div className="mr-3">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                  <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-gray-900/30 border border-gray-800 p-4 rounded-lg">
                                  <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
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
                <div className="border-t border-gray-800 py-6 px-4">
                  <div className="w-full">
                    {/* Attachments Preview */}
                    {attachments.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center space-x-2 bg-gray-900/30 border border-gray-800 px-3 py-2 rounded-lg">
                            {file.type.startsWith('image/') ? (
                              <Image className="w-4 h-4 text-blue-400" />
                            ) : (
                              <FileText className="w-4 h-4 text-green-400" />
                            )}
                            <span className="text-sm text-gray-300">{file.name}</span>
                            <button
                              onClick={() => removeAttachment(index)}
                              title="Remove attachment"
                              className="p-1 hover:bg-gray-800 rounded transition-colors"
                            >
                              <Copy className="w-3 h-3 text-gray-400 hover:text-red-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input Container */}
                    <div className="relative">
                      <div className="flex items-end bg-gray-900/30 border border-gray-800 rounded-lg p-3">
                        {/* File Upload Buttons */}
                        <div className="flex items-center space-x-1 ml-2">
                          <button
                            onClick={() => imageInputRef.current?.click()}
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
                            title="Upload image"
                          >
                            <Paperclip className="w-5 h-5" />
                          </button>
                        </div>
                        
                        {/* Textarea */}
                        <div className="flex-1 mx-2">
                          <Textarea
                            ref={textareaRef}
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message here..."
                            className="min-h-[44px] max-h-[200px] resize-none bg-transparent border-none focus:ring-0 focus:outline-none text-white placeholder-gray-500"
                            rows={1}
                          />
                        </div>
                        
                        {/* Send Button */}
                        <button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() && attachments.length === 0}
                          title="Send message"
                          className="mr-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                        >
                          Send
                        </button>
                      </div>
                      
                      {/* Disclaimer Text */}
                      <p className="text-center text-xs text-gray-500 mt-3">
                        Note Ginie may make mistakes. Check important info and please report any bugs.
                      </p>
                    </div>

                    {/* Hidden file inputs */}
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
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
} 