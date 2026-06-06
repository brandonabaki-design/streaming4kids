// Tiny localStorage helpers for per-kid state: favorites and watch progress.
// Everything is namespaced by profile id so Noah and Naia never mix.

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
  return data[profileId] || { favorites: [], continueWatching: [] }
}

export function getFavorites(profileId) {
  return profileState(readAll(), profileId).favorites
}

export function isFavorite(profileId, showId) {
  return getFavorites(profileId).includes(showId)
}

export function toggleFavorite(profileId, showId) {
  const data = readAll()
  const state = profileState(data, profileId)
  const has = state.favorites.includes(showId)
  state.favorites = has
    ? state.favorites.filter((id) => id !== showId)
    : [showId, ...state.favorites]
  data[profileId] = state
  writeAll(data)
  return !has
}

// continueWatching is just an ordered list of recently opened show ids.
export function getContinueWatching(profileId) {
  return profileState(readAll(), profileId).continueWatching
}

export function markWatched(profileId, showId) {
  const data = readAll()
  const state = profileState(data, profileId)
  state.continueWatching = [
    showId,
    ...state.continueWatching.filter((id) => id !== showId),
  ].slice(0, 10)
  data[profileId] = state
  writeAll(data)
}
