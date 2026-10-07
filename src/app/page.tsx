'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, ShieldCheck, GraduationCap, Building, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState<'landlord' | 'student' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update email automatically when role changes (demo only)
  useEffect(() => {
    if (role === 'student') setEmail('demo.student@jklu.edu.in');
    if (role === 'landlord') setEmail('demo.landlord@example.com');
    if (role === 'admin') setEmail('demo.admin@jklu.edu.in');
    setPassword('demo123');
  }, [role]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const userRole = data.user.user_metadata?.role;
      // We check if the chosen role matches their actual registered role,
      // except admin which needs secure handling in a real app.
      if (role !== 'admin' && userRole && userRole !== role) {
        setError(`You are registered as a ${userRole}, not a ${role}.`);
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }
      
      router.push(`/${role}`);
    }
  };

  const roleConfig = {
    student: {
      emailLabel: 'University Student Email',
      emailPlaceholder: 'student@jklu.edu.in',
      buttonText: 'SIGN IN TO STUDENT PORTAL',
    },
    landlord: {
      emailLabel: 'Landlord Email',
      emailPlaceholder: 'landlord@example.com',
      buttonText: 'SIGN IN TO LANDLORD PORTAL',
    },
    admin: {
      emailLabel: 'Admin ID / Email',
      emailPlaceholder: 'admin@jklu.edu.in',
      buttonText: 'SIGN IN TO ADMIN PORTAL',
    }
  };

  const currentConfig = roleConfig[role];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Orbs (Premium aesthetic) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary-orange/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>

      <div className="z-10 w-full max-w-md px-4 flex flex-col items-center">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-primary-blue rounded-3xl shadow-sm flex items-center justify-center mb-4 border-2 border-primary-blue/20 p-1 overflow-hidden transform rotate-3">
             <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-3xl font-black text-primary-orange">
               U
             </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-4xl font-black text-primary-blue tracking-tight uppercase">UNINEST</h1>
            <span className="bg-light-orange text-primary-orange text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary-orange/20 uppercase tracking-widest">
              Auth
            </span>
          </div>
          <p className="text-sm font-bold text-text-secondary text-center">
            University Housing & Intelligent Roommate Matching
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white w-full rounded-[2rem] shadow-xl shadow-primary-blue/5 p-8 border-2 border-border relative">
          
          <div className="mb-6 text-center">
            <h2 className="text-[11px] font-extrabold tracking-widest text-text-secondary uppercase">Select Your Portal Role</h2>
          </div>

          {/* Role Segmented Control */}
          <div className="bg-surface-light p-1.5 rounded-2xl flex items-center justify-between mb-8 border border-border">
            <button
              type="button"
              onClick={() => setRole('landlord')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'landlord' 
                  ? 'bg-white text-primary-blue shadow-sm border border-border' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <Building size={14} className="mr-1.5" /> Landlord
            </button>
            <button
              type="button"
              onClick={() => setRole('student')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'student' 
                  ? 'bg-white text-primary-blue shadow-sm border border-border' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <GraduationCap size={14} className="mr-1.5" /> Student
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'admin' 
                  ? 'bg-white text-primary-blue shadow-sm border border-border' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <Shield size={14} className="mr-1.5" /> Admin
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-extrabold text-foreground mb-2 ml-1">{currentConfig.emailLabel}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                  <Mail size={16} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-surface-light border-2 border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                  placeholder={currentConfig.emailPlaceholder}
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-extrabold text-foreground mb-2 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
                  <Lock size={16} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-surface-light border-2 border-border rounded-xl text-sm font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                  placeholder="••••••••"
                  required
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-secondary hover:text-primary-orange transition-colors">
                  <Eye size={16} />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-blue hover:bg-blue-900 text-white text-sm font-extrabold py-4 rounded-xl transition-all shadow-md flex justify-center items-center mt-4 disabled:opacity-70"
            >
              {loading ? 'SIGNING IN...' : currentConfig.buttonText}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
             <button onClick={() => alert('Password reset flow to be implemented')} className="block w-full text-xs font-bold text-text-secondary hover:text-primary-blue transition-colors">
               Forgot Password?
             </button>
             {role !== 'admin' && (
               <button onClick={() => router.push('/register')} className="block w-full text-xs font-bold text-text-secondary hover:text-primary-blue transition-colors">
                 Don't have an account? Create Account →
               </button>
             )}
          </div>
        </div>

        {/* Secure badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-text-secondary opacity-70">
           <ShieldCheck size={16} />
           <span className="text-xs font-bold uppercase tracking-widest">End-to-End Encrypted</span>
        </div>
      </div>
    </div>
  );
}
