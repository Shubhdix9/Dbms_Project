'use client';

import { useState } from 'react';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle } from 'lucide-react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to prevent SSR 'window' errors
const RealMap = dynamic(() => import('@/components/Map'), { 
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold">Loading Interactive Map...</div>
});

export default function MapExperience() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 mt-2">
      {/* Sidebar List */}
      <div className="w-full md:w-[400px] h-full flex flex-col bg-white border-2 border-border rounded-[2rem] shadow-xl overflow-hidden shrink-0">
        <div className="p-6 border-b border-border bg-surface-light/50">
          <h2 className="text-2xl font-extrabold text-primary-blue mb-4">Map View</h2>
          <div className="relative mb-4">
            <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by area or property..." 
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary-orange transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-white border-2 border-border text-xs rounded-xl font-bold hover:bg-surface-light transition-colors text-text-secondary">Filters</button>
            <button className="flex-1 py-2 bg-white border-2 border-border text-xs rounded-xl font-bold hover:bg-surface-light transition-colors text-text-secondary">Distance</button>
            <button className="flex-1 py-2 bg-white border-2 border-border text-xs rounded-xl font-bold hover:bg-surface-light transition-colors text-text-secondary">Budget</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface-light/30">
          {PROPERTIES.map(p => (
            <div 
              key={p.id} 
              className={`flex gap-3 p-3 border-2 rounded-2xl cursor-pointer transition-all ${selectedProperty?.id === p.id ? 'border-primary-orange bg-light-orange shadow-md scale-[1.02]' : 'border-border bg-white hover:border-text-secondary shadow-sm'}`}
              onClick={() => setSelectedProperty(p)}
            >
              <div className="w-24 h-24 rounded-xl bg-gray-200 overflow-hidden shrink-0 shadow-inner">
                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-between flex-1 py-0.5">
                <div>
                  <h3 className="font-extrabold text-sm text-primary-blue line-clamp-1">{p.title}</h3>
                  <p className="text-[11px] font-bold text-text-secondary mt-1">{p.configuration} • {p.distanceKm} km away</p>
                </div>
                <div className="flex justify-between items-end mt-2">
                  <span className="font-black text-sm text-foreground">₹{calculateKnownMonthlyCost(p).toLocaleString()}</span>
                  {p.verifiedByUniNest ? (
                    <span className="text-[9px] text-white font-bold px-2 py-1 bg-primary-orange rounded-md shadow-sm uppercase tracking-wider">Verified</span>
                  ) : (
                    <span className="text-[9px] text-text-secondary font-bold px-2 py-1 bg-surface rounded-md border border-border uppercase tracking-wider">Public</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Details Button for Selected Property */}
        {selectedProperty && (
          <div className="p-4 border-t border-border bg-white animate-in slide-in-from-bottom-2">
             <Link href={`/student/property/${selectedProperty.id}`} className="w-full bg-primary-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-colors shadow-md flex items-center justify-center text-sm">
                View Property Details
             </Link>
          </div>
        )}
      </div>

      {/* Map Area */}
      <div className="w-full h-full bg-[#f4f6f8] rounded-[2rem] border-4 border-white shadow-2xl relative overflow-hidden">
        <RealMap 
          properties={PROPERTIES} 
          selectedProperty={selectedProperty} 
          onSelectProperty={setSelectedProperty} 
          calculateCost={calculateKnownMonthlyCost} 
        />
      </div>
    </div>
  );
}
