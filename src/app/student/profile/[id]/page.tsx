'use client';

import { STUDENTS } from '@/lib/data';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { User, Mail, BookOpen, Clock, VolumeX, Wind, Coffee, Home, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const student = STUDENTS.find(s => s.id === id);

  if (!student) {
    notFound();
  }

  // Generate a consistent dummy image for the user based on ID
  const dummyImages = [
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  ];
  const imageUrl = dummyImages[parseInt(id.replace('s', '')) % dummyImages.length] || dummyImages[0];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      {/* Back Button */}
      <Link href="/student/roommates" className="inline-flex items-center text-text-secondary hover:text-primary-orange font-bold text-sm transition-colors bg-white px-4 py-2 rounded-xl border border-border shadow-sm">
        <ArrowLeft size={16} className="mr-2" /> Back to Roommates
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Photo & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-xl border-2 border-border flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-32 bg-primary-blue -z-10"></div>
            
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 mt-8 bg-surface-light">
              <img src={imageUrl} alt={student.name} className="w-full h-full object-cover" />
            </div>
            
            <h1 className="text-3xl font-extrabold text-foreground flex items-center justify-center">
              {student.name}
              {student.verified && <CheckCircle size={20} className="text-primary-blue ml-2" fill="currentColor" stroke="white" strokeWidth={1} />}
            </h1>
            
            <div className="bg-light-orange text-primary-orange px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mt-3 shadow-sm">
              UniNest Student
            </div>

            <div className="w-full border-t border-border mt-6 pt-6 space-y-4">
              <div className="flex items-center text-text-secondary">
                <BookOpen size={18} className="mr-3 text-primary-orange" />
                <span className="font-bold text-sm">{student.course} • Year {student.year}</span>
              </div>
              <div className="flex items-center text-text-secondary">
                <User size={18} className="mr-3 text-primary-orange" />
                <span className="font-bold text-sm">{student.gender}</span>
              </div>
              <div className="flex items-center text-text-secondary">
                <Mail size={18} className="mr-3 text-primary-orange" />
                <span className="font-bold text-sm">{student.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preferences & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-border">
            <h2 className="text-2xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">Lifestyle Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Sleep Schedule</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">Sleeps {student.preferences.sleepTime} • Wakes {student.preferences.wakeTime}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <VolumeX size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Noise Tolerance</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">{student.preferences.noiseTolerance} Noise</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <Wind size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Smoking</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">{student.preferences.smoking}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <Coffee size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Dietary</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">{student.preferences.foodPreference}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Guests</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">{student.preferences.guestPreference}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-light border border-border flex items-center justify-center mr-4 shrink-0 text-primary-orange">
                  <Home size={20} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-text-secondary">Cleanliness</p>
                  <p className="font-extrabold text-foreground text-sm mt-1">{student.preferences.cleanliness}</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-border">
            <h2 className="text-2xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">Housing Budget</h2>
            <div className="flex items-center justify-between p-6 bg-surface-light rounded-2xl border border-border">
               <div>
                 <p className="text-sm font-bold text-text-secondary">Target Rent (Per Month)</p>
                 <p className="text-3xl font-black text-primary-blue mt-1">₹{student.preferences.budgetMin.toLocaleString()} - ₹{student.preferences.budgetMax.toLocaleString()}</p>
               </div>
               <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold px-3 py-1 bg-white border border-border rounded-full shadow-sm text-primary-orange mb-2">Requires AC: {student.preferences.ac ? 'Yes' : 'No'}</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
