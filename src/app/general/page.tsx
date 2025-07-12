'use client';
import Link from 'next/link';
import { BookOpen, FileText } from "lucide-react";
import DashboardLayout from '@/components/layout/dashboard-layout';
import PageHeader from '@/components/layout/page-header';

export default function General() {
  return (
    <DashboardLayout>
      <PageHeader 
        title="General" 
        description="Manage your account and preferences" 
      />

      {/* User Info Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-lg border border-gray-800">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">Shivam Mittal</h3>
            <p className="text-gray-400 text-sm">Pro Plan • Active</p>
          </div>
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
    </DashboardLayout>
  );
} 