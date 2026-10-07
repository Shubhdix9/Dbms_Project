'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, FileText, User, Home, Clock, CheckCircle, XCircle, CalendarDays, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { STUDENTS, PROPERTIES } from '@/lib/data';

const MOCK_LEASES = [
  {
    id: 'LSE-1001',
    studentId: 's1',
    propertyId: 'p7',
    startDate: 'Aug 01, 2025',
    endDate: 'Jul 31, 2026',
    monthlyRent: 15200,
    status: 'Active',
    documentSigned: true
  },
  {
    id: 'LSE-1002',
    studentId: 's2',
    propertyId: 'p6',
    startDate: 'Sep 15, 2025',
    endDate: 'Sep 14, 2026',
    monthlyRent: 12000,
    status: 'Active',
    documentSigned: true
  },
  {
    id: 'LSE-1003',
    studentId: 's3',
    propertyId: 'p1',
    startDate: 'Nov 01, 2025',
    endDate: 'Oct 31, 2026',
    monthlyRent: 18000,
    status: 'Pending Signature',
    documentSigned: false
  },
  {
    id: 'LSE-1004',
    studentId: 's4',
    propertyId: 'p7',
    startDate: 'Jan 01, 2025',
    endDate: 'Dec 31, 2025',
    monthlyRent: 15000,
    status: 'Expired',
    documentSigned: true
  }
];

export default function AdminLeasesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Enhance leases with actual student and property details
  const enhancedLeases = MOCK_LEASES.map(lease => {
    const student = STUDENTS.find(s => s.id === lease.studentId);
    const property = PROPERTIES.find(p => p.id === lease.propertyId);
    return { ...lease, student, property };
  });

  const filteredLeases = enhancedLeases.filter(lease => 
    lease.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lease.property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lease.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={12} /> Active
          </span>
        );
      case 'Pending Signature':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> Pending Signature
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gray-100 text-gray-700 border border-gray-200">
            <XCircle size={12} /> Expired
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Lease Management</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Manage all active, pending, and past property lease agreements.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <button className="bg-white border-2 border-border p-2.5 rounded-xl text-gray-600 hover:border-gray-400 transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b-2 border-border">
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Lease ID</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Tenant</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Property Details</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Duration</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Monthly Rent</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredLeases.map((lease) => (
                <tr key={lease.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-extrabold text-gray-900">{lease.id}</span>
                    <span className="text-xs font-bold text-gray-500 block mt-1 flex items-center gap-1">
                      <FileText size={12} /> {lease.documentSigned ? 'Signed' : 'Not Signed'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {lease.student?.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-900 text-sm block">{lease.student?.name}</span>
                        <span className="text-xs font-bold text-gray-500">{lease.student?.course}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-bold text-gray-700">
                      <Home size={14} className="mr-1.5 text-gray-400 shrink-0" />
                      <Link href={`/student/property/${lease.property?.id}`} className="hover:text-primary-blue transition-colors line-clamp-1">
                        {lease.property?.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm font-bold text-gray-700">
                      <span className="flex items-center text-xs"><CalendarDays size={14} className="mr-1.5 text-gray-400" /> {lease.startDate}</span>
                      <span className="text-gray-400 text-[10px] text-center w-full block">to</span>
                      <span className="flex items-center text-xs"><CalendarDays size={14} className="mr-1.5 text-gray-400" /> {lease.endDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center font-extrabold text-gray-900 text-sm">
                      <IndianRupee size={14} className="mr-0.5 text-gray-500" /> {lease.monthlyRent.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(lease.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredLeases.length === 0 && (
            <div className="text-center py-12">
              <FileText size={32} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-extrabold text-gray-900">No leases found</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
