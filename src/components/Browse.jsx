import { useMemo, useState, useEffect } from 'react'
import { shows, categoryOrder } from '../data/content.js'
import {
  getFavorites,
  getRecents,
  getWatched,
  toggleFavorite,
  toggleWatched,
} from '../storage.js'
import Row from './Row.jsx'

// Builds the rows of shows for the selected kid and lays out the browse screen.
export default function Browse({ profile, refreshKey, onPlay, onSwitchProfile }) {
  // `version` forces a re-read of localStorage after a heart/watched toggle.
  // It also bumps when `refreshKey` changes (e.g. returning from a video, which
  // auto-marks the episode watched).
  const [version, setVersion] = useState(0)
  const bump = () => setVersion((v) => v + 1)
  useEffect(() => {
    setVersion((v) => v + 1)
  }, [refreshKey])

  const showsForKid = useMemo(
    () => shows.filter((s) => s.profiles.includes(profile.id)),
    [profile.id],
  )

  const byId = useMemo(() => {
    const map = {}
    for (const s of shows) map[s.id] = s
    return map
  }, [])

  // Re-derived from storage whenever `version` changes; passed down to cards.
  const favSet = useMemo(
    () => new Set(getFavorites(profile.id)),
    [profile.id, version],
  )
  const watchedSet = useMemo(
    () => new Set(getWatched(profile.id)),
    [profile.id, version],
  )

  const rows = useMemo(() => {
    const result = []
    for (const category of categoryOrder) {
      let items
      if (category === 'Favorites') {
        items = getFavorites(profile.id)
          .map((id) => byId[id])
          .filter((s) => s && s.profiles.includes(profile.id))
      } else if (category === 'Continue Watching') {
        items = getRecents(profile.id)
          .map((id) => byId[id])
          .filter((s) => s && s.profiles.includes(profile.id))
      } else {
        items = showsForKid.filter((s) => s.category === category)
      }
      if (items.length > 0) result.push({ category, items })
    }
    return result
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile.id, showsForKid, byId, version])

  const handleToggleFavorite = (showId) => {
    toggleFavorite(profile.id, showId)
    bump()
  }
  const handleToggleWatched = (showId) => {
    toggleWatched(profile.id, showId)
    bump()
  }

  const featured = showsForKid[0]

  return (
    <div className="browse">
      <header className="browse__header">
        <div className="browse__brand">
          <span className="browse__brand-mark">▶</span> KidFlix
        </div>
        <button className="browse__profile" onClick={onSwitchProfile}>
          <span
            className="browse__profile-avatar"
            style={{ background: profile.color }}
          >
            {profile.emoji}
          </span>
          <span className="browse__profile-name">{profile.name}</span>
        </button>
      </header>

      {featured && (
        <section
          className="hero"
          style={{
            background: `linear-gradient(120deg, ${featured.color} 0%, #14152b 70%)`,
          }}
        >
          <div className="hero__emoji" aria-hidden="true">
            {featured.emoji}
          </div>
          <div className="hero__content">
            <p className="hero__eyebrow">Hi {profile.name}! Ready to watch?</p>
            <h1 className="hero__title">{featured.title}</h1>
            <button className="hero__play" onClick={() => onPlay(featured)}>
              ▶ Play
            </button>
          </div>
        </section>
      )}

      <main className="browse__rows">
        {rows.map((row) => (
          <Row
            key={row.category}
            title={row.category}
            items={row.items}
            favSet={favSet}
            watchedSet={watchedSet}
            onPlay={onPlay}
            onToggleFavorite={handleToggleFavorite}
            onToggleWatched={handleToggleWatched}
          />
        ))}
      </main>

      <footer className="browse__footer">
        Made with ♥ for {profile.name}
      </footer>
    </div>
  )
}
