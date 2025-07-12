'use client';
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
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
  Share2,
  Users,
  TrendingUp,
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
    title: "Publish Notes",
    icon: FileText,
    href: "/publish-notes",
    active: true,
  },
];

export default function PublishNotes() {
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
                  <h1 className="text-3xl font-semibold text-white mb-2">Publish Notes</h1>
                  <p className="text-gray-400">Share your knowledge with the community</p>
                </div>

                {/* Coming Soon Content */}
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 max-w-2xl w-full">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                        <Share2 className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                      We&apos;re working on an amazing publishing platform where you can share your notes, 
                      collaborate with other students, and build a community around learning.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center">
                        <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                        <h3 className="text-white font-medium mb-1">Community</h3>
                        <p className="text-gray-500 text-sm">Connect with learners worldwide</p>
                      </div>
                      <div className="text-center">
                        <Share2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <h3 className="text-white font-medium mb-1">Share</h3>
                        <p className="text-gray-500 text-sm">Publish your best notes</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <h3 className="text-white font-medium mb-1">Grow</h3>
                        <p className="text-gray-500 text-sm">Build your reputation</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <p className="text-gray-300 text-sm">
                        <strong>What to expect:</strong> A platform to publish your notes, get feedback from peers, 
                        and discover high-quality study materials from students around the world.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 