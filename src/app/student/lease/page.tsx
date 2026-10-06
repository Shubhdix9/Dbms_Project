'use client';

import { FileText, Calendar, IndianRupee, CheckCircle, AlertTriangle, Download, Home } from 'lucide-react';

export default function MyLease() {
  const lease = {
    propertyName: 'Vardhman Empire Estate',
    unit: 'Flat 302, Block A',
    config: '1 BHK • Semi Furnished',
    landlord: 'Rajesh Sharma',
    landlordPhone: '+91 98291 XXXXX',
    startDate: 'Aug 1, 2026',
    endDate: 'Jul 31, 2027',
    monthlyRent: 15000,
    securityDeposit: 30000,
    depositStatus: 'Paid',
    maintenance: 1500,
    electricity: 'Separate meter (tenant pays)',
    internet: 'Included (50 Mbps)',
    status: 'Active',
    agreementId: 'UNINEST-2026-0847',
    nextPaymentDue: 'Nov 1, 2026',
    paymentHistory: [
      { month: 'Oct 2026', amount: 16500, status: 'Paid', date: 'Oct 1, 2026' },
      { month: 'Sep 2026', amount: 16500, status: 'Paid', date: 'Sep 2, 2026' },
      { month: 'Aug 2026', amount: 16500, status: 'Paid', date: 'Aug 1, 2026' },
    ]
  };

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto mt-4">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">My Lease</h1>
          <p className="text-text-secondary">Your current rental agreement and payment records.</p>
        </div>
        <button className="bg-white border-2 border-border px-5 py-2.5 rounded-xl text-sm font-bold text-primary-blue hover:border-primary-blue transition-colors flex items-center shadow-sm">
          <Download size={16} className="mr-2" /> Download PDF
        </button>
      </div>

      {/* Active Lease Card */}
      <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-primary-blue p-4 flex items-center justify-between border-b border-primary-blue/20">
          <div className="flex items-center">
            <CheckCircle size={18} className="text-white mr-2" />
            <span className="text-sm font-bold text-white tracking-wide uppercase">Active Lease</span>
          </div>
          <span className="text-xs text-white/80 font-mono tracking-widest">{lease.agreementId}</span>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Property</span>
              <span className="font-bold text-foreground text-lg">{lease.propertyName}</span>
              <p className="text-sm text-text-secondary">{lease.unit} • {lease.config}</p>
            </div>
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Landlord</span>
              <span className="text-foreground font-medium">{lease.landlord}</span>
              <p className="text-xs text-text-secondary">{lease.landlordPhone}</p>
            </div>
            <div>
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Lease Period</span>
              <span className="text-foreground font-medium">{lease.startDate} → {lease.endDate}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-surface-light rounded-xl p-4 border border-border">
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-2">Monthly Breakdown</span>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text-secondary font-medium">Base Rent</span><span className="font-bold text-foreground">₹{lease.monthlyRent.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary font-medium">Maintenance</span><span className="font-bold text-foreground">₹{lease.maintenance.toLocaleString()}</span></div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-base"><span>Total</span><span className="text-primary-blue">₹{(lease.monthlyRent + lease.maintenance).toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex gap-6 text-sm bg-surface-light p-4 rounded-xl border border-border">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Security Deposit</span>
                <span className="font-bold text-foreground">₹{lease.securityDeposit.toLocaleString()} <span className="text-xs text-success ml-1">({lease.depositStatus})</span></span>
              </div>
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Internet</span>
                <span className="font-medium text-foreground">{lease.internet}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Payment Due */}
      <div className="bg-white border-2 border-primary-orange/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-primary-orange"></div>
        <div className="flex items-center pl-2">
          <div className="w-10 h-10 rounded-full bg-light-orange flex items-center justify-center mr-4 shrink-0">
            <AlertTriangle size={20} className="text-primary-orange" />
          </div>
          <div>
            <span className="text-base font-extrabold text-foreground">Next Payment Due</span>
            <p className="text-sm font-medium text-text-secondary mt-0.5">{lease.nextPaymentDue} • <span className="text-primary-orange font-bold">₹{(lease.monthlyRent + lease.maintenance).toLocaleString()}</span></p>
          </div>
        </div>
        <button className="bg-primary-orange text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all shadow-sm">Pay Now</button>
      </div>

      {/* Payment History */}
      <div className="bg-white border-2 border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-surface-light/50">
          <h2 className="font-extrabold text-foreground uppercase tracking-wide">Payment History</h2>
        </div>
        <div className="divide-y divide-border">
          {lease.paymentHistory.map((p, i) => (
            <div key={i} className="p-5 flex items-center justify-between hover:bg-surface-light/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success-light rounded-xl flex items-center justify-center text-success shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <span className="font-bold text-foreground block">{p.month}</span>
                  <p className="text-xs font-medium text-text-secondary mt-0.5">Paid on {p.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-extrabold text-foreground text-lg">₹{p.amount.toLocaleString()}</span>
                <span className="text-xs font-bold text-success bg-success-light px-3 py-1.5 rounded-full uppercase tracking-wider">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
