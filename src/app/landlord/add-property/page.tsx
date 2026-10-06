'use client';

import { useState } from 'react';
import { Building, MapPin, IndianRupee, Info, Plus } from 'lucide-react';

export default function AddProperty() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">List a new property</h1>
        <p className="text-text-secondary">Add details for a new rental listing around JKLU.</p>
      </div>

      <div className="flex mb-8">
        {[1, 2, 3, 4].map(s => (
          <div key={s} className="flex-1 relative">
            <div className={`h-2 rounded-full mr-2 ${step >= s ? 'bg-blue-600' : 'bg-surface-light border border-border'}`}></div>
            <div className={`text-xs mt-2 font-medium ${step >= s ? 'text-blue-600' : 'text-text-secondary'}`}>
              {s === 1 && 'Basic Info'}
              {s === 2 && 'Financials'}
              {s === 3 && 'Amenities'}
              {s === 4 && 'Verification'}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-2xl border border-border p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center mb-6"><Building size={20} className="mr-2 text-blue-600" /> Basic Information</h2>
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Property Name / Project</label>
              <input type="text" placeholder="e.g. Vardhman Empire Estate 2BHK" className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Configuration</label>
                <select className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors">
                  <option>1 BHK</option>
                  <option>2 BHK</option>
                  <option>3 BHK</option>
                  <option>Studio</option>
                  <option>Private Room</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Furnishing</label>
                <select className="w-full px-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors">
                  <option>Fully Furnished</option>
                  <option>Semi Furnished</option>
                  <option>Unfurnished</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input type="text" placeholder="Mahapura, Ajmer Road..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center mb-6"><IndianRupee size={20} className="mr-2 text-blue-600" /> Financial Details</h2>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex">
              <Info size={20} className="text-blue-600 mr-3 shrink-0" />
              <p className="text-sm text-blue-800">For accurate "True Monthly Cost" calculations by UniNest, please disclose maintenance and typical utility bills if they are not included in the base rent.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Base Rent (Monthly)</label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input type="number" placeholder="15000" className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Security Deposit</label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input type="number" placeholder="15000" className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Maintenance (if separate)</label>
                <div className="relative">
                  <IndianRupee size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                  <input type="number" placeholder="Leave blank if not disclosed" className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-light border border-border focus:outline-none focus:border-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-between pt-6 border-t border-border">
          <button 
            disabled={step === 1} 
            onClick={() => setStep(step - 1)}
            className="px-6 py-2.5 rounded-xl font-medium text-foreground border border-border bg-surface hover:bg-surface-light disabled:opacity-50"
          >
            Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="px-8 py-2.5 rounded-xl font-semibold text-white bg-blue-900 hover:bg-blue-800 transition-colors shadow-sm"
            >
              Continue
            </button>
          ) : (
            <button 
              className="px-8 py-2.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm"
            >
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
