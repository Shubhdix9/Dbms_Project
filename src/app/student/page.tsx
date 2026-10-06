'use client';

import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle, IndianRupee, Percent, Users, Home } from 'lucide-react';

export default function StudentOverview() {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="bg-surface rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
            Find a place you'll <span className="text-primary-green relative">
              actually love living in.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-light-green -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Compare housing, real monthly costs and roommate compatibility around JKLU.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/student/roommates" 
              className="bg-primary-green text-white px-8 py-3.5 rounded-xl font-medium hover:bg-opacity-90 transition-all shadow-sm flex items-center"
            >
              Find my best match <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link 
              href="/student/explore" 
              className="bg-surface-light text-foreground border border-border px-8 py-3.5 rounded-xl font-medium hover:border-primary-green hover:text-primary-green transition-all"
            >
              Explore properties
            </Link>
          </div>
        </div>
        
        <div className="absolute right-0 top-0 w-1/3 h-full bg-light-green rounded-l-full opacity-30 blur-3xl hidden md:block"></div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'True monthly cost', value: '₹9,450', icon: IndianRupee, color: 'text-primary-green' },
          { label: 'Best overall match', value: '94%', icon: Percent, color: 'text-foreground' },
          { label: 'Closest recommended', value: '1.2 km', icon: MapPin, color: 'text-foreground' },
          { label: 'Compatible roommates', value: '6', icon: Users, color: 'text-primary-green' },
        ].map((stat, i) => (
          <div key={i} className="bg-surface p-6 rounded-2xl border border-border hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <stat.icon size={20} className={stat.color} />
            </div>
            <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Smart Recommendation */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Your best living arrangement</h2>
        
        <div className="bg-surface rounded-3xl border border-border p-1">
          <div className="grid md:grid-cols-2 gap-0 relative">
            {/* Divider in middle for desktop */}
            <div className="hidden md:block absolute top-8 bottom-8 left-1/2 w-px bg-border -translate-x-1/2"></div>
            
            {/* Left: Property Info */}
            <div className="p-8 md:pr-12">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">Property Recommendation</span>
                <span className="flex items-center text-xs font-medium bg-light-green text-primary-green px-2 py-1 rounded">
                  <CheckCircle size={12} className="mr-1" /> Verified
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-2">JKLU Student Residence</h3>
              <p className="text-text-secondary mb-6">3 BHK • Shared room • Mahapura • 1.2 km from JKLU</p>
              
              <div className="bg-surface-light rounded-xl p-5 mb-6 border border-border">
                <div className="text-sm text-text-secondary mb-1">True monthly cost</div>
                <div className="text-3xl font-bold text-foreground">₹9,450 <span className="text-lg font-normal text-text-secondary">/ month</span></div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-foreground">Why this matches you:</h4>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center"><CheckCircle size={16} className="text-primary-green mr-2" /> Under your budget</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-primary-green mr-2" /> 1.2 km from JKLU</li>
                  <li className="flex items-center"><CheckCircle size={16} className="text-primary-green mr-2" /> Furnished & Wi-Fi</li>
                </ul>
              </div>
            </div>
            
            {/* Right: Roommate Info & Match Score */}
            <div className="p-8 md:pl-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">Roommate Match</span>
                </div>
                
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-light-green border-2 border-primary-green flex items-center justify-center text-primary-green font-bold text-xl mr-4">
                    RA
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Rahul Mehta</h3>
                    <p className="text-sm text-text-secondary">B.Tech CSE • Year 2</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Housing Match (60%)</span>
                    <span className="font-semibold text-foreground">91%</span>
                  </div>
                  <div className="w-full bg-surface-light rounded-full h-1.5">
                    <div className="bg-text-secondary h-1.5 rounded-full" style={{ width: '91%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text-secondary">Roommate Match (40%)</span>
                    <span className="font-semibold text-foreground">98%</span>
                  </div>
                  <div className="w-full bg-surface-light rounded-full h-1.5">
                    <div className="bg-text-secondary h-1.5 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-light-green rounded-xl p-5 border border-primary-green/20 flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs font-bold tracking-widest text-primary-green uppercase mb-1">Overall Match</div>
                  <div className="text-sm text-primary-green/80">Housing × 0.6 + Roommate × 0.4</div>
                </div>
                <div className="text-3xl font-bold text-primary-green">94%</div>
              </div>
              
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-primary-green text-white py-3 rounded-xl font-medium hover:bg-opacity-90 transition-colors">
                  View combination
                </button>
                <button className="px-5 bg-surface border border-border text-foreground py-3 rounded-xl font-medium hover:border-primary-green transition-colors">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
