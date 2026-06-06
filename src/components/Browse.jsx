import { useMemo } from 'react'
import { getRecents, getFavorites } from '../storage.js'
import {
  seriesForProfile,
  moviesForProfile,
  getPlayable,
} from '../library.js'
import Shelf from './Shelf.jsx'
import Card from './Card.jsx'
import SeriesCard from './SeriesCard.jsx'

// The home screen for a kid: a hero, then shelves of series and movies, plus
// Continue Watching and Favorites.
export default function Browse({
  profile,
  library,
  testing,
  onPlay,
  onOpenSeries,
  onRemoveRecent,
  onSwitchProfile,
  onOpenSettings,
}) {
  const { favSet, watchedSet, onToggleFavorite, onToggleWatched } = library

  const shows = useMemo(() => seriesForProfile(profile.id), [profile.id])
  const films = useMemo(() => moviesForProfile(profile.id), [profile.id])

  // favSet/watchedSet change identity on every toggle, so these recompute and
  // the Continue Watching / Favorites shelves stay fresh.
  const recents = useMemo(
    () =>
      getRecents(profile.id)
        .map(getPlayable)
        .filter((p) => p && p.profiles.includes(profile.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile.id, watchedSet],
  )
  const favorites = useMemo(
    () =>
      getFavorites(profile.id)
        .map(getPlayable)
        .filter((p) => p && p.profiles.includes(profile.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profile.id, favSet],
  )

  const featured = shows[0] || null

  const playableCard = (item) => (
    <Card
      key={item.id}
      show={item}
      fav={favSet.has(item.id)}
      watched={watchedSet.has(item.id)}
      onPlay={onPlay}
      onToggleFavorite={onToggleFavorite}
      onToggleWatched={onToggleWatched}
    />
  )

  return (
    <div className="browse">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark">▶</span>
          <span className="brand__name">KidFlix</span>
        </div>
        <div className="topbar__right">
          {testing && (
            <span className="testing-pill" title="Testing mode is on">
              🧪 Testing
            </span>
          )}
          <button
            className="iconbtn"
            onClick={onOpenSettings}
            aria-label="Parent settings"
          >
            ⚙
          </button>
          <button className="whoami" onClick={onSwitchProfile}>
            <span
              className="whoami__avatar"
              style={{ background: profile.color }}
            >
              {profile.emoji}
            </span>
            <span className="whoami__name">{profile.name}</span>
            <span className="whoami__switch">Switch</span>
          </button>
        </div>
      </header>

      {featured && (
        <section className="hero">
          <div
            className="hero__bg"
            style={{
              background: `radial-gradient(120% 90% at 18% 10%, ${featured.color} 0%, #15162c 55%, #0f1020 100%)`,
            }}
          />
          <div className="hero__poster" aria-hidden="true">
            {featured.emoji}
          </div>
          <div className="hero__content">
            <p className="hero__eyebrow">Hi {profile.name} — what shall we watch?</p>
            <h1 className="hero__title">{featured.title}</h1>
            {featured.tagline && <p className="hero__tagline">{featured.tagline}</p>}
            <div className="hero__actions">
              <button
                className="bigbtn bigbtn--primary"
                onClick={() => onOpenSeries(featured)}
              >
                ▶ Watch
              </button>
              <button
                className="bigbtn bigbtn--ghost"
                onClick={() => onOpenSeries(featured)}
              >
                ≡ Episodes
              </button>
            </div>
          </div>
        </section>
      )}

      <main className="shelves">
        {recents.length > 0 && (
          <Shelf title="Continue Watching">
            {recents.map((item) => (
              <Card
                key={item.id}
                show={item}
                fav={favSet.has(item.id)}
                watched={watchedSet.has(item.id)}
                onPlay={onPlay}
                onToggleFavorite={onToggleFavorite}
                onToggleWatched={onToggleWatched}
                onRemove={onRemoveRecent}
              />
            ))}
          </Shelf>
        )}

        {favorites.length > 0 && (
          <Shelf title="Favorites ♥">{favorites.map(playableCard)}</Shelf>
        )}

        {shows.length > 0 && (
          <Shelf title="Shows">
            {shows.map((s) => (
              <SeriesCard key={s.id} series={s} onOpen={onOpenSeries} />
            ))}
          </Shelf>
        )}

        {films.length > 0 && (
          <Shelf title="Movies">{films.map(playableCard)}</Shelf>
        )}
      </main>

      <footer className="browse__footer">Made with ♥ for {profile.name}</footer>
    </div>
  )
}
