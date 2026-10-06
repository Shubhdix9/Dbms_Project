import Link from 'next/link';
import { GraduationCap, Building, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Left Side: Branding */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-surface relative overflow-hidden">
        <div className="z-10 max-w-lg mx-auto">
          <div className="mb-4">
            <h2 className="text-sm font-semibold tracking-widest text-text-secondary uppercase">JK Lakshmipat University</h2>
            <div className="w-12 h-1 bg-primary-green mt-2 rounded"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            UniNest
          </h1>
          <h3 className="text-2xl font-medium text-text-secondary mb-4">
            University Housing & <br />Intelligent Roommate Matching
          </h3>
          <p className="text-xl text-foreground font-medium mb-2">
            Find your place. Find your people.
          </p>
          <p className="text-text-secondary">
            Discover verified housing near JKLU and find roommates who actually match your lifestyle.
          </p>
        </div>
        
        {/* Subtle Background Accent */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-light-green rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Right Side: Role Selection */}
      <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-surface-light border-l border-border">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to UniNest</h2>
            <p className="text-text-secondary">Choose how you want to continue</p>
          </div>

          <div className="space-y-4">
            {/* Student Role */}
            <Link href="/login?role=student" className="block group">
              <div className="bg-surface p-6 rounded-2xl border border-border hover:border-primary-green shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="p-3 bg-light-green text-primary-green rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <GraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary-green transition-colors">01 — STUDENT</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Find housing, compare true costs and discover compatible roommates.
                    </p>
                    <span className="text-sm font-medium text-primary-green flex items-center">
                      Continue as Student 
                      <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Landlord Role */}
            <Link href="/login?role=landlord" className="block group">
              <div className="bg-surface p-6 rounded-2xl border border-border hover:border-primary-green shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="p-3 bg-light-green text-primary-green rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <Building size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary-green transition-colors">02 — LANDLORD</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      List properties, manage availability and handle student booking requests.
                    </p>
                    <span className="text-sm font-medium text-primary-green flex items-center">
                      Continue as Landlord
                      <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Admin Role */}
            <Link href="/login?role=admin" className="block group">
              <div className="bg-surface p-6 rounded-2xl border border-border hover:border-primary-green shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="p-3 bg-light-green text-primary-green rounded-xl mr-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary-green transition-colors">03 — ADMIN</h3>
                    <p className="text-sm text-text-secondary mb-4">
                      Manage verification, properties, students, bookings and platform analytics.
                    </p>
                    <span className="text-sm font-medium text-primary-green flex items-center">
                      Continue as Admin
                      <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <span className="text-xs text-text-secondary">Frontend Demo · Mock Data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
