'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, ShieldCheck, GraduationCap, Building, Shield, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<'landlord' | 'student' | 'admin'>('student');
  const [email, setEmail] = useState('demo.student@jklu.edu.in');
  const [password, setPassword] = useState('demo123');

  // Update email automatically when role changes
  useEffect(() => {
    if (role === 'student') setEmail('demo.student@jklu.edu.in');
    if (role === 'landlord') setEmail('demo.landlord@example.com');
    if (role === 'admin') setEmail('demo.admin@jklu.edu.in');
    setPassword('demo123');
  }, [role]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/${role}`);
  };

  const roleConfig = {
    student: {
      emailLabel: 'University Student Email',
      emailPlaceholder: 'student@jklu.edu.in',
      buttonText: 'SIGN IN TO STUDENT PORTAL',
      demoEmail: 'demo.student@jklu.edu.in'
    },
    landlord: {
      emailLabel: 'Landlord Email',
      emailPlaceholder: 'landlord@example.com',
      buttonText: 'SIGN IN TO LANDLORD PORTAL',
      demoEmail: 'demo.landlord@example.com'
    },
    admin: {
      emailLabel: 'Admin ID / Email',
      emailPlaceholder: 'admin@jklu.edu.in',
      buttonText: 'SIGN IN TO ADMIN PORTAL',
      demoEmail: 'demo.admin@jklu.edu.in'
    }
  };

  const currentConfig = roleConfig[role];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center relative overflow-hidden font-sans text-gray-900">
      {/* Subtle dotted background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.4] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', 
          backgroundSize: '24px 24px' 
        }}
      ></div>

      <div className="z-10 w-full max-w-md px-4 flex flex-col items-center">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-gray-200 p-1 overflow-hidden">
            <Image src="/jklu-logo.png" alt="JKLU Logo" width={64} height={64} className="object-contain w-full h-full" priority />
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight uppercase">UNINEST</h1>
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-200">
              AUTH
            </span>
          </div>
          <p className="text-sm font-medium text-gray-500 text-center">
            University Housing & Intelligent Roommate Matching
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white w-full rounded-2xl shadow-xl shadow-gray-200/50 p-8 border border-gray-200">
          <div className="mb-6 text-center">
            <h2 className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">Select Your Portal Role</h2>
          </div>

          {/* Role Segmented Control */}
          <div className="bg-gray-100 p-1 rounded-xl flex items-center justify-between mb-8">
            <button
              type="button"
              onClick={() => setRole('landlord')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'landlord' 
                  ? 'bg-blue-900 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building size={14} className="mr-2" /> Landlord
            </button>
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'student' 
                  ? 'bg-blue-900 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap size={14} className="mr-2" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all ${
                role === 'admin' 
                  ? 'bg-blue-900 text-white shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Shield size={14} className="mr-2" /> Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">{currentConfig.emailLabel}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder={currentConfig.emailPlaceholder}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center mt-2"
            >
              {currentConfig.buttonText} <span className="ml-2 font-normal">→</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center space-y-1">
          {/* Footer removed as requested */}
        </div>
      </div>
    </div>
  );
}
