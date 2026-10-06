'use client';

import { useState, useEffect } from 'react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';
import { MapPin, Navigation2, Search, Filter, Home, CheckCircle, ExternalLink, IndianRupee } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), { ssr: false });

const JKLU_COORDS = { lat: 26.836, lng: 75.658 };
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
    <div className="flex flex-col min-h-[calc(100vh-4rem)] p-4 md:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">{greeting}, Student.</h1>
        <p className="text-text-secondary mt-1">Find the perfect property and compare true monthly costs around JKLU.</p>
      </div>

      <div className="flex flex-col gap-8 pb-8">
        
        {/* Top Section: Filters & Map */}
        <div className="w-full flex flex-col gap-4">
          
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
          <div className="w-full h-[55vh] min-h-[400px] bg-surface-light rounded-2xl border border-border relative overflow-hidden shadow-sm z-0">
            
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

        {/* Bottom Section: Properties Grid */}
        <div className="w-full flex flex-col bg-surface border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-light/50 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-foreground">NEARBY PROPERTIES</h2>
              <p className="text-[10px] text-text-secondary tracking-widest uppercase">Sorted by distance</p>
            </div>
            <span className="bg-primary-green/10 text-primary-green text-[10px] font-bold px-2 py-1 rounded-full">
              {filteredProperties.length} LISTINGS
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-surface-light/30">
            {filteredProperties.sort((a, b) => parseFloat(a.distanceKm) - parseFloat(b.distanceKm)).map((property, idx) => {
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
