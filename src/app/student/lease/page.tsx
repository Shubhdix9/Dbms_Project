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
    <div className="space-y-8 pb-12 max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Lease</h1>
          <p className="text-text-secondary">Your current rental agreement and payment records.</p>
        </div>
        <button className="bg-surface-light border border-border px-4 py-2 rounded-xl text-sm font-medium text-foreground hover:border-primary-green transition-colors flex items-center">
          <Download size={14} className="mr-2" /> Download PDF
        </button>
      </div>

      {/* Active Lease Card */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="bg-light-green p-4 flex items-center justify-between border-b border-primary-green/10">
          <div className="flex items-center">
            <CheckCircle size={18} className="text-primary-green mr-2" />
            <span className="text-sm font-bold text-primary-green">Active Lease</span>
          </div>
          <span className="text-xs text-text-secondary font-mono">{lease.agreementId}</span>
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
                <div className="flex justify-between"><span className="text-text-secondary">Base Rent</span><span className="font-medium text-foreground">₹{lease.monthlyRent.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-text-secondary">Maintenance</span><span className="font-medium text-foreground">₹{lease.maintenance.toLocaleString()}</span></div>
                <div className="border-t border-border pt-2 flex justify-between font-bold"><span>Total</span><span className="text-primary-green">₹{(lease.monthlyRent + lease.maintenance).toLocaleString()}</span></div>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-[10px] text-text-secondary uppercase tracking-wider font-bold block mb-1">Security Deposit</span>
                <span className="font-medium text-foreground">₹{lease.securityDeposit.toLocaleString()} <span className="text-xs text-primary-green">({lease.depositStatus})</span></span>
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
      <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle size={18} className="text-orange-500 mr-3" />
          <div>
            <span className="text-sm font-bold text-foreground">Next Payment Due</span>
            <p className="text-xs text-text-secondary">{lease.nextPaymentDue} • ₹{(lease.monthlyRent + lease.maintenance).toLocaleString()}</p>
          </div>
        </div>
        <button className="bg-primary-green text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all">Pay Now</button>
      </div>

      {/* Payment History */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="font-bold text-foreground">Payment History</h2>
        </div>
        <div className="divide-y divide-border">
          {lease.paymentHistory.map((p, i) => (
            <div key={i} className="p-4 flex items-center justify-between">
              <div>
                <span className="font-medium text-foreground">{p.month}</span>
                <p className="text-xs text-text-secondary">Paid on {p.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">₹{p.amount.toLocaleString()}</span>
                <span className="text-xs font-bold text-primary-green bg-light-green px-2 py-1 rounded-full">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
