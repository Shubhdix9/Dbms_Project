'use client';

import { Users, Building, ShieldAlert, FileText, IndianRupee, Database, Activity, ShieldCheck } from 'lucide-react';
import { PROPERTIES, STUDENTS, MATCHES, LEASES } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  const pendingProps = PROPERTIES.filter(p => !p.verifiedByUniNest);

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      {/* Header Hero */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border border-red-500/30">
                Command Centre
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">System Overview</h1>
            <p className="text-gray-400 text-lg font-medium max-w-xl">Monitor platform activity, <strong className="text-red-400">verification workflows</strong>, and database integrity.</p>
          </div>
          
          <div className="flex items-center bg-black/40 border border-gray-800 rounded-2xl p-4 shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
               <div>
                  <div className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">System Status</div>
                  <div className="text-green-400 font-bold text-sm">All Services Online</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Students', value: STUDENTS.length, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Platform Properties', value: PROPERTIES.length, icon: Building, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Pending Verifications', value: pendingProps.length, icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-500/10' },
          { label: 'Active Leases', value: LEASES.length, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Total Matches', value: MATCHES.length, icon: IndianRupee, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border-2 border-border shadow-sm flex flex-col justify-between group hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} transition-colors`}>
                 <stat.icon size={24} />
              </div>
            </div>
            <div>
               <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
               <div className="text-[11px] font-extrabold text-text-secondary uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Verification Queue */}
        <div className="bg-white p-8 rounded-[2rem] border-2 border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-extrabold text-gray-900 flex items-center">
               <ShieldAlert size={20} className="text-red-500 mr-2" />
               Verification Queue
             </h2>
             <Link href="/admin/verification" className="text-xs font-bold text-red-500 hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {pendingProps.slice(0, 3).map(property => (
              <div key={property.id} className="flex items-center justify-between p-4 bg-surface-light border border-border rounded-2xl hover:border-gray-300 transition-colors">
                <div>
                  <p className="font-extrabold text-gray-900 text-sm">{property.title}</p>
                  <p className="text-[10px] font-bold text-text-secondary uppercase mt-0.5">{property.source} • {property.checkedAt}</p>
                </div>
                <button className="px-4 py-2 bg-white border border-border text-xs font-extrabold text-gray-900 hover:text-red-600 hover:border-red-200 rounded-xl transition-colors shadow-sm">
                  Review
                </button>
              </div>
            ))}
            
            {pendingProps.length === 0 && (
              <div className="p-8 text-center border-2 border-dashed border-border rounded-2xl">
                 <ShieldCheck size={32} className="mx-auto text-green-500 mb-2" />
                 <p className="text-sm font-bold text-gray-500">Queue is clear! All caught up.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* DBMS Logic Monitor */}
        <div className="bg-gray-900 text-gray-300 p-8 rounded-[2rem] border-2 border-gray-800 shadow-xl relative overflow-hidden flex flex-col">
           <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
             <Database size={160} />
           </div>
           
           <div className="relative z-10 flex-1">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-blue-400 border border-gray-700">
                  <Activity size={20} />
                </div>
                <h2 className="text-xl font-extrabold text-white">DBMS Logic Monitor</h2>
             </div>
             
             <div className="space-y-4 font-mono text-xs bg-black/50 p-6 rounded-2xl border border-gray-800 shadow-inner overflow-x-auto">
               <div>
                 <p className="text-blue-400 font-bold mb-1">query_01 &gt;</p>
                 <p className="text-gray-300">SELECT * FROM Properties WHERE verified = false;</p>
                 <p className="text-emerald-400 mt-1">-- {pendingProps.length} rows returned in 12ms</p>
               </div>
               
               <div className="pt-4 border-t border-gray-800/50">
                 <p className="text-blue-400 font-bold mb-1">query_02 &gt;</p>
                 <p className="text-gray-300">SELECT AVG(rent) FROM Properties;</p>
                 <p className="text-emerald-400 mt-1">-- ₹ 18,340 returned in 8ms</p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
