'use client';

import { useState } from 'react';
import { Search, Filter, MapPin, CheckCircle, Heart, Info, Users, ExternalLink } from 'lucide-react';
import { PROPERTIES, AMENITIES, calculateKnownMonthlyCost, hasUndisclosedCosts } from '@/lib/data';

export default function ExploreHousing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSort, setActiveSort] = useState('Recommended');

  const filteredProperties = PROPERTIES.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Explore homes near JKLU</h1>
          <p className="text-text-secondary">Discover real public property listings around campus.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search Mahapura, 1 BHK, Vardhman..." 
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

      <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
        {['Recommended', 'Lowest rent', 'Closest to JKLU', 'Largest area', 'Recently checked', 'Best roommate-sharing value'].map((sort) => (
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => {
          const knownCost = calculateKnownMonthlyCost(property);
          const undisclosed = hasUndisclosedCosts(property);
          
          return (
            <div key={property.id} className="bg-surface border border-border rounded-2xl overflow-hidden group hover:shadow-md transition-all duration-300 flex flex-col">
              <div className="h-48 bg-surface-light relative border-b border-border flex items-center justify-center text-text-secondary">
                <span className="text-xs uppercase tracking-widest opacity-50">Image from listing source</span>
                <div className="absolute top-3 left-3 flex gap-2 flex-col items-start">
                  {property.verifiedByUniNest ? (
                    <span className="bg-white/95 text-primary-green px-2 py-1 rounded text-xs font-semibold flex items-center shadow-sm">
                      <CheckCircle size={12} className="mr-1" /> University Verified
                    </span>
                  ) : (
                    <span className="bg-white/95 text-text-secondary px-2 py-1 rounded text-xs font-semibold shadow-sm flex items-center">
                      <ExternalLink size={12} className="mr-1" /> Public Listing
                    </span>
                  )}
                  <span className="bg-white/95 text-text-secondary px-2 py-1 rounded text-[10px] font-semibold shadow-sm uppercase tracking-wide">
                    {property.source}
                  </span>
                </div>
                
                <button className="absolute top-3 right-3 p-1.5 bg-white/95 rounded-full text-text-secondary hover:text-danger hover:bg-white shadow-sm transition-colors">
                  <Heart size={16} />
                </button>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-2">
                  <h3 className="text-lg font-bold text-foreground line-clamp-1">{property.title}</h3>
                  <p className="text-xs text-text-secondary flex items-center mt-1">
                    <MapPin size={12} className="mr-1" /> Approx. {property.distanceKm} km from JKLU
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-text-secondary mb-4">
                  <span className="font-medium text-foreground">{property.configuration}</span>
                  <span>•</span>
                  <span>{property.furnishing}</span>
                  <span>•</span>
                  <span>{property.areaSqFt} sq.ft</span>
                </div>
                
                <div className="bg-surface-light rounded-xl p-3 border border-border mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-text-secondary">Base Rent</span>
                    <span className="font-bold text-foreground">₹{property.rent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-text-secondary">Maintenance</span>
                    <span className="font-semibold text-text-secondary">
                      {typeof property.maintenance === 'number' ? `₹${property.maintenance}` : 'Not disclosed'}
                    </span>
                  </div>
                  
                  <div className="border-t border-border mt-2 pt-2 flex justify-between items-end">
                    <div>
                      <div className="text-[10px] uppercase font-bold tracking-wider text-text-secondary mb-0.5">Known Monthly Cost</div>
                      <div className="text-xl font-bold text-foreground flex items-center">
                        ₹{knownCost.toLocaleString()} {undisclosed && '+'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4 border-t border-border flex justify-between items-center">
                  <div className="text-xs text-text-secondary">
                    <span className="block mb-0.5">Last checked:</span>
                    <span className="font-medium">{property.checkedAt}</span>
                  </div>
                  <button className="bg-surface border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:border-primary-green hover:text-primary-green transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center p-6 text-xs text-text-secondary border-t border-border mt-8">
        Public listing information can change. Rent, availability, deposits and amenities should be confirmed directly with the listing source/owner before making any decision.
      </div>
    </div>
  );
}
