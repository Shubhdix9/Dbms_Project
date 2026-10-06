'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Map, 
  Users, 
  Settings, 
  Heart, 
  CalendarCheck, 
  FileText, 
  Star, 
  LogOut,
  Menu,
  X,
  Search,
  User,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const navItems = [
  { name: '1. Explore & Map', href: '/student/explore' },
  { name: '2. Roommate', href: '/student/roommates' },
  { name: '3. My Bookings', href: '/student/bookings' },
  { name: '4. My Lease', href: '/student/lease' },
];

const drawerItems = [
  { name: 'Rooms', href: '/student/explore', icon: Search },
  { name: 'Roommates', href: '/student/roommates', icon: Users },
  { name: 'Overview', href: '/student/overview', icon: Home },
  { name: 'My Preferences', href: '/student/preferences', icon: Settings },
  { name: 'Saved Properties', href: '/student/saved', icon: Heart },
  { name: 'Bookings', href: '/student/bookings', icon: Calendar },
  { name: 'My Lease', href: '/student/lease', icon: FileText },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Top Header Navigation (Shuttle Style) */}
      <header className="bg-primary-blue h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-[1000] shadow-sm">
        
        {/* Left: Menu Button */}
        <div className="flex items-center w-32">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Menu size={24} />
            <span className="font-bold text-sm hidden sm:inline-block tracking-widest uppercase">Menu</span>
          </button>
        </div>

        {/* Center: Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === '/student' && item.href === '/student/explore');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap
                  ${isActive 
                    ? 'bg-white text-primary-blue shadow-md' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'}
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: Profile & Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link href="/student/profile" className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-[10px] font-bold">
              RM
            </div>
            <span className="text-white text-sm font-medium pr-1">Rahul <span className="hidden lg:inline">Mehta</span></span>
          </Link>
          
          <Link href="/" className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all hidden md:block" title="Logout">
            <LogOut size={18} />
          </Link>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Side Menu Drawer (Works on both desktop & mobile) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="relative w-72 bg-primary-blue shadow-2xl flex flex-col h-full animate-in slide-in-from-left duration-300">
            <div className="p-6 pb-4 flex items-center justify-between">
              <span className="text-white/60 font-extrabold tracking-widest text-xs uppercase">STUDENT PORTAL</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white/60 hover:text-white p-1 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex flex-col p-4 pt-2 space-y-1 overflow-y-auto flex-1">
              {drawerItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      px-4 py-3 rounded-2xl text-sm font-bold transition-all flex items-center
                      ${isActive 
                        ? 'bg-primary-orange text-white shadow-sm' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <Icon size={18} className={`mr-4 ${isActive ? 'text-white' : 'text-white/70'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Bottom Account Section */}
            <div className="p-6 border-t border-white/10 mt-auto bg-black/20 space-y-4">
              <div className="flex items-center bg-white/10 border border-white/20 p-3 rounded-2xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-primary-orange flex items-center justify-center mr-3 shrink-0">
                    <CheckCircle size={14} className="text-white" />
                 </div>
                 <span className="text-xs font-extrabold text-white tracking-wide">JKLU Verified Student</span>
              </div>
              
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-2 py-2 text-white/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3 shrink-0 shadow-md group-hover:bg-white/20 transition-colors">
                   <span className="text-white font-extrabold text-xs">N</span>
                </div>
                <span className="text-sm font-bold text-red-400">Log Out</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1800px] mx-auto p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
