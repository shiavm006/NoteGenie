'use client';

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
import { useAuth } from '@/hooks/use-auth';
import ClientOnly from '@/components/ui/client-only';

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
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  // Get user initials for avatar fallback
  const getUserInitials = (displayName: string | null | undefined) => {
    if (!displayName) return 'U';
    return displayName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-black text-white">
        <Sidebar className="bg-black border-r border-gray-800">
          <SidebarHeader className="p-4 border-b border-gray-800">
            <ClientOnly fallback={
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                    U
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium text-sm">User</p>
                  <p className="text-gray-400 text-xs">Pro Plan</p>
                </div>
              </div>
            }>
              <div className="flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.photoURL || undefined} alt={user?.displayName || 'User'} />
                  <AvatarFallback className="bg-blue-600 text-white font-bold text-sm">
                    {getUserInitials(user?.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium text-sm">{user?.displayName || 'User'}</p>
                  <p className="text-gray-400 text-xs">Pro Plan</p>
                </div>
              </div>
            </ClientOnly>
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
        
        <SidebarInset className="flex-1 bg-black">
          <div className="h-full overflow-y-auto">
            <div className="min-h-full flex flex-col">
              {/* Main Content Container - Full width */}
              <div className="flex-1 w-full px-6 py-8">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
} 