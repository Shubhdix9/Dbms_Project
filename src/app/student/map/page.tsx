'use client';

import { useState } from 'react';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle } from 'lucide-react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';
import Link from 'next/link';

// Simulate JKLU coordinates
const JKLU_COORDS = { lat: 26.836, lng: 75.658 };

// Map scaling factors for fake rendering (just a visual representation)
const LAT_SCALE = 15000;
const LNG_SCALE = 15000;

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
      <div className="w-full h-full bg-[#f4f6f8] rounded-[2rem] border-4 border-white shadow-2xl relative overflow-hidden" 
           style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '30px 30px', opacity: 0.9 }}>
        
        {/* Map UI Overlay */}
        <div className="absolute top-6 left-6 flex gap-2 z-30">
          <div className="bg-white px-4 py-2 rounded-xl shadow-lg border border-border text-xs font-extrabold text-primary-blue flex items-center">
            <Navigation2 size={16} className="mr-2 text-primary-orange" />
            Ajmer Road, Jaipur
          </div>
        </div>

        {/* Fake Map Markers Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* JKLU Center Marker */}
          <div className="absolute z-10 flex flex-col items-center">
            <div className="bg-primary-blue text-white px-4 py-1.5 rounded-full shadow-xl border-2 border-white text-xs font-extrabold whitespace-nowrap flex items-center transform -translate-y-full tracking-wide">
              <CheckCircle size={14} className="mr-1.5 text-primary-orange" /> JKLU Campus
            </div>
            <div className="w-5 h-5 bg-primary-blue border-4 border-white rounded-full shadow-xl"></div>
          </div>

          {/* Property Markers */}
          {PROPERTIES.map(p => {
            const yOffset = (JKLU_COORDS.lat - p.coordinates.lat) * LAT_SCALE;
            const xOffset = (p.coordinates.lng - JKLU_COORDS.lng) * LNG_SCALE;
            const isSelected = selectedProperty?.id === p.id;
            
            return (
              <div 
                key={p.id}
                className="absolute flex flex-col items-center cursor-pointer transform hover:scale-110 transition-transform z-20"
                style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
                onClick={() => setSelectedProperty(p)}
              >
                <div className={`
                  px-3 py-1.5 rounded-full shadow-xl border-2 text-xs font-extrabold whitespace-nowrap mb-1.5 transition-colors
                  ${isSelected ? 'bg-primary-orange text-white border-white scale-110' : 'bg-white text-primary-blue border-border'}
                `}>
                  ₹{(p.rent / 1000).toFixed(1)}k
                </div>
                <div className={`w-4 h-4 rounded-full border-[3px] border-white shadow-xl transition-all ${isSelected ? 'bg-primary-orange scale-125' : 'bg-primary-blue'}`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
