import { useEffect, useRef, useState } from 'react'

// Full-screen video player. Plays the Google Drive file via Drive's own
// embed player (no API key needed) as long as the file is shared as
// "Anyone with the link can view".
//
// The video fills the whole screen (great on a phone), with a slim top bar
// holding Back + a big Fullscreen button. If the show still has the
// placeholder id, we show friendly setup help instead of a broken video.
// (YouTube-sourced shows are routed to YouTubePlayer by App instead.)
export default function Player({ show, profile, onClose }) {
  const ready = show.driveId && !show.driveId.startsWith('REPLACE_WITH')
  const stageRef = useRef(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    // Esc closes the player — but only when we're not in OS fullscreen
    // (in that case Esc should just leave fullscreen first).
    const onKey = (e) => {
      if (e.key === 'Escape' && !fullscreenElement()) onClose()
    }
    const onFsChange = () => setIsFullscreen(!!fullscreenElement())

    document.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFsChange)
    document.addEventListener('webkitfullscreenchange', onFsChange)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFsChange)
      document.removeEventListener('webkitfullscreenchange', onFsChange)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const fullscreenElement = () =>
    document.fullscreenElement || document.webkitFullscreenElement

  // Fullscreen API isn't available on every browser (notably iPhone Safari
  // only allows it on <video> elements, not iframes). Hide the button when
  // we truly can't use it — on the phone the video already fills the screen.
  const canFullscreen =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled || document.webkitFullscreenEnabled)

  const toggleFullscreen = () => {
    const el = stageRef.current
    if (!el) return
    if (!fullscreenElement()) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen
      req && req.call(el)
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen
      exit && exit.call(document)
    }
  }

  return (
    <div className="player" role="dialog" aria-label={show.title}>
      <div className="player__bar">
        <button className="player__btn player__back" onClick={onClose}>
          ‹ Back
        </button>
        <span className="player__bar-title">{show.title}</span>
        {ready && canFullscreen ? (
          <button
            className="player__btn player__fs"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit full screen' : 'Full screen'}
          >
            {isFullscreen ? '⛶ Exit' : '⛶ Full screen'}
          </button>
        ) : (
          <span className="player__bar-spacer" />
        )}
      </div>

      <div className="player__stage" ref={stageRef}>
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
          </div>
        )}
      </div>
    </div>
  )
}
