'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Users, 
  Building, 
  ShieldAlert, 
  CalendarCheck, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { name: '1. Command Centre', href: '/admin' },
  { name: '2. Students', href: '/admin/students' },
  { name: '3. Properties', href: '/admin/properties' },
  { name: '4. Verifications', href: '/admin/verification' },
];

const drawerItems = [
  { name: 'Command Centre', href: '/admin', icon: Home },
  { name: 'Students', href: '/admin/students', icon: Users },
  { name: 'Properties', href: '/admin/properties', icon: Building },
  { name: 'Verification', href: '/admin/verification', icon: ShieldAlert },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Leases', href: '/admin/leases', icon: FileText },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'System Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
            <span className="font-bold text-sm hidden sm:inline-block tracking-widest uppercase">Admin</span>
          </button>
        </div>

        {/* Center: Desktop Navigation Pills */}
        <nav className="hidden md:flex items-center bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname === '/admin' && item.href === '/admin/explore');
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
          <Link href="/admin/settings" className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-all px-3 py-1.5 rounded-full border border-white/20 backdrop-blur-sm cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-primary-blue text-[10px] font-bold">
              AD
            </div>
            <span className="text-white text-sm font-medium pr-1">System <span className="hidden lg:inline text-white">Admin</span></span>
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
              <span className="text-white font-extrabold tracking-widest text-xs uppercase flex items-center"><ShieldCheck size={14} className="mr-2"/> SYSTEM ADMIN</span>
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
                        ? 'bg-white text-primary-blue shadow-sm' 
                        : 'text-white/70 hover:bg-white/10 hover:text-white'}
                    `}
                  >
                    <Icon size={18} className={`mr-4 ${isActive ? 'text-primary-blue' : 'text-white/70'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Bottom Account Section */}
            <div className="p-6 border-t border-white/10 mt-auto bg-black/20 space-y-4">
              <div className="flex items-center bg-white/10 border border-white/20 p-3 rounded-2xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 shrink-0">
                    <ShieldAlert size={14} className="text-primary-blue" />
                 </div>
                 <span className="text-xs font-extrabold text-white tracking-wide">Root Access</span>
              </div>
              
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-2 py-2 text-white/70 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mr-3 shrink-0 shadow-md group-hover:bg-white/20 transition-colors">
                   <LogOut size={14} className="text-white" />
                </div>
                <span className="text-sm font-bold">Log Out</span>
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
