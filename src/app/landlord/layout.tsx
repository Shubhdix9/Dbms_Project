'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building, 
  PlusCircle, 
  CalendarCheck, 
  Users, 
  FileText, 
  Star, 
  ShieldCheck,
  User,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/landlord', icon: Home },
  { name: 'My Properties', href: '/landlord/properties', icon: Building },
  { name: 'Add Property', href: '/landlord/add-property', icon: PlusCircle },
  { name: 'Bookings', href: '/landlord/bookings', icon: CalendarCheck },
  { name: 'Tenants', href: '/landlord/tenants', icon: Users },
  { name: 'Leases', href: '/landlord/leases', icon: FileText },
  { name: 'Reviews', href: '/landlord/reviews', icon: Star },
  { name: 'Verification', href: '/landlord/verification', icon: ShieldCheck },
  { name: 'Profile', href: '/landlord/profile', icon: User },
];

export default function LandlordLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-blue-900 rounded mr-3"></div>
          <span className="font-bold text-xl text-foreground tracking-tight">UniNest</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-text-secondary">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col
        md:translate-x-0 md:static md:w-64
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pb-2">
          <div className="flex items-center mb-8">
            <div className="w-8 h-1 bg-blue-900 rounded mr-3"></div>
            <div>
              <h1 className="font-bold text-xl text-foreground tracking-tight">UniNest</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Landlord Portal</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? 'bg-blue-50 text-blue-900 font-medium' 
                    : 'text-text-secondary hover:bg-surface-light hover:text-foreground'}
                `}
              >
                <Icon size={18} className="mr-3" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center p-3 mb-4 rounded-xl bg-surface-light border border-border">
            <ShieldCheck size={16} className="text-blue-900 mr-2" />
            <span className="text-xs font-semibold text-foreground">Verified Landlord</span>
          </div>
          
          <Link href="/" className="flex items-center px-4 py-3 text-text-secondary hover:text-danger transition-colors rounded-xl hover:bg-red-50">
            <LogOut size={18} className="mr-3" />
            <span className="text-sm">Log Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-surface border-b border-border hidden md:flex items-center justify-between px-8">
          <div className="flex items-center">
            <span className="text-sm font-medium text-text-secondary">
              Welcome back, Landlord
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-text-secondary hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-900 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-surface">
                1
              </span>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-sm border border-border">
              LL
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
