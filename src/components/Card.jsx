import { useState } from 'react'
import { isFavorite, toggleFavorite } from '../storage.js'

// A single show card. Art is either a thumbnail image or a colorful
// gradient with a big emoji (so no image files are required to get started).
export default function Card({ show, profile, onPlay, onFavoriteChange }) {
  const [fav, setFav] = useState(() => isFavorite(profile.id, show.id))

  const handleHeart = (e) => {
    e.stopPropagation()
    const now = toggleFavorite(profile.id, show.id)
    setFav(now)
    onFavoriteChange && onFavoriteChange()
  }

  return (
    <button
      className="card"
      onClick={() => onPlay(show)}
      aria-label={`Play ${show.title}`}
    >
      <div className="card__art">
        {show.thumbnail ? (
          <img className="card__img" src={show.thumbnail} alt="" />
        ) : (
          <div
            className="card__placeholder"
            style={{
              background: `linear-gradient(145deg, ${show.color}, #14152b)`,
            }}
          >
            <span className="card__emoji">{show.emoji}</span>
          </div>
        )}

        <span
          className={`card__heart ${fav ? 'is-fav' : ''}`}
          onClick={handleHeart}
          role="button"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '♥' : '♡'}
        </span>

        <span className="card__play-badge" aria-hidden="true">
          ▶
        </span>
      </div>
      <div className="card__meta">
        <span className="card__title">{show.title}</span>
        {show.duration && <span className="card__duration">{show.duration}</span>}
      </div>
    </button>
  )
}
