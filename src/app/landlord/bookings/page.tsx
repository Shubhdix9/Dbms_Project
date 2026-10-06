'use client';

import { useState } from 'react';
import { STUDENTS, PROPERTIES } from '@/lib/data';
import { Check, X, Calendar, Clock, MapPin, Search } from 'lucide-react';

export default function LandlordBookings() {
  // Generate some realistic mock bookings
  const [bookings, setBookings] = useState([
    { id: 'b1', studentId: 's1', propertyId: 'p7', status: 'Pending', date: 'Oct 8, 2026', time: '10:00 AM' },
    { id: 'b2', studentId: 's3', propertyId: 'p8', status: 'Approved', date: 'Oct 7, 2026', time: '02:30 PM' },
    { id: 'b3', studentId: 's4', propertyId: 'p7', status: 'Pending', date: 'Oct 10, 2026', time: '11:15 AM' },
    { id: 'b4', studentId: 's5', propertyId: 'p10', status: 'Rejected', date: 'Oct 5, 2026', time: '04:00 PM' },
  ]);

  const handleStatusUpdate = (id: string, newStatus: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">Booking Requests</h1>
          <p className="text-text-secondary">Review and manage viewing requests from prospective students.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search bookings..." 
            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary-orange transition-colors"
          />
        </div>
      </div>

      <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b-2 border-border text-xs uppercase tracking-wider text-text-secondary font-extrabold">
                <th className="p-4 pl-6">Student</th>
                <th className="p-4">Property</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map(booking => {
                const student = STUDENTS.find(s => s.id === booking.studentId);
                const property = PROPERTIES.find(p => p.id === booking.propertyId);
                
                if (!student || !property) return null;

                return (
                  <tr key={booking.id} className="hover:bg-surface-light/50 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-extrabold text-primary-blue text-sm">{student.name}</p>
                          <p className="text-xs font-bold text-text-secondary">{student.course}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-extrabold text-foreground text-sm">{property.title}</p>
                        <p className="text-xs font-bold text-text-secondary flex items-center mt-0.5">
                          <MapPin size={12} className="mr-1" /> {property.configuration}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-bold text-foreground text-sm flex items-center mb-0.5"><Calendar size={14} className="mr-2 text-text-secondary"/> {booking.date}</p>
                        <p className="font-bold text-text-secondary text-xs flex items-center"><Clock size={14} className="mr-2"/> {booking.time}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-[10px] uppercase tracking-wider font-extrabold rounded-md border ${
                        booking.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                        booking.status === 'Approved' ? 'bg-green-50 text-green-600 border-green-200' :
                        'bg-red-50 text-red-600 border-red-200'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      {booking.status === 'Pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'Approved')}
                            className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-colors flex items-center justify-center border border-green-200 hover:border-transparent"
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(booking.id, 'Rejected')}
                            className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center border border-red-200 hover:border-transparent"
                            title="Reject"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-text-secondary">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
