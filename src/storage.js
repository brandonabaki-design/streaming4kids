// Per-kid state saved in the browser (localStorage), namespaced by profile id
// so Noah and Naia never mix. We track three things per kid:
//   favorites  - shows they've hearted
//   recents    - recently opened, for the "Continue Watching" row
//   watched    - episodes/shows they've already seen (the green check)
//
// When cloud sync is configured (see sync.js / sync-config.js), every change
// is also pushed to the cloud, and syncFromCloud() merges a device's state
// with what's stored remotely. With sync off, this is all plain localStorage.

import { pullRemote, pushRemote } from './sync.js'

const KEY = 'kidflix.v1'

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}

function writeAll(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data))
  } catch {
    /* storage full or unavailable — fail quietly, the app still works */
  }
}

function profileState(data, profileId) {
  const s = data[profileId] || {}
  return {
    favorites: s.favorites || [],
    recents: s.recents || [],
    watched: s.watched || [],
  }
}

function update(profileId, mutate) {
  const data = readAll()
  const state = profileState(data, profileId)
  mutate(state)
  data[profileId] = state
  writeAll(data)
  pushRemote(profileId, state) // no-op when sync is disabled
}

function unionUnique(...lists) {
  return [...new Set(lists.flat().filter(Boolean))]
}

// Pull this kid's state from the cloud and merge it into local storage:
// favorites and watched are unioned (nothing gets lost), recents keep the most
// recent 10. The merged result is pushed back so the cloud also gains anything
// that was only on this device. Safe no-op when sync is disabled.
export async function syncFromCloud(profileId) {
  const remote = await pullRemote(profileId)
  if (!remote) return false
  update(profileId, (s) => {
    s.favorites = unionUnique(remote.favorites, s.favorites)
    s.watched = unionUnique(remote.watched, s.watched)
    s.recents = unionUnique(s.recents, remote.recents).slice(0, 10)
  })
  return true
}

// --- Favorites -------------------------------------------------------------
export function getFavorites(profileId) {
  return profileState(readAll(), profileId).favorites
}

export function isFavorite(profileId, showId) {
  return getFavorites(profileId).includes(showId)
}

export function toggleFavorite(profileId, showId) {
  let now = false
  update(profileId, (s) => {
    const has = s.favorites.includes(showId)
    now = !has
    s.favorites = has
      ? s.favorites.filter((id) => id !== showId)
      : [showId, ...s.favorites]
  })
  return now
}

// --- Recently opened ("Continue Watching") --------------------------------
export function getRecents(profileId) {
  return profileState(readAll(), profileId).recents
}

export function recordOpened(profileId, showId) {
  update(profileId, (s) => {
    s.recents = [showId, ...s.recents.filter((id) => id !== showId)].slice(0, 10)
  })
}

// --- Watched (the green check) ---------------------------------------------
export function getWatched(profileId) {
  return profileState(readAll(), profileId).watched
}

export function isWatched(profileId, showId) {
  return getWatched(profileId).includes(showId)
}

export function setWatched(profileId, showId, watched) {
  update(profileId, (s) => {
    const has = s.watched.includes(showId)
    if (watched && !has) s.watched = [showId, ...s.watched]
    if (!watched && has) s.watched = s.watched.filter((id) => id !== showId)
  })
}

export function toggleWatched(profileId, showId) {
  const now = !isWatched(profileId, showId)
  setWatched(profileId, showId, now)
  return now
}
