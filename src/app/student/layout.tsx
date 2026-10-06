'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Search, 
  Map, 
  Users, 
  Settings, 
  Heart, 
  CalendarCheck, 
  FileText, 
  Star, 
  User,
  Bell,
  CheckCircle2,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: 'Rooms', href: '/student/explore', icon: Search },
  { name: 'Roommates', href: '/student/roommates', icon: Users },
  { name: 'Overview', href: '/student', icon: Home },
  { name: 'Map View', href: '/student/map', icon: Map },
  { name: 'My Preferences', href: '/student/preferences', icon: Settings },
  { name: 'Saved Properties', href: '/student/saved', icon: Heart },
  { name: 'Bookings', href: '/student/bookings', icon: CalendarCheck },
  { name: 'My Lease', href: '/student/lease', icon: FileText },
  { name: 'Reviews', href: '/student/reviews', icon: Star },
  { name: 'Profile', href: '/student/profile', icon: User },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-border">
        <div className="flex items-center">
          <div className="w-8 h-1 bg-primary-green rounded mr-3"></div>
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
            <div className="w-8 h-1 bg-primary-green rounded mr-3"></div>
            <div>
              <h1 className="font-bold text-xl text-foreground tracking-tight">UniNest</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-text-secondary">Student Portal</span>
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
                    ? 'bg-light-green text-primary-green font-medium' 
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
            <CheckCircle2 size={16} className="text-primary-green mr-2" />
            <span className="text-xs font-semibold text-foreground">JKLU Verified Student</span>
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
        <header className="h-16 bg-surface border-b border-border hidden md:flex items-center justify-between px-8 relative">
          <div className="flex items-center w-1/3">
            <span className="text-sm font-medium text-text-secondary flex items-center">
              <span className="w-2 h-2 rounded-full bg-primary-green mr-2"></span>
              JKLU · Mahapura
            </span>
          </div>

          {/* Center Toggle: Rooms / Roommates */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex bg-surface-light p-1 rounded-xl border border-border">
            <Link 
              href="/student/explore"
              className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${pathname === '/student/explore' ? 'bg-white text-primary-green shadow-sm' : 'text-text-secondary hover:text-foreground'}`}
            >
              Rooms
            </Link>
            <Link 
              href="/student/roommates"
              className={`px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${pathname === '/student/roommates' ? 'bg-white text-primary-green shadow-sm' : 'text-text-secondary hover:text-foreground'}`}
            >
              Roommates
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 w-1/3 justify-end">
            <div className="relative hidden lg:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search properties, areas... (⌘K)" 
                className="pl-10 pr-4 py-1.5 bg-surface-light border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary-green transition-colors w-64"
              />
            </div>
            
            <button className="relative text-text-secondary hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-green rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-surface">
                3
              </span>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-light-green flex items-center justify-center text-primary-green font-bold text-sm border border-border">
              RM
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
