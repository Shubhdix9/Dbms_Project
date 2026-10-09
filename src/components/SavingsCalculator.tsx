'use client';

import { useState } from 'react';

export default function SavingsCalculator({ monthlyCost, maxOccupancy = 4 }: { monthlyCost: number, maxOccupancy?: number }) {
  const [roommates, setRoommates] = useState(2); // Default 2 (sharing with 1 other)
  const [months, setMonths] = useState(12); // Default 1 year

  // Calculations
  const totalCostAlone = monthlyCost * months;
  const myShare = totalCostAlone / roommates;
  const totalSaved = totalCostAlone - myShare;

  // SVG Chart Math (Doughnut)
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  
  // Percentages
  const sharePercent = roommates === 1 ? 100 : (myShare / totalCostAlone) * 100;
  const savePercent = roommates === 1 ? 0 : (totalSaved / totalCostAlone) * 100;
  
  const shareStrokeDasharray = `${(sharePercent / 100) * circumference} ${circumference}`;
  const saveStrokeDasharray = `${(savePercent / 100) * circumference} ${circumference}`;
  const saveStrokeDashoffset = -((sharePercent / 100) * circumference);

  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-border shadow-sm mb-8">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-primary-blue mb-1">Roommate Savings Calculator</h2>
        <p className="text-sm text-text-secondary">See how much you save by sharing this property over time.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        
        {/* Left: Sliders */}
        <div className="w-full lg:w-1/2 space-y-8">
          
          {/* Roommates Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-text-secondary">Number of People</label>
              <span className="bg-light-orange text-primary-orange px-2 py-0.5 rounded font-extrabold text-sm">{roommates} People</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max={maxOccupancy} 
              step="1" 
              value={roommates} 
              onChange={(e) => setRoommates(parseInt(e.target.value))}
              className="w-full h-2 bg-surface-light rounded-lg cursor-pointer accent-[#f97316]"
            />
            <div className="flex justify-between text-[10px] font-bold text-text-secondary mt-1">
              <span>Just Me</span>
              <span>{maxOccupancy} Roommates</span>
            </div>
          </div>

          {/* Time Period Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-bold text-text-secondary">Time Period</label>
              <span className="bg-light-blue text-primary-blue px-2 py-0.5 rounded font-extrabold text-sm">{months} Months</span>
            </div>
            <input 
              type="range" 
              min="6" 
              max="36" 
              step="6" 
              value={months} 
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-2 bg-surface-light rounded-lg cursor-pointer accent-[#0f172a]"
            />
            <div className="flex justify-between text-[10px] font-bold text-text-secondary mt-1">
              <span>6 Mo</span>
              <span>3 Years</span>
            </div>
          </div>

        </div>

        {/* Right: Chart & Results */}
        <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-end">
          
          {/* Doughnut Chart */}
          <div className="relative w-40 h-40 flex-shrink-0">
            <svg width="100%" height="100%" viewBox="0 0 160 160" className="transform -rotate-90">
              <circle cx="80" cy="80" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="24" />
              <circle 
                cx="80" cy="80" r={radius} 
                fill="transparent" 
                stroke="#0f172a" 
                strokeWidth="24" 
                strokeDasharray={shareStrokeDasharray}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
              {roommates > 1 && (
                <circle 
                  cx="80" cy="80" r={radius} 
                  fill="transparent" 
                  stroke="#f97316" 
                  strokeWidth="24" 
                  strokeDasharray={saveStrokeDasharray}
                  strokeDashoffset={saveStrokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-500 ease-out"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-xs font-bold text-text-secondary">Total Rent</span>
               <span className="text-sm font-extrabold text-foreground">₹{(monthlyCost/1000).toFixed(1)}k/mo</span>
            </div>
          </div>

          {/* Legend & Totals */}
          <div className="w-full sm:w-auto flex flex-col gap-4">
             <div>
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-3 h-3 rounded-sm bg-primary-blue"></div>
                 <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Your Share</span>
               </div>
               <div className="flex items-baseline gap-2">
                 <div className="text-xl font-black text-primary-blue">₹{myShare.toLocaleString()}</div>
                 <span className="text-xs font-bold text-text-secondary">
                   (₹{Math.round(myShare / months).toLocaleString()}/mo)
                 </span>
               </div>
             </div>
             
             <div>
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-3 h-3 rounded-sm bg-primary-orange"></div>
                 <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">Money Saved</span>
               </div>
               <div className="flex items-baseline gap-2">
                 <div className="text-xl font-black text-primary-orange">₹{totalSaved.toLocaleString()}</div>
                 {roommates > 1 && (
                   <span className="text-xs font-bold text-text-secondary">
                     (₹{Math.round(totalSaved / months).toLocaleString()}/mo)
                   </span>
                 )}
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
