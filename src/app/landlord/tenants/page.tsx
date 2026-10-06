'use client';

import { STUDENTS, PROPERTIES } from '@/lib/data';
import { Mail, Phone, FileText, CheckCircle, Search, AlertCircle } from 'lucide-react';

export default function LandlordTenants() {
  // Generate some realistic mock active tenants
  const activeTenants = [
    { id: 't1', studentId: 's2', propertyId: 'p7', moveInDate: 'Aug 1, 2026', leaseEnd: 'Jul 31, 2027', paymentStatus: 'Paid', rent: 14000 },
    { id: 't2', studentId: 's6', propertyId: 'p7', moveInDate: 'Aug 15, 2026', leaseEnd: 'Aug 14, 2027', paymentStatus: 'Due Soon', rent: 14000 },
    { id: 't3', studentId: 's8', propertyId: 'p8', moveInDate: 'Sep 1, 2026', leaseEnd: 'Aug 31, 2027', paymentStatus: 'Overdue', rent: 24500 },
  ];

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">Active Tenants</h1>
          <p className="text-text-secondary">Manage your current tenants, view lease details, and track payments.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
          <input 
            type="text" 
            placeholder="Search tenants..." 
            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary-orange transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeTenants.map(tenant => {
          const student = STUDENTS.find(s => s.id === tenant.studentId);
          const property = PROPERTIES.find(p => p.id === tenant.propertyId);
          
          if (!student || !property) return null;

          return (
            <div key={tenant.id} className="bg-white rounded-2xl border-2 border-border p-6 shadow-sm flex flex-col justify-between">
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-surface-light border-2 border-border overflow-hidden shrink-0 shadow-sm flex items-center justify-center font-bold text-xl text-primary-blue">
                     {student.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary-blue flex items-center">
                      {student.name}
                      {student.verified && <CheckCircle size={14} className="text-primary-orange ml-2" />}
                    </h3>
                    <p className="text-xs font-bold text-text-secondary mt-0.5">{student.course} • Year {student.year}</p>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-md border text-[10px] uppercase font-extrabold tracking-wider ${
                  tenant.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' :
                  tenant.paymentStatus === 'Due Soon' ? 'bg-orange-50 text-orange-600 border-orange-200' :
                  'bg-red-50 text-red-600 border-red-200'
                }`}>
                  {tenant.paymentStatus}
                </span>
              </div>

              <div className="bg-surface-light rounded-xl p-4 border border-border mb-6">
                <p className="text-sm font-extrabold text-foreground mb-1">{property.title}</p>
                <div className="flex justify-between items-center text-xs font-bold text-text-secondary mt-2">
                   <span>Lease: {tenant.moveInDate} - {tenant.leaseEnd}</span>
                   <span className="text-foreground">₹{tenant.rent.toLocaleString()}/mo</span>
                </div>
              </div>

              <div className="flex gap-3 mt-auto">
                <button className="flex-1 py-2.5 bg-white border border-border rounded-xl text-xs font-bold text-text-secondary hover:text-primary-blue hover:border-primary-blue transition-colors flex items-center justify-center shadow-sm">
                  <Mail size={14} className="mr-2" /> Message
                </button>
                <button className="flex-1 py-2.5 bg-white border border-border rounded-xl text-xs font-bold text-text-secondary hover:text-primary-blue hover:border-primary-blue transition-colors flex items-center justify-center shadow-sm">
                  <FileText size={14} className="mr-2" /> View Lease
                </button>
                {tenant.paymentStatus !== 'Paid' && (
                  <button className="flex-1 py-2.5 bg-primary-orange text-white rounded-xl text-xs font-bold hover:bg-orange-600 transition-colors flex items-center justify-center shadow-md">
                    <AlertCircle size={14} className="mr-2" /> Remind
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
