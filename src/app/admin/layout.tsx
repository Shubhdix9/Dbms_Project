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
  Bell,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <ShieldCheck size={24} className="text-red-700 mr-2" />
          <span className="font-bold text-xl text-gray-900 tracking-tight">UniNest</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-500">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-gray-100 transform transition-transform duration-300 ease-in-out flex flex-col
        md:translate-x-0 md:static md:w-64
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 pb-2">
          <div className="flex items-center mb-8">
            <ShieldCheck size={28} className="text-red-500 mr-3" />
            <div>
              <h1 className="font-bold text-xl text-white tracking-tight">UniNest</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Admin Console</span>
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
                    ? 'bg-red-500/10 text-red-400 font-medium' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-100'}
                `}
              >
                <Icon size={18} className="mr-3" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-800 mt-auto">
          <Link href="/" className="flex items-center px-4 py-3 text-gray-400 hover:text-red-400 transition-colors rounded-xl hover:bg-gray-800">
            <LogOut size={18} className="mr-3" />
            <span className="text-sm">Log Out</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation */}
        <header className="h-16 bg-white border-b border-gray-200 hidden md:flex items-center justify-between px-8">
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-500">
              System Health: <span className="text-emerald-500 font-bold ml-1">Excellent</span>
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">
                5
              </span>
            </button>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm border border-red-200 mr-2">
                AD
              </div>
              <span className="text-sm font-medium text-gray-900">System Admin</span>
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
