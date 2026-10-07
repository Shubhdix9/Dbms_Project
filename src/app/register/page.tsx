'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, ShieldCheck, GraduationCap, Building, User, Phone, BookOpen, Calendar, MapPin } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function Register() {
  const router = useRouter();
  const [role, setRole] = useState<'landlord' | 'student'>('student');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Student specific
  const [collegeName, setCollegeName] = useState('JK Lakshmipat University');
  const [course, setCourse] = useState('');
  const [year, setYear] = useState('1');
  const [gender, setGender] = useState('MALE');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (role === 'student' && email.includes('@') && !email.endsWith('@jklu.edu.in')) {
      // Just a warning, not a hard block as per requirements
      console.warn("Email is not a jklu.edu.in address, but proceeding.");
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          name,
          phone,
          ...(role === 'student' && {
            college_name: collegeName,
            course,
            year: parseInt(year),
            gender
          })
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      setSuccess('Account created successfully! Please check your email to verify your account.');
      setLoading(false);
      // Optional: reset form
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden font-sans py-12">
      
      {/* Background Orbs (Premium aesthetic) */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-blue/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-primary-orange/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none"></div>

      <div className="z-10 w-full max-w-xl px-4 flex flex-col items-center">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-blue rounded-3xl shadow-sm flex items-center justify-center mb-3 border-2 border-primary-blue/20 p-1 overflow-hidden transform rotate-3">
             <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-2xl font-black text-primary-orange">
               U
             </div>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-black text-primary-blue tracking-tight uppercase">UNINEST</h1>
            <span className="bg-light-orange text-primary-orange text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary-orange/20 uppercase tracking-widest">
              Join
            </span>
          </div>
          <p className="text-sm font-bold text-text-secondary text-center">
            Create your account
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white w-full rounded-[2rem] shadow-xl shadow-primary-blue/5 p-8 border-2 border-border relative">
          
          <div className="mb-6 text-center">
            <h2 className="text-[11px] font-extrabold tracking-widest text-text-secondary uppercase">Select Your Role</h2>
          </div>

          {/* Role Segmented Control */}
          <div className="bg-surface-light p-1.5 rounded-2xl flex items-center justify-between mb-8 border border-border">
            <button
              type="button"
              onClick={() => { setRole('landlord'); setError(''); setSuccess(''); }}
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
              onClick={() => { setRole('student'); setError(''); setSuccess(''); }}
              className={`flex-1 flex items-center justify-center py-2.5 rounded-xl text-xs font-bold transition-all ${
                role === 'student' 
                  ? 'bg-white text-primary-blue shadow-sm border border-border' 
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              <GraduationCap size={14} className="mr-1.5" /> Student
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl text-xs font-bold text-green-600 flex flex-col gap-3">
              {success}
              <button 
                onClick={() => router.push('/')}
                className="bg-green-600 text-white py-2 rounded-lg text-xs hover:bg-green-700 transition-colors"
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Form */}
          {!success && (
            <form onSubmit={handleRegister} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                      <User size={14} />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">
                    {role === 'student' ? 'College Email' : 'Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                      <Mail size={14} />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                      placeholder={role === 'student' ? 'student@jklu.edu.in' : 'name@example.com'}
                      required
                    />
                  </div>
                  {role === 'student' && email && !email.endsWith('@jklu.edu.in') && (
                     <p className="text-[9px] text-primary-orange mt-1 ml-1 font-bold">Use @jklu.edu.in for best experience</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                      <Phone size={14} />
                    </div>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                      placeholder="+91 9876543210"
                      required
                    />
                  </div>
                </div>

                {role === 'student' && (
                  <>
                    {/* College */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">College</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                          <MapPin size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                          placeholder="University Name"
                          required
                        />
                      </div>
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Course</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                          <BookOpen size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                          placeholder="e.g. B.Tech CS"
                          required
                        />
                      </div>
                    </div>

                    {/* Year */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Year</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                          <Calendar size={14} />
                        </div>
                        <input 
                          type="number" 
                          min="1" max="5"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                          placeholder="1"
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Gender</label>
                      <div className="relative">
                        <select 
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-3 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all appearance-none"
                          required
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Password */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                      <Lock size={14} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[10px] uppercase font-extrabold text-foreground mb-1.5 ml-1">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-secondary">
                      <Lock size={14} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-9 py-2.5 bg-surface-light border-2 border-border rounded-xl text-xs font-bold text-foreground focus:outline-none focus:border-primary-orange transition-all"
                      placeholder="••••••••"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary-orange transition-colors">
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-blue hover:bg-blue-900 text-white text-sm font-extrabold py-3.5 rounded-xl transition-all shadow-md flex justify-center items-center mt-6 disabled:opacity-70"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          )}

          {/* Links */}
          <div className="mt-6 text-center space-y-3">
             <button onClick={() => router.push('/')} className="text-xs font-bold text-text-secondary hover:text-primary-blue transition-colors">
               Already have an account? Sign In →
             </button>
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
