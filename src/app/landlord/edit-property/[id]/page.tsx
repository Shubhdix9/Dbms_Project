'use client';

import { useState } from 'react';
import { MapPin, Upload, Tv, Wifi, Car, Shield, Wind, Bed, Home, DollarSign, Camera, Video, Navigation, X, FileVideo } from 'lucide-react';
import Link from 'next/link';

export default function EditProperty() {
  const [activeTab, setActiveTab] = useState('basic');
  const [address, setAddress] = useState('Mahapura, Ajmer Road, Jaipur');
  const [isLocating, setIsLocating] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 10));
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await response.json();
          if (data && data.display_name) {
            setAddress(data.display_name);
          } else {
            setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);
          }
        } catch (error) {
          setAddress(`${position.coords.latitude}, ${position.coords.longitude}`);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to retrieve your location');
        setIsLocating(false);
      },
      { timeout: 10000 }
    );
  };

  const amenitiesList = [
    { id: 'tv', name: 'Smart TV', icon: Tv },
    { id: 'bed', name: 'Beds & Mattresses', icon: Bed },
    { id: 'wifi', name: 'High-Speed WiFi', icon: Wifi },
    { id: 'ac', name: 'Air Conditioning', icon: Wind },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'security', name: '24/7 Security', icon: Shield },
    { id: 'furniture', name: 'Fully Furnished', icon: Home },
  ];

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(['tv', 'wifi', 'ac']); // Pre-selected for edit state

  const toggleAmenity = (id: string) => {
    setSelectedAmenities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-[1000px] mx-auto p-4 md:p-8 space-y-8 pb-24">
      
      {/* Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-light-orange text-primary-orange px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
              Listings
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">Edit Property</h1>
          <p className="text-white/70 text-lg font-medium max-w-xl">Update property details, add new photos, and adjust pricing.</p>
        </div>
      </div>

      <form className="space-y-8">
        
        {/* Basic Details */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">1. Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-text-secondary mb-2">Property Title</label>
              <input type="text" defaultValue="Samanvay Aasra" className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">Property Type</label>
              <select defaultValue="Apartment" className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground appearance-none">
                <option>Apartment</option>
                <option>Independent House</option>
                <option>PG / Hostel</option>
                <option>Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">Configuration</label>
              <select defaultValue="2 BHK" className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground appearance-none">
                <option>1 BHK</option>
                <option>2 BHK</option>
                <option>3 BHK</option>
                <option>4 BHK+</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
               <label className="block text-sm font-bold text-text-secondary mb-2">Description</label>
               <textarea rows={4} defaultValue="Beautiful 2 BHK perfectly situated for JKLU students. Safe and secure." className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">2. Location</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">Full Address</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="bg-light-blue/30 border-2 border-blue-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
               <div>
                 <h3 className="font-extrabold text-primary-blue mb-1">Pin Location on Map</h3>
                 <p className="text-sm text-text-secondary">Help students find exact distances to campus.</p>
               </div>
               <button 
                 type="button" 
                 onClick={handleUseCurrentLocation}
                 disabled={isLocating}
                 className={`w-full md:w-auto px-6 py-3 bg-primary-blue text-white font-bold rounded-xl shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center text-sm ${isLocating ? 'opacity-70 cursor-not-allowed' : ''}`}
               >
                 <Navigation size={16} className={`mr-2 text-primary-orange ${isLocating ? 'animate-pulse' : ''}`} /> 
                 {isLocating ? 'Locating...' : 'Use Current Location'}
               </button>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">3. Photos & Video</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary-orange hover:bg-light-orange transition-colors cursor-pointer group h-full">
                 <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors shadow-sm">
                   <Camera size={24} className="text-primary-orange" />
                 </div>
                 <h3 className="font-extrabold text-primary-blue mb-1">Upload Photos</h3>
                 <p className="text-xs font-bold text-text-secondary">Drag & drop or click to browse (Max 10)</p>
                 <input type="file" multiple accept="image/*" className="hidden" onChange={handlePhotoUpload} />
              </label>
              {photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {photos.map((photo, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-border">
                      <img src={URL.createObjectURL(photo)} alt="preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePhoto(idx)} className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5 hover:bg-black">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <label className="border-2 border-dashed border-border rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-primary-orange hover:bg-light-orange transition-colors cursor-pointer group h-full">
                 <div className="w-16 h-16 bg-surface-light rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-colors shadow-sm">
                   <Video size={24} className="text-primary-orange" />
                 </div>
                 <h3 className="font-extrabold text-primary-blue mb-1">Upload Video Tour</h3>
                 <p className="text-xs font-bold text-text-secondary">Add a walkthrough video (Max 50MB)</p>
                 <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
              </label>
              {video && (
                <div className="flex items-center gap-2 p-3 bg-surface-light rounded-xl border border-border mt-4">
                  <FileVideo size={20} className="text-primary-orange" />
                  <span className="text-sm font-bold text-foreground truncate flex-1">{video.name}</span>
                  <button type="button" onClick={() => setVideo(null)} className="text-text-secondary hover:text-red-500">
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">4. Included Amenities</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenitiesList.map(amenity => {
              const isSelected = selectedAmenities.includes(amenity.id);
              const Icon = amenity.icon;
              return (
                <button
                  type="button"
                  key={amenity.id}
                  onClick={() => toggleAmenity(amenity.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                    isSelected ? 'border-primary-orange bg-light-orange shadow-sm text-primary-orange' : 'border-border bg-surface-light hover:border-text-secondary text-text-secondary'
                  }`}
                >
                  <Icon size={24} className="mb-2" />
                  <span className={`text-xs font-extrabold ${isSelected ? 'text-primary-blue' : ''}`}>{amenity.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-3xl border-2 border-border p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-primary-blue mb-6 border-b border-border pb-4">5. Pricing</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">Monthly Rent (₹)</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input type="number" defaultValue="15200" className="w-full pl-11 pr-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text-secondary mb-2">Security Deposit (₹)</label>
              <div className="relative">
                <DollarSign size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                <input type="number" defaultValue="15200" className="w-full pl-11 pr-4 py-3 bg-surface-light border-2 border-border rounded-xl focus:border-primary-orange outline-none transition-colors font-bold text-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 pt-4">
          <Link href="/landlord/properties" className="px-8 py-4 bg-surface text-text-secondary font-extrabold rounded-2xl border-2 border-border hover:bg-surface-light transition-colors shadow-sm">
            Cancel
          </Link>
          <Link href="/landlord/properties" className="px-8 py-4 bg-primary-orange text-white font-extrabold rounded-2xl shadow-md hover:bg-orange-600 transition-colors">
            Save Changes
          </Link>
        </div>

      </form>
    </div>
  );
}
