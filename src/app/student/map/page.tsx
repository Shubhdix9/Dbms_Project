'use client';

import { useState } from 'react';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle } from 'lucide-react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';

// Simulate JKLU coordinates
const JKLU_COORDS = { lat: 26.836, lng: 75.658 };

// Map scaling factors for fake rendering (just a visual representation)
const LAT_SCALE = 15000;
const LNG_SCALE = 15000;

export default function MapExperience() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-4">
      {/* Sidebar List */}
      <div className="w-full md:w-1/3 h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold text-foreground mb-4">Properties around JKLU</h2>
          <div className="relative mb-3">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search area or property..." 
              className="w-full pl-9 pr-4 py-2 bg-surface-light border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary-green"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-1.5 bg-surface border border-border text-xs rounded-lg font-medium hover:bg-surface-light">Filters</button>
            <button className="flex-1 py-1.5 bg-surface border border-border text-xs rounded-lg font-medium hover:bg-surface-light">Distance</button>
            <button className="flex-1 py-1.5 bg-surface border border-border text-xs rounded-lg font-medium hover:bg-surface-light">Budget</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {PROPERTIES.map(p => (
            <div 
              key={p.id} 
              className={`p-3 border rounded-xl cursor-pointer transition-colors ${selectedProperty?.id === p.id ? 'border-primary-green bg-light-green' : 'border-border hover:border-text-secondary'}`}
              onClick={() => setSelectedProperty(p)}
            >
              <h3 className="font-bold text-sm text-foreground mb-1 line-clamp-1">{p.title}</h3>
              <p className="text-xs text-text-secondary mb-2">{p.configuration} • {p.distanceKm} km from JKLU</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm">₹{calculateKnownMonthlyCost(p).toLocaleString()}+</span>
                {p.verifiedByUniNest ? (
                  <span className="text-[10px] text-primary-green font-bold px-1.5 py-0.5 bg-white rounded border border-primary-green/20">Verified</span>
                ) : (
                  <span className="text-[10px] text-text-secondary font-bold px-1.5 py-0.5 bg-white rounded border border-border">Public</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="w-full md:w-2/3 h-full bg-[#E5E5F7] rounded-2xl border border-border relative overflow-hidden" 
           style={{ backgroundImage: 'radial-gradient(#444cf7 0.5px, transparent 0.5px), radial-gradient(#444cf7 0.5px, #E5E5F7 0.5px)', backgroundSize: '20px 20px', backgroundPosition: '0 0,10px 10px', opacity: 0.8 }}>
        
        {/* Map UI Overlay */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-bold text-gray-700 flex items-center">
            <Navigation2 size={14} className="mr-1.5 text-blue-600" />
            Ajmer Road, Jaipur
          </div>
        </div>

        {/* Fake Map Markers Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* JKLU Center Marker */}
          <div className="absolute z-10 flex flex-col items-center">
            <div className="bg-blue-900 text-white px-3 py-1 rounded-full shadow-lg border-2 border-white text-xs font-bold whitespace-nowrap flex items-center transform -translate-y-full">
              <CheckCircle size={12} className="mr-1" /> JKLU Campus
            </div>
            <div className="w-4 h-4 bg-blue-900 border-2 border-white rounded-full shadow-lg"></div>
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
                  px-2 py-1 rounded-full shadow-lg border-2 text-xs font-bold whitespace-nowrap mb-1
                  ${isSelected ? 'bg-primary-green text-white border-white scale-110' : 'bg-white text-foreground border-border'}
                `}>
                  ₹{(p.rent / 1000).toFixed(1)}k
                </div>
                <div className={`w-3 h-3 rounded-full shadow-lg ${isSelected ? 'bg-primary-green' : p.verifiedByUniNest ? 'bg-green-500' : 'bg-blue-500'}`}></div>
              </div>
            );
          })}

        </div>

        {/* Selected Property Floating Card */}
        {selectedProperty && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl border border-gray-200 w-80 animate-in slide-in-from-bottom-5">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={() => setSelectedProperty(null)}>✕</button>
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                <Home size={24} className="text-gray-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 line-clamp-1">{selectedProperty.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{selectedProperty.configuration} • {selectedProperty.distanceKm} km</p>
                <div className="font-bold text-primary-green text-sm">₹{calculateKnownMonthlyCost(selectedProperty).toLocaleString()}+</div>
              </div>
            </div>
            <button className="w-full mt-3 bg-gray-900 text-white text-xs font-bold py-2 rounded-lg">View Details</button>
          </div>
        )}

      </div>
    </div>
  );
}
