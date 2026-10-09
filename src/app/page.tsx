'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, ShieldCheck, Home as HomeIcon, Users, Building, 
  Search, FileText, Menu, X, MapPin, BedDouble, CheckCircle2, HeartHandshake, ClipboardList, Settings, Lock
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
    <div className="min-h-screen bg-[#F4F6F9] font-sans text-[#151C2E] overflow-x-hidden selection:bg-[#111629] selection:text-white">
      
      {/* 2. Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E1E7EF]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#111629] rounded-xl flex items-center justify-center font-black text-white text-xl shadow-sm">U</div>
            <span className="font-bold text-2xl tracking-tight text-[#111629]">UNINEST</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#1B2438]">
            <Link href="#" className="hover:text-[#111629] transition-colors">Home</Link>
            <Link href="#features" className="hover:text-[#111629] transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-[#111629] transition-colors">How It Works</Link>
            <Link href="#roommates" className="hover:text-[#111629] transition-colors">Roommate Finder</Link>
            <Link href="#about" className="hover:text-[#111629] transition-colors">About Us</Link>
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/login" className="text-[15px] font-bold text-[#1B2438] hover:text-[#111629] transition-colors">
              Log In
            </Link>
            <Link href="/signup" className="text-[15px] font-bold bg-[#111629] text-white px-6 py-2.5 rounded-full hover:bg-[#1B2438] transition-colors shadow-sm">
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-[#111629]" onClick={toggleMenu}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#E1E7EF] shadow-lg flex flex-col p-6 gap-4">
            <Link href="#" onClick={toggleMenu} className="text-lg font-semibold text-[#1B2438]">Home</Link>
            <Link href="#features" onClick={toggleMenu} className="text-lg font-semibold text-[#1B2438]">Features</Link>
            <Link href="#how-it-works" onClick={toggleMenu} className="text-lg font-semibold text-[#1B2438]">How It Works</Link>
            <Link href="#roommates" onClick={toggleMenu} className="text-lg font-semibold text-[#1B2438]">Roommate Finder</Link>
            <hr className="border-[#E1E7EF] my-2" />
            <Link href="/login" className="text-lg font-bold text-[#111629]">Log In</Link>
            <Link href="/signup" className="text-lg font-bold text-[#111629]">Get Started</Link>
          </div>
        )}
      </nav>

      {/* 3. Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Main Message */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E1E7EF] shadow-sm text-[#111629] text-xs tracking-wide font-bold mb-8 uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00]"></span>
              Smart University Housing Platform
            </div>
            
            <h1 className="text-5xl lg:text-[4.5rem] font-black tracking-tight mb-6 leading-[1.05] text-[#111629]">
              Find Your Place.<br/>Find <span className="text-[#FF6B00]">Your People.</span>
            </h1>
            
            <p className="text-[17px] text-[#667085] mb-10 leading-relaxed max-w-[500px]">
              UniNest helps university students discover verified rental homes near campus, find compatible roommates, and manage housing applications — all in one place.
            </p>
            
            <ul className="space-y-4 mb-12 text-[15px] font-semibold text-[#111629]">
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Verified rental listings near your university.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Intelligent roommate compatibility matching.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Simple property applications and lease management.</li>
            </ul>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/login?redirect=/student/explore" className="w-full sm:w-auto px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-colors shadow-sm shadow-[#FF6B00]/20 flex items-center justify-center gap-2">
                Explore Housing <ArrowRight size={20} />
              </Link>
              <Link href="/login?redirect=/student/roommates" className="w-full sm:w-auto px-8 py-4 bg-white text-[#111629] font-bold rounded-xl hover:bg-[#F4F6F9] transition-colors border border-[#E1E7EF] shadow-sm flex items-center justify-center">
                Find a Roommate
              </Link>
            </div>
          </div>

          {/* Right Side: Reused Illustration with Floating Details */}
          <div className="w-full order-1 lg:order-2 rounded-[2rem] overflow-hidden shadow-2xl shadow-[#16A34A]/5 border border-[#16A34A]/20 relative group">
            <img 
              src="/hero-illustration.jpg" 
              alt="UniNest Student Housing Illustration" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Floating Badge 1 - Top Left */}
            <div className="absolute top-8 left-6 md:top-12 md:left-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#16A34A]/10 flex items-center gap-3 animate-[pulse_4s_infinite]">
              <div className="w-9 h-9 bg-[#16A34A]/15 rounded-full flex items-center justify-center">
                <HomeIcon size={18} className="text-[#16A34A]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#111629] leading-tight">Campus Housing</p>
                <p className="text-[11px] font-medium text-[#16A34A]">Find properties near you</p>
              </div>
            </div>

            {/* Floating Badge 2 - Bottom Right */}
            <div className="absolute bottom-8 right-6 md:bottom-12 md:right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-[#16A34A]/10 flex items-center gap-3 animate-[pulse_5s_infinite]">
              <div className="w-9 h-9 bg-[#FF6B00]/15 rounded-full flex items-center justify-center">
                <Users size={18} className="text-[#FF6B00]" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#111629] leading-tight">Intelligent Matching</p>
                <p className="text-[11px] font-medium text-[#667085]">Connect with roommates</p>
              </div>
            </div>
            
            {/* Floating Badge 3 - Top Right */}
            <div className="absolute top-1/2 right-0 transform translate-x-2 -translate-y-1/2 bg-[#16A34A] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 border-2 border-white">
              <ShieldCheck size={16} />
              <span className="text-[12px] font-bold tracking-wide">100% Verified</span>
            </div>
            
            {/* Green gradient overlay for blending */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#16A34A]/10 via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* 4. Quick Trust Indicators */}
      <section className="bg-white py-6 border-y border-[#E1E7EF]">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-6 md:gap-16">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={20} className="text-[#16A34A]"/>
            <span className="font-bold text-[#111629] text-sm md:text-[15px]">Verified Housing</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Users size={20} className="text-[#FF6B00]"/>
            <span className="font-bold text-[#111629] text-sm md:text-[15px]">Smart Roommate Matching</span>
          </div>
          <div className="flex items-center gap-2.5">
            <FileText size={20} className="text-[#111629]"/>
            <span className="font-bold text-[#111629] text-sm md:text-[15px]">Easy Applications</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Lock size={20} className="text-[#111629]"/>
            <span className="font-bold text-[#111629] text-sm md:text-[15px]">Secure Account Access</span>
          </div>
        </div>
      </section>

      {/* 5. What Is UniNest? */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto bg-[#F4F6F9]">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-[44px] font-black text-[#111629] mb-6 tracking-tight">What is UniNest?</h2>
          <p className="text-[17px] md:text-[19px] text-[#667085] leading-relaxed">
            Finding student accommodation off-campus is often fragmented and frustrating. UniNest solves this by bringing housing discovery, intelligent roommate matching, and seamless rental management together into one powerful, unified ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(17,22,41,0.04)] border border-[#E1E7EF] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#FF6B00] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#FF6B00] mb-8 bg-[#FF6B00]/10">
              <HomeIcon size={28} />
            </div>
            <h3 className="text-[22px] font-bold mb-4 text-[#111629]">Find a Home</h3>
            <p className="text-[#667085] leading-relaxed text-[16px] mb-8">
              Skip the shady listings and endless scrolling. Discover 100% verified rental properties near your university. Compare transparent pricing, essential amenities, room types, and commute distances all in one place.
            </p>
            <ul className="space-y-3 mt-auto">
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Verified Landlords</li>
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Proximity to Campus</li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(17,22,41,0.04)] border border-[#E1E7EF] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#16A34A] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#16A34A] mb-8 bg-[#16A34A]/10">
              <HeartHandshake size={28} />
            </div>
            <h3 className="text-[22px] font-bold mb-4 text-[#111629]">Find Your People</h3>
            <p className="text-[#667085] leading-relaxed text-[16px] mb-8">
              Your living experience is only as good as the people you share it with. Our intelligent matching engine connects you with compatible roommates based on actual lifestyle preferences, study habits, and sleep schedules.
            </p>
            <ul className="space-y-3 mt-auto">
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Lifestyle Matching</li>
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Safe Communication</li>
            </ul>
          </div>
          
          <div className="bg-white p-10 rounded-[2rem] shadow-[0_4px_20px_rgba(17,22,41,0.04)] border border-[#E1E7EF] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#111629] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#111629] mb-8 bg-[#F4F6F9] border border-[#E1E7EF]">
              <ClipboardList size={28} />
            </div>
            <h3 className="text-[22px] font-bold mb-4 text-[#111629]">Manage Your Stay</h3>
            <p className="text-[#667085] leading-relaxed text-[16px] mb-8">
              Ditch the messy email chains and scattered paperwork. Track your property applications, handle secure bookings, communicate directly with landlords, and manage lease information safely in a single digital dashboard.
            </p>
            <ul className="space-y-3 mt-auto">
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Digital Applications</li>
              <li className="flex items-center gap-3 text-sm text-[#111629] font-semibold"><CheckCircle2 size={18} className="text-[#16A34A]"/> Secure Leasing</li>
            </ul>
          </div>
        </div>
      </section>




      {/* 8. Dedicated Roommate Matching Section */}
      <section id="roommates" className="py-24 px-6 bg-[#111629] text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-[44px] font-black mb-6 leading-[1.1] tracking-tight">
              Your Home Matters.<br/>
              Your Roommate Does Too.
            </h2>
            <p className="text-[17px] text-slate-300 mb-10 leading-relaxed max-w-[500px]">
              Find students whose everyday habits and living preferences fit yours.
            </p>
            
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-[#16A34A]"/>
                Sleep and wake-up schedules
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-[#16A34A]"/>
                Cleanliness preferences
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-[#16A34A]"/>
                Study routines
              </li>
              <li className="flex items-center gap-3 text-slate-200 font-medium">
                <CheckCircle2 size={20} className="text-[#16A34A]"/>
                Lifestyle and social preferences
              </li>
            </ul>
            
            <Link href="/login?redirect=/student/roommates" className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-colors shadow-sm">
              Find Your Roommate <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Mockup Representation */}
          <div className="bg-[#1B2438] p-10 rounded-[2rem] border border-white/10 shadow-2xl relative">
            <div className="absolute top-6 right-6 bg-[#16A34A] text-white text-[13px] tracking-wide font-bold px-4 py-1.5 rounded-full shadow-sm">
              95% Match
            </div>
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-[#3B82F6] rounded-full border-4 border-[#1B2438] shadow-sm"></div>
              <div className="w-16 h-16 bg-[#A855F7] rounded-full border-4 border-[#1B2438] shadow-sm -ml-8"></div>
              <div className="text-xl font-bold text-white tracking-tight">High Compatibility</div>
            </div>
            <div className="space-y-4">
              <div className="h-2 w-full bg-[#111629] rounded-full overflow-hidden">
                <div className="h-full bg-[#16A34A] w-[95%]"></div>
              </div>
              <div className="flex justify-between text-sm text-slate-400 font-medium">
                <span>Early Birds</span>
                <span>Tidy</span>
                <span>Quiet Study</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Property Discovery Preview */}
      <section className="py-24 px-6 max-w-7xl mx-auto bg-white border-b border-[#E1E7EF]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-[40px] font-black text-[#111629] mb-4 tracking-tight">Explore Homes Near Your Campus</h2>
            <p className="text-[17px] text-[#667085]">Discover available rental properties based on real-time data.</p>
          </div>
          <Link href="/login?redirect=/student/explore" className="inline-flex items-center gap-2 font-bold text-[#111629] hover:text-[#667085] transition-colors">
            View All Properties <ArrowRight size={18}/>
          </Link>
        </div>
        
        {loadingProps ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#F4F6F9] rounded-2xl h-[400px] animate-pulse"></div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(prop => (
              <div key={prop.id} className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(17,22,41,0.03)] border border-[#E1E7EF] overflow-hidden hover:shadow-[0_8px_30px_rgba(17,22,41,0.06)] transition-all group">
                <div className="h-56 bg-[#F4F6F9] relative overflow-hidden">
                  {prop.images?.[0] ? (
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#667085]"><HomeIcon size={40} opacity={0.2}/></div>
                  )}
                  {prop.is_verified && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-[#16A34A] text-[13px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck size={14}/> Verified
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <h3 className="text-lg font-bold text-[#111629] truncate">{prop.title}</h3>
                    <div className="text-lg font-black text-[#111629]">₹{prop.rent_amount}</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-[#667085] mb-5 font-medium">
                    <MapPin size={16}/> {prop.locality}
                  </div>
                  <div className="flex items-center gap-4 text-sm font-semibold text-[#111629] mb-6 pt-5 border-t border-[#E1E7EF]">
                    <span className="flex items-center gap-1.5"><BedDouble size={16} className="text-[#667085]"/> {prop.bedrooms} Bed</span>
                    <span className="flex items-center gap-1.5 text-[#667085]">{prop.furnishing_status}</span>
                  </div>
                  <Link href={`/properties/${prop.id}`} className="block w-full text-center py-3.5 rounded-xl border border-[#E1E7EF] text-[#111629] font-bold hover:bg-[#F4F6F9] transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F4F6F9] rounded-2xl border border-[#E1E7EF] p-16 text-center">
            <HomeIcon size={48} className="mx-auto text-[#1B2438] mb-6 opacity-30" />
            <h3 className="text-xl font-bold text-[#111629] mb-3">No properties available yet</h3>
            <p className="text-[#667085] mb-8 max-w-md mx-auto">Be the first to list a property or check back soon.</p>
            <Link href="/signup" className="inline-block px-8 py-3.5 bg-[#111629] text-white font-bold rounded-xl shadow-sm hover:bg-[#1B2438] transition-colors">
              Add a Property
            </Link>
          </div>
        )}
      </section>

      {/* 10. Dedicated Landlord Section */}
      <section className="py-24 px-6 bg-[#F4F6F9]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="rounded-[2rem] overflow-hidden border border-[#E1E7EF] shadow-[0_8px_30px_rgba(17,22,41,0.06)] h-full relative group min-h-[400px]">
            <img 
              src="/landlord-illustration.jpg" 
              alt="UniNest Landlord Role" 
              className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          <div>
            <h2 className="text-4xl md:text-[40px] font-black text-[#111629] mb-6 tracking-tight">Have a Property?<br/>Reach the Right Students.</h2>
            <p className="text-[17px] text-[#667085] mb-10 leading-relaxed">
              Manage your rental listings, respond to interested students, review applications, and keep your property information organised from one dashboard.
            </p>
            <ul className="space-y-4 mb-10 text-[15px] font-semibold text-[#111629]">
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Create and update property listings.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Manage rental prices and availability.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Review student applications.</li>
              <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-[#16A34A]" /> Organise viewing requests and tenant information.</li>
            </ul>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111629] text-white font-bold rounded-xl hover:bg-[#1B2438] transition-colors shadow-sm">
              Join as a Landlord <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 11. Final Call to Action */}
      <section className="py-24 px-6 mx-4 max-w-7xl lg:mx-auto bg-[#111629] rounded-[2rem] lg:rounded-[3rem] my-20 shadow-2xl relative overflow-hidden">
        {/* Subtle ambient lighting effects */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-[#16A34A] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[400px] h-[400px] bg-[#FF6B00] opacity-10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-[48px] font-black text-white mb-6 tracking-tight leading-tight">
            Your Next Chapter Starts<br/>With the Right Home.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#94A3B8] mb-12 leading-relaxed max-w-2xl mx-auto">
            Make finding student housing simpler. Discover your next home and connect with people who fit your lifestyle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login?redirect=/student/explore" className="w-full sm:w-auto px-10 py-4 bg-[#FF6B00] text-white font-bold rounded-xl hover:bg-[#e66000] transition-colors shadow-lg shadow-[#FF6B00]/25 text-[16px]">
              Explore Housing
            </Link>
            <Link href="/login?redirect=/student/roommates" className="w-full sm:w-auto px-10 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-md text-[16px]">
              Find a Roommate
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-[#F4F6F9] pt-16 pb-8 px-6 border-t border-[#E1E7EF]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#111629] rounded-lg flex items-center justify-center font-black text-white text-sm">U</div>
              <span className="font-bold tracking-tight text-[#111629] text-xl">UNINEST</span>
            </div>
            <p className="text-[#667085] text-sm leading-relaxed max-w-xs font-medium">
              Intelligent student housing and roommate matching platform designed for modern university life.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#111629] mb-4 text-[15px]">Students</h4>
            <ul className="space-y-3 text-sm text-[#667085] font-medium">
              <li><Link href="/login?redirect=/student/explore" className="hover:text-[#111629] transition-colors">Find Housing</Link></li>
              <li><Link href="/login?redirect=/student/roommates" className="hover:text-[#111629] transition-colors">Roommate Match</Link></li>
              <li><Link href="/student" className="hover:text-[#111629] transition-colors">Student Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#111629] mb-4 text-[15px]">Landlords</h4>
            <ul className="space-y-3 text-sm text-[#667085] font-medium">
              <li><Link href="/signup" className="hover:text-[#111629] transition-colors">List a Property</Link></li>
              <li><Link href="/landlord" className="hover:text-[#111629] transition-colors">Landlord Dashboard</Link></li>
              <li><Link href="#" className="hover:text-[#111629] transition-colors">Landlord Guide</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#111629] mb-4 text-[15px]">Account</h4>
            <ul className="space-y-3 text-sm text-[#667085] font-medium">
              <li><Link href="/login" className="hover:text-[#111629] transition-colors">Log In</Link></li>
              <li><Link href="/signup" className="hover:text-[#111629] transition-colors">Register</Link></li>
              <li><Link href="#" className="hover:text-[#111629] transition-colors">Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-[#E1E7EF] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[13px] font-semibold text-[#667085]">
            © {new Date().getFullYear()} UniNest. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px] font-semibold text-[#667085]">
            <Link href="#" className="hover:text-[#111629] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#111629] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
