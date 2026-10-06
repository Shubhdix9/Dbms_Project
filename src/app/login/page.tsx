'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Building, ShieldCheck, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<'student' | 'landlord' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'landlord' || roleParam === 'admin') {
      setRole(roleParam);
    } else {
      setRole('student');
    }
  }, [searchParams]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend-only fake validation & routing
    router.push(`/${role}`);
  };

  const roleConfig = {
    student: {
      title: 'Student Login',
      icon: <GraduationCap size={32} className="text-primary-green" />,
      emailLabel: 'University Email',
      emailPlaceholder: 'student@jklu.edu.in',
      demoEmail: 'demo.student@jklu.edu.in'
    },
    landlord: {
      title: 'Landlord Login',
      icon: <Building size={32} className="text-primary-green" />,
      emailLabel: 'Email Address',
      emailPlaceholder: 'landlord@example.com',
      demoEmail: 'demo.landlord@example.com'
    },
    admin: {
      title: 'Admin Portal',
      icon: <ShieldCheck size={32} className="text-primary-green" />,
      emailLabel: 'Admin ID / Email',
      emailPlaceholder: 'admin@jklu.edu.in',
      demoEmail: 'demo.admin@jklu.edu.in'
    }
  };

  const currentRole = roleConfig[role];

  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-2xl shadow-xl border border-border p-8 relative">
        <Link href="/" className="absolute top-6 left-6 text-text-secondary hover:text-foreground transition-colors flex items-center text-sm font-medium">
          <ArrowLeft size={16} className="mr-1" /> Back
        </Link>
        
        <div className="flex flex-col items-center mt-6 mb-8 text-center">
          <div className="w-16 h-16 bg-light-green rounded-2xl flex items-center justify-center mb-4">
            {currentRole.icon}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{currentRole.title}</h2>
          <p className="text-sm text-text-secondary">Welcome back to UniNest</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">{currentRole.emailLabel}</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                placeholder={currentRole.emailPlaceholder}
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-medium text-foreground">Password</label>
              <a href="#" className="text-xs font-medium text-primary-green hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-surface-light border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary-green/20 focus:border-primary-green transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input 
              id="remember" 
              type="checkbox" 
              className="w-4 h-4 rounded border-border text-primary-green focus:ring-primary-green/20"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-text-secondary">Remember me</label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary-green hover:bg-opacity-90 text-white font-medium py-3 rounded-xl transition-all shadow-sm flex justify-center items-center"
          >
            Continue
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <button 
            type="button"
            onClick={() => {
              setEmail(currentRole.demoEmail);
              setPassword('demo123');
            }}
            className="text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
          >
            Use demo account
          </button>
        </div>
      </div>
    </div>
  );
}
