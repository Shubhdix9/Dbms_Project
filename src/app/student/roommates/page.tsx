'use client';

import { STUDENTS, MATCHES } from '@/lib/data';
import { User, CheckCircle, Clock, VolumeX, BookOpen, Coffee, Wind, Settings } from 'lucide-react';

export default function RoommateMatch() {
  const currentUser = STUDENTS.find(s => s.id === 's2');
  
  // Fake compute match for demo
  const recommendations = STUDENTS.filter(s => s.id !== 's2' && s.gender === currentUser?.gender).map(s => {
    return {
      student: s,
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
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Find your perfect roommate.</h1>
          <p className="text-text-secondary">UniNest demo match based on budget, lifestyle and housing preferences.</p>
        </div>
        <button className="bg-surface border border-border px-4 py-2 rounded-xl text-sm font-medium hover:bg-surface-light flex items-center shadow-sm">
          <Settings size={16} className="mr-2" /> Update Preferences
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.slice(0, 6).map(({ student, match, overallScore }, i) => (
          <div key={student.id} className="bg-surface border border-border rounded-2xl p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
            {i === 0 && (
              <div className="absolute top-0 right-0 bg-light-green text-primary-green text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                TOP MATCH
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-surface-light border-2 border-border flex items-center justify-center text-xl font-bold text-text-secondary">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg flex items-center">
                  {student.name}
                  {student.verified && <CheckCircle size={14} className="text-primary-green ml-1.5" />}
                </h3>
                <p className="text-sm text-text-secondary">{student.course} • Year {student.year}</p>
                <p className="text-xs text-text-secondary opacity-70 mt-0.5">Demo student profile</p>
              </div>
            </div>

            <div className="bg-surface-light rounded-xl p-4 mb-6 border border-border">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold tracking-widest text-primary-green uppercase">UniNest Match</span>
                <span className="text-2xl font-bold text-primary-green">{overallScore}%</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2 mb-3 border border-border">
                <div className="bg-primary-green h-2 rounded-full" style={{ width: `${overallScore}%` }}></div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-center mt-4">
                <div>
                  <div className="text-xs font-bold text-foreground">{match.budgetScore}%</div>
                  <div className="text-[10px] text-text-secondary uppercase">Budget</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{match.lifestyleScore}%</div>
                  <div className="text-[10px] text-text-secondary uppercase">Lifestyle</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{match.housingScore}%</div>
                  <div className="text-[10px] text-text-secondary uppercase">Housing</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold tracking-widest text-text-secondary uppercase mb-2">Lifestyle</h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                <div className="flex items-center text-xs text-foreground">
                  <Clock size={14} className="text-text-secondary mr-2" /> {student.preferences.sleepTime}
                </div>
                <div className="flex items-center text-xs text-foreground">
                  <VolumeX size={14} className="text-text-secondary mr-2" /> {student.preferences.noiseTolerance} Noise
                </div>
                <div className="flex items-center text-xs text-foreground">
                  <BookOpen size={14} className="text-text-secondary mr-2" /> {student.preferences.studyHabits}
                </div>
                <div className="flex items-center text-xs text-foreground">
                  <Wind size={14} className="text-text-secondary mr-2" /> {student.preferences.smoking}
                </div>
              </div>
            </div>

            <button className="w-full bg-primary-green text-white font-semibold py-3 rounded-xl hover:bg-opacity-90 transition-colors">
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
