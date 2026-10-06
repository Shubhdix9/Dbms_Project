'use client';

import { Building, Users, CalendarCheck, Star, ArrowRight, TrendingUp, DollarSign, Home } from 'lucide-react';
import Link from 'next/link';
import { PROPERTIES, STUDENTS } from '@/lib/data';

export default function LandlordDashboard() {
  const activeProperties = PROPERTIES.slice(0, 4); // Mock data for the dashboard
  const pendingBookings = [
    { id: 1, student: STUDENTS[0], property: PROPERTIES[1], date: 'Oct 8, 10:00 AM' },
    { id: 2, student: STUDENTS[2], property: PROPERTIES[2], date: 'Oct 8, 2:30 PM' },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      {/* Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-light-orange text-primary-orange px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
                Dashboard
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Welcome back, Landlord!</h1>
            <p className="text-white/70 text-lg font-medium max-w-xl">You have <strong className="text-white">2 pending viewing requests</strong> and <strong className="text-white">1 payment overdue</strong>.</p>
          </div>
          
          <Link href="/landlord/add-property" className="px-6 py-3.5 bg-primary-orange text-white font-extrabold rounded-xl shadow-lg hover:bg-orange-600 transition-colors flex items-center group">
             List New Property <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Portfolio', value: '4 Properties', icon: Building, trend: '+1 this month' },
          { label: 'Active Leases', value: '8 Tenants', icon: Users, trend: '95% occupancy' },
          { label: 'Monthly Revenue', value: '₹1.4L', icon: DollarSign, trend: '+12% vs last month' },
          { label: 'Average Rating', value: '4.8 / 5', icon: Star, trend: 'Top 10% in Mahapura' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-border shadow-sm flex flex-col justify-between group hover:border-primary-orange transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-light flex items-center justify-center text-primary-blue group-hover:bg-light-orange group-hover:text-primary-orange transition-colors">
                 <stat.icon size={24} />
              </div>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div>
               <div className="text-3xl font-black text-foreground mb-1">{stat.value}</div>
               <div className="text-sm font-extrabold text-text-secondary uppercase tracking-wider">{stat.label}</div>
               <div className="text-xs font-bold text-green-600 mt-2">{stat.trend}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Recent Bookings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border-2 border-border shadow-sm h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold text-primary-blue">Viewing Requests</h2>
              <Link href="/landlord/bookings" className="text-xs font-bold text-primary-orange hover:underline">View All</Link>
            </div>
            
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div key={booking.id} className="p-4 bg-surface-light rounded-2xl border border-transparent hover:border-border transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm">
                        {booking.student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-primary-blue text-sm">{booking.student.name}</p>
                        <p className="text-[10px] font-bold text-text-secondary uppercase">{booking.student.course}</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-600 text-[10px] font-extrabold rounded uppercase tracking-wider">Pending</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-border">
                     <p className="text-xs font-bold text-foreground mb-1">{booking.property.title}</p>
                     <p className="text-xs font-bold text-text-secondary flex items-center"><CalendarCheck size={12} className="mr-1 text-primary-orange"/> {booking.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Properties Overview */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white p-8 rounded-[2rem] border-2 border-border shadow-sm">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-extrabold text-primary-blue">Quick Portfolio</h2>
                 <Link href="/landlord/properties" className="text-xs font-bold text-primary-orange hover:underline">Manage Portfolio</Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {activeProperties.map(property => (
                    <Link href={`/student/property/${property.id}`} key={property.id} className="flex gap-4 p-4 bg-surface-light rounded-2xl hover:bg-white border border-transparent hover:border-border transition-all shadow-sm group">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="font-extrabold text-sm text-foreground line-clamp-1">{property.title}</h4>
                        <p className="text-xs font-bold text-text-secondary mt-0.5 flex items-center"><Home size={12} className="mr-1"/> {property.configuration}</p>
                        <p className="text-primary-blue font-black text-sm mt-2">₹{property.rent.toLocaleString()}/mo</p>
                      </div>
                    </Link>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
