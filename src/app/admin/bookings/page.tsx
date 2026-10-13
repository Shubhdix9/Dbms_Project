'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Filter, Calendar, User, Home, Clock, 
  CheckCircle, XCircle, Check, Trash2, Plus, 
  ChevronDown, Phone, IndianRupee, Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { STUDENTS, PROPERTIES } from '@/lib/data';

const INITIAL_BOOKINGS = [
  {
    id: 'BKG-001',
    studentId: 's1',
    propertyId: 'p7',
    date: 'Oct 14, 2026',
    time: '10:00 AM',
    status: 'Confirmed',
    type: 'Property Visit',
    studentNotes: 'Wants to view top floor room with balcony.'
  },
  {
    id: 'BKG-002',
    studentId: 's2',
    propertyId: 'p8',
    date: 'Oct 15, 2026',
    time: '02:30 PM',
    status: 'Pending',
    type: 'Property Visit',
    studentNotes: 'Interested in sharing with batchmate.'
  },
  {
    id: 'BKG-003',
    studentId: 's3',
    propertyId: 'p1',
    date: 'Oct 16, 2026',
    time: '11:00 AM',
    status: 'Pending',
    type: 'Lease Finalization',
    studentNotes: 'Needs fast Wi-Fi and power backup.'
  },
  {
    id: 'BKG-004',
    studentId: 's4',
    propertyId: 'p7',
    date: 'Oct 18, 2026',
    time: '04:00 PM',
    status: 'Confirmed',
    type: 'Property Visit',
    studentNotes: 'Coming with parents for quick check.'
  }
];

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Pending' | 'Confirmed' | 'Cancelled'>('ALL');
  const [bookings, setBookings] = useState<any[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('uninest_admin_bookings');
    if (saved) {
      try {
        setBookings(JSON.parse(saved));
      } catch {
        setBookings(INITIAL_BOOKINGS);
      }
    } else {
      setBookings(INITIAL_BOOKINGS);
    }
  }, []);

  const saveBookings = (updated: any[]) => {
    setBookings(updated);
    localStorage.setItem('uninest_admin_bookings', JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = (id: string, newStatus: 'Confirmed' | 'Cancelled' | 'Pending') => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    saveBookings(updated);
    showToast(`Booking ${id} marked as ${newStatus}`);
  };

  const handleDeleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    saveBookings(updated);
    showToast(`Booking ${id} removed`);
  };

  // Enhance bookings with actual student and property details
  const enhancedBookings = bookings.map(booking => {
    const student = STUDENTS.find(s => s.id === booking.studentId) || {
      name: 'Shivam Kervel',
      course: 'B.Tech CSE • Year 3',
      phone: '+91 98765 43210'
    };
    const property = PROPERTIES.find(p => p.id === booking.propertyId) || {
      title: 'Samanvay The New Door',
      location: 'Mahindra Sez, Jaipur',
      id: booking.propertyId || 'p8'
    };
    return { ...booking, student, property };
  });

  const filteredBookings = enhancedBookings.filter(booking => {
    const matchesSearch = 
      booking.student?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      booking.property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && booking.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-orange bg-primary-orange/10 px-3 py-0.5 rounded-full">
              Operations & Schedule
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Campus Bookings
            <span className="text-sm font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {bookings.length} Total
            </span>
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Review flat viewings requested by JKLU students and confirm scheduled visits.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search student or flat..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-blue transition-colors shadow-sm"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-border">
            {(['ALL', 'Pending', 'Confirmed', 'Cancelled'] as const).map(tab => (
              <button 
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${statusFilter === tab ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] border-2 border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b-2 border-border">
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Booking ID</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Student</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Property Target</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Scheduled Slot</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition-colors group">
                  
                  {/* ID & Type */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-extrabold text-gray-900 font-mono">{booking.id}</span>
                    <span className="text-[11px] font-bold text-primary-blue block mt-0.5">{booking.type}</span>
                  </td>

                  {/* Student */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-primary-blue flex items-center justify-center font-black text-sm shrink-0 border border-blue-200">
                        {booking.student?.name?.charAt(0)}
                      </div>
                      <div>
                        <span className="font-extrabold text-gray-900 text-sm block">{booking.student?.name}</span>
                        <span className="text-xs font-semibold text-gray-500">{booking.student?.course}</span>
                      </div>
                    </div>
                  </td>

                  {/* Property */}
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-extrabold text-gray-800">
                      <Home size={14} className="mr-1.5 text-primary-orange shrink-0" />
                      <Link href={`/student/property/${booking.property?.id}`} className="hover:text-primary-blue transition-colors line-clamp-1">
                        {booking.property?.title}
                      </Link>
                    </div>
                    {booking.studentNotes && (
                      <span className="text-[11px] font-medium text-slate-500 block mt-1 italic line-clamp-1">
                        "{booking.studentNotes}"
                      </span>
                    )}
                  </td>

                  {/* Schedule */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5 text-sm font-bold text-gray-700">
                      <span className="flex items-center text-xs text-slate-900 font-extrabold">
                        <Calendar size={13} className="mr-1.5 text-slate-400" /> {booking.date}
                      </span>
                      <span className="flex items-center text-gray-500 text-xs">
                        <Clock size={13} className="mr-1.5 text-slate-400" /> {booking.time}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : booking.status === 'Cancelled'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {booking.status === 'Confirmed' && <CheckCircle size={12} />}
                      {booking.status === 'Cancelled' && <XCircle size={12} />}
                      {booking.status === 'Pending' && <Clock size={12} />}
                      {booking.status}
                    </span>
                  </td>

                  {/* Quick Action buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {booking.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'Confirmed')}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          title="Confirm Visit"
                        >
                          <Check size={13} /> Confirm
                        </button>
                      )}

                      {booking.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}
                          className="px-2.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          title="Decline / Cancel"
                        >
                          <XCircle size={13} /> Cancel
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete record"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBookings.length === 0 && (
            <div className="text-center py-16">
              <Calendar size={36} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-base font-extrabold text-gray-900">No bookings found</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
