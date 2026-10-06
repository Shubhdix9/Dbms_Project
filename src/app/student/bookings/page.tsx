'use client';

import { CalendarCheck, MapPin, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const BOOKINGS = [
  {
    id: 'b1',
    property: 'Vardhman Empire Estate',
    location: 'Mahapura, Ajmer Road',
    config: '1 BHK',
    date: 'Oct 12, 2026',
    time: '10:30 AM',
    status: 'confirmed',
    landlord: 'Rajesh Sharma',
    rent: 15000,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b2',
    property: 'Samanvay Aasra',
    location: 'Mahapura, Ajmer Road',
    config: '2 BHK',
    date: 'Oct 15, 2026',
    time: '2:00 PM',
    status: 'pending',
    landlord: 'Anil Gupta',
    rent: 14000,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'b3',
    property: 'Ashiana Umang Phase II',
    location: 'Near JKLU, Mahapura',
    config: '2 BHK',
    date: 'Oct 8, 2026',
    time: '11:00 AM',
    status: 'completed',
    landlord: 'Priya Mehra',
    rent: 16000,
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any; bg: string }> = {
  confirmed: { label: 'Confirmed', color: 'text-primary-green', icon: CheckCircle, bg: 'bg-light-green' },
  pending: { label: 'Pending', color: 'text-orange-600', icon: AlertCircle, bg: 'bg-orange-50' },
  completed: { label: 'Completed', color: 'text-blue-600', icon: CheckCircle, bg: 'bg-blue-50' },
  cancelled: { label: 'Cancelled', color: 'text-red-500', icon: XCircle, bg: 'bg-red-50' },
};

export default function Bookings() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
        <p className="text-text-secondary">Track your property visit appointments and viewing history.</p>
      </div>

      <div className="space-y-4">
        {BOOKINGS.map(booking => {
          const status = statusConfig[booking.status];
          const StatusIcon = status.icon;
          return (
            <div key={booking.id} className="bg-surface border border-border rounded-2xl p-5 flex flex-col md:flex-row gap-5 hover:shadow-sm transition-shadow">
              <div className="w-full md:w-40 h-28 md:h-auto rounded-xl bg-gray-100 overflow-hidden shrink-0">
                <img src={booking.imageUrl} alt={booking.property} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{booking.property}</h3>
                    <p className="text-xs text-text-secondary flex items-center"><MapPin size={10} className="mr-1" /> {booking.location} • {booking.config}</p>
                  </div>
                  <span className={`${status.bg} ${status.color} text-xs font-bold px-3 py-1 rounded-full flex items-center`}>
                    <StatusIcon size={12} className="mr-1" /> {status.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mt-3 text-sm">
                  <span className="flex items-center text-text-secondary"><CalendarCheck size={14} className="mr-1.5" /> {booking.date}</span>
                  <span className="flex items-center text-text-secondary"><Clock size={14} className="mr-1.5" /> {booking.time}</span>
                  <span className="text-text-secondary">Landlord: <strong className="text-foreground">{booking.landlord}</strong></span>
                  <span className="text-text-secondary">Rent: <strong className="text-foreground">₹{booking.rent.toLocaleString()}/mo</strong></span>
                </div>
                {booking.status === 'confirmed' && (
                  <div className="mt-3 flex gap-2">
                    <button className="bg-primary-green text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-opacity-90 transition-all">Get Directions</button>
                    <button className="bg-surface-light border border-border text-foreground px-4 py-2 rounded-lg text-xs font-bold hover:border-red-300 hover:text-red-500 transition-all">Cancel Visit</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
