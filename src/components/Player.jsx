import { useEffect } from 'react'

// Full-screen video player. Plays the Google Drive file via Drive's own
// embed player (no API key needed) as long as the file is shared as
// "Anyone with the link can view".
//
// If the show still has the placeholder id, we show friendly setup help
// instead of a broken video.
export default function Player({ show, profile, onClose }) {
  const ready =
    show.driveId && !show.driveId.startsWith('REPLACE_WITH')

  // Allow Esc / browser back to close, and lock background scroll.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="player" role="dialog" aria-label={show.title}>
      <button className="player__close" onClick={onClose} aria-label="Back">
        ✕
      </button>

      <div className="player__stage">
        {ready ? (
          <iframe
            className="player__frame"
            src={`https://drive.google.com/file/d/${show.driveId}/preview`}
            title={show.title}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
          />
        ) : (
          <div className="player__setup">
            <div className="player__setup-emoji">{show.emoji}</div>
            <h2>"{show.title}" needs a video</h2>
            <p>
              This is a placeholder. To make it play, open{' '}
              <code>src/data/content.js</code>, find <code>{show.id}</code>, and
              replace <code>driveId</code> with the file ID from your Google
              Drive share link.
            </p>
            <p className="player__setup-hint">
              Drive link looks like:
              <br />
              drive.google.com/file/d/<strong>THIS_PART</strong>/view
            </p>
          </div>
        )}
      </div>

      <div className="player__caption">
        {show.title} · for {profile.name}
      </div>
    </div>
  )
}
