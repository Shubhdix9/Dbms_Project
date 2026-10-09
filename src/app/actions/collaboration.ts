'use server'

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_FILE = path.join(process.cwd(), 'uninest_collaboration_db.json');

interface Database {
  groups: any[];
  members: any[];
  invitations: any[];
  proposals: any[];
  approvals: any[];
}

function getDb(): Database {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error reading DB:', e);
  }
  return { groups: [], members: [], invitations: [], proposals: [], approvals: [] };
}

function saveDb(db: Database) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  } catch (e) {
    console.error('Error saving DB:', e);
  }
}

// Ensure the db is initialized
getDb();

// Helper to calculate rent split
export async function calculateRentSplit(monthlyRent: number, acceptedMembersCount: number) {
  if (acceptedMembersCount === 0) return { share: monthlyRent, remainder: 0 };
  const share = Math.floor(monthlyRent / acceptedMembersCount);
  const remainder = monthlyRent % acceptedMembersCount;
  return { share, remainder };
}

// 1. Get User's Active Groups
export async function getUserGroups(userId: string) {
  const db = getDb();
  const userMemberships = db.members.filter(m => m.userId === userId);
  return userMemberships.map(m => {
    const group = db.groups.find(g => g.id === m.groupId);
    const members = db.members.filter(mem => mem.groupId === group.id);
    return { ...group, members };
  });
}

// 2. Get User's Invitations
export async function getUserInvitations(userId: string) {
  const db = getDb();
  const incoming = db.invitations.filter(i => i.recipientId === userId && i.status === 'pending').map(inv => {
    const sender = db.members.find(m => m.groupId === inv.groupId && m.userId === inv.senderId);
    return { ...inv, sender };
  });
  const sent = db.invitations.filter(i => i.senderId === userId);
  return { incoming, sent };
}

// 3. Add Myself to List (Creates a 1-person group)
export async function createOnePersonGroup(propertyId: string, user: any) {
  const db = getDb();
  
  // Check if already in a group for this property
  const existingGroupIds = db.groups.filter(g => g.propertyId === propertyId).map(g => g.id);
  const alreadyMember = db.members.find(m => m.userId === user.id && existingGroupIds.includes(m.groupId));
  
  if (alreadyMember) return { success: false, error: 'Already looking for roommates for this property.' };

  const groupId = crypto.randomUUID();
  db.groups.push({
    id: groupId,
    propertyId,
    status: 'forming',
    createdBy: user.id,
    createdAt: new Date().toISOString()
  });

  db.members.push({
    id: crypto.randomUUID(),
    groupId,
    userId: user.id,
    name: user.user_metadata?.name || user.email || 'Student',
    course: user.user_metadata?.course || 'Student',
    year: user.user_metadata?.year || 1,
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
    joinedAt: new Date().toISOString()
  });

  saveDb(db);
  return { success: true, groupId };
}

