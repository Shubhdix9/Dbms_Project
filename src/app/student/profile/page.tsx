'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { getProfileAction, saveProfileAction } from '@/app/actions/profile';
import {
  User, Mail, Phone, BookOpen, Calendar, MapPin, Camera, Save,
  CheckCircle, Edit3, Shield, GraduationCap, Heart, AtSign,
  Link2, GitBranch, Globe, X, Loader2, AlertCircle, Sparkles,
  Building2
} from 'lucide-react';

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  course: string;
  year: string;
  section: string;
  gender: string;
  bio: string;
  dateOfBirth: string;
  hometown: string;
  hobbies: string;
  languages: string;
  instagram: string;
  linkedin: string;
  github: string;
  website: string;
  avatarUrl: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  bloodGroup: string;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const YEARS = ['1', '2', '3', '4', '5'];
const GENDERS = ['MALE', 'FEMALE', 'OTHER'];

export default function MyProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState<'personal' | 'academic' | 'social' | 'emergency'>('personal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>({
    fullName: '',
    email: '',
    phone: '',
    collegeName: 'JK Lakshmipat University',
    course: '',
    year: '1',
    section: '',
    gender: 'MALE',
    bio: '',
    dateOfBirth: '',
    hometown: '',
    hobbies: '',
    languages: '',
    instagram: '',
    linkedin: '',
    github: '',
    website: '',
    avatarUrl: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    bloodGroup: '',
  });

  const [originalProfile, setOriginalProfile] = useState<ProfileData>(profile);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const u = session.user;
      setUser(u);

      // Start with auth metadata
      const base: ProfileData = {
        fullName: u.user_metadata?.name || '',
        email: u.email || '',
        phone: u.user_metadata?.phone || '',
        collegeName: u.user_metadata?.college_name || 'JK Lakshmipat University',
        course: u.user_metadata?.course || '',
        year: String(u.user_metadata?.year || '1'),
        section: u.user_metadata?.section || '',
        gender: u.user_metadata?.gender || 'MALE',
        bio: '',
        dateOfBirth: '',
        hometown: '',
        hobbies: '',
        languages: '',
        instagram: '',
        linkedin: '',
        github: '',
        website: '',
        avatarUrl: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        bloodGroup: '',
      };

      // Merge with persisted profile data
      const saved = await getProfileAction(u.id);
      if (saved) {
        Object.keys(base).forEach(k => {
          if (saved[k]) (base as any)[k] = saved[k];
        });
      }

      setProfile(base);
      setOriginalProfile(base);
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile(prev => ({ ...prev, avatarUrl: reader.result as string }));
      if (!editing) setEditing(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError('');

    // Also update Supabase auth metadata
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        name: profile.fullName,
        phone: profile.phone,
        college_name: profile.collegeName,
        course: profile.course,
        year: parseInt(profile.year),
        gender: profile.gender,
      }
    });

    if (authError) {
      setError(authError.message);
      setSaving(false);
      return;
    }

    const result = await saveProfileAction(user.id, profile);
    if (result.success) {
      setSaved(true);
      setEditing(false);
      setOriginalProfile(profile);
      setTimeout(() => setSaved(false), 3000);
    } else {
      setError('Failed to save profile');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setEditing(false);
    setError('');
  };

  const hasChanges = JSON.stringify(profile) !== JSON.stringify(originalProfile);

  const completionPercentage = (() => {
    const fields: (keyof ProfileData)[] = [
      'fullName', 'phone', 'course', 'bio', 'dateOfBirth',
      'hometown', 'hobbies', 'languages', 'avatarUrl',
      'emergencyContactName', 'emergencyContactPhone', 'bloodGroup'
    ];
    const filled = fields.filter(f => profile[f]?.trim()).length;
    return Math.round((filled / fields.length) * 100);
  })();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-blue"></div>
          <p className="text-text-secondary font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const initials = profile.fullName
    ? profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'ST';

  const sections = [
    { id: 'personal' as const, label: 'Personal Info', icon: User },
    { id: 'academic' as const, label: 'Academic', icon: GraduationCap },
    { id: 'social' as const, label: 'Social Links', icon: Globe },
    { id: 'emergency' as const, label: 'Emergency', icon: Shield },
  ];

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">

      {/* Hero Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-orange/20 rounded-full blur-3xl -mr-24 -mt-24"></div>
        <div className="absolute bottom-0 left-20 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl -mb-12"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">

          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-[1.8rem] border-4 border-white/20 overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-black text-white/60">
                  {initials}
                </div>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary-orange text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-orange-600 transition-all hover:scale-110 active:scale-95"
              title="Change photo"
            >
              <Camera size={18} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="bg-light-orange text-primary-orange px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm">
                Student Profile
              </div>
              <div className="flex items-center text-white/80 text-xs font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <CheckCircle size={12} className="mr-1.5 text-green-400" /> Verified
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1.5 tracking-tight truncate">
              {profile.fullName || 'Your Name'}
            </h1>
            <p className="text-white/60 text-sm font-medium flex items-center gap-2 flex-wrap">
              <Mail size={14} /> {profile.email}
              {profile.phone && <><span className="text-white/30">•</span><Phone size={14} /> {profile.phone}</>}
            </p>
          </div>

          {/* Profile Completion Ring */}
          <div className="shrink-0 hidden md:flex flex-col items-center gap-2">
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
                <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
                <circle
                  cx="36" cy="36" r="30" fill="none"
                  stroke={completionPercentage === 100 ? '#10b981' : '#f97316'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={`${(completionPercentage / 100) * 188.5} 188.5`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-lg font-black">{completionPercentage}%</span>
              </div>
            </div>
            <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Complete</span>
          </div>
        </div>
      </div>

      {/* Success / Error Banners */}
      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-600 p-4 rounded-xl text-sm font-bold flex items-center shadow-sm animate-in slide-in-from-top duration-300">
          <CheckCircle size={18} className="mr-3 shrink-0" /> Profile updated successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-xl text-sm font-bold flex items-center shadow-sm">
          <AlertCircle size={18} className="mr-3 shrink-0" /> {error}
          <button onClick={() => setError('')} className="ml-auto"><X size={16} /></button>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-hide">
        {sections.map(sec => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`
                whitespace-nowrap flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all
                ${isActive
                  ? 'bg-primary-blue text-white shadow-md'
                  : 'bg-white text-text-secondary border border-border hover:bg-surface-light hover:text-primary-blue'
                }
              `}
            >
              <Icon size={16} />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* Form Body */}
      <div className="bg-white rounded-[2rem] border-2 border-border shadow-sm overflow-hidden">

        {/* Editing Toggle Bar */}
        <div className="px-8 py-5 bg-surface-light border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles size={18} className="text-primary-orange" />
            <span className="text-sm font-bold text-foreground">
              {editing ? 'Editing Mode' : 'View Mode'}
            </span>
            {editing && hasChanges && (
              <span className="text-[10px] font-bold text-primary-orange bg-light-orange px-2.5 py-1 rounded-full uppercase tracking-widest">
                Unsaved Changes
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {editing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 text-sm font-bold text-text-secondary border border-border rounded-xl hover:bg-surface-light transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !hasChanges}
                  className="px-6 py-2.5 text-sm font-bold text-white bg-primary-blue rounded-xl hover:bg-black transition-all shadow-sm disabled:opacity-50 flex items-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-2.5 text-sm font-bold text-white bg-primary-blue rounded-xl hover:bg-black transition-all shadow-sm flex items-center gap-2"
              >
                <Edit3 size={16} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="p-8">

          {/* Personal Info Section */}
          {activeSection === 'personal' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FieldGroup label="Full Name" icon={<User size={16} />} required>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    disabled={!editing}
                    placeholder="Priyanshu Singh Shekhawat"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Email Address" icon={<Mail size={16} />} hint="Cannot be changed">
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="form-input-field opacity-60 cursor-not-allowed"
                  />
                </FieldGroup>

                <FieldGroup label="Phone Number" icon={<Phone size={16} />} required>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!editing}
                    placeholder="+91 98765 43210"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Date of Birth" icon={<Calendar size={16} />}>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    disabled={!editing}
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Gender" icon={<User size={16} />}>
                  <select
                    value={profile.gender}
                    onChange={(e) => handleChange('gender', e.target.value)}
                    disabled={!editing}
                    className="form-input-field"
                  >
                    {GENDERS.map(g => <option key={g} value={g}>{g.charAt(0) + g.slice(1).toLowerCase()}</option>)}
                  </select>
                </FieldGroup>

                <FieldGroup label="Hometown" icon={<MapPin size={16} />}>
                  <input
                    type="text"
                    value={profile.hometown}
                    onChange={(e) => handleChange('hometown', e.target.value)}
                    disabled={!editing}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Blood Group" icon={<Heart size={16} />}>
                  <select
                    value={profile.bloodGroup}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    disabled={!editing}
                    className="form-input-field"
                  >
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </FieldGroup>

                <FieldGroup label="Languages" icon={<Globe size={16} />}>
                  <input
                    type="text"
                    value={profile.languages}
                    onChange={(e) => handleChange('languages', e.target.value)}
                    disabled={!editing}
                    placeholder="Hindi, English, Marwari"
                    className="form-input-field"
                  />
                </FieldGroup>
              </div>

              <FieldGroup label="Bio / About Me" icon={<Edit3 size={16} />}>
                <textarea
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  disabled={!editing}
                  rows={4}
                  maxLength={500}
                  placeholder="Tell roommates a bit about yourself — your vibe, interests, what you're looking for..."
                  className="form-input-field resize-none"
                />
                <p className="text-[11px] text-text-secondary mt-1.5 font-medium">{profile.bio.length}/500 characters</p>
              </FieldGroup>

              <FieldGroup label="Hobbies & Interests" icon={<Sparkles size={16} />}>
                <input
                  type="text"
                  value={profile.hobbies}
                  onChange={(e) => handleChange('hobbies', e.target.value)}
                  disabled={!editing}
                  placeholder="e.g. Cricket, Music, Gaming, Cooking, Photography"
                  className="form-input-field"
                />
                <p className="text-[11px] text-text-secondary mt-1.5 font-medium">Comma-separated list of interests</p>
              </FieldGroup>
            </div>
          )}

          {/* Academic Section */}
          {activeSection === 'academic' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FieldGroup label="College / University" icon={<Building2 size={16} />}>
                  <input
                    type="text"
                    value={profile.collegeName}
                    onChange={(e) => handleChange('collegeName', e.target.value)}
                    disabled={!editing}
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Course / Program" icon={<BookOpen size={16} />} required>
                  <input
                    type="text"
                    value={profile.course}
                    onChange={(e) => handleChange('course', e.target.value)}
                    disabled={!editing}
                    placeholder="e.g. B.Tech CSE, BBA, B.Des"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Year of Study" icon={<Calendar size={16} />}>
                  <select
                    value={profile.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    disabled={!editing}
                    className="form-input-field"
                  >
                    {YEARS.map(y => <option key={y} value={y}>Year {y}</option>)}
                  </select>
                </FieldGroup>

                <FieldGroup label="Section / Batch" icon={<GraduationCap size={16} />}>
                  <input
                    type="text"
                    value={profile.section}
                    onChange={(e) => handleChange('section', e.target.value)}
                    disabled={!editing}
                    placeholder="e.g. Section A, Section B, Section C"
                    className="form-input-field"
                  />
                  {editing && (
                    <div className="flex gap-1.5 mt-2 flex-wrap">
                      {['Section A', 'Section B', 'Section C', 'Section D'].map(sec => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => handleChange('section', sec)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                            profile.section === sec 
                              ? 'bg-primary-blue text-white border-primary-blue shadow-sm' 
                              : 'bg-white text-text-secondary border-border hover:border-primary-blue'
                          }`}
                        >
                          {sec}
                        </button>
                      ))}
                    </div>
                  )}
                </FieldGroup>

                <FieldGroup label="Student Email" icon={<Mail size={16} />} hint="Verified via JKLU">
                  <input
                    type="email"
                    value={profile.email}
                    disabled
                    className="form-input-field opacity-60 cursor-not-allowed"
                  />
                </FieldGroup>
              </div>

              {/* Academic ID Card Preview */}
              <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-[1.5rem] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary-orange/10 rounded-full blur-3xl -mr-12 -mt-12"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-8 -mb-8"></div>

                <div className="relative flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl border-2 border-white/20 overflow-hidden bg-white/10 shrink-0">
                    {profile.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white/40">{initials}</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary-orange mb-1">UniNest Student ID</p>
                    <h3 className="text-xl font-black text-white truncate">{profile.fullName || 'Your Name'}</h3>
                    <p className="text-white/60 text-sm font-medium mt-0.5">
                      {profile.course || 'Course'} • Year {profile.year}{profile.section ? ` • ${profile.section}` : ''}
                    </p>
                    <p className="text-white/40 text-xs font-medium mt-1">{profile.collegeName}</p>
                  </div>
                  <div className="ml-auto hidden md:block shrink-0">
                    <div className="flex items-center gap-1.5 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-500/30">
                      <CheckCircle size={12} /> Verified
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Links Section */}
          {activeSection === 'social' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <p className="text-text-secondary text-sm font-medium mb-4">
                Add your social profiles so potential roommates can learn more about you.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <FieldGroup label="Instagram" icon={<AtSign size={16} />}>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm font-medium">@</span>
                    <input
                      type="text"
                      value={profile.instagram}
                      onChange={(e) => handleChange('instagram', e.target.value)}
                      disabled={!editing}
                      placeholder="username"
                      className="form-input-field pl-8"
                    />
                  </div>
                </FieldGroup>

                <FieldGroup label="LinkedIn" icon={<Link2 size={16} />}>
                  <input
                    type="url"
                    value={profile.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    disabled={!editing}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="GitHub" icon={<GitBranch size={16} />}>
                  <input
                    type="text"
                    value={profile.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    disabled={!editing}
                    placeholder="username"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Personal Website" icon={<Globe size={16} />}>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) => handleChange('website', e.target.value)}
                    disabled={!editing}
                    placeholder="https://yourwebsite.com"
                    className="form-input-field"
                  />
                </FieldGroup>
              </div>

              {/* Social Preview Cards */}
              {(profile.instagram || profile.linkedin || profile.github || profile.website) && (
                <div className="mt-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-3">Connected Profiles</p>
                  <div className="flex flex-wrap gap-3">
                    {profile.instagram && (
                      <a href={`https://instagram.com/${profile.instagram}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200 rounded-xl text-sm font-bold text-purple-700 hover:shadow-md transition-all">
                        <AtSign size={16} /> @{profile.instagram}
                      </a>
                    )}
                    {profile.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl text-sm font-bold text-blue-700 hover:shadow-md transition-all">
                        <Link2 size={16} /> LinkedIn
                      </a>
                    )}
                    {profile.github && (
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 hover:shadow-md transition-all">
                        <GitBranch size={16} /> {profile.github}
                      </a>
                    )}
                    {profile.website && (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 bg-green-50 border border-green-200 rounded-xl text-sm font-bold text-green-700 hover:shadow-md transition-all">
                        <Globe size={16} /> Website
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Emergency Contact Section */}
          {activeSection === 'emergency' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-2">
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={18} className="text-red-600" />
                  <h3 className="text-sm font-bold text-red-800">Emergency Contact Information</h3>
                </div>
                <p className="text-xs text-red-600/80 font-medium leading-relaxed">
                  This information will only be used in case of an emergency. It will not be shared with roommates or landlords.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FieldGroup label="Emergency Contact Name" icon={<User size={16} />}>
                  <input
                    type="text"
                    value={profile.emergencyContactName}
                    onChange={(e) => handleChange('emergencyContactName', e.target.value)}
                    disabled={!editing}
                    placeholder="Parent / Guardian Name"
                    className="form-input-field"
                  />
                </FieldGroup>

                <FieldGroup label="Emergency Contact Phone" icon={<Phone size={16} />}>
                  <input
                    type="tel"
                    value={profile.emergencyContactPhone}
                    onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
                    disabled={!editing}
                    placeholder="+91 98765 43210"
                    className="form-input-field"
                  />
                </FieldGroup>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Save Bar */}
        {editing && hasChanges && (
          <div className="md:hidden sticky bottom-0 bg-white border-t border-border p-4 flex gap-3">
            <button onClick={handleCancel} className="flex-1 py-3 text-sm font-bold text-text-secondary border border-border rounded-xl">Cancel</button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 text-sm font-bold text-white bg-primary-blue rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save
            </button>
          </div>
        )}
      </div>

      {/* Inline styles for form fields (scoped) */}
      <style jsx global>{`
        .form-input-field {
          width: 100%;
          background-color: var(--surface-light);
          border: 1.5px solid var(--border);
          padding: 0.875rem 1rem;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          transition: all 0.2s;
          outline: none;
        }
        .form-input-field:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(15, 23, 42, 0.08);
        }
        .form-input-field:disabled {
          cursor: default;
          background-color: var(--surface-light);
        }
        .form-input-field::placeholder {
          color: var(--text-secondary);
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}

/* Reusable Field Group */
function FieldGroup({
  label,
  icon,
  hint,
  required,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-bold text-foreground mb-2">
        <span className="text-text-secondary">{icon}</span>
        {label}
        {required && <span className="text-primary-orange text-xs">*</span>}
        {hint && <span className="ml-auto text-[10px] font-medium text-text-secondary bg-surface-light px-2 py-0.5 rounded-full">{hint}</span>}
      </label>
      {children}
    </div>
  );
}
