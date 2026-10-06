'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, CheckCircle, Heart, Info, IndianRupee } from 'lucide-react';
import { PROPERTIES, AMENITIES, calculateTrueCost } from '@/lib/data';
import Link from 'next/link';

export default function ExploreHousing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState('Recommended');

  // Filter properties based on search term
  const filteredProperties = PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Explore homes near JKLU</h1>
          <p className="text-text-secondary">Discover 24+ verified properties around campus.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search Mahapura, 2 BHK, Wi-Fi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-foreground focus:outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green transition-all"
            />
          </div>
          <button className="bg-surface border border-border p-2.5 rounded-xl text-foreground hover:bg-surface-light transition-colors flex items-center justify-center">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Filters Area (simplified for demo) */}
      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
        {['Recommended', 'Lowest true cost', 'Closest to JKLU', 'Highest rated', 'Highest match'].map((sort) => (
          <button 
            key={sort}
            onClick={() => setActiveSort(sort)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeSort === sort 
                ? 'bg-text-secondary text-white' 
                : 'bg-surface border border-border text-text-secondary hover:text-foreground'
            }`}
          >
            {sort}
          </button>
        ))}
        
        <div className="w-px h-8 bg-border mx-2"></div>
        
        {['Under ₹10k', 'Private Room', 'Furnished', 'AC', 'Male', 'Female'].map((filter) => (
          <button 
            key={filter}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-surface border border-border text-text-secondary hover:text-foreground transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <div key={property.id} className="bg-surface border border-border rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col">
            {/* Image Placeholder */}
            <div className="h-48 bg-surface-light relative">
              <div className="absolute top-3 left-3 flex gap-2">
                {property.verified && (
                  <span className="bg-white/90 text-primary-green px-2 py-1 rounded text-xs font-semibold flex items-center shadow-sm backdrop-blur-sm">
                    <CheckCircle size={12} className="mr-1" /> Verified
                  </span>
                )}
                <span className="bg-white/90 text-text-secondary px-2 py-1 rounded text-xs font-semibold shadow-sm backdrop-blur-sm">
                  {property.rating} ★
                </span>
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full text-text-secondary hover:text-danger hover:bg-white shadow-sm backdrop-blur-sm transition-colors">
                <Heart size={16} />
              </button>
              
              <div className="absolute bottom-3 left-3 bg-white/90 text-foreground px-2 py-1 rounded text-xs font-semibold shadow-sm backdrop-blur-sm flex items-center">
                <MapPin size={12} className="mr-1 text-primary-green" /> {property.distance} km from JKLU
              </div>
            </div>
            
            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-foreground line-clamp-1">{property.title}</h3>
              </div>
              <p className="text-sm text-text-secondary mb-3">{property.type} • {property.location}</p>
              
              <div className="flex flex-wrap gap-1.5 mb-5">
                {property.amenities.slice(0, 3).map((amenityId) => {
                  const amenity = AMENITIES.find(a => a.id === amenityId);
                  return (
                    <span key={amenityId} className="text-xs bg-surface-light text-text-secondary px-2 py-1 rounded border border-border/50">
                      {amenity?.name}
                    </span>
                  );
                })}
                {property.amenities.length > 3 && (
                  <span className="text-xs bg-surface-light text-text-secondary px-2 py-1 rounded border border-border/50">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t border-border">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-xs text-text-secondary mb-0.5 flex items-center">
                      True Monthly Cost 
                      <div className="ml-1 text-primary-green relative group/tooltip cursor-help">
                        <Info size={12} />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-foreground text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                          Rent: ₹{property.rent} <br/>
                          Utilities: ₹{property.electricity + property.internet + property.maintenance}
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-foreground flex items-center">
                      ₹{calculateTrueCost(property).toLocaleString()} 
                      <span className="text-sm font-normal text-text-secondary ml-1">/mo</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-text-secondary mb-0.5">Housing Match</div>
                    <div className="text-lg font-bold text-primary-green">91%</div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-green text-white py-2.5 rounded-xl text-sm font-medium hover:bg-opacity-90 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