// 4. Invite someone to your group (or create one if it doesn't exist)
export async function inviteRoommate(propertyId: string, sender: any, recipientId: string, maxOccupancy: number) {
  const db = getDb();
  
  // Find sender's group for this property
  const existingGroupIds = db.groups.filter(g => g.propertyId === propertyId).map(g => g.id);
  let senderMember = db.members.find(m => m.userId === sender.id && existingGroupIds.includes(m.groupId));
  let groupId;

  if (!senderMember) {
    // Create group first
    const createRes = await createOnePersonGroup(propertyId, sender);
    if (!createRes.success) return createRes;
    groupId = createRes.groupId;
  } else {
    groupId = senderMember.groupId;
  }

  // Check capacity
  const currentMembers = db.members.filter(m => m.groupId === groupId);
  if (currentMembers.length >= maxOccupancy) {
    return { success: false, error: 'Group is at maximum capacity.' };
  }

  // Check if recipient is already in this group
  if (db.members.some(m => m.groupId === groupId && m.userId === recipientId)) {
    return { success: false, error: 'User is already a member.' };
  }

  // Check if invitation already exists
  if (db.invitations.some(i => i.groupId === groupId && i.recipientId === recipientId && i.status === 'pending')) {
    return { success: false, error: 'Invitation already sent.' };
  }

  if (currentMembers.length === 1) {
    // Directly send invitation
    db.invitations.push({
      id: crypto.randomUUID(),
      groupId,
      propertyId,
      senderId: sender.id,
      recipientId,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    saveDb(db);
    return { success: true, status: 'invited' };
  } else {
    // Requires unanimous consent, create a proposal
    // Check if proposal exists
    if (db.proposals.some(p => p.groupId === groupId && p.proposedUserId === recipientId && p.status === 'pending')) {
       return { success: false, error: 'A proposal for this user is already pending.' };
    }

    const proposalId = crypto.randomUUID();
    db.proposals.push({
      id: proposalId,
      groupId,
      proposedUserId: recipientId,
      proposedBy: sender.id,
      status: 'pending',
      createdAt: new Date().toISOString()
    });

    // Auto-approve for the sender
    db.approvals.push({
      id: crypto.randomUUID(),
      proposalId,
      memberId: sender.id,
      decision: 'approved',
      createdAt: new Date().toISOString()
    });

    saveDb(db);
    return { success: true, status: 'proposed' };
  }
}

// 5. Accept Invitation
export async function acceptInvitation(invitationId: string, maxOccupancy: number, recipientUser: any) {
  const db = getDb();
  const invitation = db.invitations.find(i => i.id === invitationId);
  if (!invitation || invitation.status !== 'pending') return { success: false, error: 'Invalid invitation.' };

  // Recheck capacity atomically (simulated)
  const groupMembers = db.members.filter(m => m.groupId === invitation.groupId);
  if (groupMembers.length >= maxOccupancy) {
    invitation.status = 'rejected'; // Auto reject
    saveDb(db);
    return { success: false, error: 'The group has reached maximum capacity.' };
  }

  // Verify unanimous consent if group > 1 (Wait, if it's an invitation, it means consent was already met or group size was 1)
  
  // Add member
  db.members.push({
    id: crypto.randomUUID(),
    groupId: invitation.groupId,
    userId: invitation.recipientId,
    name: recipientUser.user_metadata?.name || recipientUser.email || 'Student',
    course: recipientUser.user_metadata?.course || 'Student',
    year: recipientUser.user_metadata?.year || 1,
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80',
    joinedAt: new Date().toISOString()
  });

  invitation.status = 'accepted';
  saveDb(db);
  return { success: true };
}

export async function rejectInvitation(invitationId: string) {
  const db = getDb();
  const invitation = db.invitations.find(i => i.id === invitationId);
  if (invitation && invitation.status === 'pending') {
    invitation.status = 'rejected';
    saveDb(db);
    return { success: true };
  }
  return { success: false };
}

// 6. Handle Proposals
export async function getPendingProposals(groupId: string) {
  const db = getDb();
  return db.proposals.filter(p => p.groupId === groupId && p.status === 'pending');
}

export async function approveProposal(proposalId: string, memberId: string) {
  const db = getDb();
  const proposal = db.proposals.find(p => p.id === proposalId);
  if (!proposal || proposal.status !== 'pending') return { success: false };

  // Check if already approved
  if (db.approvals.some(a => a.proposalId === proposalId && a.memberId === memberId)) {
    return { success: true }; // idempotent
  }

  db.approvals.push({
    id: crypto.randomUUID(),
    proposalId,
    memberId,
    decision: 'approved',
    createdAt: new Date().toISOString()
  });

  // Check if unanimous
  const currentMembers = db.members.filter(m => m.groupId === proposal.groupId);
  const approvals = db.approvals.filter(a => a.proposalId === proposalId && a.decision === 'approved');
  
  if (approvals.length === currentMembers.length) {
    proposal.status = 'unanimous';
    
    // Generate invitation
    const group = db.groups.find(g => g.id === proposal.groupId);
    db.invitations.push({
      id: crypto.randomUUID(),
      groupId: proposal.groupId,
      propertyId: group.propertyId,
      senderId: proposal.proposedBy, // or system
      recipientId: proposal.proposedUserId,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
  }
  
  saveDb(db);
  return { success: true };
}

export async function rejectProposal(proposalId: string, memberId: string) {
  const db = getDb();
  const proposal = db.proposals.find(p => p.id === proposalId);
  if (!proposal || proposal.status !== 'pending') return { success: false };

  db.approvals.push({
    id: crypto.randomUUID(),
    proposalId,
    memberId,
    decision: 'rejected',
    createdAt: new Date().toISOString()
  });

  proposal.status = 'rejected';
  saveDb(db);
  return { success: true };
}

// 7. Leave Group
export async function leaveGroup(groupId: string, userId: string) {
  const db = getDb();
  const memberIndex = db.members.findIndex(m => m.groupId === groupId && m.userId === userId);
  if (memberIndex === -1) return { success: false };

  db.members.splice(memberIndex, 1);
  
  // Cancel any pending invitations sent BY this user for this group, OR clean up proposals
  db.proposals.filter(p => p.groupId === groupId && p.status === 'pending').forEach(p => {
    // If a member leaves, we should probably re-evaluate proposals, but rejecting them is safest
    p.status = 'rejected'; 
  });

  // If group is empty, delete it
  const remaining = db.members.filter(m => m.groupId === groupId);
  if (remaining.length === 0) {
    const groupIndex = db.groups.findIndex(g => g.id === groupId);
    db.groups.splice(groupIndex, 1);
  }

  saveDb(db);
  return { success: true };
}

// 8. Group Finalization & Payment
export async function submitGroupToLandlord(groupId: string) {
  const db = getDb();
  const group = db.groups.find(g => g.id === groupId);
  if (!group) return { success: false };
  group.status = 'pending_landlord';
  saveDb(db);
  return { success: true };
}

export async function mockLandlordApprove(groupId: string) {
  const db = getDb();
  const group = db.groups.find(g => g.id === groupId);
  if (!group) return { success: false };
  group.status = 'approved';
  saveDb(db);
  return { success: true };
}

export async function processCashfreePayment(groupId: string) {
  const db = getDb();
  const group = db.groups.find(g => g.id === groupId);
  if (!group) return { success: false };
  group.status = 'paid';
  saveDb(db);
  return { success: true };
}
