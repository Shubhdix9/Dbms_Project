'use client';

import { MapPin, Calendar, CreditCard, Heart, Home, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import Link from 'next/link';
import { PROPERTIES } from '@/lib/data';

export default function StudentOverview() {
  const currentLease = PROPERTIES[0]; // Just mock data
  const savedProperties = [PROPERTIES[1], PROPERTIES[2]];

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
                JKLU Student
              </div>
              <div className="flex items-center text-white/80 text-sm font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <ShieldCheck size={14} className="mr-1.5 text-green-400" /> Verified
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Welcome back, shivam!</h1>
            <p className="text-white/70 text-lg font-medium max-w-xl">You have <strong className="text-white">1 pending viewing</strong> and your rent is due in <strong className="text-white">12 days</strong>.</p>
          </div>
          
          <Link href="/student/explore" className="px-6 py-3.5 bg-primary-orange text-white font-extrabold rounded-xl shadow-lg hover:bg-orange-600 transition-colors flex items-center group">
             Find New Housing <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Current Lease */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] p-8 border-2 border-border shadow-xl relative overflow-hidden">
             
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-primary-blue flex items-center">
                  <Home className="mr-3 text-primary-orange" size={24}/> Current Lease
                </h2>
                <span className="px-4 py-1.5 bg-green-50 text-green-600 font-extrabold text-xs uppercase tracking-wider rounded-lg border border-green-200">Active</span>
             </div>

             <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden shrink-0 shadow-inner">
                  <img src={currentLease.imageUrl} alt={currentLease.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-foreground mb-1">{currentLease.title}</h3>
                    <p className="text-text-secondary text-sm font-bold flex items-center mb-4">
                      <MapPin size={14} className="mr-1" /> {currentLease.location}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-surface-light p-3 rounded-xl border border-border">
                        <p className="text-[10px] uppercase font-extrabold text-text-secondary mb-1 tracking-wider">Next Payment</p>
                        <p className="text-primary-blue font-black text-lg">₹{currentLease.rent.toLocaleString()}</p>
                     </div>
                     <div className="bg-surface-light p-3 rounded-xl border border-border">
                        <p className="text-[10px] uppercase font-extrabold text-text-secondary mb-1 tracking-wider">Due Date</p>
                        <p className="text-foreground font-black text-lg flex items-center">
                          <Calendar size={16} className="mr-1.5 text-primary-orange" /> Oct 19
                        </p>
                     </div>
                  </div>
                </div>
             </div>

             <div className="mt-6 pt-6 border-t border-border flex gap-4">
                <Link href="/student/lease" className="flex-1 py-3 bg-white text-primary-blue border-2 border-border font-extrabold rounded-xl hover:bg-surface-light transition-colors flex items-center justify-center text-sm shadow-sm">
                  View Full Lease
                </Link>
                <button className="flex-1 py-3 bg-primary-blue text-white font-extrabold rounded-xl shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center text-sm">
                  <CreditCard size={16} className="mr-2" /> Pay Rent
                </button>
             </div>
          </div>

          {/* Upcoming Schedule */}
          <div className="bg-white rounded-[2rem] p-8 border-2 border-border shadow-sm">
             <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">Upcoming Schedule</h2>
             
             <div className="space-y-4">
               <div className="flex items-center p-4 bg-light-orange border border-primary-orange/20 rounded-2xl">
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-orange shadow-sm mr-4 shrink-0 font-black border border-primary-orange/20">
                   14
                 </div>
                 <div className="flex-1">
                   <h4 className="font-extrabold text-primary-blue text-sm">Property Viewing</h4>
                   <p className="text-xs font-bold text-text-secondary mt-0.5">Samanvay The New Door • 10:00 AM</p>
                 </div>
                 <Clock size={20} className="text-primary-orange" />
               </div>
             </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          
          <div className="grid grid-cols-2 gap-4">
             <Link href="/student/saved" className="bg-white p-6 rounded-[2rem] border-2 border-border shadow-sm hover:border-primary-orange hover:shadow-md transition-all group flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-surface-light rounded-full flex items-center justify-center mb-3 group-hover:bg-light-orange transition-colors">
                  <Heart size={20} className="text-text-secondary group-hover:text-primary-orange transition-colors" />
                </div>
                <span className="font-black text-2xl text-primary-blue block">12</span>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">Saved</span>
             </Link>
             
             <Link href="/student/bookings" className="bg-white p-6 rounded-[2rem] border-2 border-border shadow-sm hover:border-primary-orange hover:shadow-md transition-all group flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 bg-surface-light rounded-full flex items-center justify-center mb-3 group-hover:bg-light-orange transition-colors">
                  <Calendar size={20} className="text-text-secondary group-hover:text-primary-orange transition-colors" />
                </div>
                <span className="font-black text-2xl text-primary-blue block">1</span>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest mt-1">Bookings</span>
             </Link>
          </div>

          {/* Quick Saved Properties */}
          <div className="bg-white rounded-[2rem] p-6 border-2 border-border shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-extrabold text-primary-blue">Recently Saved</h2>
               <Link href="/student/saved" className="text-xs font-bold text-primary-orange hover:underline">View All</Link>
             </div>

             <div className="space-y-4">
               {savedProperties.map(prop => (
                 <Link href={`/student/property/${prop.id}`} key={prop.id} className="flex gap-4 p-3 bg-surface-light rounded-xl hover:bg-white border border-transparent hover:border-border transition-all shadow-sm">
                   <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                     <img src={prop.imageUrl} alt={prop.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="flex flex-col justify-center">
                     <h4 className="font-extrabold text-sm text-foreground line-clamp-1">{prop.title}</h4>
                     <p className="text-primary-blue font-black text-xs mt-1">₹{prop.rent.toLocaleString()}</p>
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
