'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, Calendar, User, Home, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { STUDENTS, PROPERTIES } from '@/lib/data';

const MOCK_BOOKINGS = [
  {
    id: 'BKG-001',
    studentId: 's1',
    propertyId: 'p7',
    date: 'Oct 12, 2026',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Visit'
  },
  {
    id: 'BKG-002',
    studentId: 's2',
    propertyId: 'p6',
    date: 'Oct 14, 2026',
    time: '02:30 PM',
    status: 'Pending',
    type: 'Visit'
  },
  {
    id: 'BKG-003',
    studentId: 's3',
    propertyId: 'p1',
    date: 'Oct 15, 2026',
    time: '11:00 AM',
    status: 'Cancelled',
    type: 'Visit'
  },
  {
    id: 'BKG-004',
    studentId: 's4',
    propertyId: 'p7',
    date: 'Oct 18, 2026',
    time: '04:00 PM',
    status: 'Confirmed',
    type: 'Lease Signing'
  }
];

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Enhance bookings with actual student and property details
  const enhancedBookings = MOCK_BOOKINGS.map(booking => {
    const student = STUDENTS.find(s => s.id === booking.studentId);
    const property = PROPERTIES.find(p => p.id === booking.propertyId);
    return { ...booking, student, property };
  });

  const filteredBookings = enhancedBookings.filter(booking => 
    booking.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    booking.property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-700 border border-green-200">
            <CheckCircle size={12} /> Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700 border border-amber-200">
            <Clock size={12} /> Pending
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-100 text-red-700 border border-red-200">
            <XCircle size={12} /> Cancelled
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Booking Management</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Track all student property visits and lease appointments.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings..."
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
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Booking ID</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Student Info</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Property Details</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Date & Time</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-extrabold text-gray-900">{booking.id}</span>
                    <span className="text-xs font-bold text-primary-blue block mt-1">{booking.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                        {booking.student?.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-900 text-sm block">{booking.student?.name}</span>
                        <span className="text-xs font-bold text-gray-500">{booking.student?.course}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-bold text-gray-700">
                      <Home size={14} className="mr-1.5 text-gray-400 shrink-0" />
                      <Link href={`/student/property/${booking.property?.id}`} className="hover:text-primary-blue transition-colors line-clamp-1">
                        {booking.property?.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-sm font-bold text-gray-700">
                      <span className="flex items-center"><Calendar size={14} className="mr-1.5 text-gray-400" /> {booking.date}</span>
                      <span className="flex items-center text-gray-500 text-xs"><Clock size={14} className="mr-1.5" /> {booking.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(booking.status)}
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
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar size={32} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-extrabold text-gray-900">No bookings found</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
