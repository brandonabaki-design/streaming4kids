// Derived views over the catalog. Episodes and movies are both "playables"
// (things that can be opened in the player); series are containers you browse
// into. This module gives the UI clean lists and lookups.

import { series, movies, ytShows } from './data/content.js'

// Every playable item (movies + YouTube shows + every episode), each tagged
// with context.
export const allPlayables = [
  ...movies.map((m) => ({ ...m, kind: 'movie' })),
  ...ytShows.map((y) => ({ ...y, kind: 'yt' })),
  ...series.flatMap((s) =>
    s.seasons.flatMap((season) =>
      season.episodes.map((ep) => ({
        ...ep,
        kind: 'episode',
        profiles: s.profiles,
        seriesId: s.id,
        seriesTitle: s.title,
        seasonNumber: season.number,
      })),
    ),
  ),
]

export const playableById = Object.fromEntries(
  allPlayables.map((p) => [p.id, p]),
)

export function getPlayable(id) {
  return playableById[id]
}

export function seriesForProfile(profileId) {
  return series.filter((s) => s.profiles.includes(profileId))
}

export function moviesForProfile(profileId) {
  return movies.filter((m) => m.profiles.includes(profileId))
}

export function ytShowsForProfile(profileId) {
  return ytShows.filter((y) => y.profiles.includes(profileId))
}

export function getSeries(id) {
  return series.find((s) => s.id === id)
}

export function episodeCount(s) {
  return s.seasons.reduce((n, season) => n + season.episodes.length, 0)
}
