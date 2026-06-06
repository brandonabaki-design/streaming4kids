import { useState } from 'react'
import { driveThumbnail } from '../drive.js'

// A playable card (an episode or a movie). Artwork is the real Google Drive
// thumbnail when available, layered over a colorful gradient so there's never
// a blank flash while it loads, and falling back to a big emoji if there's no
// thumbnail yet. Favorite (heart) and watched (check) are controlled by the
// parent so the whole UI stays in sync.
export default function Card({
  show,
  fav,
  watched,
  episodeNumber,
  onPlay,
  onToggleFavorite,
  onToggleWatched,
  onRemove,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const imgSrc = show.thumbnail || driveThumbnail(show.driveId)

  // In the Continue Watching shelf we show a Remove button instead of the
  // heart/check, and skip the "watched" dim/tag (everything there is watched).
  const inRecents = Boolean(onRemove)

  const stop = (fn) => (e) => {
    e.stopPropagation()
    fn()
  }

  return (
    <button
      className={`card ${watched && !inRecents ? 'is-watched' : ''}`}
      onClick={() => onPlay(show)}
      aria-label={`Play ${show.title}`}
    >
      <div
        className="card__art"
        style={{ background: `linear-gradient(150deg, ${show.color}, #14152b)` }}
      >
        {!loaded && <span className="card__emoji">{show.emoji}</span>}

        {imgSrc && !failed && (
          <img
            className={`card__img ${loaded ? 'is-loaded' : ''}`}
            src={imgSrc}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}

        <span className="card__art-shade" aria-hidden="true" />

        {episodeNumber != null && (
          <span className="card__epnum" aria-hidden="true">
            {episodeNumber}
          </span>
        )}

        {inRecents ? (
          <span
            className="card__remove"
            onClick={stop(() => onRemove(show.id))}
            role="button"
            aria-label="Remove from Continue Watching"
          >
            ✕
          </span>
        ) : (
          <>
            <span
              className={`card__check ${watched ? 'is-on' : ''}`}
              onClick={stop(() => onToggleWatched(show.id))}
              role="button"
              aria-label={watched ? 'Mark as not watched' : 'Mark as watched'}
            >
              ✓
            </span>

            <span
              className={`card__heart ${fav ? 'is-fav' : ''}`}
              onClick={stop(() => onToggleFavorite(show.id))}
              role="button"
              aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            >
              {fav ? '♥' : '♡'}
            </span>
          </>
        )}

        <span className="card__play" aria-hidden="true">
          <span className="card__play-icon">▶</span>
        </span>

        {watched && !inRecents && (
          <span className="card__watched-tag">Watched</span>
        )}
      </div>

      <div className="card__meta">
        <span className="card__title">{show.title}</span>
        {show.duration && <span className="card__sub">{show.duration}</span>}
      </div>
    </button>
  )
}
