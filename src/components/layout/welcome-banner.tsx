import Link from 'next/link';
import { BookOpen, Upload, Users, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WelcomeBannerProps {
  userName?: string;
  isFirstTime?: boolean;
}

export default function WelcomeBanner({ userName = "User", isFirstTime = false }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-teal-600/20 rounded-2xl border border-blue-500/20 p-8 mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)] opacity-40" />
      
      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600">
            <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <Sparkles className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {isFirstTime ? `Welcome to Note-Ginie, ${userName}!` : `Welcome back, ${userName}!`}
            </h2>
            <p className="text-blue-200">
              {isFirstTime 
                ? "Let's get you started on your learning journey" 
                : "Ready to continue your learning adventure?"
              }
            </p>
          </div>
        </div>

        {isFirstTime && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Link href="/search-books" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <BookOpen className="w-8 h-8 text-blue-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Discover Books</h3>
                <p className="text-blue-200 text-sm">Find and add books to your library</p>
                <ArrowRight className="w-4 h-4 text-blue-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/upload-notes" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Upload className="w-8 h-8 text-purple-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Upload Notes</h3>
                <p className="text-blue-200 text-sm">Share your study materials</p>
                <ArrowRight className="w-4 h-4 text-purple-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/publish-notes" className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <Users className="w-8 h-8 text-teal-400 mb-2" />
                <h3 className="text-white font-medium mb-1">Community</h3>
                <p className="text-blue-200 text-sm">Explore shared knowledge</p>
                <ArrowRight className="w-4 h-4 text-teal-400 mt-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 