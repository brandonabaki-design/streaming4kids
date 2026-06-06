import { useEffect, useState } from 'react'
import Card from './Card.jsx'

// Full-screen series page: a hero header, a season selector (when there's more
// than one season), and a responsive grid of episodes for the chosen season.
export default function SeriesDetail({ series, profile, library, onPlay, onClose }) {
  const [seasonIdx, setSeasonIdx] = useState(0)
  const season = series.seasons[seasonIdx]
  const { favSet, watchedSet, onToggleFavorite, onToggleWatched } = library

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    window.scrollTo(0, 0)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // "Play" starts the first episode the kid hasn't watched yet (or episode 1).
  const firstUnwatched =
    season.episodes.find((ep) => !watchedSet.has(ep.id)) || season.episodes[0]

  return (
    <div className="series">
      <div
        className="series__bg"
        style={{
          background: `radial-gradient(120% 80% at 20% 0%, ${series.color} 0%, #14152b 60%, #0f1020 100%)`,
        }}
      />

      <header className="series__topbar">
        <button className="pillbtn" onClick={onClose}>
          ‹ Back
        </button>
        <span className="series__who">{profile.name}</span>
      </header>

      <section className="series__hero">
        <div className="series__poster" aria-hidden="true">
          {series.emoji}
        </div>
        <div className="series__info">
          <span className="series__kicker">Series</span>
          <h1 className="series__title">{series.title}</h1>
          {series.tagline && <p className="series__tagline">{series.tagline}</p>}
          <div className="series__actions">
            <button
              className="bigbtn bigbtn--primary"
              onClick={() => onPlay(firstUnwatched)}
            >
              ▶ Play
            </button>
          </div>
        </div>
      </section>

      {series.seasons.length > 1 && (
        <div className="series__seasons" role="tablist" aria-label="Seasons">
          {series.seasons.map((s, i) => (
            <button
              key={s.number}
              role="tab"
              aria-selected={i === seasonIdx}
              className={`seasonpill ${i === seasonIdx ? 'is-active' : ''}`}
              onClick={() => setSeasonIdx(i)}
            >
              Season {s.number}
            </button>
          ))}
        </div>
      )}

      <div className="series__seasonhead">
        <h2>Season {season.number}</h2>
        <span className="series__count">{season.episodes.length} episodes</span>
      </div>

      <div className="episode-grid">
        {season.episodes.map((ep, i) => (
          <Card
            key={ep.id}
            show={ep}
            episodeNumber={i + 1}
            fav={favSet.has(ep.id)}
            watched={watchedSet.has(ep.id)}
            onPlay={onPlay}
            onToggleFavorite={onToggleFavorite}
            onToggleWatched={onToggleWatched}
          />
        ))}
      </div>
    </div>
  )
}
