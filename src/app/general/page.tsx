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
  User,
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
} from "lucide-react";

// Menu items
const items = [
  {
    title: "General",
    icon: Settings,
    href: "/general",
    active: true,
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
  },
];

export default function General() {
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
                  <h1 className="text-3xl font-semibold text-white mb-2">General</h1>
                  <p className="text-gray-400">Manage your account and preferences</p>
                </div>

                {/* User Info Section */}
                <div className="mb-8">
                  <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">A</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-lg">abhardw7@kent.edu</h3>
                      <p className="text-gray-400 text-sm">Pro Plan • Active</p>
                    </div>
                  </div>
                </div>

                {/* Settings Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <User className="w-5 h-5 text-blue-400" />
                      <h3 className="text-white font-medium">Manage Account</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Update your profile information and account settings</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <Settings className="w-5 h-5 text-green-400" />
                      <h3 className="text-white font-medium">Editor Settings</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Customize your editor preferences and shortcuts</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      <h3 className="text-white font-medium">Keyboard Shortcuts</h3>
                    </div>
                    <p className="text-gray-400 text-sm">View and customize keyboard shortcuts</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <Upload className="w-5 h-5 text-orange-400" />
                      <h3 className="text-white font-medium">Import Settings</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Import settings from other editors</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <FileText className="w-5 h-5 text-red-400" />
                      <h3 className="text-white font-medium">Reset Dialogs</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Reset all dialog preferences</p>
                  </div>

                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <HelpCircle className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-white font-medium">Data Sharing</h3>
                    </div>
                    <p className="text-gray-400 text-sm">Manage your data sharing preferences</p>
                  </div>
                </div>

                {/* Library Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">Your Library</h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 text-center">
                    <BookOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-white font-medium mb-2">No books in your library yet</h3>
                    <p className="text-gray-400 mb-4">Start building your collection by searching for books</p>
                    <Link href="/search-books" className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                      Search Books
                    </Link>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-4">Recent Activity</h2>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No recent activity</p>
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