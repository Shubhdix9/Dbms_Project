'use client';

import { useState, useEffect } from 'react';
import { PROPERTIES, calculateKnownMonthlyCost, LANDLORDS } from '@/lib/data';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle, ExternalLink, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const JKLU_COORDS = { lat: 26.8358, lng: 75.6504 };
const LAT_SCALE = 15000;
const LNG_SCALE = 15000;

export default function ExploreRooms() {
  const [greeting, setGreeting] = useState('Good morning');
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [config, setConfig] = useState('Any');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const filteredProperties = PROPERTIES.filter(p => {
    const cost = calculateKnownMonthlyCost(p);
    const matchesSearch = p.location.toLowerCase().includes(searchQuery.toLowerCase()) || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBudget = maxBudget ? cost <= parseInt(maxBudget) : true;
    const matchesConfig = config === 'Any' ? true : p.configuration === config;
    return matchesSearch && matchesBudget && matchesConfig;
  });

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] p-4 max-w-[1800px] mx-auto overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{greeting}, <span className="text-primary-blue">shivam.</span></h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        
        {/* Left Column: Filters & Map */}
        <div className="w-full lg:w-2/3 xl:w-8/12 flex flex-col gap-4 min-h-0">
          
          {/* Filters Card */}
          <div className="bg-surface border border-border rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Search Location</label>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Mahapura, Ajmer Road..." 
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" 
                />
              </div>
            </div>
            <div className="w-full sm:w-auto flex gap-3">
              <div className="flex-1 sm:w-32">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Max Budget</label>
                <div className="relative">
                  <IndianRupee size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input 
                    type="number" 
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(e.target.value)}
                    placeholder="25000" 
                    className="w-full pl-8 pr-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" 
                  />
                </div>
              </div>
              <div className="flex-1 sm:w-32">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Config</label>
                <select 
                  value={config}
                  onChange={(e) => setConfig(e.target.value)}
                  className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green appearance-none"
                >
                  <option>Any</option>
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                </select>
              </div>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 w-full bg-surface-light rounded-2xl border border-border relative overflow-hidden shadow-sm z-0">
            
            <Map 
              properties={filteredProperties} 
              selectedProperty={selectedProperty} 
              onSelectProperty={setSelectedProperty}
              calculateCost={calculateKnownMonthlyCost}
            />
            
            <div className="absolute top-4 left-4 flex gap-2 z-[400] pointer-events-none">
              <div className="bg-white px-3 py-1.5 rounded-lg shadow-md border border-gray-200 text-xs font-bold text-gray-700 flex items-center">
                <Navigation2 size={14} className="mr-1.5 text-primary-green" />
                REAL-TIME ROUTING
              </div>
            </div>
            
            {!selectedProperty && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900/80 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-medium shadow-xl pointer-events-none whitespace-nowrap z-[400]">
                Select a property from the list to view the real route and distance
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Properties List */}
        <div className="w-full lg:w-1/3 xl:w-4/12 flex flex-col min-h-0 bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border flex justify-between items-center bg-white z-10 shadow-sm relative">
            <div>
              <h2 className="font-extrabold text-foreground text-lg uppercase tracking-wide">NEARBY PROPERTIES</h2>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase mt-0.5">Sorted by distance</p>
            </div>
            <span className="bg-success-light text-success border border-success/20 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
              {filteredProperties.length} LISTINGS
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/50">
            {filteredProperties.sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm)).map((property, idx) => {
              const isSelected = selectedProperty?.id === property.id;
              
              return (
                <div 
                  key={property.id} 
                  onClick={() => setSelectedProperty(property)}
                  className={`bg-white border rounded-2xl p-4 cursor-pointer transition-all duration-200
                    ${isSelected ? 'border-primary-orange shadow-md ring-1 ring-primary-orange' : 'border-border hover:border-primary-orange hover:shadow-sm'}
                  `}
                >
                  <div className="flex gap-3 h-20 mb-3">
                    <div className="w-24 h-full rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                      {property.imageUrl ? (
                        <img 
                          src={property.imageUrl} 
                          alt={property.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'; }} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Home className="text-gray-300" size={24} />
                        </div>
                      )}
                      {property.verifiedByUniNest && (
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
                          <CheckCircle size={12} className="text-success" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] font-bold text-primary-orange bg-light-orange px-2 py-0.5 rounded-full border border-primary-orange/20 mr-2">
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
                      <span className="text-[10px] text-text-secondary uppercase tracking-wide font-medium block mb-0.5">Landlord</span>
                      <span className="text-[10px] font-semibold text-foreground bg-surface-light px-1.5 py-0.5 rounded border border-border">
                        {property.landlordId ? LANDLORDS.find(l => l.id === property.landlordId)?.name : 'Not disclosed'}
                      </span>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link 
                        href={`/student/property/${property.id}`}
                        className="w-full bg-primary-blue text-white font-bold py-2.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center text-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Property Details →
                      </Link>
                    </div>
                  )}
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
