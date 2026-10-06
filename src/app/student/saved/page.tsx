'use client';

import { useState } from 'react';
import { Heart, MapPin, Home, CheckCircle, Trash2, IndianRupee } from 'lucide-react';
import { PROPERTIES, calculateKnownMonthlyCost } from '@/lib/data';

export default function SavedProperties() {
  const [savedIds, setSavedIds] = useState(['p1', 'p3', 'p7', 'p8']);
  const savedProperties = PROPERTIES.filter(p => savedIds.includes(p.id));

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Saved Properties</h1>
        <p className="text-text-secondary">Properties you've bookmarked for later review.</p>
      </div>

      {savedProperties.length === 0 ? (
        <div className="bg-surface border border-border rounded-2xl p-12 text-center">
          <Heart size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground mb-2">No saved properties yet</h3>
          <p className="text-text-secondary">Browse the Rooms section and click the heart icon to save properties here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedProperties.map(property => (
            <div key={property.id} className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-100 relative">
                {property.imageUrl ? (
                  <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'; }} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center"><Home size={32} className="text-gray-300" /></div>
                )}
                {property.verifiedByUniNest && (
                  <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-[10px] font-bold text-primary-green flex items-center shadow">
                    <CheckCircle size={10} className="mr-1" /> Verified
                  </div>
                )}
                <button onClick={() => setSavedIds(savedIds.filter(id => id !== property.id))} className="absolute top-2 right-2 bg-white rounded-full p-2 shadow hover:bg-red-50 transition-colors">
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">{property.title}</h3>
                <p className="text-xs text-text-secondary flex items-center mb-3">
                  <MapPin size={10} className="mr-1" /> {property.distanceKm} km from JKLU • {property.configuration}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div>
                    <span className="text-[10px] text-text-secondary uppercase block">Monthly</span>
                    <span className="text-lg font-bold text-foreground flex items-center"><IndianRupee size={14} />{calculateKnownMonthlyCost(property).toLocaleString()}</span>
                  </div>
                  <span className="text-xs text-text-secondary bg-surface-light px-2 py-1 rounded border border-border">{property.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
