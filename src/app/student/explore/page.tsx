'use client';

import { useState, useEffect } from 'react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle, ExternalLink, IndianRupee } from 'lucide-react';
import Image from 'next/image';

const JKLU_COORDS = { lat: 26.836, lng: 75.658 };
const LAT_SCALE = 15000;
const LNG_SCALE = 15000;

export default function ExploreRooms() {
  const [greeting, setGreeting] = useState('Good morning');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] p-4 md:p-8 overflow-hidden max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{greeting}, Student.</h1>
        <p className="text-text-secondary mt-1">Find the perfect property and compare true monthly costs around JKLU.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Filters & Map */}
        <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col gap-4 min-h-0">
          
          {/* Filters Card */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Search Location</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input type="text" placeholder="Mahapura, Ajmer Road..." className="w-full pl-9 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" />
              </div>
            </div>
            <div className="w-full sm:w-auto flex gap-3">
              <div className="flex-1 sm:w-32">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Max Budget</label>
                <div className="relative">
                  <IndianRupee size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input type="number" placeholder="25000" className="w-full pl-8 pr-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" />
                </div>
              </div>
              <div className="flex-1 sm:w-32">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Config</label>
                <select className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green appearance-none">
                  <option>Any</option>
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 bg-[#F1F5F9] rounded-2xl border border-border relative overflow-hidden shadow-sm"
               style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
            
            <div className="absolute top-4 left-4 flex gap-2 z-30">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200 text-xs font-bold text-gray-700 flex items-center">
                <Navigation2 size={14} className="mr-1.5 text-primary-green" />
                GPS ACTIVE • JKLU REGION
              </div>
            </div>

            {/* SVG Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ minWidth: '100%', minHeight: '100%' }}>
              {selectedProperty && (
                <line 
                  x1="50%" 
                  y1="50%" 
                  x2={`calc(50% + ${(selectedProperty.coordinates.lng - JKLU_COORDS.lng) * LNG_SCALE}px)`}
                  y2={`calc(50% + ${(JKLU_COORDS.lat - selectedProperty.coordinates.lat) * LAT_SCALE}px)`}
                  stroke="#22c55e" 
                  strokeWidth="3"
                  strokeDasharray="6,6"
                  className="animate-[dash_1s_linear_infinite]"
                />
              )}
            </svg>

            {/* Fake Map Markers Container */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              {/* JKLU Center Marker */}
              <div className="absolute flex flex-col items-center">
                <div className="bg-primary-green text-white px-3 py-1 rounded-full shadow-lg border-2 border-white text-[10px] font-bold whitespace-nowrap flex items-center transform -translate-y-full mb-1">
                  <CheckCircle size={12} className="mr-1" /> JKLU CAMPUS
                </div>
                <div className="w-4 h-4 bg-primary-green border-2 border-white rounded-full shadow-lg"></div>
              </div>

              {/* Property Markers */}
              {PROPERTIES.map(p => {
                const yOffset = (JKLU_COORDS.lat - p.coordinates.lat) * LAT_SCALE;
                const xOffset = (p.coordinates.lng - JKLU_COORDS.lng) * LNG_SCALE;
                const isSelected = selectedProperty?.id === p.id;
                
                return (
                  <div 
                    key={p.id}
                    className="absolute flex flex-col items-center cursor-pointer transform hover:scale-110 transition-transform"
                    style={{ transform: `translate(${xOffset}px, ${yOffset}px)` }}
                    onClick={() => setSelectedProperty(p)}
                  >
                    <div className={`
                      px-2 py-1 rounded-full shadow-lg border-2 text-[10px] font-bold whitespace-nowrap mb-1
                      ${isSelected ? 'bg-primary-green text-white border-white scale-110' : 'bg-white text-gray-800 border-gray-200'}
                    `}>
                      ₹{(calculateKnownMonthlyCost(p) / 1000).toFixed(1)}k
                    </div>
                    <div className={`w-3 h-3 rounded-full shadow-lg border border-white ${isSelected ? 'bg-primary-green' : p.verifiedByUniNest ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                  </div>
                );
              })}
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-[10px] font-mono text-gray-400 flex justify-between">
              <span>Tap a property pin to view route & distance</span>
              {selectedProperty && <span>Showing route to: {selectedProperty.title}</span>}
            </div>
          </div>
        </div>

        {/* Right Column: Properties List */}
        <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col min-h-0 bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-light/50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-foreground">NEARBY PROPERTIES</h2>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase">Sorted by distance</p>
            </div>
            <span className="bg-primary-green/10 text-primary-green text-[10px] font-bold px-2 py-1 rounded-full">
              {PROPERTIES.length} LISTINGS
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {PROPERTIES.sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm)).map((property, idx) => {
              const isSelected = selectedProperty?.id === property.id;
              
              return (
                <div 
                  key={property.id} 
                  onClick={() => setSelectedProperty(property)}
                  className={`border rounded-xl p-3 cursor-pointer transition-all duration-200
                    ${isSelected ? 'border-primary-green bg-light-green shadow-sm ring-1 ring-primary-green/20' : 'border-border hover:border-text-secondary bg-surface'}
                  `}
                >
                  <div className="flex gap-3 h-20 mb-3">
                    <div className="w-24 h-full rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                      {property.imageUrl ? (
                        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="text-gray-300" size={24} />
                        </div>
                      )}
                      {property.verifiedByUniNest && (
                        <div className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow">
                          <CheckCircle size={10} className="text-primary-green" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold text-text-secondary bg-surface-light px-1.5 py-0.5 rounded border border-border">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-sm font-bold text-foreground truncate">{property.title}</h3>
                      </div>
                      <p className="text-[11px] text-text-secondary flex items-center">
                        <MapPin size={10} className="mr-1" /> {property.distanceKm} km away • {property.configuration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <span className="text-[10px] text-text-secondary uppercase tracking-wide font-medium block mb-0.5">Known Monthly</span>
                      <span className="font-bold text-sm text-foreground">₹{calculateKnownMonthlyCost(property).toLocaleString()}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-text-secondary uppercase tracking-wide font-medium block mb-0.5">Source</span>
                      <span className="text-[10px] font-semibold text-foreground bg-surface-light px-1.5 py-0.5 rounded border border-border">
                        {property.source}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -12;
          }
        }
      `}</style>
    </div>
  );
}
