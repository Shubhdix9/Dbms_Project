'use client';

import { useState } from 'react';
import { Moon, Sun, Volume2, VolumeX, Clock, Wind, Coffee, BookOpen, Save, ShieldCheck, Wifi, Car } from 'lucide-react';

export default function Preferences() {
  const [prefs, setPrefs] = useState({
    maxBudget: 15000,
    maxDistance: 3,
    config: '2 BHK',
    furnishing: 'Furnished',
    sleepSchedule: 'Night Owl',
    noiseLevel: 'Moderate',
    cleanliness: 'Very Clean',
    guests: 'Occasionally',
    smoking: 'No',
    diet: 'Vegetarian',
    studyHabits: 'Library',
    acRequired: true,
    wifiRequired: true,
    parkingRequired: false,
  });

  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      {/* Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-light-orange text-primary-orange px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
              Profile
            </div>
            <div className="flex items-center text-white/80 text-sm font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
              <ShieldCheck size={14} className="mr-1.5 text-green-400" /> Auto-Match Enabled
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">My Preferences</h1>
          <p className="text-white/70 text-lg font-medium max-w-xl">Customize your housing and roommate matching criteria to find your <strong className="text-white">perfect fit</strong>.</p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl text-sm font-medium flex items-center shadow-sm">
          <Save size={16} className="mr-2" /> Preferences saved successfully! Your matches are being recalculated.
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Housing Preferences */}
        <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
          <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4">Housing Preferences</h2>
          <div className="space-y-6">
            <div>
              <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">Max Monthly Budget</label>
              <div className="flex items-center gap-2">
                <span className="text-text-secondary font-bold">₹</span>
                <input type="number" value={prefs.maxBudget} onChange={e => setPrefs({...prefs, maxBudget: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange" />
              </div>
            </div>
            
            <div>
              <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">Max Distance from JKLU (km)</label>
              <input type="number" step="0.5" value={prefs.maxDistance} onChange={e => setPrefs({...prefs, maxDistance: parseFloat(e.target.value)})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">Configuration</label>
                <select value={prefs.config} onChange={e => setPrefs({...prefs, config: e.target.value})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange appearance-none">
                  <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">Furnishing</label>
                <select value={prefs.furnishing} onChange={e => setPrefs({...prefs, furnishing: e.target.value})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange appearance-none">
                  <option>Furnished</option><option>Semi Furnished</option><option>Unfurnished</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-border">
              <label className="text-xs font-extrabold text-primary-blue uppercase tracking-widest block mb-1">Must-Haves</label>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: 'AC', key: 'acRequired', icon: Wind },
                  { label: 'Wi-Fi', key: 'wifiRequired', icon: Wifi },
                  { label: 'Parking', key: 'parkingRequired', icon: Car },
                ].map(item => (
                  <label key={item.key} className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 cursor-pointer transition-colors ${
                    (prefs as any)[item.key] ? 'border-primary-orange bg-light-orange text-primary-orange font-bold' : 'border-border bg-surface-light text-text-secondary font-medium hover:border-gray-300'
                  }`}>
                    <input type="checkbox" checked={(prefs as any)[item.key]} onChange={e => setPrefs({...prefs, [item.key]: e.target.checked})} className="hidden" />
                    <item.icon size={16} /> {item.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Preferences */}
        <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
          <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4">Lifestyle & Roommate</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: 'Sleep Schedule', key: 'sleepSchedule', options: ['Early Bird', 'Night Owl', 'Flexible'], icon: Clock },
              { label: 'Noise Tolerance', key: 'noiseLevel', options: ['Quiet', 'Moderate', 'Loud OK'], icon: Volume2 },
              { label: 'Cleanliness', key: 'cleanliness', options: ['Very Clean', 'Average', 'Relaxed'], icon: Wind },
              { label: 'Guests', key: 'guests', options: ['Rarely', 'Occasionally', 'Often'], icon: Coffee },
              { label: 'Smoking', key: 'smoking', options: ['No', 'Occasionally', 'Yes'], icon: VolumeX },
              { label: 'Diet', key: 'diet', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan'], icon: BookOpen },
            ].map(item => (
              <div key={item.key}>
                <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2 flex items-center gap-1.5">
                  <item.icon size={14} className="text-primary-blue"/> {item.label}
                </label>
                <select value={(prefs as any)[item.key]} onChange={e => setPrefs({...prefs, [item.key]: e.target.value})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange appearance-none">
                  {item.options.map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="bg-primary-orange text-white px-8 py-4 rounded-2xl font-black text-lg shadow-md hover:bg-orange-600 transition-colors w-full md:w-auto">
          Save Preferences
        </button>
      </div>
    </div>
  );
}
