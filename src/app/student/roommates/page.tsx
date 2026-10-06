'use client';

import { STUDENTS } from '@/lib/data';
import { CheckCircle, Clock, VolumeX, BookOpen, Wind, Heart, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function RoommateMatch() {
  const currentUser = STUDENTS.find(s => s.id === 's2');
  
  // Fake compute match for demo
  const recommendations = STUDENTS.filter(s => s.id !== 's2' && s.gender === currentUser?.gender).map((s, index) => {
    const images = [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    ];

    return {
      student: { ...s, imageUrl: images[index % images.length] },
      match: {
        budgetScore: 90 + Math.floor(Math.random() * 10),
        lifestyleScore: 70 + Math.floor(Math.random() * 25),
        housingScore: 80 + Math.floor(Math.random() * 15),
      }
    };
  }).map(r => ({
    ...r,
    overallScore: Math.round(r.match.housingScore * 0.6 + r.match.lifestyleScore * 0.4)
  })).sort((a, b) => b.overallScore - a.overallScore);

  return (
    <div className="space-y-8 pb-12 max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">Find your perfect roommate.</h1>
          <p className="text-text-secondary">UniNest demo match based on budget, lifestyle and housing preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {recommendations.map(({ student, match, overallScore }, i) => (
          <div key={student.id} className="bg-white border-2 border-border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all group flex flex-col">
            
            {/* Top Photo Section */}
            <div className="relative h-64 w-full bg-gray-900">
              <img src={student.imageUrl} alt={student.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {i === 0 && (
                <div className="absolute top-4 right-4 bg-primary-orange text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-md">
                  Top Match
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-extrabold text-white text-2xl flex items-center drop-shadow-md">
                  {student.name}
                  {student.verified && <CheckCircle size={18} className="text-blue-400 ml-2" fill="currentColor" stroke="white" strokeWidth={1} />}
                </h3>
                <p className="text-sm font-medium text-white/90 drop-shadow-md mt-1 flex items-center">
                  <Briefcase size={14} className="mr-1.5 opacity-80" /> {student.course} • Year {student.year}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-1">
              
              {/* Match Score */}
              <div className="bg-surface-light rounded-2xl p-5 mb-6 border border-border">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">UniNest Match</span>
                  <span className="text-3xl font-extrabold text-primary-blue leading-none">{overallScore}%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2 mb-4 border border-border overflow-hidden">
                  <div className="bg-primary-orange h-full rounded-full" style={{ width: `${overallScore}%` }}></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mt-5 divide-x divide-border">
                  <div>
                    <div className="text-sm font-bold text-foreground">{match.budgetScore}%</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold mt-1">Budget</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{match.lifestyleScore}%</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold mt-1">Lifestyle</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{match.housingScore}%</div>
                    <div className="text-[10px] text-text-secondary uppercase tracking-wider font-bold mt-1">Housing</div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Mini Grid */}
              <div className="space-y-3 mb-6 flex-1">
                <h4 className="text-[10px] font-bold tracking-widest text-text-secondary uppercase mb-3">Lifestyle</h4>
                <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                  <div className="flex items-center text-xs font-bold text-foreground">
                    <div className="w-7 h-7 rounded-full bg-surface-light flex items-center justify-center mr-2 border border-border"><Clock size={12} className="text-primary-blue" /></div> 
                    {student.preferences.sleepTime}
                  </div>
                  <div className="flex items-center text-xs font-bold text-foreground">
                    <div className="w-7 h-7 rounded-full bg-surface-light flex items-center justify-center mr-2 border border-border"><VolumeX size={12} className="text-primary-blue" /></div> 
                    {student.preferences.noiseTolerance} Noise
                  </div>
                  <div className="flex items-center text-xs font-bold text-foreground">
                    <div className="w-7 h-7 rounded-full bg-surface-light flex items-center justify-center mr-2 border border-border"><BookOpen size={12} className="text-primary-blue" /></div> 
                    {student.preferences.studyHabits}
                  </div>
                  <div className="flex items-center text-xs font-bold text-foreground">
                    <div className="w-7 h-7 rounded-full bg-surface-light flex items-center justify-center mr-2 border border-border"><Wind size={12} className="text-primary-blue" /></div> 
                    {student.preferences.smoking}
                  </div>
                </div>
              </div>

              {/* View Profile Button */}
              <Link href={`/student/profile/${student.id}`} className="w-full bg-primary-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-colors shadow-sm flex items-center justify-center text-sm">
                View Detailed Profile
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
