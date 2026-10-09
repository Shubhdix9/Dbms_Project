'use client';

import { PROPERTIES, STUDENTS, LANDLORDS } from '@/lib/data';
import { MapPin, CheckCircle, IndianRupee, Home, Ruler, Calendar, Shield, Phone, MessageSquare, Bed, Bath, Wind, Car, Zap, Wifi, Users, Camera, X, Star, Sparkles, TrendingUp, Minus, ThumbsUp, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SavingsCalculator from '@/components/SavingsCalculator';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserGroups, createOnePersonGroup } from '@/app/actions/collaboration';

const MOCK_REVIEWS = [
  {
    id: 1,
    studentName: 'Homini',
    avatar: 'H',
    rating: 5,
    title: 'Good Quality.',
    date: 'Reviewed in India on 3 January 2026',
    verified: true,
    text: 'This is an excellent property with fully furnished rooms. It supports two students perfectly, and the landlord is very responsive. Very sturdy and great quality. Must rent.',
    images: ['/room/Samanvay%20Aasra/rooms/4.jpg', '/room/Samanvay%20Aasra/rooms/5.jpg']
  },
  {
    id: 2,
    studentName: 'Sheetal Dhake',
    avatar: 'S',
    rating: 5,
    title: 'Perfect and High Quality Property',
    date: 'Reviewed in India on 20 April 2026',
    verified: true,
    text: 'I am living here for 2 Semesters. The flat is extremely sturdy and fit/finish is excellent. All rooms were maintained well including all beds, desks and ACs. Good property.',
    images: []
  }
];

