'use client';

import { PROPERTIES, STUDENTS } from '@/lib/data';
import { MapPin, CheckCircle, IndianRupee, Home, Ruler, Calendar, Shield, Phone, MessageSquare, Bed, Bath, Wind, Car, Zap, Wifi, Users } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SavingsCalculator from '@/components/SavingsCalculator';

import { use } from 'react';

export default function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const property = PROPERTIES.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-foreground">Property not found</h2>
        <Link href="/student/explore" className="text-primary-blue mt-4 hover:underline">Return to Explore</Link>
      </div>
    );
  }

  const cost = property.rent + (typeof property.maintenance === 'number' ? property.maintenance : 0);

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Header Image Area */}
      <div className="relative h-[300px] md:h-[450px] w-full rounded-b-3xl overflow-hidden shadow-lg mb-8 bg-gray-200 group">
        {property.imageUrl ? (
          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-light"><Home size={64} className="text-gray-300" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <button onClick={() => router.back()} className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors">
          ← Back
        </button>

        {property.verifiedByUniNest && (
          <div className="absolute top-6 right-6 bg-success text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center">
            <CheckCircle size={16} className="mr-2" /> UniNest Verified
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white">{property.title}</h1>
            <p className="text-white/80 flex items-center text-sm md:text-base font-medium">
              <MapPin size={16} className="mr-1.5" /> {property.location} • {property.distanceKm} km from JKLU
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">Monthly Rent</span>
              <span className="text-2xl font-extrabold text-primary-blue flex items-center"><IndianRupee size={20} className="mr-0.5"/> {cost.toLocaleString()}</span>
            </div>
            <button className="bg-primary-orange text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-colors shadow-sm ml-2">
              Book Visit
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Bed size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Config</span><span className="font-bold text-foreground text-sm">{property.configuration}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Bath size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Bathrooms</span><span className="font-bold text-foreground text-sm">{property.bathrooms || 1}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Home size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Furnishing</span><span className="font-bold text-foreground text-sm truncate">{property.furnishing || 'Semi'}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Ruler size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Area</span><span className="font-bold text-foreground text-sm">{property.areaSqFt || 'N/A'} sqft</span></div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-extrabold text-foreground mb-4">About the Property</h2>
            <p className="text-text-secondary leading-relaxed">
              This beautiful {property.configuration} is perfectly situated for JKLU students, located just {property.distanceKm} km from campus.
              It comes {property.furnishing?.toLowerCase()} and includes standard student amenities. 
              The society is well-maintained and provides a great study environment.
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-extrabold text-foreground mb-6">What's Included</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Wifi size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Internet: <span className="font-normal text-text-secondary">{property.internet || 'Not specified'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Zap size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Electricity: <span className="font-normal text-text-secondary">{property.electricity || 'Tenant pays'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Car size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Parking: <span className="font-normal text-text-secondary">{property.parking || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Wind size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Balconies: <span className="font-normal text-text-secondary">{property.balconies || 1}</span></span>
              </div>
            </div>
          </div>
          
          {/* Rent Savings Calculator */}
          <SavingsCalculator monthlyCost={cost} />

        </div>

        {/* Right Column: Pricing & Contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-primary-blue/20 shadow-sm">
            <h2 className="text-lg font-extrabold text-foreground mb-4">Cost Breakdown</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm font-medium">Base Rent (Monthly)</span>
                <span className="font-bold text-foreground">₹{property.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm font-medium">Maintenance</span>
                <span className="font-bold text-foreground">{typeof property.maintenance === 'number' ? `₹${property.maintenance.toLocaleString()}` : property.maintenance || 'Included'}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-bold text-foreground">Total Monthly</span>
                <span className="font-extrabold text-primary-blue text-lg flex items-center"><IndianRupee size={16}/> {cost.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-surface-light p-4 rounded-xl border border-border mb-6">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1 block">One-time Payment</span>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Security Deposit</span>
                <span className="font-bold text-foreground">₹{property.securityDeposit?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-primary-orange text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-sm flex items-center justify-center">
                <Calendar size={18} className="mr-2" /> Book a Visit
              </button>
              <button className="w-full bg-white border border-border text-foreground font-bold py-3 rounded-xl hover:border-primary-blue hover:text-primary-blue transition-colors flex items-center justify-center">
                <MessageSquare size={18} className="mr-2" /> Contact Landlord
              </button>
            </div>
          </div>

          {/* Roommate Matching Box */}
          <div className="bg-white rounded-2xl p-6 border-2 border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-extrabold text-foreground flex items-center">
                <Users size={18} className="mr-2 text-primary-orange" /> Looking for Roommates
              </h2>
              <span className="bg-light-orange text-primary-orange text-[10px] font-extrabold px-2 py-1 rounded-full">2 Matches</span>
            </div>
            <p className="text-xs text-text-secondary mb-4">These verified JKLU students want to book this property and need a roommate to split rent.</p>
            
            <div className="space-y-3">
              {[STUDENTS[0], STUDENTS[2]].map((student, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-light rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold shadow-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary-blue line-clamp-1">{student.name}</h4>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">{student.course} • Year {student.year}</p>
                    </div>
                  </div>
                  <Link href={`/student/profile/${student.id}`} className="px-3 py-1.5 bg-white border border-border text-xs font-bold text-text-secondary hover:text-primary-blue hover:border-primary-blue rounded-lg transition-colors">
                    View
                  </Link>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-surface text-primary-blue font-extrabold py-2.5 text-xs uppercase tracking-wider rounded-xl border-2 border-border hover:bg-surface-light transition-colors">
              Add Myself to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
