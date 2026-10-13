import { PROPERTIES } from './data';
import { supabase } from './supabase';

export const DELETED_PROPERTIES_KEY = 'uninest_deleted_property_ids';
export const VERIFIED_OVERRIDE_KEY = 'uninest_verified_property_ids';
export const UNVERIFIED_OVERRIDE_KEY = 'uninest_unverified_property_ids';
export const PROPERTIES_UPDATED_EVENT = 'uninest_properties_updated';

export function getDeletedPropertyIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(DELETED_PROPERTIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading deleted properties from localStorage:', e);
    return [];
  }
}

export function getVerifiedOverrides(): { verified: string[]; unverified: string[] } {
  if (typeof window === 'undefined') return { verified: [], unverified: [] };
  try {
    const v = localStorage.getItem(VERIFIED_OVERRIDE_KEY);
    const u = localStorage.getItem(UNVERIFIED_OVERRIDE_KEY);
    return {
      verified: v ? JSON.parse(v) : [],
      unverified: u ? JSON.parse(u) : []
    };
  } catch {
    return { verified: [], unverified: [] };
  }
}

export function isPropertyDeleted(id: string | number): boolean {
  const deleted = getDeletedPropertyIds();
  return deleted.includes(String(id));
}

export async function fetchAllActiveProperties(): Promise<any[]> {
  const deletedIds = new Set(getDeletedPropertyIds().map(String));
  const { verified, unverified } = getVerifiedOverrides();
  const verifiedSet = new Set(verified.map(String));
  const unverifiedSet = new Set(unverified.map(String));

  // 1. Fetch from Supabase
  let dbProps: any[] = [];
  try {
    const { data, error } = await supabase.from('property').select('*');
    if (!error && data) {
      dbProps = data
        .filter(p => !deletedIds.has(String(p.property_id)))
        .map(dbProp => {
          const idStr = String(dbProp.property_id);
          let isVerified = dbProp.verification_status === 'VERIFIED';
          if (verifiedSet.has(idStr)) isVerified = true;
          if (unverifiedSet.has(idStr)) isVerified = false;

          return {
            id: idStr,
            dbId: dbProp.property_id,
            title: dbProp.title,
            location: dbProp.location,
            configuration: dbProp.property_type,
            type: dbProp.property_type,
            furnishing: dbProp.furnished_status,
            rent: dbProp.rent_per_person,
            deposit: dbProp.deposit,
            maintenance: dbProp.maintenance_cost,
            imageUrl: dbProp.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
            images: [dbProp.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
            verifiedByUniNest: isVerified,
            status: isVerified ? 'Verified' : 'Pending Verification',
            distanceKm: dbProp.distance_from_college?.toString() || '0',
            coordinates: { lat: dbProp.latitude || 26.8358, lng: dbProp.longitude || 75.6504 },
            landlordId: dbProp.landlord_id,
            maxOccupancy: dbProp.total_capacity,
            rating: dbProp.rating,
            source: 'Database Listing',
            checkedAt: 'Recently Checked',
            isDb: true
          };
        });
    }
  } catch (err) {
    console.error('Error fetching Supabase properties:', err);
  }

  // 2. Filter mock PROPERTIES
  const activeStaticProps = PROPERTIES
    .filter(p => !deletedIds.has(String(p.id)))
    .map(p => {
      const idStr = String(p.id);
      let isVerified = !!p.verifiedByUniNest;
      if (verifiedSet.has(idStr)) isVerified = true;
      if (unverifiedSet.has(idStr)) isVerified = false;

      return {
        ...p,
        id: idStr,
        verifiedByUniNest: isVerified,
        status: isVerified ? 'Verified' : 'Pending Verification',
        isDb: false
      };
    });

  // 3. Combine: DB listings first, followed by static listings
  return [...dbProps, ...activeStaticProps];
}

export async function setPropertyVerificationStatus(id: string | number, verified: boolean): Promise<boolean> {
  const idStr = String(id);
  const overrides = getVerifiedOverrides();
  
  let newVerified = overrides.verified.filter(item => item !== idStr);
  let newUnverified = overrides.unverified.filter(item => item !== idStr);

  if (verified) {
    newVerified.push(idStr);
  } else {
    newUnverified.push(idStr);
  }

  localStorage.setItem(VERIFIED_OVERRIDE_KEY, JSON.stringify(newVerified));
  localStorage.setItem(UNVERIFIED_OVERRIDE_KEY, JSON.stringify(newUnverified));

  // If numeric DB property, update Supabase directly
  const numericId = parseInt(idStr, 10);
  if (!isNaN(numericId)) {
    try {
      await supabase
        .from('property')
        .update({ verification_status: verified ? 'VERIFIED' : 'PENDING' })
        .eq('property_id', numericId);
    } catch (e) {
      console.warn('Could not update verification status in DB:', e);
    }
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROPERTIES_UPDATED_EVENT));
    window.dispatchEvent(new StorageEvent('storage', {
      key: VERIFIED_OVERRIDE_KEY,
      newValue: JSON.stringify(newVerified)
    }));
  }

  return true;
}

export async function deletePropertyUniversally(id: string | number): Promise<{ success: boolean; error?: string }> {
  const idStr = String(id);
  
  // 1. Add to localStorage deleted list
  const currentDeleted = getDeletedPropertyIds();
  if (!currentDeleted.includes(idStr)) {
    const updatedDeleted = [...currentDeleted, idStr];
    localStorage.setItem(DELETED_PROPERTIES_KEY, JSON.stringify(updatedDeleted));
  }

  // 2. If it's a numeric DB property, remove or mark in Supabase
  const numericId = parseInt(idStr, 10);
  if (!isNaN(numericId)) {
    try {
      // First try deleting directly
      const { error } = await supabase.from('property').delete().eq('property_id', numericId);
      if (error) {
        console.warn('Could not hard delete from DB (likely foreign key constraint), will keep hidden via deleted list:', error.message);
      }
    } catch (e) {
      console.warn('DB delete exception:', e);
    }
  }

  // 3. Dispatch cross-tab and local events
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(PROPERTIES_UPDATED_EVENT));
    window.dispatchEvent(new StorageEvent('storage', {
      key: DELETED_PROPERTIES_KEY,
      newValue: JSON.stringify([...currentDeleted, idStr])
    }));
  }

  return { success: true };
}
