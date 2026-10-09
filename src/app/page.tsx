'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Home as HomeIcon, Users, 
  Menu, X, MapPin, BedDouble, CheckCircle2, HeartHandshake, ClipboardList, Lock
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Property {
  id: string;
  title: string;
  locality: string;
  rent_amount: number;
  bedrooms: number;
  furnishing_status: string;
  is_verified: boolean;
  is_available: boolean;
  images?: string[];
}

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loadingProps, setLoadingProps] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('is_available', true)
          .limit(3);
        
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          // Fallback properties for preview to ensure the section is never empty
          setProperties([
            {
              id: 'preview-1',
              title: 'Premium Studio Near Campus',
              locality: 'Mahindra SEZ, Jaipur',
              rent_amount: 12500,
              bedrooms: 1,
              furnishing_status: 'Fully Furnished',
              is_verified: true,
              is_available: true,
              images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800']
            },
            {
              id: 'preview-2',
              title: 'Spacious 2BHK Student Apartment',
              locality: 'Ajmer Road, Jaipur',
              rent_amount: 18000,
              bedrooms: 2,
              furnishing_status: 'Semi-Furnished',
              is_verified: true,
              is_available: true,
              images: ['https://images.unsplash.com/photo-1502672260266-1c1e5240980c?auto=format&fit=crop&q=80&w=800']
            },
            {
              id: 'preview-3',
              title: 'Cozy Private Room in Flat',
              locality: 'Bhankrota, Jaipur',
              rent_amount: 8500,
              bedrooms: 1,
              furnishing_status: 'Fully Furnished',
              is_verified: false,
              is_available: true,
              images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800']
            }
          ]);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      } finally {
        setLoadingProps(false);
      }
    }
    fetchProperties();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#172338] selection:bg-[#0f172a] selection:text-white">
      
      {/* 1. Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-[#DCE6F5]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-extrabold text-[22px] tracking-tight text-[#0f172a]">UniNest</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#64748B]">
            <Link href="/" className="text-[#172338] transition-colors">Home</Link>
            <Link href="#features" className="hover:text-[#172338] transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-[#172338] transition-colors">How It Works</Link>
            <Link href="#roommates" className="hover:text-[#172338] transition-colors">Roommate Finder</Link>
            <Link href="#about" className="hover:text-[#172338] transition-colors">About Us</Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/login" className="text-[15px] font-semibold text-[#64748B] hover:text-[#172338] transition-colors">
              Log In
            </Link>
            <Link href="/register" className="text-[15px] font-semibold bg-[#0f172a] text-white px-6 py-2.5 rounded-xl hover:bg-[#1e293b] transition-colors shadow-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-[#172338]" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#DCE6F5] shadow-lg flex flex-col p-6 gap-4">
            <Link href="/" onClick={toggleMenu} className="text-lg font-semibold text-[#172338]">Home</Link>
            <Link href="#features" onClick={toggleMenu} className="text-lg font-semibold text-[#64748B]">Features</Link>
            <Link href="#how-it-works" onClick={toggleMenu} className="text-lg font-semibold text-[#64748B]">How It Works</Link>
            <Link href="#roommates" onClick={toggleMenu} className="text-lg font-semibold text-[#64748B]">Roommate Finder</Link>
            <hr className="border-[#DCE6F5] my-2" />
            <Link href="/login" className="text-lg font-semibold text-[#64748B]">Log In</Link>
            <Link href="/register" className="text-lg font-semibold text-[#0f172a]">Get Started</Link>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Copy and Actions */}
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#0f172a] text-xs font-bold mb-6">
              STUDENT HOUSING, MADE SIMPLE
            </div>
            
            <h1 className="text-5xl lg:text-[60px] font-bold tracking-tight mb-6 leading-[1.1] text-[#172338]">
              Find Your Place.<br/>Find <span className="text-[#0f172a]">Your People.</span>
            </h1>
            
            <p className="text-[17px] text-[#64748B] mb-8 leading-relaxed max-w-[500px]">
              Discover verified student homes, connect with compatible roommates, and manage your housing journey—all in one place.
            </p>
            
            <ul className="space-y-3 mb-10 text-[15px] font-medium text-[#172338]">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Verified rental listings near your university.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Smarter roommate compatibility matching.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Simple applications and housing management.</li>
            </ul>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/login?redirect=/student/explore" className="w-full sm:w-auto px-8 py-3.5 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#1e293b] transition-colors shadow-sm flex items-center justify-center gap-2">
                Explore Housing <ArrowRight size={18} />
              </Link>
              <Link href="/login?redirect=/student/roommates" className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#0f172a] font-semibold rounded-xl hover:bg-[#F8FAFC] transition-colors border border-[#DCE6F5] flex items-center justify-center">
                Find a Roommate
              </Link>
            </div>
          </div>

          {/* Right Side: Generated Illustration */}
          <div className="w-full relative rounded-2xl overflow-hidden shadow-2xl border border-[#DCE6F5]">
            <img 
              src="/images/uninest-home-hero.jpg" 
              alt="UniNest Campus Community" 
              className="w-full h-auto object-cover"
            />
            
            {/* Small UI Overlay Badges */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-[#DCE6F5] flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#0f172a]" />
              <span className="text-[12px] font-semibold text-[#172338]">Verified Housing</span>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md border border-[#DCE6F5] flex items-center gap-2">
              <Users size={16} className="text-[#1670FF]" />
              <span className="text-[12px] font-semibold text-[#172338]">Find Your Roommate</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Feature and Trust Strip */}
      <section className="bg-white border-y border-[#DCE6F5] py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center sm:justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-[#172338] font-semibold text-[14px]">
            <ShieldCheck size={18} className="text-[#0f172a]"/> Verified Housing
          </div>
          <div className="flex items-center gap-2 text-[#172338] font-semibold text-[14px]">
            <Users size={18} className="text-[#0f172a]"/> Smart Roommate Matching
          </div>
          <div className="flex items-center gap-2 text-[#172338] font-semibold text-[14px]">
            <ClipboardList size={18} className="text-[#0f172a]"/> Easy Applications
          </div>
          <div className="flex items-center gap-2 text-[#172338] font-semibold text-[14px]">
            <Lock size={18} className="text-[#0f172a]"/> Secure Account Access
          </div>
        </div>
      </section>

      {/* 4. What Is UniNest? */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-[44px] font-bold text-[#172338] mb-4 tracking-tight">A Better Way to Find Your Student Home</h2>
          <p className="text-[17px] text-[#64748B] leading-relaxed">
            Finding student accommodation should be simple. UniNest brings housing discovery, compatible roommates, and essential rental tasks together in one connected experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DCE6F5] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0f172a] bg-[#eff6ff] mb-6">
              <HomeIcon size={24} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#172338]">Find a Home</h3>
            <p className="text-[#64748B] text-[15px] mb-6 leading-relaxed">
              Explore verified student listings near your university. View honest property details, check commute times, and find the perfect space for your lifestyle and budget.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Verified Listings</span>
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Near Campus</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DCE6F5] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#1670FF] bg-[#eff4ff] mb-6">
              <HeartHandshake size={24} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#172338]">Find Your People</h3>
            <p className="text-[#64748B] text-[15px] mb-6 leading-relaxed">
              Connect with potential roommates based on compatible routines, cleanliness habits, and social preferences to ensure a harmonious living environment.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Smart Matching</span>
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Lifestyle Tags</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#DCE6F5] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[#0f172a] bg-[#e2e8f0] mb-6">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#172338]">Manage Your Stay</h3>
            <p className="text-[#64748B] text-[15px] mb-6 leading-relaxed">
              Track your rental applications, manage lease details, and stay organized throughout the entire booking process from a single digital dashboard.
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Digital Apps</span>
              <span className="bg-[#F8FAFC] border border-[#DCE6F5] text-[#64748B] text-[12px] font-semibold px-2.5 py-1 rounded-md">Organized</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-[#eff6ff] border-y border-[#Dce9e5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-[40px] font-bold text-[#172338] mb-12 tracking-tight">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[2px] bg-[#Dce9e5] z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0f172a] text-[#0f172a] font-bold text-xl flex items-center justify-center mb-6 shadow-sm">1</div>
              <h3 className="text-xl font-bold text-[#172338] mb-2">Explore Homes</h3>
              <p className="text-[#64748B] text-[15px] max-w-[280px]">Browse verified housing options near your university campus.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0f172a] text-[#0f172a] font-bold text-xl flex items-center justify-center mb-6 shadow-sm">2</div>
              <h3 className="text-xl font-bold text-[#172338] mb-2">Find Your Match</h3>
              <p className="text-[#64748B] text-[15px] max-w-[280px]">Discover compatible roommates with shared lifestyles and routines.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0f172a] text-[#0f172a] font-bold text-xl flex items-center justify-center mb-6 shadow-sm">3</div>
              <h3 className="text-xl font-bold text-[#172338] mb-2">Apply & Settle In</h3>
              <p className="text-[#64748B] text-[15px] max-w-[280px]">Complete your application seamlessly and secure your new home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Roommate Matching Section */}
      <section id="roommates" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center bg-white p-8 md:p-12 rounded-3xl border border-[#DCE6F5] shadow-sm">
          <div>
            <h2 className="text-4xl font-bold mb-4 leading-[1.1] text-[#172338] tracking-tight">
              Your Home Matters.<br/>
              Your Roommate Does Too.
            </h2>
            <p className="text-[17px] text-[#64748B] mb-8 leading-relaxed">
              Discover people whose daily routines, preferences, and lifestyles fit yours.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-[#172338] font-medium text-[15px]">
                <CheckCircle2 size={18} className="text-[#0f172a]"/> Sleep and wake-up schedules
              </li>
              <li className="flex items-center gap-3 text-[#172338] font-medium text-[15px]">
                <CheckCircle2 size={18} className="text-[#0f172a]"/> Cleanliness preferences
              </li>
              <li className="flex items-center gap-3 text-[#172338] font-medium text-[15px]">
                <CheckCircle2 size={18} className="text-[#0f172a]"/> Study routines
              </li>
              <li className="flex items-center gap-3 text-[#172338] font-medium text-[15px]">
                <CheckCircle2 size={18} className="text-[#0f172a]"/> Lifestyle and social preferences
              </li>
            </ul>
            
            <Link href="/login?redirect=/student/roommates" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#1e293b] transition-colors shadow-sm">
              Find Your Roommate <ArrowRight size={18} />
            </Link>
          </div>
          
          {/* Compatibility Preview UI (Mock) */}
          <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#DCE6F5] relative">
            <div className="absolute top-4 right-4 text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Example</div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 font-bold">A</div>
                  <div className="w-14 h-14 rounded-full bg-teal-100 border-2 border-white flex items-center justify-center text-teal-600 font-bold">B</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[#172338]">High Compatibility</div>
                  <div className="text-sm text-[#64748B]">Based on 12 preferences</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-[13px] font-bold text-[#172338] mb-1.5">
                  <span>Match Score</span>
                  <span className="text-[#0f172a]">95%</span>
                </div>
                <div className="h-2 w-full bg-[#DCE6F5] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0f172a] w-[95%] rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="bg-white border border-[#DCE6F5] text-[#172338] text-[13px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#0f172a]"/> Early Birds</span>
                <span className="bg-white border border-[#DCE6F5] text-[#172338] text-[13px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#0f172a]"/> Very Tidy</span>
                <span className="bg-white border border-[#DCE6F5] text-[#172338] text-[13px] font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[#0f172a]"/> Quiet Study</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Explore Homes Near Your Campus */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-[#172338] mb-3 tracking-tight">Explore Homes Near Your Campus</h2>
            <p className="text-[17px] text-[#64748B]">Find a place that fits your location, lifestyle, and budget.</p>
          </div>
          <Link href="/login?redirect=/student/explore" className="inline-flex items-center gap-2 font-semibold text-[#0f172a] hover:text-[#1e293b] transition-colors">
            View All Properties <ArrowRight size={18}/>
          </Link>
        </div>
        
        {loadingProps ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-2xl h-[400px] border border-[#DCE6F5] animate-pulse"></div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(prop => (
              <div key={prop.id} className="bg-white rounded-2xl shadow-sm border border-[#DCE6F5] overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                <div className="h-56 bg-[#F8FAFC] relative overflow-hidden shrink-0">
                  {prop.images?.[0] ? (
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#DCE6F5] bg-[#F1F5F9]"><HomeIcon size={40} /></div>
                  )}
                  {prop.is_verified && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#0f172a] text-[12px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck size={14}/> Verified
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-[18px] font-bold text-[#172338] line-clamp-1">{prop.title}</h3>
                    <div className="text-[18px] font-bold text-[#172338]">₹{prop.rent_amount}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[14px] text-[#64748B] mb-5 font-medium">
                    <MapPin size={16}/> {prop.locality}
                  </div>
                  <div className="flex items-center gap-4 text-[14px] font-semibold text-[#172338] mb-6 pt-5 border-t border-[#DCE6F5] mt-auto">
                    <span className="flex items-center gap-1.5"><BedDouble size={16} className="text-[#64748B]"/> {prop.bedrooms} Bed</span>
                    <span className="flex items-center gap-1.5 text-[#64748B]">{prop.furnishing_status}</span>
                  </div>
                  <Link href={`/login?redirect=/properties/${prop.id}`} className="block w-full text-center py-3 rounded-xl border border-[#DCE6F5] text-[#172338] font-semibold hover:bg-[#F8FAFC] transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#DCE6F5] p-16 text-center shadow-sm">
            <HomeIcon size={48} className="mx-auto text-[#DCE6F5] mb-4" />
            <h3 className="text-xl font-bold text-[#172338] mb-2">No properties available yet</h3>
            <p className="text-[#64748B] mb-6 max-w-md mx-auto">Be the first to list a property or check back soon.</p>
            <Link href="/register" className="inline-block px-6 py-3 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#1e293b] transition-colors">
              Join as a Landlord
            </Link>
          </div>
        )}
      </section>

      {/* 8. Landlord Section */}
      <section className="py-24 px-6 bg-[#EAF5FB] border-t border-[#DCE6F5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-white h-full relative min-h-[350px] lg:min-h-[450px]">
            {/* Kept existing landlord image if available, else standard object-cover layout */}
            <img 
              src="/landlord-illustration.jpg" 
              alt="UniNest Landlord Role" 
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                // Fallback if landlord image doesn't exist
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000';
              }}
            />
          </div>
          <div>
            <h2 className="text-4xl font-bold text-[#172338] mb-4 tracking-tight">Have a Property?<br/>Reach the Right Students.</h2>
            <p className="text-[17px] text-[#64748B] mb-8 leading-relaxed">
              Manage your rental listings and connect with students looking for their next home.
            </p>
            <ul className="space-y-3 mb-10 text-[15px] font-medium text-[#172338]">
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Create or update property listings.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Manage rental prices and availability.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Review applications.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[#0f172a]" /> Organize tenant information.</li>
            </ul>
            <Link href="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#172338] text-white font-semibold rounded-xl hover:bg-black transition-colors shadow-sm">
              Join as a Landlord <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="py-24 px-6 mx-4 max-w-7xl lg:mx-auto bg-[#172338] rounded-3xl my-16 shadow-xl relative overflow-hidden">
        {/* Subtle background gradient within dark section */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/40 to-transparent pointer-events-none"></div>

        <div className="relative text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-[44px] font-bold text-white mb-6 tracking-tight leading-tight">
            Your Next Chapter Starts With the Right Home.
          </h2>
          <p className="text-[17px] text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Make finding student housing easier. Discover your next home and connect with people who fit your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?redirect=/student/explore" className="w-full sm:w-auto px-8 py-3.5 bg-[#0f172a] text-white font-semibold rounded-xl hover:bg-[#1e293b] transition-colors shadow-sm">
              Explore Housing <ArrowRight size={18} className="inline-block ml-1" />
            </Link>
            <Link href="/login?redirect=/student/roommates" className="w-full sm:w-auto px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20">
              Find a Roommate
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Footer */}
      <footer className="bg-white pt-16 pb-8 px-6 border-t border-[#DCE6F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="font-extrabold text-[22px] tracking-tight text-[#0f172a]">UniNest</span>
            </Link>
            <p className="text-[#64748B] text-[14px] leading-relaxed max-w-[280px]">
              Intelligent student housing and roommate matching platform designed for modern university life.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#172338] mb-4 text-[14px]">Explore</h4>
            <ul className="space-y-3 text-[14px] text-[#64748B] font-medium">
              <li><Link href="/" className="hover:text-[#0f172a] transition-colors">Home</Link></li>
              <li><Link href="#features" className="hover:text-[#0f172a] transition-colors">Features</Link></li>
              <li><Link href="#how-it-works" className="hover:text-[#0f172a] transition-colors">How It Works</Link></li>
              <li><Link href="#roommates" className="hover:text-[#0f172a] transition-colors">Roommate Finder</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#172338] mb-4 text-[14px]">Landlords</h4>
            <ul className="space-y-3 text-[14px] text-[#64748B] font-medium">
              <li><Link href="/register" className="hover:text-[#0f172a] transition-colors">List a Property</Link></li>
              <li><Link href="/login?redirect=/landlord" className="hover:text-[#0f172a] transition-colors">Landlord Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#172338] mb-4 text-[14px]">Account</h4>
            <ul className="space-y-3 text-[14px] text-[#64748B] font-medium">
              <li><Link href="/login" className="hover:text-[#0f172a] transition-colors">Log In</Link></li>
              <li><Link href="/register" className="hover:text-[#0f172a] transition-colors">Get Started</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#DCE6F5] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-medium text-[#64748B]">
            © {new Date().getFullYear()} UniNest. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] font-medium text-[#64748B]">
            <Link href="#" className="hover:text-[#0f172a] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#0f172a] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
