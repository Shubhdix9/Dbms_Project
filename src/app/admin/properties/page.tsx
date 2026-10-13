'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Filter, Trash2, Home, CheckCircle, Clock, 
  IndianRupee, MapPin, Eye, AlertTriangle, ShieldCheck, 
  Building2, Plus, Sparkles, Check, X
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  fetchAllActiveProperties, 
  deletePropertyUniversally, 
  PROPERTIES_UPDATED_EVENT 
} from '@/lib/propertiesStore';

export default function AdminPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'VERIFIED' | 'PENDING'>('ALL');
  const [propertiesList, setPropertiesList] = useState<any[]>([]);
  const [propertyToDelete, setPropertyToDelete] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadProperties = async () => {
    const list = await fetchAllActiveProperties();
    setPropertiesList(list);
  };

  useEffect(() => {
    loadProperties();

    const handleUpdate = () => loadProperties();
    window.addEventListener('focus', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    window.addEventListener(PROPERTIES_UPDATED_EVENT, handleUpdate);

    return () => {
      window.removeEventListener('focus', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener(PROPERTIES_UPDATED_EVENT, handleUpdate);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    const target = propertiesList.find(p => p.id === id);
    await deletePropertyUniversally(id);
    setPropertiesList(prev => prev.filter(p => p.id !== id));
    setPropertyToDelete(null);
    setIsDeleting(false);
    showToast(`Removed "${target?.title || 'Property'}" from platform directory`);
  };

  const handleToggleVerify = async (id: string) => {
    const target = propertiesList.find(p => p.id === id);
    const nextState = !target?.verifiedByUniNest;

    // If it's a DB property, update Supabase
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      try {
        await supabase.from('property').update({
          verification_status: nextState ? 'VERIFIED' : 'PENDING'
        }).eq('property_id', numericId);
      } catch (err) {
        console.error('Failed to update DB verification status:', err);
      }
    }

    setPropertiesList(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          verifiedByUniNest: nextState,
          status: nextState ? 'Verified' : 'Pending Verification'
        };
      }
      return p;
    }));

    showToast(nextState ? 'Property marked as Verified' : 'Property marked as Pending');
  };

  const filteredProperties = propertiesList.filter(property => {
    const matchesSearch = 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.configuration?.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'VERIFIED') return !!property.verifiedByUniNest;
    if (filterStatus === 'PENDING') return !property.verifiedByUniNest;
    return true;
  });

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[10000] bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom duration-200">
          <Check size={18} className="text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-primary-orange bg-primary-orange/10 px-3 py-0.5 rounded-full">
              Platform Inventory
            </span>
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Property Directory
            <span className="text-sm font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              {propertiesList.length} Total
            </span>
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Remove listings, toggle UniNest verification status, and monitor rental flats.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-blue transition-colors shadow-sm"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-border">
            <button 
              onClick={() => setFilterStatus('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'ALL' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterStatus('VERIFIED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'VERIFIED' ? 'bg-white shadow text-emerald-700' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Verified
            </button>
            <button 
              onClick={() => setFilterStatus('PENDING')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterStatus === 'PENDING' ? 'bg-white shadow text-amber-700' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Pending
            </button>
          </div>

          <Link href="/landlord/add-property" className="bg-primary-blue text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors whitespace-nowrap shadow-sm flex items-center gap-2">
            <Plus size={16} /> Add Listing
          </Link>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[2rem] border-2 border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-light border-b-2 border-border">
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Property Listing</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Rent & Type</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-extrabold text-gray-500 uppercase tracking-widest text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/80 transition-colors group">
                  
                  {/* Title & Image */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200 shadow-sm relative">
                        {property.imageUrl ? (
                          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400"><Home size={22} /></div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link href={`/student/property/${property.id}`} className="font-extrabold text-gray-900 hover:text-primary-blue text-sm transition-colors line-clamp-1">
                            {property.title}
                          </Link>
                        </div>
                        <span className="text-xs font-bold text-gray-500 block mt-0.5">
                          ID: <span className="font-mono text-slate-600">{property.id}</span> • {property.type}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-bold text-gray-700">
                      <MapPin size={14} className="mr-1.5 text-primary-orange shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 block mt-1 ml-5">
                      {property.distanceKm} km from campus
                    </span>
                  </td>

                  {/* Rent & Config */}
                  <td className="px-6 py-4">
                    <div className="flex items-center font-extrabold text-gray-900 text-sm">
                      <IndianRupee size={14} className="mr-0.5 text-slate-700" /> {property.rent?.toLocaleString()}
                    </div>
                    <span className="text-xs font-semibold text-gray-500 block mt-0.5">
                      {property.configuration} • {property.furnishing || 'Furnished'}
                    </span>
                  </td>

                  {/* Verification Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleVerify(property.id)}
                      title="Click to toggle status"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border ${
                        property.verifiedByUniNest
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      }`}
                    >
                      {property.verifiedByUniNest ? (
                        <><CheckCircle size={13} /> Verified</>
                      ) : (
                        <><Clock size={13} /> Pending</>
                      )}
                    </button>
                  </td>

                  {/* Actions: View & Delete */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/student/property/${property.id}`}
                        target="_blank"
                        className="p-2 text-slate-500 hover:text-primary-blue hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-200"
                        title="View Flat Public Page"
                      >
                        <Eye size={17} />
                      </Link>

                      <button
                        onClick={() => setPropertyToDelete(property)}
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-200"
                        title="Remove Property Listing"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <Building2 size={40} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-base font-extrabold text-gray-900">No properties found</h3>
              <p className="text-xs font-medium text-gray-500 mt-1 max-w-sm mx-auto">
                No active properties match your current filter or query.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal for Property Deletion */}
      {propertyToDelete && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-border animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
              <AlertTriangle size={24} />
            </div>

            <h3 className="text-xl font-black text-gray-900">Remove Listing?</h3>
            <p className="text-sm font-medium text-gray-600 mt-2 leading-relaxed">
              Are you sure you want to remove <strong className="text-gray-900">"{propertyToDelete.title}"</strong> ({propertyToDelete.location})? This will immediately remove it from the student directory and explore maps.
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setPropertyToDelete(null)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(propertyToDelete.id)}
                disabled={isDeleting}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm shadow-red-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? 'Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
