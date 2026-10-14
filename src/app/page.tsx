'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Home, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  IndianRupee, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X, 
  Building2, 
  Zap, 
  Calendar, 
  Clock, 
  Sparkles,
  Check,
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { PROPERTIES } from '@/lib/data';
import { supabase } from '@/lib/supabase';

// Real genuine testimonials from application data
const STUDENT_STORIES = [
  {
    id: 1,
    name: 'Saransh Jkluuu',
    role: 'Student Resident • Aasra Apartment',
    property: 'Aasra Apartment (Samanvay Aasra)',
    avatar: '/images/image%20copy.png',
    rating: 5,
    quote: 'Living at Aasra Apartment has been amazing. The flat is well-maintained, super peaceful for study, and very close to college. Found great flatmates here with zero brokerage!',
    tags: ['Verified Resident', '2 BHK']
  },
  {
    id: 2,
    name: 'Pratham',
    role: 'B.Tech CS • 3rd Year',
    property: 'Samanvay The New Door',
    avatar: 'https://res.cloudinary.com/eprhemvt/image/upload/v1787060387/sabrang-2026/tech-team-credit/Pratham.png',
    rating: 5,
    quote: 'Lived in Samanvay The New Door at Mahindra Sez. The 3BHK flat is extremely spacious, peaceful environment, and all fittings are top tier. Super easy commute to college and great society security.',
    tags: ['Verified Resident', '3 BHK']
  },
  {
    id: 3,
    name: 'Priya S.',
    role: 'Student • Design Stream',
    property: 'Samanvay Aasra',
    avatar: null,
    rating: 4,
    quote: 'Good amenities, peaceful study atmosphere, and friendly student neighbors across all blocks. The roommate matching tool helped me connect with people who share my routines.',
    tags: ['Verified Resident', 'Shared Flat']
  }
];

