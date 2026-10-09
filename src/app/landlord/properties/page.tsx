'use client';

import { useState } from 'react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';
import { Building, MapPin, Edit, Trash2, Eye, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function LandlordProperties() {
  const [properties, setProperties] = useState(PROPERTIES.slice(0, 4)); // Mock landlord's portfolio

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">My Properties</h1>
          <p className="text-text-secondary">Manage your portfolio, update listings, and track performance.</p>
        </div>
        <Link href="/landlord/add-property" className="px-6 py-3 bg-primary-orange text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-colors flex items-center w-fit text-sm">
           <PlusCircle size={16} className="mr-2" /> Add New Property
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl border-2 border-border shadow-sm flex flex-col sm:flex-row overflow-hidden group">
            <div className="sm:w-48 h-48 sm:h-auto shrink-0 relative bg-surface-light">
               <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
               <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-md text-[10px] font-extrabold text-primary-blue uppercase tracking-wider shadow-sm">
                 {property.verifiedByUniNest ? 'Verified' : 'Public'}
               </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                   <h3 className="text-xl font-extrabold text-primary-blue line-clamp-1">{property.title}</h3>
                   <span className="text-lg font-black text-foreground ml-4">₹{calculateKnownMonthlyCost(property).toLocaleString()}</span>
                </div>
                <p className="text-sm text-text-secondary flex items-center mt-1">
                  <MapPin size={14} className="mr-1" /> {property.location}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-surface-light border border-border rounded-lg text-xs font-bold text-text-secondary">{property.configuration}</span>
                  <span className="px-3 py-1 bg-surface-light border border-border rounded-lg text-xs font-bold text-text-secondary">Max Capacity: {(property as any).maxOccupancy || 4}</span>
                  <span className="px-3 py-1 bg-surface-light border border-border rounded-lg text-xs font-bold text-text-secondary">{property.type}</span>
                  <span className="px-3 py-1 bg-surface-light border border-border rounded-lg text-xs font-bold text-text-secondary">{property.furnishing}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                <Link href={`/landlord/edit-property/${property.id}`} className="flex-1 py-2 bg-light-orange text-primary-orange font-bold text-xs uppercase tracking-wider rounded-lg border border-primary-orange/20 hover:bg-primary-orange hover:text-white transition-colors flex items-center justify-center">
                  <Edit size={14} className="mr-1.5" /> Edit
                </Link>
                <Link href={`/student/property/${property.id}`} className="flex-1 py-2 bg-white text-text-secondary font-bold text-xs uppercase tracking-wider rounded-lg border border-border hover:bg-surface-light transition-colors flex items-center justify-center">
                  <Eye size={14} className="mr-1.5" /> Preview
                </Link>
                <button className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors border border-transparent hover:border-danger/20">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
