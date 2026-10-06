'use client';

import { Building, Users, CalendarCheck, Star } from 'lucide-react';
import Link from 'next/link';

export default function LandlordDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Manage your properties with confidence.</h1>
        <p className="text-text-secondary">Overview of your real estate portfolio around JKLU.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Properties', value: '4', icon: Building, color: 'text-blue-600' },
          { label: 'Pending Requests', value: '3', icon: CalendarCheck, color: 'text-orange-500' },
          { label: 'Active Leases', value: '8', icon: Users, color: 'text-green-600' },
          { label: 'Average Rating', value: '4.8', icon: Star, color: 'text-yellow-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-2xl border border-border hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-surface p-6 rounded-2xl border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {/* Mock pending bookings */}
            <div className="flex items-center justify-between p-4 border border-border rounded-xl">
              <div>
                <p className="font-semibold text-foreground">Student A</p>
                <p className="text-sm text-text-secondary">Vardhman Empire Estate - 1 BHK</p>
              </div>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-lg">Pending</span>
            </div>
          </div>
          <Link href="/landlord/bookings" className="text-sm text-blue-600 hover:underline mt-4 inline-block font-medium">
            View all bookings →
          </Link>
        </div>
        
        <div className="bg-surface p-6 rounded-2xl border border-border flex flex-col items-center justify-center text-center">
           <Building size={48} className="text-gray-300 mb-4" />
           <h3 className="text-lg font-bold text-foreground mb-2">Grow your portfolio</h3>
           <p className="text-sm text-text-secondary mb-6 max-w-sm">
             List another property around JKLU and connect with verified students instantly.
           </p>
           <Link href="/landlord/add-property" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-800 transition-colors">
             Add New Property
           </Link>
        </div>
      </div>
    </div>
  );
}
