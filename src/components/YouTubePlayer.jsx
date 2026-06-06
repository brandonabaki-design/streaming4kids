import { useEffect, useRef, useState } from 'react'

// Loads the YouTube IFrame Player API exactly once, shared across mounts.
let apiPromise = null
function loadYouTubeAPI() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      prev && prev()
      resolve(window.YT)
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  })
  return apiPromise
}

// A locked-down ("kiosk") YouTube player for a kids' app.
//
// Safety measures:
//  - controls/branding/keyboard/related-videos are all disabled in the embed.
//  - A transparent SHIELD covers the whole video, so taps never reach YouTube's
//    own UI (logo, "Watch on YouTube", channel link, end-screen cards). The
//    only way out is our own Back button. Tapping the video just toggles
//    play/pause.
//  - When a video ends we PAUSE instead of letting YouTube auto-advance, and
//    show a friendly "all done" screen. Nothing ever rolls into unrelated
//    recommended content.
//
// Caveat we can't engineer away: YouTube may still insert ads on some videos.
export default function YouTubePlayer({ show, onClose }) {
  const stageRef = useRef(null) // wrapper we fullscreen
  const holderRef = useRef(null) // stable div the API's iframe lives inside
  const playerRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [ended, setEnded] = useState(false)
  const [started, setStarted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const isPlaylist = Boolean(show.youtubePlaylistId)

  useEffect(() => {
    let cancelled = false
    // Create the player inside a manually-made child so React never tries to
    // reconcile the element the API swaps out for an <iframe>.
    const inner = document.createElement('div')
    if (holderRef.current) holderRef.current.appendChild(inner)

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !YT) return
      const vars = {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        iv_load_policy: 3, // no annotations
        playsinline: 1,
        origin: window.location.origin,
      }
      if (isPlaylist) {
        vars.listType = 'playlist'
        vars.list = show.youtubePlaylistId
      }
      playerRef.current = new YT.Player(inner, {
        width: '100%',
        height: '100%',
        host: 'https://www.youtube-nocookie.com',
        videoId: isPlaylist ? undefined : show.youtubeId,
        playerVars: vars,
        events: {
          onReady: (e) => {
            try {
              e.target.playVideo()
            } catch {
              /* autoplay may be blocked; the big Play button covers that */
            }
          },
          onStateChange: (e) => {
            const S = YT.PlayerState
            if (e.data === S.PLAYING) {
              setPlaying(true)
              setStarted(true)
              setEnded(false)
            } else if (e.data === S.PAUSED) {
              setPlaying(false)
            } else if (e.data === S.ENDED) {
              // Don't let the playlist auto-advance — stop and ask.
              setPlaying(false)
              setEnded(true)
              try {
                e.target.pauseVideo()
              } catch {
                /* ignore */
              }
            }
          },
        },
      })
    })

    return () => {
      cancelled = true
      try {
        playerRef.current && playerRef.current.destroy()
      } catch {
        /* ignore */
      }
      playerRef.current = null
    }
  }, [show.youtubeId, show.youtubePlaylistId, isPlaylist])

  // Esc / fullscreen plumbing (mirrors the Drive Player).
  useEffect(() => {
    const fsEl = () =>
      document.fullscreenElement || document.webkitFullscreenElement
    const onKey = (e) => {
      if (e.key === 'Escape' && !fsEl()) onClose()
    }
    const onFs = () => setIsFullscreen(!!fsEl())
    document.addEventListener('keydown', onKey)
    document.addEventListener('fullscreenchange', onFs)
    document.addEventListener('webkitfullscreenchange', onFs)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('fullscreenchange', onFs)
      document.removeEventListener('webkitfullscreenchange', onFs)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const canFullscreen =
    typeof document !== 'undefined' &&
    (document.fullscreenEnabled || document.webkitFullscreenEnabled)

  const toggleFullscreen = () => {
    const el = stageRef.current
    if (!el) return
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement
    if (!fsEl) {
      const req = el.requestFullscreen || el.webkitRequestFullscreen
      req && req.call(el)
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen
      exit && exit.call(document)
    }
  }

  const p = () => playerRef.current
  const togglePlay = () => {
    if (!p()) return
    if (ended) return // use the end-screen buttons instead
    if (playing) p().pauseVideo()
    else p().playVideo()
  }
  const replay = () => {
    if (!p()) return
    setEnded(false)
    try {
      p().seekTo(0)
      p().playVideo()
    } catch {
      /* ignore */
    }
  }
  const playNext = () => {
    if (!p()) return
    setEnded(false)
    try {
      p().nextVideo()
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="player" role="dialog" aria-label={show.title}>
      <div className="player__bar">
        <button className="player__btn player__back" onClick={onClose}>
          ‹ Back
        </button>
        <span className="player__bar-title">{show.title}</span>
        {canFullscreen ? (
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

      <div className="player__stage yt" ref={stageRef}>
        <div className="yt__holder" ref={holderRef} />

        {/* Kiosk shield: swallows every tap so YouTube's own links are never
            reachable. A tap toggles play/pause. */}
        <button
          className="yt__shield"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {!playing && !ended && (
            <span className="yt__bigicon">{started ? '❚❚' : '▶'}</span>
          )}
        </button>

        {ended && (
          <div className="yt__end" role="dialog" aria-label="Finished">
            <span className="yt__end-emoji">{show.emoji || '🎉'}</span>
            <p className="yt__end-title">All done!</p>
            <div className="yt__end-actions">
              <button className="yt__end-btn" onClick={replay}>
                ↻ Watch again
              </button>
              {isPlaylist && (
                <button className="yt__end-btn" onClick={playNext}>
                  ▶ Next
                </button>
              )}
              <button className="yt__end-btn yt__end-btn--ghost" onClick={onClose}>
                ‹ Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
