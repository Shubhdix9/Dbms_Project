'use server'

import fs from 'fs';
import path from 'path';

const PROFILES_FILE = path.join(process.cwd(), 'uninest_profiles_db.json');

export async function getProfileAction(userId: string) {
  try {
    if (fs.existsSync(PROFILES_FILE)) {
      const data = fs.readFileSync(PROFILES_FILE, 'utf8');
      const profiles = JSON.parse(data);
      return profiles[userId] || null;
    }
  } catch (e) {
    console.error('Error reading profile:', e);
  }
  return null;
}

export async function saveProfileAction(userId: string, profile: any) {
  try {
    let profiles: Record<string, any> = {};
    if (fs.existsSync(PROFILES_FILE)) {
      profiles = JSON.parse(fs.readFileSync(PROFILES_FILE, 'utf8'));
    }
    profiles[userId] = { ...profiles[userId], ...profile, updatedAt: new Date().toISOString() };
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2));
    return { success: true, profile: profiles[userId] };
  } catch (e) {
    console.error('Error saving profile:', e);
    return { success: false, error: 'Failed to save profile' };
  }
}
