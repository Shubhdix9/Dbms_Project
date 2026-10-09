'use client';
import { useState, useEffect } from 'react';

import { STUDENTS, PROPERTIES } from '@/lib/data';
import { CheckCircle, Clock, VolumeX, BookOpen, Wind, Heart, Briefcase, Users, UserPlus, Inbox, Check, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getIntentsAction, saveIntentAction } from '@/app/actions/intents';
import { getUserGroups, getUserInvitations, inviteRoommate, acceptInvitation, rejectInvitation, leaveGroup, getPendingProposals, approveProposal, rejectProposal, submitGroupToLandlord, mockLandlordApprove, processCashfreePayment } from '@/app/actions/collaboration';

export default function RoommateMatch() {
  const [hasFilledPreferences, setHasFilledPreferences] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [locationQuery, setLocationQuery] = useState('');
  const [preferredPropertyId, setPreferredPropertyId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [dynamicStudents, setDynamicStudents] = useState<any[]>(STUDENTS);
  
  const [activeTab, setActiveTab] = useState<'explore' | 'my-group' | 'requests'>('explore');
  const [groups, setGroups] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<{incoming: any[], sent: any[]}>({ incoming: [], sent: [] });
  const [proposals, setProposals] = useState<any[]>([]);
  const [loadingAction, setLoadingAction] = useState(false);

  const fetchData = async (user: any) => {
    const userGroups = await getUserGroups(user.id);
    setGroups(userGroups);
    const userInvs = await getUserInvitations(user.id);
    setInvitations(userInvs);

    // Get proposals for all groups the user is in
    let allProposals: any[] = [];
    for (const g of userGroups) {
       const groupProps = await getPendingProposals(g.id);
       allProposals = [...allProposals, ...groupProps];
    }
    setProposals(allProposals);
  };

  useEffect(() => {
    setIsMounted(true);
    if (localStorage.getItem('uninest_preferences_filled') === 'true') {
      setHasFilledPreferences(true);
    }
    const savedPropertyId = localStorage.getItem('preferred_property_id');
    const savedPropertyName = localStorage.getItem('preferred_property_name');
    if (savedPropertyId) {
      setPreferredPropertyId(savedPropertyId);
      if (savedPropertyName) {
        setLocationQuery(savedPropertyName);
      }
    }
    
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setCurrentUser(data.user);
        fetchData(data.user);
      }
    });

    getIntentsAction().then(intents => {
      setDynamicStudents([...STUDENTS, ...intents]);
    });
  }, []);

  const handleInvite = async (recipientId: string) => {
    if (!currentUser || !preferredPropertyId) return alert('Select a preferred property in your preferences first.');
    setLoadingAction(true);
    const property = PROPERTIES.find(p => p.id === preferredPropertyId);
    const res = await inviteRoommate(preferredPropertyId, currentUser, recipientId, (property as any)?.maxOccupancy || 3);
    if (res.success) {
      alert(`User successfully ${(res as any).status || 'invited'}!`);
      await fetchData(currentUser);
    } else {
      alert((res as any).error || 'Failed');
    }
    setLoadingAction(false);
  };

  const handleAccept = async (invitationId: string, propertyId: string) => {
    setLoadingAction(true);
    const property = PROPERTIES.find(p => p.id === propertyId);
    const res = await acceptInvitation(invitationId, (property as any)?.maxOccupancy || 3, currentUser);
    if (res.success) {
      alert('Invitation accepted! You are now in the group.');
      await fetchData(currentUser);
    } else {
      alert((res as any).error || 'Failed');
    }
    setLoadingAction(false);
  };

  const handleReject = async (invitationId: string) => {
    setLoadingAction(true);
    await rejectInvitation(invitationId);
    await fetchData(currentUser);
    setLoadingAction(false);
  };

  const handleApproveProposal = async (proposalId: string) => {
    setLoadingAction(true);
    await approveProposal(proposalId, currentUser.id);
    alert('You approved the addition!');
    await fetchData(currentUser);
    setLoadingAction(false);
  };

  const handleRejectProposal = async (proposalId: string) => {
    setLoadingAction(true);
    await rejectProposal(proposalId, currentUser.id);
    alert('You rejected the addition.');
    await fetchData(currentUser);
    setLoadingAction(false);
  };

  const handleLeaveGroup = async (groupId: string) => {
    if (!confirm('Are you sure you want to leave this group? This will affect the rent split for remaining members.')) return;
    setLoadingAction(true);
    await leaveGroup(groupId, currentUser.id);
    await fetchData(currentUser);
    setLoadingAction(false);
  };

  const handleSubmitToLandlord = async (groupId: string) => {
    setLoadingAction(true);
    const res = await submitGroupToLandlord(groupId);
    if (res.success) {
      alert('Application sent to the landlord!');
      await fetchData(currentUser);
    } else {
      alert('Failed to send application.');
    }
    setLoadingAction(false);
  };

  const handleMockLandlordApprove = async (groupId: string) => {
    setLoadingAction(true);
    const res = await mockLandlordApprove(groupId);
    if (res.success) {
      alert('Landlord approved the group!');
      await fetchData(currentUser);
    }
    setLoadingAction(false);
  };

  const handleCashfreePayment = async (groupId: string) => {
    setLoadingAction(true);
    // Simulate redirecting to Cashfree checkout
    setTimeout(async () => {
      const res = await processCashfreePayment(groupId);
      if (res.success) {
        alert('Payment successful via Cashfree! Lease activated.');
        await fetchData(currentUser);
      }
      setLoadingAction(false);
    }, 1500);
  };

  // Fake compute match for demo
  const recommendations = dynamicStudents.filter(s => s.id !== 's2' && s.id !== currentUser?.id).map((s, index) => {
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
        housingScore: (s.preferences as any).preferredPropertyId === preferredPropertyId && preferredPropertyId ? 100 : 80 + Math.floor(Math.random() * 15),
      }
    };
  }).map(r => ({
    ...r,
    overallScore: Math.round(r.match.housingScore * 0.6 + r.match.lifestyleScore * 0.4)
  })).sort((a, b) => {
    const aPrefersSame = (a.student.preferences as any).preferredPropertyId === preferredPropertyId && preferredPropertyId;
    const bPrefersSame = (b.student.preferences as any).preferredPropertyId === preferredPropertyId && preferredPropertyId;
    if (aPrefersSame && !bPrefersSame) return -1;
    if (!aPrefersSame && bPrefersSame) return 1;
    return b.overallScore - a.overallScore;
  });

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
            
            if (preferredPropertyId) {
              localStorage.setItem('preferred_property_id', preferredPropertyId);
              localStorage.setItem('preferred_property_name', locationQuery);
              
              if (currentUser) {
                const newIntent = {
                  id: currentUser.id,
                  name: currentUser.user_metadata?.name || currentUser.email || 'Student',
                  course: currentUser.user_metadata?.course || 'Student',
                  year: currentUser.user_metadata?.year || 1,
                  gender: currentUser.user_metadata?.gender || 'MALE',
                  imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
                  verified: true,
                  preferences: { budgetMin: 8000, budgetMax: 15000, sleepTime: '11:00 PM', wakeTime: '7:00 AM', cleanliness: 'High', noiseTolerance: 'Medium', studyHabits: 'Focused', smoking: 'Non-smoker', preferredPropertyId: preferredPropertyId }
                };
                saveIntentAction(newIntent).then(intents => {
                  setDynamicStudents([...STUDENTS, ...intents]);
                });
              }
            } else {
              localStorage.removeItem('preferred_property_id');
              localStorage.removeItem('preferred_property_name');
            }
            
            setHasFilledPreferences(true); 
          }} className="space-y-8">
            
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
                            setPreferredPropertyId(p.id);
                            setShowSuggestions(false);
                          }}
                        >
                          <p className="text-sm font-bold text-foreground">{p.title}</p>
                          <p className="text-xs text-text-secondary">{p.location}</p>
                        </div>
                      ))}
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
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary-blue mb-2 tracking-tight">Roommate Collaboration</h1>
          <p className="text-text-secondary">Find matches, form groups, and split rent seamlessly.</p>
        </div>
        <button onClick={() => {
            localStorage.removeItem('uninest_preferences_filled');
            setHasFilledPreferences(false);
          }} className="text-sm font-bold text-primary-orange hover:underline">
            Update Preferences
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-border pb-px mb-8 overflow-x-auto">
        <button onClick={() => setActiveTab('explore')} className={`whitespace-nowrap pb-3 px-4 text-sm font-bold transition-colors border-b-2 ${activeTab === 'explore' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-primary-blue'}`}>
          <div className="flex items-center"><Users size={16} className="mr-2"/> Explore Matches</div>
        </button>
        <button onClick={() => setActiveTab('my-group')} className={`whitespace-nowrap pb-3 px-4 text-sm font-bold transition-colors border-b-2 relative ${activeTab === 'my-group' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-primary-blue'}`}>
          <div className="flex items-center">
             <CheckCircle size={16} className="mr-2"/> My Groups ({groups.length})
             {proposals.length > 0 && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{proposals.length}</span>}
          </div>
        </button>
        <button onClick={() => setActiveTab('requests')} className={`whitespace-nowrap pb-3 px-4 text-sm font-bold transition-colors border-b-2 relative ${activeTab === 'requests' ? 'border-primary-blue text-primary-blue' : 'border-transparent text-text-secondary hover:text-primary-blue'}`}>
          <div className="flex items-center">
            <Inbox size={16} className="mr-2"/> Requests
            {invitations.incoming.length > 0 && <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{invitations.incoming.length}</span>}
          </div>
        </button>
      </div>

      {activeTab === 'explore' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {recommendations.map(({ student, match, overallScore }, i) => (
            <div key={student.id} className="bg-white border-2 border-border rounded-[2rem] overflow-hidden hover:shadow-xl transition-all group flex flex-col">
              
              <div className="relative h-72 w-full bg-[#0a1128] overflow-hidden">
                <img src={student.imageUrl} alt={student.name} className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-[#0a1128]/20 to-transparent opacity-90"></div>
                
                {i === 0 && (
                  <div className="absolute top-4 right-4 bg-primary-orange text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-md">
                    Top Match
                  </div>
                )}
                {((student.preferences as any).preferredPropertyId === preferredPropertyId && preferredPropertyId) && (
                  <div className="absolute top-4 left-4 bg-primary-blue text-white text-[10px] font-bold px-4 py-1.5 rounded-full tracking-wider uppercase shadow-md flex items-center">
                    <CheckCircle size={12} className="mr-1" /> Same Preferred Property
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

              <div className="p-6 flex flex-col flex-1">
                
                <div className="bg-surface-light rounded-2xl p-5 mb-6 border border-border">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-bold tracking-widest text-text-secondary uppercase">UniNest Match</span>
                    <span className="text-3xl font-extrabold text-primary-blue leading-none">{overallScore}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2 mb-4 border border-border overflow-hidden">
                    <div className="bg-primary-orange h-full rounded-full" style={{ width: `${overallScore}%` }}></div>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <Link href={`/student/profile/${student.id}`} className="w-full bg-white border border-border text-text-secondary font-bold py-3.5 rounded-xl hover:bg-surface-light transition-colors shadow-sm flex items-center justify-center text-sm">
                    View Detailed Profile
                  </Link>
                  <button 
                    disabled={loadingAction}
                    onClick={() => handleInvite(student.id)}
                    className="w-full bg-primary-blue text-white font-bold py-3.5 rounded-xl hover:bg-blue-900 transition-colors shadow-sm flex items-center justify-center text-sm disabled:opacity-50">
                    <UserPlus size={16} className="mr-2" /> Invite as Roommate
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {activeTab === 'my-group' && (
        <div className="space-y-6">
          {groups.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-border shadow-sm">
              <Users size={48} className="mx-auto text-text-secondary/30 mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No Active Groups</h3>
              <p className="text-text-secondary">You haven't formed any roommate groups yet. Add yourself to a property first!</p>
            </div>
          ) : (
            groups.map((group) => {
              const property = PROPERTIES.find(p => p.id === group.propertyId);
              const maxOcc = (property as any)?.maxOccupancy || 3;
              const rent = property?.rent || 0;
              const { share, remainder } = { share: Math.floor(rent / group.members.length), remainder: rent % group.members.length };
              
              // Find proposals for this group
              const groupProposals = proposals.filter(p => p.groupId === group.id);

              return (
                <div key={group.id} className="bg-white rounded-3xl border-2 border-border shadow-sm p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-border pb-6 gap-4">
                    <div>
                      <span className="bg-light-blue text-primary-blue text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">Active Group</span>
                      <h2 className="text-2xl font-extrabold text-foreground">{property?.title}</h2>
                      <p className="text-text-secondary mt-1">{property?.location}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">Rent Split</p>
                      <p className="text-3xl font-extrabold text-primary-blue">
                        ₹{share.toLocaleString()}<span className="text-base text-text-secondary font-medium">/mo</span>
                      </p>
                      {remainder > 0 && <p className="text-[10px] text-text-secondary font-bold">One person pays exactly ₹{(share + remainder).toLocaleString()} to balance</p>}
                      <p className="text-xs text-text-secondary mt-1">Total: ₹{rent.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Accepted Roommates ({group.members.length}/{maxOcc})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {group.members.map((m: any) => (
                        <div key={m.id} className="bg-surface-light border border-border rounded-xl p-4 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold">{m.name.charAt(0)}</div>
                          <div>
                            <p className="font-bold text-sm text-foreground line-clamp-1">{m.name} {m.userId === currentUser?.id ? '(You)' : ''}</p>
                            <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{m.course}</p>
                          </div>
                        </div>
                      ))}
                      {Array.from({ length: maxOcc - group.members.length }).map((_, i) => (
                        <div key={i} className="border-2 border-dashed border-border bg-gray-50 rounded-xl p-4 flex items-center justify-center text-text-secondary gap-2 text-sm font-medium">
                          <UserPlus size={16} /> Available Slot
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pending Proposals Section */}
                  {groupProposals.length > 0 && (
                     <div className="mb-8 bg-orange-50 border border-orange-200 rounded-2xl p-5">
                       <h3 className="text-sm font-extrabold text-primary-orange uppercase tracking-widest mb-4 flex items-center">
                         <Inbox size={16} className="mr-2" /> Pending Proposals
                       </h3>
                       <div className="space-y-3">
                         {groupProposals.map(p => {
                           const proposedStudent = dynamicStudents.find(s => s.id === p.proposedUserId);
                           const proposer = group.members.find((m: any) => m.userId === p.proposedBy);
                           return (
                             <div key={p.id} className="bg-white border border-orange-100 rounded-xl p-4 flex justify-between items-center shadow-sm">
                               <div className="flex items-center gap-3">
                                 {proposedStudent?.imageUrl ? (
                                   <img src={proposedStudent.imageUrl} alt={proposedStudent.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                                 ) : (
                                   <div className="w-10 h-10 rounded-full bg-primary-orange text-white flex items-center justify-center font-bold shrink-0">
                                     {proposedStudent?.name?.charAt(0) || '?'}
                                   </div>
                                 )}
                                 <div>
                                   <p className="text-sm font-bold text-foreground leading-tight">
                                     <span className="text-primary-blue">{proposer?.name || 'A member'}</span> proposed adding <span className="text-primary-orange font-black">{proposedStudent?.name || 'a new roommate'}</span>.
                                   </p>
                                   <p className="text-xs font-medium text-text-secondary mt-0.5">Unanimous consent required to send formal invite.</p>
                                 </div>
                               </div>
                               <div className="flex gap-2 shrink-0">
                                 <button disabled={loadingAction} onClick={() => handleApproveProposal(p.id)} className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors"><Check size={18}/></button>
                                 <button disabled={loadingAction} onClick={() => handleRejectProposal(p.id)} className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors"><X size={18}/></button>
                               </div>
                             </div>
                           );
                         })}
                       </div>
                     </div>
                  )}

                  <div className="flex justify-end border-t border-border pt-6 space-x-4">
                    {(!group.status || group.status === 'forming') && (
                      <>
                        <button onClick={() => handleLeaveGroup(group.id)} className="px-6 py-3 border border-border rounded-xl text-sm font-bold text-text-secondary hover:bg-red-50 hover:text-red-600 transition-colors">
                          Leave Group
                        </button>
                        {group.members.length < maxOcc && (
                          <button onClick={() => setActiveTab('explore')} className="px-6 py-3 bg-white border border-primary-blue text-primary-blue rounded-xl text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors">
                            Add Another Roommate
                          </button>
                        )}
                        <button onClick={() => handleSubmitToLandlord(group.id)} className="px-6 py-3 bg-primary-blue text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-900 transition-colors flex items-center">
                          Finalize & Send to Landlord
                        </button>
                      </>
                    )}
                    {group.status === 'pending_landlord' && (
                      <div className="flex items-center space-x-4 w-full justify-between bg-orange-50 p-4 rounded-xl border border-orange-200">
                        <span className="text-sm font-bold text-orange-600">Application submitted. Awaiting landlord approval...</span>
                        <button onClick={() => handleMockLandlordApprove(group.id)} className="px-3 py-1 bg-white border border-orange-200 text-orange-600 text-[10px] uppercase font-bold tracking-widest rounded-md hover:bg-orange-100 shadow-sm transition-colors">
                          [Dev] Accept
                        </button>
                      </div>
                    )}
                    {group.status === 'approved' && (
                      <div className="flex items-center space-x-4 w-full justify-between bg-green-50 p-4 rounded-xl border border-green-200">
                        <span className="text-sm font-bold text-green-700">Landlord Approved! Complete payment to activate lease.</span>
                        <button onClick={() => handleCashfreePayment(group.id)} className="px-8 py-3 bg-primary-orange text-white rounded-xl text-sm font-extrabold shadow-lg hover:bg-orange-600 transition-all flex items-center hover:scale-105 active:scale-95 transform duration-200">
                          Pay with Cashfree
                        </button>
                      </div>
                    )}
                    {group.status === 'paid' && (
                      <div className="flex items-center justify-end w-full">
                        <span className="text-sm font-extrabold text-white bg-green-500 px-6 py-3 rounded-xl shadow-sm flex items-center">
                          <Check size={18} className="mr-2" /> Lease Activated
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-extrabold text-foreground mb-4">Incoming Requests</h3>
            <div className="space-y-4">
              {invitations.incoming.length === 0 ? (
                <div className="bg-surface-light border border-border rounded-2xl p-8 text-center text-text-secondary text-sm font-medium">No incoming requests.</div>
              ) : (
                invitations.incoming.map(inv => {
                  const property = PROPERTIES.find(p => p.id === inv.propertyId);
                  return (
                    <div key={inv.id} className="bg-white border-2 border-border rounded-2xl p-5 shadow-sm">
                      <div className="flex justify-between items-start mb-4 gap-2">
                        <div className="flex items-center gap-3">
                          {inv.sender?.imageUrl ? (
                            <img src={inv.sender.imageUrl} alt={inv.sender.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary-blue text-white flex items-center justify-center font-bold shrink-0">
                              {inv.sender?.name?.charAt(0) || '?'}
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-bold text-foreground leading-tight">
                              {inv.sender?.name || 'Someone'} wants to be your roommate!
                            </p>
                            {inv.sender?.course && <p className="text-[10px] text-text-secondary uppercase tracking-widest mt-0.5">{inv.sender.course}</p>}
                            <p className="text-xs text-text-secondary mt-1">For <span className="font-bold text-primary-blue">{property?.title}</span></p>
                          </div>
                        </div>
                        <span className="bg-light-orange text-primary-orange text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shrink-0">Pending</span>
                      </div>
                      <div className="flex gap-2">
                        <button disabled={loadingAction} onClick={() => handleAccept(inv.id, inv.propertyId)} className="flex-1 bg-primary-blue text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-900 transition-colors shadow-sm">Accept</button>
                        <button disabled={loadingAction} onClick={() => handleReject(inv.id)} className="flex-1 bg-surface-light text-text-secondary border border-border py-2.5 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors">Reject</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-extrabold text-foreground mb-4">Sent Requests & Proposals</h3>
            <div className="space-y-4">
              {invitations.sent.length === 0 ? (
                <div className="bg-surface-light border border-border rounded-2xl p-8 text-center text-text-secondary text-sm font-medium">No sent requests.</div>
              ) : (
                invitations.sent.map(inv => {
                  const property = PROPERTIES.find(p => p.id === inv.propertyId);
                  return (
                    <div key={inv.id} className="bg-white border border-border rounded-2xl p-5 shadow-sm flex justify-between items-center">
                      <div>
                        <p className="text-sm font-bold text-foreground">Invitation Sent</p>
                        <p className="text-xs font-medium text-text-secondary mt-0.5">{property?.title}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider
                        ${inv.status === 'accepted' ? 'bg-green-50 text-green-700 border border-green-200' 
                        : inv.status === 'rejected' ? 'bg-red-50 text-red-700 border border-red-200' 
                        : 'bg-surface-light text-text-secondary border border-border'}`}>
                        {inv.status}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
