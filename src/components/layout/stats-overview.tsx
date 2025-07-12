import { BookOpen, FileText, Users, TrendingUp, Eye, Heart, Star, Clock } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface StatsOverviewProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    label: 'Books in Library',
    value: '0',
    icon: BookOpen,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    change: '+0 this week',
    trend: 'neutral'
  },
  {
    label: 'Notes Uploaded',
    value: '0',
    icon: FileText,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    change: '+0 this week',
    trend: 'neutral'
  },
  {
    label: 'Community Views',
    value: '0',
    icon: Eye,
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/20',
    change: '+0 this week',
    trend: 'neutral'
  },
  {
    label: 'Study Streak',
    value: '0 days',
    icon: Clock,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    change: 'Start today!',
    trend: 'neutral'
  }
];

export default function StatsOverview({ stats = defaultStats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-300 hover:scale-105 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            {stat.trend && (
              <div className={`flex items-center space-x-1 text-xs ${
                stat.trend === 'up' ? 'text-green-400' : 
                stat.trend === 'down' ? 'text-red-400' : 
                'text-gray-400'
              }`}>
                {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {stat.trend === 'down' && <TrendingUp className="w-3 h-3 rotate-180" />}
                <span>{stat.change}</span>
              </div>
            )}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 