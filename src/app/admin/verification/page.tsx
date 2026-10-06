'use client';

import { PROPERTIES } from '@/lib/data';
import { ShieldCheck, AlertCircle, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

export default function VerificationCentre() {
  const pendingProperties = PROPERTIES.filter(p => !p.verifiedByUniNest);
  const verifiedProperties = PROPERTIES.filter(p => p.verifiedByUniNest);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verification Centre</h1>
        <p className="text-gray-500">Review public listings and landlord submissions before approving them for UniNest students.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm col-span-2">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertCircle size={18} className="text-orange-500 mr-2" /> Pending Verification ({pendingProperties.length})
          </h2>
          
          <div className="space-y-4">
            {pendingProperties.map(property => (
              <div key={property.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-gray-900">{property.title}</h3>
                    <p className="text-sm text-gray-500">{property.configuration} • {property.location}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {property.status}
                  </span>
                </div>
                
                <div className="p-4 bg-white flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="block text-gray-500 mb-0.5">Rent</span>
                        <span className="font-medium text-gray-900">₹{property.rent}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 mb-0.5">Source</span>
                        <a href="#" className="font-medium text-blue-600 flex items-center hover:underline">
                          {property.source} <ExternalLink size={12} className="ml-1" />
                        </a>
                      </div>
                      <div>
                        <span className="block text-gray-500 mb-0.5">Last updated</span>
                        <span className="font-medium text-gray-900">{property.listingUpdated}</span>
                      </div>
                      <div>
                        <span className="block text-gray-500 mb-0.5">UniNest checked on</span>
                        <span className="font-medium text-gray-900">{property.checkedAt}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-48 flex flex-col justify-center space-y-2 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
                    <button className="w-full py-2 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex justify-center items-center">
                      <CheckCircle2 size={16} className="mr-1.5" /> Approve
                    </button>
                    <button className="w-full py-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-sm flex justify-center items-center">
                      <XCircle size={16} className="mr-1.5" /> Mark Unavailable
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
              <ShieldCheck size={18} className="text-emerald-600 mr-2" /> Recently Verified
            </h2>
            <div className="space-y-3">
              {verifiedProperties.slice(0, 4).map(property => (
                <div key={property.id} className="bg-white p-3 rounded-lg border border-emerald-100 shadow-sm text-sm">
                  <div className="font-semibold text-gray-900 line-clamp-1">{property.title}</div>
                  <div className="text-gray-500 text-xs mt-1">Verified on {property.checkedAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
