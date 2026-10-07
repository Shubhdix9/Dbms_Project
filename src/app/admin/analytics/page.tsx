'use client';

import { 
  Users, 
  Building, 
  FileText, 
  IndianRupee, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  MapPin,
  Home
} from 'lucide-react';
import { STUDENTS, PROPERTIES } from '@/lib/data';

export default function AdminAnalyticsPage() {
  
  // Calculate some basic stats
  const totalStudents = STUDENTS.length;
  const totalProperties = PROPERTIES.length;
  
  // Mock data for analytics
  const activeLeases = 24;
  const monthlyRevenue = 450000;
  
  const statCards = [
    { title: 'Total Students', value: totalStudents.toString(), trend: '+12%', isUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Properties Listed', value: totalProperties.toString(), trend: '+5%', isUp: true, icon: Building, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Active Leases', value: activeLeases.toString(), trend: '-2%', isUp: false, icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100' },
    { title: 'Est. Monthly Rent', value: `₹${(monthlyRevenue / 1000).toFixed(1)}k`, trend: '+18%', isUp: true, icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  // Mock data for charts
  const configStats = [
    { name: '1 RK', count: 5, percentage: 15 },
    { name: '1 BHK', count: 12, percentage: 40 },
    { name: '2 BHK', count: 8, percentage: 25 },
    { name: '3 BHK', count: 6, percentage: 20 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analytics Overview</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Track platform growth, property metrics, and student engagement.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="bg-white border-2 border-border px-4 py-2.5 rounded-xl text-sm font-bold focus:outline-none focus:border-red-500 transition-colors cursor-pointer">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-[2rem] p-6 border-2 border-border shadow-sm flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${stat.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </div>
            </div>
            <div className="mt-auto">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.title}</h3>
              <p className="text-4xl font-black text-gray-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Popular Configurations - Bar Chart */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border-2 border-border shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Popular Configurations</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Property types currently listed</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-xl text-gray-500">
              <Home size={20} />
            </div>
          </div>
          
          <div className="space-y-6">
            {configStats.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                  <span className="font-extrabold text-gray-900 text-sm">{item.count} properties</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-primary-blue h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations - List */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 border-2 border-border shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900">Top Locations</h2>
              <p className="text-sm text-gray-500 font-medium mt-1">Most searched areas near JKLU</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-xl text-gray-500">
              <MapPin size={20} />
            </div>
          </div>

          <div className="space-y-5">
            {[
              { name: 'Mahapura', searches: 1245, trend: '+15%' },
              { name: 'Ajmer Road', searches: 856, trend: '+5%' },
              { name: 'Bhankrota', searches: 623, trend: '-2%' },
              { name: 'Mansarovar', searches: 412, trend: '+8%' },
              { name: 'Vaishali Nagar', searches: 389, trend: '-5%' },
            ].map((location, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-surface-light rounded-2xl border border-border transition-colors hover:border-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="font-extrabold text-gray-900 text-sm">{location.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-500">{location.searches.toLocaleString()} searches</span>
                  <span className={`text-xs font-bold w-12 text-right ${location.trend.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                    {location.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  );
}
