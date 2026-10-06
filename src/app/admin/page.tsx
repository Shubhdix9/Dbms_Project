'use client';

import { Users, Building, ShieldAlert, FileText, IndianRupee } from 'lucide-react';
import { PROPERTIES, STUDENTS, MATCHES, LEASES } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Command Centre</h1>
        <p className="text-gray-500">Monitor and manage platform activity and verification workflows.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Total Students', value: STUDENTS.length, icon: Users, color: 'text-blue-600' },
          { label: 'Platform Properties', value: PROPERTIES.length, icon: Building, color: 'text-purple-600' },
          { label: 'Pending Verifications', value: PROPERTIES.filter(p => !p.verifiedByUniNest).length, icon: ShieldAlert, color: 'text-red-500' },
          { label: 'Active Leases', value: LEASES.length, icon: FileText, color: 'text-emerald-600' },
          { label: 'Total Matches', value: MATCHES.length, icon: IndianRupee, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
             <ShieldAlert size={18} className="text-red-500 mr-2" />
             Verification Queue
          </h2>
          <div className="space-y-4">
            {PROPERTIES.filter(p => !p.verifiedByUniNest).slice(0, 3).map(property => (
              <div key={property.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-900">{property.title}</p>
                  <p className="text-sm text-gray-500">{property.source} • {property.checkedAt}</p>
                </div>
                <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium text-gray-700 hover:text-red-600 rounded-lg transition-colors shadow-sm">
                  Review
                </button>
              </div>
            ))}
          </div>
          <Link href="/admin/verification" className="text-sm text-blue-600 hover:underline mt-4 inline-block font-medium">
            View all pending items →
          </Link>
        </div>
        
        <div className="bg-gray-900 text-white p-6 rounded-2xl border border-gray-800 shadow-sm relative overflow-hidden">
           <div className="relative z-10">
             <h2 className="text-lg font-bold mb-4">DBMS Logic Monitor</h2>
             <div className="space-y-3 font-mono text-sm opacity-80">
               <p>SELECT * FROM Properties WHERE verified = false;</p>
               <p className="text-emerald-400">-- 4 rows returned</p>
               <p className="mt-2">SELECT AVG(rent) FROM Properties;</p>
               <p className="text-emerald-400">-- ₹ 18,340</p>
             </div>
           </div>
           
           <div className="absolute right-0 bottom-0 text-[120px] font-bold text-gray-800 opacity-20 pointer-events-none leading-none transform translate-x-4 translate-y-8">
             SQL
           </div>
        </div>
      </div>
    </div>
  );
}
