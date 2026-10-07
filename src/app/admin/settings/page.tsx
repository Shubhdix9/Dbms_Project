'use client';

import { useState } from 'react';
import { Settings, ShieldCheck, Database, Save, Key, Bell, Users, Globe, Lock } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    autoApproveStudents: true,
    requireLandlordKYC: true,
    enableNotifications: true,
    dataRetentionDays: 365,
    systemLanguage: 'English (US)',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8 pb-20">
      
      {/* Header */}
      <div className="bg-primary-blue rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl -mb-10"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-light-orange text-primary-orange px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-sm">
                Configuration
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">System Settings</h1>
            <p className="text-white/70 text-lg font-medium max-w-xl">Configure platform rules, security protocols, and <strong className="text-white">administrative controls</strong>.</p>
          </div>
          
          <div className="flex items-center bg-white/10 border border-white/20 rounded-2xl p-4 shrink-0">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                 <ShieldCheck size={20} />
               </div>
               <div>
                  <div className="text-xs font-extrabold text-white/60 uppercase tracking-widest">Access Level</div>
                  <div className="text-white font-bold text-sm">Super Admin</div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl text-sm font-medium flex items-center shadow-sm">
          <Save size={16} className="mr-2" /> System settings updated successfully! Changes applied immediately.
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* General & Security */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
            <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4 flex items-center">
               <Globe size={20} className="mr-3 text-primary-orange" /> General Configuration
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-foreground text-sm">Maintenance Mode</p>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs">Temporarily disable access for students and landlords during updates.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.maintenanceMode} onChange={e => setSettings({...settings, maintenanceMode: e.target.checked})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-foreground text-sm">System Notifications</p>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs">Receive email alerts for critical system events.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.enableNotifications} onChange={e => setSettings({...settings, enableNotifications: e.target.checked})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>
              
              <div className="pt-2">
                <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">System Language</label>
                <select value={settings.systemLanguage} onChange={e => setSettings({...settings, systemLanguage: e.target.value})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange appearance-none">
                  <option>English (US)</option><option>Hindi</option><option>French</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
            <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4 flex items-center">
               <Key size={20} className="mr-3 text-primary-orange" /> Password & Authentication
            </h2>
            <div className="space-y-4">
              <button className="w-full py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold text-foreground hover:bg-gray-50 hover:border-gray-300 transition-colors flex justify-between items-center px-4">
                Change Admin Password
                <Lock size={16} className="text-text-secondary" />
              </button>
              <button className="w-full py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold text-foreground hover:bg-gray-50 hover:border-gray-300 transition-colors flex justify-between items-center px-4">
                Manage API Keys
                <Key size={16} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>

        {/* Policies & DB */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
            <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4 flex items-center">
               <Users size={20} className="mr-3 text-primary-orange" /> Platform Policies
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-foreground text-sm">Auto-Approve Students</p>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs">Automatically verify students with a valid @jklu.edu.in email address.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.autoApproveStudents} onChange={e => setSettings({...settings, autoApproveStudents: e.target.checked})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-extrabold text-foreground text-sm">Require Landlord KYC</p>
                  <p className="text-xs text-text-secondary mt-1 max-w-xs">Mandatory ID verification before landlords can list properties.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={settings.requireLandlordKYC} onChange={e => setSettings({...settings, requireLandlordKYC: e.target.checked})} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-orange"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border-2 border-border p-8 shadow-sm">
            <h2 className="font-black text-primary-blue mb-6 text-xl border-b border-border pb-4 flex items-center">
               <Database size={20} className="mr-3 text-primary-orange" /> Database Management
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-extrabold text-text-secondary uppercase tracking-widest block mb-2">Data Retention (Days)</label>
                <input type="number" value={settings.dataRetentionDays} onChange={e => setSettings({...settings, dataRetentionDays: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-surface-light border-2 border-border rounded-xl text-sm font-bold focus:outline-none focus:border-primary-orange" />
                <p className="text-[10px] font-bold text-text-secondary mt-2">Old logs will be automatically purged after this period.</p>
              </div>
              
              <div className="pt-2 flex gap-4">
                <button className="flex-1 py-3 bg-surface-light border border-border text-primary-blue font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-gray-100 transition-colors text-center">
                  Export DB Dump
                </button>
                <button className="flex-1 py-3 bg-red-50 border border-red-200 text-red-600 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-red-100 transition-colors text-center">
                  Clear Cache
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button onClick={handleSave} className="bg-primary-orange text-white px-8 py-4 rounded-2xl font-black text-lg shadow-md hover:bg-orange-600 transition-colors w-full md:w-auto flex justify-center items-center">
          <Save size={20} className="mr-2" /> Save Settings
        </button>
      </div>
    </div>
  );
}
