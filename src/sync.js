// Optional cloud sync via Supabase's REST API (no SDK/dependency needed).
// When sync-config.js is left blank, everything here is a safe no-op and the
// app runs purely on localStorage.

import { syncConfig } from './data/sync-config.js'

const TABLE = 'kid_state'

export function isSyncEnabled() {
  return Boolean(syncConfig.supabaseUrl && syncConfig.supabaseAnonKey)
}

function headers(extra) {
  return {
    apikey: syncConfig.supabaseAnonKey,
    Authorization: `Bearer ${syncConfig.supabaseAnonKey}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

// Fetch this kid's saved state from the cloud, or null if none / offline.
export async function pullRemote(profileId) {
  if (!isSyncEnabled()) return null
  const params = new URLSearchParams({
    family_id: `eq.${syncConfig.familyId}`,
    profile_id: `eq.${profileId}`,
    select: 'state',
  })
  try {
    const res = await fetch(
      `${syncConfig.supabaseUrl}/rest/v1/${TABLE}?${params}`,
      { headers: headers() },
    )
    if (!res.ok) return null
    const rows = await res.json()
    return rows[0]?.state || null
  } catch {
    return null // offline — local stays the source of truth
  }
}

// Upsert this kid's state to the cloud. Fire-and-forget; failures are ignored.
export async function pushRemote(profileId, state) {
  if (!isSyncEnabled()) return
  const row = {
    family_id: syncConfig.familyId,
    profile_id: profileId,
    state,
    updated_at: new Date().toISOString(),
  }
  try {
    await fetch(`${syncConfig.supabaseUrl}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: headers({
        Prefer: 'resolution=merge-duplicates,return=minimal',
      }),
      body: JSON.stringify(row),
    })
  } catch {
    /* offline — will re-push on the next change */
  }
}
