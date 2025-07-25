'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Settings,
  BookOpen,
  HelpCircle,
  Upload,
  FileText,
  LogOut,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Menu items configuration
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

interface DashboardLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
}

export default function DashboardLayout({ children, fullScreen = false }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

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
      await logout();
      // Redirect to auth page after successful logout
      router.push('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <SidebarProvider>
      {fullScreen && (
        <style dangerouslySetInnerHTML={{
          __html: `
            [data-slot="sidebar-inset"] {
              margin: 0 !important;
              padding: 0 !important;
              max-width: none !important;
              width: 100% !important;
              min-width: 100% !important;
            }
            [data-slot="sidebar-inset"] > div {
              width: 100% !important;
              max-width: none !important;
            }
          `
        }} />
      )}
      <div className="flex h-screen bg-black text-white">
        <Sidebar className="bg-black border-r border-gray-800" variant="inset" data-variant="sidebar">
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
        
        <SidebarInset 
          className={`flex-1 bg-black ${fullScreen ? '!m-0 !p-0 !rounded-none !shadow-none !max-w-none !w-full' : ''}`}
          style={fullScreen ? { 
            margin: 0, 
            padding: 0, 
            maxWidth: 'none', 
            width: '100%',
            minWidth: '100%'
          } : {}}
          data-variant="sidebar"
        >
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
              
              {/* Main Content Container - Full width */}
              <div 
                className={`flex-1 w-full ${fullScreen ? '!p-0 !max-w-none' : 'px-6 py-8'}`}
                style={fullScreen ? { 
                  padding: 0, 
                  maxWidth: 'none', 
                  width: '100%',
                  minWidth: '100%'
                } : {}}
              >
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 