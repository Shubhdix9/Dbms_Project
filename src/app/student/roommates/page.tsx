'use client';
import { useState, useEffect } from 'react';

import { STUDENTS, PROPERTIES } from '@/lib/data';
import { CheckCircle, Clock, VolumeX, BookOpen, Wind, Heart, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function RoommateMatch() {
  const [hasFilledPreferences, setHasFilledPreferences] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const currentUser = STUDENTS.find(s => s.id === 's2');

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem('uninest_preferences_filled') === 'true') {
      setHasFilledPreferences(true);
    }
  }, []);
  
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

  if (!isMounted) return null;

  if (!hasFilledPreferences) {
    return (
      <div className="max-w-[800px] mx-auto p-4 md:p-8 pb-20">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 border-2 border-border shadow-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-3 tracking-tight">Roommate Preferences</h2>
            <p className="text-text-secondary text-lg">Tell us about your lifestyle to find your perfect match.</p>
          </div>

          <form onSubmit={(e) => { 
            e.preventDefault(); 
            localStorage.setItem('uninest_preferences_filled', 'true');
            setHasFilledPreferences(true); 
          }} className="space-y-8">
            
            {/* Academic Information */}
            <div>
              <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">Academic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Branch / Course</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>B.Tech CSE</option>
                    <option>B.Tech ECE</option>
                    <option>BBA</option>
                    <option>B.Des</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Year</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Semester</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>Semester 1</option>
                    <option>Semester 2</option>
                    <option>Semester 3</option>
                    <option>Semester 4</option>
                    <option>Semester 5</option>
                    <option>Semester 6</option>
                    <option>Semester 7</option>
                    <option>Semester 8</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Section</label>
                  <input type="text" placeholder="e.g. A, B, C" className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue" />
                </div>
              </div>
            </div>

            {/* Lifestyle Preferences */}
            <div>
              <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">Lifestyle Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Sleep Time</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>Before 10 PM</option>
                    <option>10 PM - 12 AM</option>
                    <option>After 12 AM</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Wake Time</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>Before 7 AM</option>
                    <option>7 AM - 9 AM</option>
                    <option>After 9 AM</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Noise Tolerance</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>Low (Quiet study environment)</option>
                    <option>Medium (Occasional music/guests)</option>
                    <option>High (Very social)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Cleanliness</label>
                  <select className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue appearance-none">
                    <option>High (Always clean)</option>
                    <option>Medium (Clean once a week)</option>
                    <option>Low (Messy is fine)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Housing Preferences */}
            <div>
              <h3 className="text-sm font-extrabold text-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">Housing Preferences</h3>
              <div className="relative">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 block">Preferred Location / Society</label>
                <input 
                  type="text" 
                  value={locationQuery}
                  onChange={(e) => {
                    setLocationQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="e.g. Samanvay Aasra, Mahapura" 
                  className="w-full bg-surface-light border border-border px-4 py-3.5 rounded-xl text-sm font-medium focus:outline-none focus:border-primary-blue" 
                />
                
                {showSuggestions && locationQuery.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-border rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {PROPERTIES.filter(p => p.title.toLowerCase().includes(locationQuery.toLowerCase()) || (p.project && p.project.toLowerCase().includes(locationQuery.toLowerCase())))
                      .map(p => (
                        <div 
                          key={p.id}
                          className="px-4 py-3 hover:bg-surface-light cursor-pointer border-b border-border last:border-0"
                          onClick={() => {
                            setLocationQuery(p.title);
                            setShowSuggestions(false);
                          }}
                        >
                          <p className="text-sm font-bold text-foreground">{p.title}</p>
                          <p className="text-xs text-text-secondary">{p.location}</p>
                        </div>
                      ))}
                    {PROPERTIES.filter(p => p.title.toLowerCase().includes(locationQuery.toLowerCase()) || (p.project && p.project.toLowerCase().includes(locationQuery.toLowerCase()))).length === 0 && (
                      <div className="px-4 py-3 text-sm text-text-secondary">No matching societies found.</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-primary-orange text-white font-extrabold rounded-xl shadow-lg hover:bg-orange-600 transition-colors mt-8">
              Find My Perfect Roommate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20 max-w-[1400px] mx-auto mt-4 px-4 md:px-8">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">Your perfect roommates.</h1>
          <p className="text-text-secondary">Matches based on your academic schedule, lifestyle habits, and housing preferences.</p>
        </div>
        <button onClick={() => {
            localStorage.removeItem('uninest_preferences_filled');
            setHasFilledPreferences(false);
          }} className="text-sm font-bold text-primary-orange hover:underline">
            Update Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {recommendations.map(({ student, match, overallScore }, i) => (
          <div key={student.id} className="bg-white border-2 border-border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all group flex flex-col">
            
            {/* Top Photo Section */}
            <div className="relative h-72 w-full bg-[#0a1128] overflow-hidden">
              <img src={student.imageUrl} alt={student.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/20 to-transparent opacity-90"></div>
              
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
