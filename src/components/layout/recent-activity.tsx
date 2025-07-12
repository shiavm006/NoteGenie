import { BookOpen, FileText, Users, Download, Heart, Clock } from 'lucide-react';
import Link from 'next/link';

interface Activity {
  id: string;
  type: 'book_added' | 'note_uploaded' | 'note_downloaded' | 'note_liked' | 'community_joined';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  link?: string;
}

interface RecentActivityProps {
  activities?: Activity[];
  showEmpty?: boolean;
}

const defaultActivities: Activity[] = [
  {
    id: '1',
    type: 'community_joined',
    title: 'Welcome to Note-Ginie!',
    description: 'You joined the community. Start exploring and sharing knowledge.',
    timestamp: 'Just now',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    link: '/publish-notes'
  }
];

export default function RecentActivity({ activities = defaultActivities, showEmpty = false }: RecentActivityProps) {
  if (activities.length === 0 && showEmpty) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-white font-medium mb-2">No recent activity</h3>
          <p className="text-gray-400 mb-4">Start your learning journey to see your progress here</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/search-books" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm">
              Search Books
            </Link>
            <Link href="/upload-notes" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm">
              Upload Notes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 group">
            <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium truncate">{activity.title}</h4>
                <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{activity.timestamp}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{activity.description}</p>
              
              {activity.link && (
                <Link 
                  href={activity.link}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm mt-2 group-hover:underline"
                >
                  View details →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {activities.length > 3 && (
        <div className="mt-4 pt-4 border-t border-gray-800">
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
            View all activity →
          </button>
        </div>
      )}
    </div>
  );
} 