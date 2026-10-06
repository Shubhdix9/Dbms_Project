'use client';

import { useState } from 'react';
import { Moon, Sun, Volume2, VolumeX, Clock, Wind, Coffee, BookOpen, Save } from 'lucide-react';

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
    <div className="space-y-8 pb-12 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Preferences</h1>
        <p className="text-text-secondary">Customize your housing and roommate matching criteria.</p>
      </div>

      {saved && (
        <div className="bg-light-green border border-primary-green/20 text-primary-green p-4 rounded-xl text-sm font-medium flex items-center">
          <Save size={16} className="mr-2" /> Preferences saved successfully! Matches will be recalculated.
        </div>
      )}

      {/* Housing Preferences */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-bold text-foreground mb-4 text-lg">Housing Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">Max Monthly Budget</label>
            <div className="flex items-center gap-2">
              <span className="text-text-secondary">₹</span>
              <input type="number" value={prefs.maxBudget} onChange={e => setPrefs({...prefs, maxBudget: parseInt(e.target.value)})} className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">Max Distance from JKLU (km)</label>
            <input type="number" step="0.5" value={prefs.maxDistance} onChange={e => setPrefs({...prefs, maxDistance: parseFloat(e.target.value)})} className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green" />
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">Configuration</label>
            <select value={prefs.config} onChange={e => setPrefs({...prefs, config: e.target.value})} className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green">
              <option>1 BHK</option><option>2 BHK</option><option>3 BHK</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2">Furnishing</label>
            <select value={prefs.furnishing} onChange={e => setPrefs({...prefs, furnishing: e.target.value})} className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green">
              <option>Furnished</option><option>Semi Furnished</option><option>Unfurnished</option>
            </select>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          {[
            { label: 'AC Required', key: 'acRequired' },
            { label: 'Wi-Fi Required', key: 'wifiRequired' },
            { label: 'Parking Required', key: 'parkingRequired' },
          ].map(item => (
            <label key={item.key} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input type="checkbox" checked={(prefs as any)[item.key]} onChange={e => setPrefs({...prefs, [item.key]: e.target.checked})} className="accent-primary-green w-4 h-4" />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      {/* Lifestyle Preferences */}
      <div className="bg-surface border border-border rounded-2xl p-6">
        <h2 className="font-bold text-foreground mb-4 text-lg">Lifestyle & Roommate Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Sleep Schedule', key: 'sleepSchedule', options: ['Early Bird', 'Night Owl', 'Flexible'], icon: Clock },
            { label: 'Noise Tolerance', key: 'noiseLevel', options: ['Quiet', 'Moderate', 'Loud OK'], icon: Volume2 },
            { label: 'Cleanliness', key: 'cleanliness', options: ['Very Clean', 'Average', 'Relaxed'], icon: Wind },
            { label: 'Guests', key: 'guests', options: ['Rarely', 'Occasionally', 'Often'], icon: Coffee },
            { label: 'Smoking', key: 'smoking', options: ['No', 'Occasionally', 'Yes'], icon: VolumeX },
            { label: 'Diet', key: 'diet', options: ['Vegetarian', 'Non-Vegetarian', 'Vegan'], icon: BookOpen },
          ].map(item => (
            <div key={item.key}>
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <item.icon size={12} /> {item.label}
              </label>
              <select value={(prefs as any)[item.key]} onChange={e => setPrefs({...prefs, [item.key]: e.target.value})} className="w-full px-3 py-2.5 bg-surface-light border border-border rounded-xl text-sm focus:outline-none focus:border-primary-green">
                {item.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="bg-primary-green text-white px-8 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all w-full md:w-auto">
        Save Preferences
      </button>
    </div>
  );
}