export default function HomePage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Search Bar State
  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [searchError, setSearchError] = useState('');

  // Properties State
  const [displayProperties, setDisplayProperties] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Testimonial Carousel State
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  // Initialize Properties (load genuine properties from local data & Supabase)
  useEffect(() => {
    async function loadProperties() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('is_available', true)
          .limit(4);

        if (data && data.length >= 4) {
          setDisplayProperties(data);
        } else {
          // Fall back to genuine properties defined in PROPERTIES (p7, p8, p9, p1)
          const fallbackProps = PROPERTIES.slice(0, 4);
          setDisplayProperties(fallbackProps);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
        setDisplayProperties(PROPERTIES.slice(0, 4));
      }
    }

    loadProperties();
  }, []);

  const toggleFavorite = (e: React.MouseEvent, propId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(prev => ({ ...prev, [propId]: !prev[propId] }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError('');

    const params = new URLSearchParams();
    if (selectedCampus) params.append('locality', selectedCampus);
    if (selectedType) params.append('type', selectedType);
    if (selectedBudget) params.append('budget', selectedBudget);

    router.push(`/student/explore?${params.toString()}`);
  };

  const nextStory = () => {
    setActiveStoryIdx((prev) => (prev + 1) % STUDENT_STORIES.length);
  };

  const prevStory = () => {
    setActiveStoryIdx((prev) => (prev - 1 + STUDENT_STORIES.length) % STUDENT_STORIES.length);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[var(--primary-blue)] selection:text-white antialiased">
      
      {/* ========================================================= */}
      {/* 1. TOP NAVBAR (Existing UniNest Navigation) */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] rounded-xl px-1">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-blue)] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Home size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900">
              UniNest
            </span>
          </Link>

          {/* Center: Main Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
            <Link 
              href="/" 
              className="text-[var(--primary-blue)] font-bold relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[var(--primary-blue)] after:rounded-full"
            >
              Home
            </Link>
            <Link 
              href="/student/explore" 
              className="hover:text-[var(--primary-blue)] transition-colors py-1 focus:outline-none focus:text-[var(--primary-blue)]"
            >
              Properties
            </Link>
            <Link 
              href="/student/explore" 
              className="hover:text-[var(--primary-blue)] transition-colors py-1 focus:outline-none focus:text-[var(--primary-blue)]"
            >
              Listings
            </Link>
            <Link 
              href="/student/roommates" 
              className="hover:text-[var(--primary-blue)] transition-colors py-1 focus:outline-none focus:text-[var(--primary-blue)]"
            >
              Roommate Matcher
            </Link>
            <Link 
              href="#how-it-works" 
              className="hover:text-[var(--primary-blue)] transition-colors py-1 focus:outline-none focus:text-[var(--primary-blue)]"
            >
              How It Works
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            <Link 
              href="/register" 
              className="text-[14px] font-semibold text-slate-700 hover:text-[var(--primary-blue)] px-3.5 py-2 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            >
              List Property
            </Link>
            <Link 
              href="/login" 
              className="text-[14px] font-semibold text-[var(--primary-blue)] hover:bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            >
              Log In
            </Link>
            <Link 
              href="/register" 
              className="text-[14px] font-semibold bg-[var(--primary-blue)] hover:opacity-90 text-white px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)]"
            >
              Get Started
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            type="button"
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-6 py-6 shadow-xl space-y-4 animate-in slide-in-from-top duration-200">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block py-2 text-base font-bold text-[var(--primary-blue)]"
            >
              Home
            </Link>
            <Link 
              href="/student/explore" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block py-2 text-base font-semibold text-slate-700 hover:text-[var(--primary-blue)]"
            >
              Properties
            </Link>
            <Link 
              href="/student/explore" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block py-2 text-base font-semibold text-slate-700 hover:text-[var(--primary-blue)]"
            >
              Listings
            </Link>
            <Link 
              href="/student/roommates" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block py-2 text-base font-semibold text-slate-700 hover:text-[var(--primary-blue)]"
            >
              Roommate Matcher
            </Link>
            <Link 
              href="#how-it-works" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="block py-2 text-base font-semibold text-slate-700 hover:text-[var(--primary-blue)]"
            >
              How It Works
            </Link>
            
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
              <Link 
                href="/register" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-center py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800"
              >
                List Property
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-center py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800"
                >
                  Log In
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-center py-2.5 rounded-xl bg-[var(--primary-blue)] text-white text-sm font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. SPLIT HERO SECTION (Exact Reference Composition) */}
      {/* ========================================================= */}
      <section className="relative pt-8 pb-10 lg:pt-12 lg:pb-14 bg-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LEFT SIDE — Approximately 40–43% (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col items-start text-left z-10 pr-0 lg:pr-2">
              
              {/* 1. Brand Mark & Subtitle */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[var(--primary-blue)] text-white flex items-center justify-center shadow-xs shrink-0">
                  <Home size={24} className="stroke-[2.5]" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
                    UniNest
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">
                    Student Housing &amp; Roommate Matching
                  </div>
                </div>
              </div>

              {/* 2. Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight mb-5 leading-[1.08] text-slate-900">
                Find Your Place.<br />
                <span className="text-[var(--primary-blue)]">Find Your People.</span>
              </h1>

              {/* 3. Description */}
              <p className="text-base sm:text-[17px] text-slate-600 mb-7 leading-relaxed max-w-[490px]">
                Discover verified flats near your university, match with compatible roommates through lifestyle habits, and manage your stay — all with zero broker fees.
              </p>

              {/* 4. Three Compact Feature Highlights */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 mb-7 w-full">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">100% Verified Listings</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <Users size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">AI Roommate Matching</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <Zap size={14} />
                  </div>
                  <span className="text-xs font-bold text-slate-800 whitespace-nowrap">Zero Broker Charges</span>
                </div>
              </div>

              {/* 5. Two Horizontally Aligned CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-7">
                <Link 
                  href="/student/explore" 
                  className="w-full sm:w-auto px-7 py-3.5 bg-[var(--primary-blue)] hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)]"
                >
                  <Search size={18} />
                  <span>Explore Campus Homes</span>
                  <ArrowRight size={17} />
                </Link>
                <Link 
                  href="/student/roommates" 
                  className="w-full sm:w-auto px-7 py-3.5 bg-white text-[var(--primary-blue)] hover:bg-slate-50 font-bold rounded-xl border-2 border-[var(--primary-blue)] transition-all flex items-center justify-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)]"
                >
                  <Users size={18} />
                  <span>Find Roommates</span>
                </Link>
              </div>

              {/* 6. Trust Row with Student Avatars & Rating */}
              <div className="flex items-center gap-3.5 mb-7">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full ring-2 ring-white bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold">AK</div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white bg-indigo-700 text-white flex items-center justify-center text-[10px] font-bold">PS</div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold">SJ</div>
                  <div className="w-8 h-8 rounded-full ring-2 ring-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">RM</div>
                </div>
                <div className="text-xs text-slate-600">
                  <div className="flex items-center gap-1 font-bold text-slate-900">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span>4.9 / 5</span>
                  </div>
                  <span className="text-slate-500">Trusted by 1,200+ university students</span>
                </div>
              </div>

              {/* 7. Handwritten Script Accent (From Reference) */}
              <div className="relative inline-flex items-center text-[var(--primary-blue)] font-serif italic text-lg sm:text-xl font-medium tracking-wide -rotate-2 select-none">
                <span>Your next chapter starts here</span>
                <span className="ml-1 text-base tracking-tighter not-italic font-bold">彡</span>
              </div>

            </div>

            {/* RIGHT SIDE — Approximately 57–60% (lg:col-span-7) */}
            <div className="lg:col-span-7 relative">
              
              {/* Photo Container: Cleanly bounded, no overlap or text distortion */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200/90 aspect-[16/10] bg-slate-100">
                <img 
                  src="/images/hero-reference-students.jpg" 
                  alt="University students discussing accommodation on campus lawn" 
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating Feature Label 1: Top Center (Verified Listings with arrow pointing to campus building) */}
              <div className="absolute -top-3 left-[16%] sm:left-[22%] z-20 hidden sm:flex flex-col items-center pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <Home size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Verified Listings</div>
                    <div className="text-[10px] text-slate-500 font-medium">Safe &amp; trusted homes</div>
                  </div>
                </div>
                {/* Thin curved connecting arrow */}
                <svg className="w-8 h-6 text-[var(--primary-blue)]/60 mt-0.5" viewBox="0 0 32 24" fill="none">
                  <path d="M16 2 C 16 12, 24 16, 26 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M22 19 L 26 22 L 28 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Floating Feature Label 2: Top Right (Find Roommates with arrow pointing to students) */}
              <div className="absolute top-4 right-2 sm:right-6 z-20 flex flex-col items-end pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <Users size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Find Roommates</div>
                    <div className="text-[10px] text-slate-500 font-medium">Better together</div>
                  </div>
                </div>
                {/* Thin curved connecting arrow */}
                <svg className="w-8 h-8 text-[var(--primary-blue)]/60 mr-4 mt-0.5" viewBox="0 0 32 32" fill="none">
                  <path d="M8 2 C 8 16, 18 22, 22 28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M17 25 L 22 28 L 24 23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>

              {/* Floating Feature Label 3: Bottom Left (Near Your Campus in the lawn) */}
              <div className="absolute bottom-5 left-3 sm:left-10 z-20 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Near Your Campus</div>
                    <div className="text-[10px] text-slate-500 font-medium">Less travel, more time</div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Label 4: Bottom Right (Zero Broker Fees in the lawn) */}
              <div className="absolute bottom-5 right-3 sm:right-8 z-20 pointer-events-none">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-200/80 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                    <IndianRupee size={15} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-tight">Zero Broker Fees</div>
                    <div className="text-[10px] text-slate-500 font-medium">More savings, more freedom</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. BOTTOM FEATURE STRIP (Directly Beneath Hero) */}
        {/* ========================================================= */}
        <div className="border-t border-b border-slate-200/80 bg-white py-6 mt-12 lg:mt-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
              
              {/* Item 1 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                  <Home size={18} />
                </div>
                <span className="text-sm font-bold text-slate-800">Verified Properties</span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <span className="text-sm font-bold text-slate-800">Compatible Roommates</span>
              </div>

              {/* Item 3 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-sm font-bold text-slate-800">Secure Bookings</span>
              </div>

              {/* Item 4 */}
              <div className="flex items-center justify-center gap-3 px-4 py-2">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-[var(--primary-blue)] flex items-center justify-center shrink-0">
                  <Heart size={18} />
                </div>
                <span className="text-sm font-bold text-slate-800">Support at Every Step</span>
              </div>

            </div>
          </div>
        </div>

        {/* Integrated Housing Search Bar */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-10">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/90">
            <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              
              {/* 1. Campus / Area */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-[var(--primary-blue)] focus-within:bg-white">
                <MapPin size={20} className="text-[var(--primary-blue)] shrink-0" />
                <div className="w-full">
                  <label htmlFor="search-campus" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Campus / Area
                  </label>
                  <select 
                    id="search-campus"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select your campus or area</option>
                    <option value="Mahindra SEZ">Mahindra SEZ / Near JKLU</option>
                    <option value="Mahapura">Mahapura (Aasra Vicinity)</option>
                    <option value="Ajmer Road">Ajmer Road Hub</option>
                    <option value="Mansarovar">Mansarovar</option>
                  </select>
                </div>
              </div>

              {/* 2. Accommodation Type */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-[var(--primary-blue)] focus-within:bg-white">
                <Home size={20} className="text-[var(--primary-blue)] shrink-0" />
                <div className="w-full">
                  <label htmlFor="search-type" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Accommodation Type
                  </label>
                  <select 
                    id="search-type"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="">Any type</option>
                    <option value="1">1 BHK / Private Room</option>
                    <option value="2">2 BHK Shared Flat</option>
                    <option value="3">3 BHK Apartment</option>
                    <option value="Apartment">Full Apartment</option>
                  </select>
                </div>
              </div>

              {/* 3. Monthly Budget */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors focus-within:ring-2 focus-within:ring-[var(--primary-blue)] focus-within:bg-white">
                <IndianRupee size={20} className="text-[var(--primary-blue)] shrink-0" />
                <div className="w-full">
                  <label htmlFor="search-budget" className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Monthly Budget
                  </label>
                  <select 
                    id="search-budget"
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="">Any budget</option>
                    <option value="8000">Up to ₹8,000 / mo</option>
                    <option value="15000">₹8,000 - ₹15,000 / mo</option>
                    <option value="25000">₹15,000 - ₹25,000 / mo</option>
                    <option value="30000">₹25,000+ / mo</option>
                  </select>
                </div>
              </div>

              {/* 4. Search Housing Button */}
              <button
                type="submit"
                className="w-full h-[52px] bg-[var(--primary-blue)] hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-blue)]"
              >
                <Search size={18} />
                <span>Search Housing</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </button>

            </form>

            {searchError && (
              <p className="mt-2 text-xs font-semibold text-red-600 px-1">{searchError}</p>
            )}
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4. HOW IT WORKS */}
      {/* ========================================================= */}
      <section id="how-it-works" className="py-20 md:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Simple Steps to Your Perfect Stay
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Finding your next home is easy. Just follow a few simple steps and you’ll be settled in no time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            
            {/* Step 1 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center group hover:border-slate-300 transition-colors">
              <div className="text-[11px] font-extrabold text-[var(--primary-blue)] bg-slate-100 px-2.5 py-1 rounded-md mb-5 tracking-wider uppercase">
                01 — Search
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[var(--primary-blue)] flex items-center justify-center mb-4">
                <Search size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Search</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explore verified listings near your campus.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center group hover:border-slate-300 transition-colors">
              <div className="text-[11px] font-extrabold text-[var(--primary-blue)] bg-slate-100 px-2.5 py-1 rounded-md mb-5 tracking-wider uppercase">
                02 — Match
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[var(--primary-blue)] flex items-center justify-center mb-4">
                <Users size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Match</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Find compatible roommates with shared interests.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center group hover:border-slate-300 transition-colors">
              <div className="text-[11px] font-extrabold text-[var(--primary-blue)] bg-slate-100 px-2.5 py-1 rounded-md mb-5 tracking-wider uppercase">
                03 — Book
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[var(--primary-blue)] flex items-center justify-center mb-4">
                <Calendar size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Book</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Secure your preferred property through the available booking process.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col items-center text-center group hover:border-slate-300 transition-colors">
              <div className="text-[11px] font-extrabold text-[var(--primary-blue)] bg-slate-100 px-2.5 py-1 rounded-md mb-5 tracking-wider uppercase">
                04 — Move In
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-[var(--primary-blue)] flex items-center justify-center mb-4">
                <Home size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Move In</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Start your new chapter with confidence.
              </p>
            </div>

          </div>

          <div className="text-center">
            <Link 
              href="/student/explore" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:border-slate-400 text-slate-800 font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED PROPERTIES */}
      {/* ========================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
                Top Picks for You
              </h2>
              <p className="text-base text-slate-600">
                Handpicked verified properties near your campus.
              </p>
            </div>

            <Link 
              href="/student/explore" 
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--primary-blue)] hover:underline"
            >
              View All Properties
              <ArrowRight size={16} />
            </Link>
          </div>

          {displayProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayProperties.map((prop) => {
                const isFav = !!favorites[prop.id];
                const propImage = prop.imageUrl || prop.images?.[0] || '/room/image.png';
                const isVerified = prop.verifiedByUniNest || prop.is_verified;
                const distanceText = prop.distanceKm ? `${prop.distanceKm} km from campus` : null;

                return (
                  <div 
                    key={prop.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    {/* Property Image Container */}
                    <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                      <img 
                        src={propImage} 
                        alt={prop.title || 'Student Accommodation'} 
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      {/* Verification Badge */}
                      {isVerified && (
                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs border border-emerald-100">
                          <ShieldCheck size={13} className="text-emerald-600" />
                          <span>Verified</span>
                        </div>
                      )}

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleFavorite(e, prop.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-600 hover:text-red-500 transition-colors shadow-xs"
                        aria-label="Save to favorites"
                      >
                        <Heart size={16} className={isFav ? 'fill-red-500 text-red-500' : ''} />
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-baseline justify-between mb-1.5">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          {prop.configuration || prop.type || 'Flat'}
                        </span>
                        {distanceText && (
                          <span className="text-[11px] font-medium text-slate-500">
                            {distanceText}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-base mb-1 line-clamp-1 group-hover:text-[var(--primary-blue)] transition-colors">
                        {prop.title || prop.project}
                      </h3>

                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-4 line-clamp-1">
                        <MapPin size={13} className="shrink-0 text-slate-400" />
                        <span>{prop.location || prop.locality || 'Near Campus'}</span>
                      </div>

                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <div className="text-base font-extrabold text-slate-900">
                            ₹{(prop.rent || prop.rent_amount || 12000).toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-500"> / mo</span>
                          </div>
                        </div>

                        <Link 
                          href={`/student/property/${prop.id}`}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-[var(--primary-blue)] hover:text-white text-slate-800 text-xs font-bold rounded-lg transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-slate-200">
              <Home size={40} className="mx-auto text-slate-400 mb-3" />
              <p className="font-bold text-slate-700">No properties available at the moment.</p>
              <Link href="/student/explore" className="text-sm font-semibold text-[var(--primary-blue)] underline mt-2 inline-block">
                Browse Campus Listings
              </Link>
            </div>
          )}

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. WHY UNINEST + STUDENT STORIES */}
      {/* ========================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            
            {/* Left: Why UniNest */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] mb-8 bg-slate-100 border border-slate-200/90 shadow-xs">
                  <img 
                    src="/images/students-walking-campus.jpg" 
                    alt="University students walking together on campus" 
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  A Safer, Smarter Way to Find Student Housing
                </h2>

                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--primary-blue)] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">
                      Verified listings and secure payments, directly connecting you with trustworthy landlords.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--primary-blue)] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">
                      Lifestyle-based roommate matching to help you avoid roommate conflicts.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--primary-blue)] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">
                      Dedicated student assistance throughout your application and moving process.
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-[var(--primary-blue)] shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700 font-medium">
                      Zero broker commissions, saving you a full month of rent upfront.
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Link 
                  href="/student/overview" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary-blue)] hover:opacity-90 text-white font-bold rounded-xl text-sm transition-all shadow-xs"
                >
                  About UniNest
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right: Student Stories (Testimonials) */}
            <div className="lg:col-span-6 bg-slate-50/80 rounded-2xl p-7 sm:p-9 border border-slate-200/90 flex flex-col justify-between">
              
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Real Students. Real Experiences.
                  </h3>

                  {/* Carousel Controls */}
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={prevStory}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      type="button"
                      onClick={nextStory}
                      className="w-8 h-8 rounded-full bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Active Testimonial Card */}
                {(() => {
                  const story = STUDENT_STORIES[activeStoryIdx];
                  return (
                    <div className="space-y-6">
                      <div className="flex text-amber-400">
                        {[...Array(story.rating)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>

                      <p className="text-base text-slate-700 leading-relaxed italic">
                        &ldquo;{story.quote}&rdquo;
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {story.tags.map((tag, idx) => (
                          <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-slate-200/80 mt-8 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                  {STUDENT_STORIES[activeStoryIdx].avatar ? (
                    <img 
                      src={STUDENT_STORIES[activeStoryIdx].avatar} 
                      alt={STUDENT_STORIES[activeStoryIdx].name} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-600 text-sm">
                      {STUDENT_STORIES[activeStoryIdx].name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    {STUDENT_STORIES[activeStoryIdx].name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {STUDENT_STORIES[activeStoryIdx].role}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-white pt-16 pb-12 border-t border-slate-200/90 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
            
            {/* Left: Brand & Info */}
            <div className="md:col-span-5 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[var(--primary-blue)] text-white flex items-center justify-center">
                  <Home size={18} />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  UniNest
                </span>
              </Link>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Student Housing &amp; Roommate Matching. A smarter, verified platform designed for modern campus life.
              </p>
            </div>

            {/* Middle: Links */}
            <div className="md:col-span-4">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
                Explore
              </div>
              <ul className="space-y-2.5 font-medium text-slate-600">
                <li>
                  <Link href="/" className="hover:text-[var(--primary-blue)] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/student/explore" className="hover:text-[var(--primary-blue)] transition-colors">
                    Properties
                  </Link>
                </li>
                <li>
                  <Link href="/student/explore" className="hover:text-[var(--primary-blue)] transition-colors">
                    Listings
                  </Link>
                </li>
                <li>
                  <Link href="/student/roommates" className="hover:text-[var(--primary-blue)] transition-colors">
                    Roommate Matcher
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-[var(--primary-blue)] transition-colors">
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right: Portals & Contact */}
            <div className="md:col-span-3">
              <div className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">
                Portals &amp; Support
              </div>
              <ul className="space-y-2.5 font-medium text-slate-600">
                <li>
                  <Link href="/register" className="hover:text-[var(--primary-blue)] transition-colors">
                    List a Property
                  </Link>
                </li>
                <li>
                  <Link href="/login?redirect=/landlord" className="hover:text-[var(--primary-blue)] transition-colors">
                    Landlord Portal
                  </Link>
                </li>
                <li>
                  <Link href="/login?redirect=/admin" className="hover:text-[var(--primary-blue)] transition-colors">
                    Admin Portal
                  </Link>
                </li>
                <li>
                  <Link href="/student/overview" className="hover:text-[var(--primary-blue)] transition-colors">
                    Student Support
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom row: Copyright & Legal */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} UniNest. All rights reserved.</p>
            <div className="flex items-center gap-6 font-medium">
              <Link href="#" className="hover:text-slate-800 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-slate-800 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
