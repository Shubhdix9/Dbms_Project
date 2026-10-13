'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Search, 
  Filter, 
  Home, 
  Building2, 
  Clock, 
  Sparkles, 
  Check, 
  Eye, 
  ChevronRight,
  TrendingUp,
  MapPin,
  IndianRupee,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import { 
  fetchAllActiveProperties, 
  setPropertyVerificationStatus, 
  deletePropertyUniversally, 
  PROPERTIES_UPDATED_EVENT 
} from '@/lib/propertiesStore';

export default function VerificationCentre() {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'VERIFIED' | 'ALL'>('PENDING');

  const loadProperties = async () => {
    const all = await fetchAllActiveProperties();
    setProperties(all);
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

  const handleApprove = async (id: string, title: string) => {
    setActionLoadingId(id);
    await setPropertyVerificationStatus(id, true);
    await loadProperties();
    setActionLoadingId(null);
    showToast(`✓ Approved "${title}" — verified badge is now live for students!`);
  };

  const handleRejectOrRevoke = async (id: string, title: string) => {
    setActionLoadingId(id);
    await setPropertyVerificationStatus(id, false);
    await loadProperties();
    setActionLoadingId(null);
    showToast(`Marked "${title}" as Pending / Unverified`);
  };

  const handleMarkUnavailable = async (id: string, title: string) => {
    setActionLoadingId(id);
    await deletePropertyUniversally(id);
    await loadProperties();
    setActionLoadingId(null);
    showToast(`Removed "${title}" from directory`);
  };

  const pendingProperties = properties.filter(p => !p.verifiedByUniNest);
  const verifiedProperties = properties.filter(p => !!p.verifiedByUniNest);

  const displayedProperties = properties.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.configuration && p.configuration.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeTab === 'PENDING') return !p.verifiedByUniNest;
    if (activeTab === 'VERIFIED') return !!p.verifiedByUniNest;
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

      {/* Hero Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-primary-orange/20 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                UniNest Quality & Trust Center
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight flex items-center gap-3">
              Verification Centre
            </h1>
            <p className="text-white/80 text-base md:text-lg font-medium max-w-2xl">
              Inspect student flats, verify landlord credentials, and approve badges in 1-click to protect campus renters.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl p-4 backdrop-blur-md shrink-0">
            <div>
              <div className="text-[10px] font-extrabold text-white/60 uppercase tracking-widest">Pending Review</div>
              <div className="text-2xl font-black text-amber-300">{pendingProperties.length} Properties</div>
            </div>
            <div className="h-10 w-px bg-white/20 mx-2"></div>
            <div>
              <div className="text-[10px] font-extrabold text-white/60 uppercase tracking-widest">Verified Total</div>
              <div className="text-2xl font-black text-emerald-300">{verifiedProperties.length} Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border-2 border-border shadow-sm">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-border w-full md:w-auto">
          <button
            onClick={() => setActiveTab('PENDING')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'PENDING' ? 'bg-white shadow text-amber-700' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <AlertCircle size={14} className="text-amber-500" />
            Pending Queue ({pendingProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('VERIFIED')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-2 ${
              activeTab === 'VERIFIED' ? 'bg-white shadow text-emerald-700' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <ShieldCheck size={14} className="text-emerald-500" />
            Verified ({verifiedProperties.length})
          </button>
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all ${
              activeTab === 'ALL' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            All Inventory ({properties.length})
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search flats to inspect..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-border rounded-xl text-xs font-bold focus:outline-none focus:border-primary-blue transition-colors"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Cols: Main Verification Cards */}
        <div className="lg:col-span-2 space-y-4">
          {displayedProperties.map(property => {
            const isApproved = !!property.verifiedByUniNest;
            const isLoading = actionLoadingId === property.id;

            return (
              <div 
                key={property.id} 
                className={`bg-white rounded-3xl border-2 transition-all shadow-sm overflow-hidden ${
                  isApproved ? 'border-emerald-200 hover:border-emerald-400' : 'border-amber-200 hover:border-amber-400'
                }`}
              >
                {/* Header row */}
                <div className={`p-4 px-6 border-b flex flex-wrap justify-between items-center gap-3 ${
                  isApproved ? 'bg-emerald-50/60 border-emerald-100' : 'bg-amber-50/60 border-amber-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border overflow-hidden shrink-0 shadow-sm">
                      <img 
                        src={property.imageUrl} 
                        alt={property.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'; }}
                      />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-gray-900 text-base leading-snug hover:text-primary-blue transition-colors">
                        <Link href={`/student/property/${property.id}`} target="_blank">
                          {property.title}
                        </Link>
                      </h3>
                      <p className="text-xs font-bold text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin size={12} className="text-primary-orange" />
                        {property.location} • <span className="font-mono text-slate-600">ID: {property.id}</span>
                      </p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
                    isApproved 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                      : 'bg-amber-100 text-amber-800 border-amber-300'
                  }`}>
                    {isApproved ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                    {isApproved ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Known Rent</span>
                      <span className="text-base font-black text-slate-900 flex items-center">
                        <IndianRupee size={14} className="mr-0.5 text-slate-600" />
                        {property.rent?.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Type & Layout</span>
                      <span className="text-xs font-extrabold text-slate-800 block truncate">
                        {property.configuration || property.type || 'Flat'}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Distance</span>
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {property.distanceKm} km to JKLU
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-0.5">Listing Source</span>
                      <span className="text-xs font-extrabold text-primary-blue block truncate">
                        {property.source || 'Direct Entry'}
                      </span>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-44 shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                    {!isApproved ? (
                      <button
                        onClick={() => handleApprove(property.id, property.title)}
                        disabled={isLoading}
                        className="flex-1 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <CheckCircle2 size={15} />
                        {isLoading ? 'Approving...' : 'Approve & Verify'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRejectOrRevoke(property.id, property.title)}
                        disabled={isLoading}
                        className="flex-1 w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 disabled:opacity-50"
                      >
                        <Clock size={15} />
                        {isLoading ? 'Updating...' : 'Revoke Verified'}
                      </button>
                    )}

                    <div className="flex gap-2">
                      <Link
                        href={`/student/property/${property.id}`}
                        target="_blank"
                        className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye size={13} /> Inspect
                      </Link>

                      <button
                        onClick={() => handleMarkUnavailable(property.id, property.title)}
                        disabled={isLoading}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors border border-red-200"
                        title="Mark Unavailable / Delete"
                      >
                        <XCircle size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {displayedProperties.length === 0 && (
            <div className="bg-white p-16 rounded-3xl border-2 border-border text-center shadow-sm">
              <ShieldCheck size={48} className="mx-auto text-emerald-500 mb-3" />
              <h3 className="text-lg font-black text-gray-900">Queue is Clear!</h3>
              <p className="text-xs font-semibold text-gray-500 mt-1 max-w-sm mx-auto">
                No properties pending verification match your current filter. All student listings are verified and approved.
              </p>
            </div>
          )}
        </div>

        {/* Right Col: Trust & Verification Activity */}
        <div className="space-y-6">
          
          {/* Quick Stats Summary */}
          <div className="bg-white p-6 rounded-3xl border-2 border-border shadow-sm space-y-4">
            <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Sparkles size={18} className="text-primary-orange" /> Verification Standards
            </h3>
            
            <div className="space-y-3 text-xs text-gray-600 font-medium">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold">Physical or Geo-Check</strong>
                  Validates exact latitude/longitude coordinates near JKLU campus.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold">Transparent Rent Formula</strong>
                  Deposit, electricity, and maintenance disclosed upfront with no hidden broker fee.
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-gray-900 block font-bold">Verified Green Badge</strong>
                  Once approved, flats appear with the official UniNest Verified badge in Explore.
                </div>
              </div>
            </div>
          </div>

          {/* Recently Verified Stream */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200/80 p-6 rounded-3xl shadow-sm">
            <h3 className="text-base font-extrabold text-emerald-950 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              Verified Feed ({verifiedProperties.length})
            </h3>
            <p className="text-xs font-semibold text-emerald-700 mb-4">
              Currently approved and verified across student explore and map searches:
            </p>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {verifiedProperties.map(property => (
                <div 
                  key={property.id} 
                  className="bg-white p-3.5 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="min-w-0">
                    <Link 
                      href={`/student/property/${property.id}`} 
                      target="_blank"
                      className="font-extrabold text-xs text-gray-900 hover:text-emerald-700 block truncate"
                    >
                      {property.title}
                    </Link>
                    <span className="text-[10px] font-bold text-gray-500 block mt-0.5">
                      {property.location} • ₹{property.rent?.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleRejectOrRevoke(property.id, property.title)}
                    className="text-[10px] font-black uppercase text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-lg border border-amber-200 shrink-0 transition-colors"
                    title="Click to revoke badge"
                  >
                    Revoke
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