export default function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isAdded, setIsAdded] = useState(false);
  const [showGroupSuccessModal, setShowGroupSuccessModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [propertyGroups, setPropertyGroups] = useState<any[]>([]);
  const [dynamicStudents, setDynamicStudents] = useState<any[]>(STUDENTS);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (data?.user) {
        setCurrentUser(data.user);
        const groups = await getUserGroups(data.user.id);
        const hasProperty = groups.some(g => g.propertyId === id);
        setIsAdded(hasProperty);
      }
    });
    // For demo, we are just fetching the user's groups. Real-world would fetch all groups for this property.
  }, [id]);

  const [isVisitBooked, setIsVisitBooked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const property = PROPERTIES.find(p => p.id === id);
  
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-foreground">Property not found</h2>
        <Link href="/student/explore" className="text-primary-blue mt-4 hover:underline">Return to Explore</Link>
      </div>
    );
  }

  const allImages: string[] = (property as any).images || (property.imageUrl ? [property.imageUrl] : []);
  const filteredImages = allImages.filter((img) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Rooms') return img.toLowerCase().includes('rooms');
    if (activeFilter === 'Exterior') return img.toLowerCase().includes('exterior');
    return true;
  });

  const cost = property.rent + (typeof property.maintenance === 'number' ? property.maintenance : 0);

  return (
    <div className="max-w-[1400px] mx-auto pb-20">
      {/* Header Image Area */}
      <div className="relative h-[300px] md:h-[450px] w-full rounded-b-3xl overflow-hidden shadow-lg mb-8 bg-gray-200 group">
        {property.imageUrl ? (
          <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-light"><Home size={64} className="text-gray-300" /></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        <button onClick={() => router.back()} className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors">
          ← Back
        </button>

        {property.verifiedByUniNest && (
          <div className="absolute top-6 right-6 bg-success text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg flex items-center">
            <CheckCircle size={16} className="mr-2" /> UniNest Verified
          </div>
        )}

        <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="text-white flex flex-col gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-2 text-white">{property.title}</h1>
              <p className="text-white/80 flex items-center text-sm md:text-base font-medium">
                <MapPin size={16} className="mr-1.5" /> {property.location} • {property.distanceKm} km from JKLU
              </p>
            </div>
            <button onClick={() => setIsGalleryOpen(true)} className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-white/30 transition-colors w-max flex items-center">
              <Camera size={16} className="mr-2" /> View all photos
            </button>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-text-secondary block">Monthly Rent</span>
              <span className="text-2xl font-extrabold text-primary-blue flex items-center"><IndianRupee size={20} className="mr-0.5"/> {cost.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => {
                if (!isVisitBooked) setShowBookingModal(true);
              }}
              disabled={isVisitBooked}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-colors shadow-sm ml-2 ${
                isVisitBooked 
                  ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                  : 'bg-primary-orange text-white hover:bg-orange-600'
              }`}
            >
              {isVisitBooked ? 'Visit Booked' : 'Book Visit'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Bed size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Config</span><span className="font-bold text-foreground text-sm">{property.configuration}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Bath size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Bathrooms</span><span className="font-bold text-foreground text-sm">{property.bathrooms || 1}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Home size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Furnishing</span><span className="font-bold text-foreground text-sm truncate">{property.furnishing || 'Semi'}</span></div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-light-blue flex items-center justify-center text-primary-blue shrink-0"><Ruler size={18} /></div>
              <div><span className="text-[10px] text-text-secondary uppercase tracking-widest font-bold block">Area</span><span className="font-bold text-foreground text-sm">{property.areaSqFt || 'N/A'} sqft</span></div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-extrabold text-foreground mb-4">About the Property</h2>
            <p className="text-text-secondary leading-relaxed">
              This beautiful {property.configuration} is perfectly situated for JKLU students, located just {property.distanceKm} km from campus.
              It comes {property.furnishing?.toLowerCase()} and includes standard student amenities. 
              The society is well-maintained and provides a great study environment.
            </p>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm">
            <h2 className="text-xl font-extrabold text-foreground mb-6">What's Included</h2>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Wifi size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Internet: <span className="font-normal text-text-secondary">{property.internet || 'Not specified'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Zap size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Electricity: <span className="font-normal text-text-secondary">{property.electricity || 'Tenant pays'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Car size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Parking: <span className="font-normal text-text-secondary">{property.parking || 'N/A'}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-surface-light border border-border flex items-center justify-center"><Wind size={14} className="text-text-secondary"/></div>
                <span className="font-medium text-foreground text-sm">Balconies: <span className="font-normal text-text-secondary">{property.balconies || 1}</span></span>
              </div>
            </div>
          </div>
          
          {/* Rent Savings Calculator */}
          <SavingsCalculator monthlyCost={cost} maxOccupancy={(property as any).maxOccupancy} />

          {/* Reviews Section - Amazon Style */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-border shadow-sm mt-8">
            <h2 className="text-xl font-extrabold text-foreground mb-2">Students say</h2>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              Students find the property safe and of high quality, considering it an amazing value for the rent. 
              The move-in process receives mixed feedback, with several students finding it easy to settle in.
            </p>
            <div className="flex items-center text-xs text-text-secondary mt-2 mb-4 font-medium">
              <Sparkles size={12} className="mr-1 text-gray-500" /> Generated from the text of student reviews
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-foreground mb-3">Select to learn more</h3>
              <div className="flex flex-wrap gap-2">
                <button className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-md border border-teal-100 hover:bg-teal-100 transition-colors">
                  <TrendingUp size={14} /> Safety <span className="text-gray-500 font-normal">(12)</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-md border border-teal-100 hover:bg-teal-100 transition-colors">
                  <TrendingUp size={14} /> Cleanliness <span className="text-gray-500 font-normal">(9)</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-md border border-teal-100 hover:bg-teal-100 transition-colors">
                  <TrendingUp size={14} /> Value for money <span className="text-gray-500 font-normal">(9)</span>
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-100 transition-colors">
                  <Minus size={14} /> Move-in <span className="text-gray-500 font-normal">(5)</span>
                </button>
              </div>
            </div>

            <div className="mb-8 border-b border-border pb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Student photos and videos</h3>
                <button onClick={() => setIsGalleryOpen(true)} className="text-sm font-medium text-blue-600 hover:underline">See all ›</button>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide items-center">
                <button className="min-w-8 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 bg-white shadow-sm shrink-0">
                  <ChevronLeft size={16} className="text-gray-600" />
                </button>
                {allImages.slice(0, 5).map((img, i) => (
                  <div key={i} onClick={() => setSelectedPhotoIndex(i)} className="w-48 h-32 shrink-0 rounded-lg overflow-hidden relative border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                    <img src={img} className="w-full h-full object-cover" />
                    <div className="absolute bottom-2 left-2 flex text-orange-500">
                      {[...Array(5)].map((_, j) => <Star key={j} size={10} fill="currentColor" />)}
                    </div>
                  </div>
                ))}
                <button className="min-w-8 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 bg-white shadow-sm shrink-0">
                  <ChevronRight size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-foreground mb-6">Top reviews from India</h3>
              <div className="space-y-8">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                        {review.avatar}
                      </div>
                      <span className="text-sm font-medium">{review.studentName}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-orange-500">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="text-orange-500" />)}
                      </div>
                      <span className="text-sm font-bold text-foreground">{review.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{review.date}</p>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-2">
                      Size: {property.configuration} <span className="font-bold text-orange-700">Verified Purchase</span>
                    </p>
                    <p className="text-sm text-foreground mb-4">{review.text}</p>
                    
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {review.images.map((img, i) => (
                          <div key={i} onClick={() => setSelectedPhotoIndex(allImages.indexOf(img) !== -1 ? allImages.indexOf(img) : 0)} className="w-36 h-24 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity">
                            <img src={img} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mb-3">One person found this helpful</p>
                    <div className="flex gap-3 items-center">
                      <button className="text-xs font-medium border border-gray-300 rounded-full px-4 py-1.5 hover:bg-gray-50 transition-colors">
                        Helpful
                      </button>
                      <span className="text-gray-300">|</span>
                      <button className="text-xs text-gray-600 hover:underline">Report</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Pricing & Contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border-2 border-primary-blue/20 shadow-sm">
            <h2 className="text-lg font-extrabold text-foreground mb-4">Cost Breakdown</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm font-medium">Base Rent (Monthly)</span>
                <span className="font-bold text-foreground">₹{property.rent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm font-medium">Maintenance</span>
                <span className="font-bold text-foreground">{typeof property.maintenance === 'number' ? `₹${property.maintenance.toLocaleString()}` : property.maintenance || 'Included'}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <span className="font-bold text-foreground">Total Monthly</span>
                <span className="font-extrabold text-primary-blue text-lg flex items-center"><IndianRupee size={16}/> {cost.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-surface-light p-4 rounded-xl border border-border mb-6">
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1 block">One-time Payment</span>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Security Deposit</span>
                <span className="font-bold text-foreground">₹{property.securityDeposit?.toLocaleString() || 'N/A'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (!isVisitBooked) setShowBookingModal(true);
                }}
                disabled={isVisitBooked}
                className={`w-full font-bold py-3 rounded-xl transition-colors shadow-sm flex items-center justify-center ${
                  isVisitBooked 
                    ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                    : 'bg-primary-orange text-white hover:bg-orange-600'
                }`}
              >
                {isVisitBooked ? (
                  <><CheckCircle size={18} className="mr-2" /> Visit Booked</>
                ) : (
                  <><Calendar size={18} className="mr-2" /> Book a Visit</>
                )}
              </button>
              
              {!showContact ? (
                <button 
                  onClick={() => setShowContact(true)}
                  className="w-full bg-white border border-border text-foreground font-bold py-3 rounded-xl hover:border-primary-blue hover:text-primary-blue transition-colors flex items-center justify-center"
                >
                  <MessageSquare size={18} className="mr-2" /> Contact Landlord
                </button>
              ) : (
                <div className="w-full bg-surface-light border border-border p-4 rounded-xl flex flex-col gap-2 animate-in fade-in zoom-in duration-200">
                  {((property as any).landlordId && LANDLORDS.find(l => l.id === (property as any).landlordId)) ? (() => {
                    const landlord = LANDLORDS.find(l => l.id === (property as any).landlordId)!;
                    return (
                      <>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold">{landlord.name.charAt(0)}</div>
                          <div>
                            <p className="text-sm font-bold">{landlord.name}</p>
                            {landlord.verified && <p className="text-[10px] text-green-600 flex items-center"><CheckCircle size={10} className="mr-1" /> Verified</p>}
                          </div>
                        </div>
                        <p className="text-sm flex items-center font-medium"><Phone size={14} className="mr-2 text-text-secondary"/> {landlord.phone}</p>
                        <p className="text-sm flex items-center font-medium"><MessageSquare size={14} className="mr-2 text-text-secondary"/> {landlord.email}</p>
                      </>
                    );
                  })() : (
                    <p className="text-sm text-text-secondary font-medium">Landlord details not disclosed for this property.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Roommate Matching Box */}
          <div className="bg-white rounded-2xl p-6 border-2 border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-extrabold text-foreground flex items-center">
                <Users size={18} className="mr-2 text-primary-orange" /> Looking for Roommates
              </h2>
              <span className="bg-light-orange text-primary-orange text-[10px] font-extrabold px-2 py-1 rounded-full">
                {dynamicStudents.filter((s: any) => s.id !== 's2' && (s.preferences as any).preferredPropertyId === id).length} Matches
              </span>
            </div>
            <p className="text-xs text-text-secondary mb-4">These verified JKLU students want to book this property and need a roommate to split rent.</p>
            
            <div className="space-y-3">
              {dynamicStudents.filter((s: any) => s.id !== 's2' && (s.preferences as any).preferredPropertyId === id).length > 0 ? (
                dynamicStudents.filter((s: any) => s.id !== 's2' && (s.preferences as any).preferredPropertyId === id).map((student: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 bg-surface-light rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold shadow-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary-blue line-clamp-1 flex items-center">
                        {student.name}
                        {currentUser && student.id === currentUser.id && (
                          <span className="ml-2 bg-primary-blue text-white text-[9px] px-1.5 py-0.5 rounded-md uppercase tracking-wider">You</span>
                        )}
                      </h4>
                      <p className="text-[10px] font-bold text-text-secondary uppercase">{student.course} • Year {student.year}</p>
                    </div>
                  </div>
                  {(!currentUser || student.id !== currentUser.id) && (
                    <Link href={`/student/profile/${student.id}`} className="px-3 py-1.5 bg-white border border-border text-xs font-bold text-text-secondary hover:text-primary-blue hover:border-primary-blue rounded-lg transition-colors">
                      View
                    </Link>
                  )}
                </div>
                ))
              ) : (
                <div className="p-4 bg-surface-light rounded-xl border border-border text-center text-sm font-medium text-text-secondary">
                  No one is looking for a roommate here yet. Be the first!
                </div>
              )}
            </div>
            
            <button 
              disabled={isAdded}
              onClick={async () => {
                if (!currentUser) return alert('Please login first');
                const res = await createOnePersonGroup(id, currentUser);
                if (res.success) {
                  setIsAdded(true);
                  setShowGroupSuccessModal(true);
                } else {
                  alert(res.error || 'Failed to create group');
                }
              }}
              className={`w-full font-extrabold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center text-sm
                ${isAdded 
                  ? 'bg-surface-light text-text-secondary border-2 border-border cursor-not-allowed' 
                  : 'bg-primary-blue text-white hover:bg-blue-900 shadow-blue-900/20'
                }`}
            >
              {isAdded ? (
                <><CheckCircle size={16} className="mr-2"/> Group Created - See Dashboard</>
              ) : (
                'Add Myself to List'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border flex justify-between items-center bg-surface-light">
              <h2 className="text-xl font-extrabold text-primary-blue flex items-center">
                <Calendar size={20} className="mr-2 text-primary-orange" /> Schedule Visit
              </h2>
              <button onClick={() => setShowBookingModal(false)} className="text-text-secondary hover:text-foreground bg-white p-1.5 rounded-full border border-border shadow-sm">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Select Date</label>
                <input type="date" className="w-full bg-surface-light border border-border px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue" />
              </div>
              
              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Select Time</label>
                <select className="w-full bg-surface-light border border-border px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>01:00 PM</option>
                  <option>03:00 PM</option>
                  <option>05:00 PM</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1.5 block">Message (Optional)</label>
                <textarea rows={3} placeholder="Any specific requirements?" className="w-full bg-surface-light border border-border px-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue resize-none"></textarea>
              </div>
            </div>
            
            <div className="p-6 border-t border-border bg-surface-light flex gap-3">
              <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 bg-white border border-border text-foreground font-bold rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button 
                onClick={() => {
                  setIsVisitBooked(true);
                  setShowBookingModal(false);
                }} 
                className="flex-1 py-3 bg-primary-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-sm"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-[9999] flex bg-black/60">
          {/* Sidebar-style Modal Panel (Google Maps style) */}
          <div className="w-full md:w-[450px] h-full bg-[#1e1f22] flex flex-col shadow-2xl relative animate-in slide-in-from-left duration-300">
            {/* Header */}
            <div className="p-4 sm:p-5 flex justify-between items-start shrink-0">
              <div>
                <h2 className="text-xl font-semibold text-white">Images</h2>
                <p className="text-sm text-gray-400 mt-1">{property.title}</p>
              </div>
              <button 
                onClick={() => setIsGalleryOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto px-4 sm:px-5 pb-4 scrollbar-hide shrink-0">
              <button 
                onClick={() => setActiveFilter('All')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'All' ? 'bg-[#8ab4f8]/20 border border-[#8ab4f8]/30 text-[#8ab4f8]' : 'bg-[#2d2e30] border border-gray-600 text-gray-300 hover:bg-[#3d3e40]'}`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-600">
                   {allImages[0] && <img src={allImages[0]} className="w-full h-full object-cover" />}
                </div>
                All
              </button>
              <button 
                onClick={() => setActiveFilter('Rooms')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'Rooms' ? 'bg-[#8ab4f8]/20 border border-[#8ab4f8]/30 text-[#8ab4f8]' : 'bg-[#2d2e30] border border-gray-600 text-gray-300 hover:bg-[#3d3e40]'}`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-600">
                   {allImages.find((img) => img.toLowerCase().includes('rooms')) && <img src={allImages.find((img) => img.toLowerCase().includes('rooms'))} className="w-full h-full object-cover" />}
                </div>
                Rooms
              </button>
              <button 
                onClick={() => setActiveFilter('Exterior')}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === 'Exterior' ? 'bg-[#8ab4f8]/20 border border-[#8ab4f8]/30 text-[#8ab4f8]' : 'bg-[#2d2e30] border border-gray-600 text-gray-300 hover:bg-[#3d3e40]'}`}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-600">
                   {allImages.find((img) => img.toLowerCase().includes('exterior')) && <img src={allImages.find((img) => img.toLowerCase().includes('exterior'))} className="w-full h-full object-cover" />}
                </div>
                Exterior
              </button>
            </div>

            {/* Sub-header Add Photos */}
            <div className="flex justify-between items-center px-4 sm:px-5 pb-4 shrink-0 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">{activeFilter}</h3>
              <button className="flex items-center gap-2 border border-gray-600 text-blue-300 hover:bg-gray-800 px-3 py-1.5 rounded-full text-sm font-medium transition-colors">
                <Camera size={14} /> Add photos
              </button>
            </div>

            {/* Masonry Grid */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
              {filteredImages.length > 0 ? (
                <div className="columns-2 gap-3 space-y-3">
                  {filteredImages.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="break-inside-avoid relative rounded-xl overflow-hidden bg-[#2d2e30] cursor-pointer"
                      onClick={() => setSelectedPhotoIndex(allImages.indexOf(img))}
                    >
                      <img 
                        src={img} 
                        alt={`${property.title} photo ${idx + 1}`} 
                        className="w-full h-auto object-cover hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-400 text-center mt-10">No photos available for this filter</div>
              )}
            </div>
          </div>
          
          {/* Clickable backdrop to close */}
          <div className="flex-1 cursor-pointer" onClick={() => setIsGalleryOpen(false)}></div>
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95">
          <button 
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-6 right-6 text-gray-400 hover:text-white p-2 z-[10010] bg-black/50 rounded-full backdrop-blur-sm transition-colors"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <img 
              src={allImages[selectedPhotoIndex]} 
              alt="Fullscreen view" 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </div>
      )}

      {/* Group Success Modal */}
      {showGroupSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative border-2 border-border transform transition-all scale-100 opacity-100">
            <button 
              onClick={() => setShowGroupSuccessModal(false)}
              className="absolute top-4 right-4 p-2 text-text-secondary hover:bg-surface-light rounded-full transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={40} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-extrabold text-foreground mb-2">Group Created!</h3>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                You've successfully secured a spot for this property. Head over to the Roommate Dashboard to find and invite others to split the rent!
              </p>
              
              <div className="space-y-3">
                <Link 
                  href="/student/roommates"
                  className="w-full py-4 bg-primary-blue text-white rounded-xl text-sm font-bold shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center"
                >
                  Go to Dashboard <ArrowRight size={16} className="ml-2" />
                </Link>
                <button 
                  onClick={() => setShowGroupSuccessModal(false)}
                  className="w-full py-4 bg-white border-2 border-border text-text-secondary rounded-xl text-sm font-bold hover:bg-surface-light transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
