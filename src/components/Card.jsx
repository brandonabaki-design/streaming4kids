import { useState } from 'react'
import { driveThumbnail } from '../drive.js'

// A single show card. Art is a real Google Drive thumbnail (a frame from the
// video) when available, otherwise a colorful gradient with a big emoji.
//
// Favorite (heart) and watched (check) are CONTROLLED by the parent so the
// whole browse screen stays in sync after a video is opened.
export default function Card({
  show,
  fav,
  watched,
  onPlay,
  onToggleFavorite,
  onToggleWatched,
}) {
  const [imgFailed, setImgFailed] = useState(false)
  const imgSrc = show.thumbnail || driveThumbnail(show.driveId)
  const showImg = imgSrc && !imgFailed

  const handleHeart = (e) => {
    e.stopPropagation()
    onToggleFavorite(show.id)
  }

  const handleCheck = (e) => {
    e.stopPropagation()
    onToggleWatched(show.id)
  }

  return (
    <button
      className={`card ${watched ? 'is-watched' : ''}`}
      onClick={() => onPlay(show)}
      aria-label={`Play ${show.title}`}
    >
      <div className="card__art">
        {showImg ? (
          <img
            className="card__img"
            src={imgSrc}
            alt=""
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
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

        {/* Watched check (top-left). Green when seen; tap to clear/mark. */}
        <span
          className={`card__check ${watched ? 'is-on' : ''}`}
          onClick={handleCheck}
          role="button"
          aria-label={watched ? 'Mark as not watched' : 'Mark as watched'}
        >
          ✓
        </span>

        {/* Favorite heart (top-right). */}
        <span
          className={`card__heart ${fav ? 'is-fav' : ''}`}
          onClick={handleHeart}
          role="button"
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {fav ? '♥' : '♡'}
        </span>

        {watched && <span className="card__watched-tag">Watched</span>}

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
