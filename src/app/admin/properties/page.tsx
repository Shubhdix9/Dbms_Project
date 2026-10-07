'use client';

import { useState } from 'react';
import { PROPERTIES } from '@/lib/data';
import { Search, Filter, MoreVertical, Home, CheckCircle, Clock, IndianRupee, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AdminPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = PROPERTIES.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Property Directory</h1>
          <p className="text-sm font-bold text-gray-500 mt-1">Manage all listings, their verification status, and landlord details.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>
          <button className="bg-white border-2 border-border p-2.5 rounded-xl text-gray-600 hover:border-gray-400 transition-colors">
            <Filter size={18} />
          </button>
          <Link href="/landlord/add-property" className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors whitespace-nowrap hidden md:block">
            + Add Property
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border-2 border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b-2 border-border">
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Property Details</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Rent & Config</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Verification</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        {property.imageUrl ? (
                          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Home size={20} /></div>
                        )}
                      </div>
                      <div>
                        <Link href={`/student/property/${property.id}`} className="font-extrabold text-gray-900 hover:text-primary-blue text-sm line-clamp-1">
                          {property.title}
                        </Link>
                        <span className="text-xs font-bold text-gray-500 block mt-0.5">{property.type}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-bold text-gray-700">
                      <MapPin size={14} className="mr-1.5 text-gray-400 shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500 block mt-1 ml-5">{property.distanceKm} km from JKLU</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center font-extrabold text-gray-900 text-sm">
                      <IndianRupee size={14} className="mr-0.5" /> {property.rent.toLocaleString()}
                    </div>
                    <span className="text-xs font-bold text-gray-500 block mt-1">
                      {property.configuration} • {property.furnishing}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {property.verifiedByUniNest ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-700 border border-green-200">
                        <CheckCircle size={12} /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-700 border border-amber-200">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <Home size={32} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-sm font-extrabold text-gray-900">No properties found</h3>
              <p className="text-xs font-medium text-gray-500 mt-1">Try adjusting your search terms.</p>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
