'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, User, Phone, BookOpen, Calendar, MapPin, ArrowRight } from 'lucide-react';
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
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans">
      
      {/* Left panel */}
      <div className="hidden lg:block flex-1 h-screen overflow-hidden">
        <img
          src="/login/uninest-panel.jpg"
          alt="UniNest Registration Illustration"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-[500px] xl:w-[540px] px-8 py-12 md:px-12 lg:px-16 bg-white h-screen overflow-y-auto">
        <div className="w-full max-w-[460px] my-auto pt-8 pb-8">
          
          <div className="mb-6">
            <h1 className="text-[32px] font-bold text-[#172338] mb-2 tracking-tight">
              Create Your Account
            </h1>
            <p className="text-[#64748B] text-[15px] mb-1">
              Join UniNest to find your perfect student home.
            </p>
            <p className="text-[#64748B] text-[15px]">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="text-[#1670FF] hover:text-blue-700 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>

          {/* Role Segmented Control */}
          <div className="flex p-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl mb-6">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'student'
                  ? 'bg-white text-[#176B5F] shadow-sm border border-[#E2E8F0]'
                  : 'text-[#64748B] hover:text-[#172338]'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('landlord'); setError(''); setSuccess(''); }}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'landlord'
                  ? 'bg-white text-[#176B5F] shadow-sm border border-[#E2E8F0]'
                  : 'text-[#64748B] hover:text-[#172338]'
              }`}
            >
              Landlord
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {success ? (
            <div className="mb-6 p-5 bg-green-50 border border-green-100 rounded-xl flex flex-col gap-4 text-center">
              <p className="text-sm font-medium text-green-700">{success}</p>
              <button 
                onClick={() => router.push('/login')}
                className="w-full bg-[#176B5F] text-white h-[48px] rounded-xl font-medium hover:bg-[#12584e] transition-colors"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center group">
                  <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                    <User size={18} strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                    {role === 'student' ? 'College Email' : 'Email Address'}
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                      <Mail size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={role === 'student' ? 'student@jklu.edu.in' : 'Enter email'}
                      className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                      <Phone size={18} strokeWidth={2} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                      required
                    />
                  </div>
                </div>
              </div>

              {role === 'student' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* College */}
                    <div>
                      <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                        College / University
                      </label>
                      <div className="relative flex items-center group">
                        <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                          <MapPin size={18} strokeWidth={2} />
                        </div>
                        <input
                          type="text"
                          value={collegeName}
                          onChange={(e) => setCollegeName(e.target.value)}
                          placeholder="e.g. JKLU"
                          className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                          required
                        />
                      </div>
                    </div>

                    {/* Course */}
                    <div>
                      <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                        Course
                      </label>
                      <div className="relative flex items-center group">
                        <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                          <BookOpen size={18} strokeWidth={2} />
                        </div>
                        <input
                          type="text"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          placeholder="e.g. B.Tech CS"
                          className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Year */}
                    <div>
                      <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                        Academic Year
                      </label>
                      <div className="relative flex items-center group">
                        <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                          <Calendar size={18} strokeWidth={2} />
                        </div>
                        <select
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full pl-[44px] pr-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] bg-white appearance-none"
                          required
                        >
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                          <option value="5">5th Year</option>
                        </select>
                        <div className="absolute right-4 text-[#64748B] pointer-events-none">
                           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                        Gender
                      </label>
                      <div className="relative flex items-center group">
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="w-full px-4 h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] bg-white appearance-none"
                          required
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                        <div className="absolute right-4 text-[#64748B] pointer-events-none">
                           <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                    Password
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-[44px] pr-[44px] h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                      required
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-[#172338] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-4 text-[#64748B] group-focus-within:text-[#1670FF] transition-colors pointer-events-none">
                      <Lock size={18} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-[44px] pr-[44px] h-[48px] border border-[#DCE6F5] rounded-xl focus:ring-2 focus:ring-[#1670FF]/20 focus:border-[#1670FF] outline-none transition-all text-[15px] text-[#172338] placeholder:text-[#94A3B8]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 text-[#64748B] hover:text-[#172338] transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={18} strokeWidth={2} />
                      ) : (
                        <Eye size={18} strokeWidth={2} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#176B5F] text-white h-[50px] mt-4 px-4 rounded-xl font-medium hover:bg-[#12584e] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-[15px]"
              >
                {loading ? 'Creating Account...' : 'Create Account'} {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          )}

          {/* Secure badge */}
          <div className="mt-8 pt-6 border-t border-[#DCE6F5] flex flex-col items-center justify-center gap-2">
             <div className="flex items-center gap-2 text-[#64748B]">
               <ShieldCheck size={20} />
               <span className="text-[15px] font-medium">Your information is kept secure.</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
