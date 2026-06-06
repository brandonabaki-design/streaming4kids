import { useEffect, useRef, useState } from 'react'
import { getAudioProgress, setAudioProgress } from '../storage.js'

// Native audio player for audiobooks / bedtime stories. Unlike the Drive video
// embed, a plain <audio> element gives us full control — so we get real
// scrubbing, skip ±15s, a sleep timer, and resume-where-you-left-off.
//
// A "book" is either a single source (audioUrl or driveAudioId) or a list of
// chapters in `tracks: [{ title, audioUrl | driveAudioId }]`.

const SLEEP_OPTIONS = [15, 30, 45] // minutes

// Small Drive audio files usually stream fine from this direct URL. (Big files
// can hit Drive's "scan" interstitial — for those, a direct audioUrl is best.)
function driveAudioUrl(id) {
  return `https://drive.google.com/uc?export=download&id=${id}`
}
function trackSrc(t) {
  if (!t) return null
  return t.audioUrl || (t.driveAudioId ? driveAudioUrl(t.driveAudioId) : null)
}
function fmt(s) {
  if (!s || !isFinite(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${String(sec).padStart(2, '0')}`
}

export default function AudioPlayer({ book, profile, onClose }) {
  const tracks =
    book.tracks && book.tracks.length
      ? book.tracks
      : [{ title: book.title, audioUrl: book.audioUrl, driveAudioId: book.driveAudioId }]

  const audioRef = useRef(null)
  const pendingSeek = useRef(0) // seconds to seek to once metadata loads
  const shouldPlay = useRef(false)

  const [idx, setIdx] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [cur, setCur] = useState(0)
  const [dur, setDur] = useState(0)
  const [sleepMin, setSleepMin] = useState(0) // 0 = off
  const [sleepLeft, setSleepLeft] = useState(0) // seconds remaining

  const profileId = profile?.id
  const multi = tracks.length > 1
  const src = trackSrc(tracks[idx])

  // Restore saved position once, before first load.
  useEffect(() => {
    if (!profileId) return
    const saved = getAudioProgress(profileId, book.id)
    if (saved) {
      setIdx(Math.min(saved.trackIndex || 0, tracks.length - 1))
      pendingSeek.current = saved.time || 0
      shouldPlay.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Save progress every few seconds while playing.
  useEffect(() => {
    if (!profileId) return
    const t = setInterval(() => {
      const a = audioRef.current
      if (a && !a.paused) {
        setAudioProgress(profileId, book.id, {
          trackIndex: idx,
          time: a.currentTime,
        })
      }
    }, 4000)
    return () => clearInterval(t)
  }, [profileId, book.id, idx])

  // Sleep timer: counts down, then gently pauses.
  useEffect(() => {
    if (!sleepMin) {
      setSleepLeft(0)
      return
    }
    setSleepLeft(sleepMin * 60)
    const t = setInterval(() => {
      setSleepLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          const a = audioRef.current
          a && a.pause()
          setSleepMin(0)
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [sleepMin])

  // Esc closes.
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Load the new track when switching chapters.
  useEffect(() => {
    const a = audioRef.current
    if (a) a.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const a = () => audioRef.current
  const togglePlay = () => {
    const el = a()
    if (!el) return
    if (el.paused) el.play()
    else el.pause()
  }
  const nudge = (delta) => {
    const el = a()
    if (!el) return
    el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta))
  }
  const onScrub = (e) => {
    const el = a()
    if (el) el.currentTime = Number(e.target.value)
  }
  const goTrack = (n) => {
    const next = idx + n
    if (next < 0 || next >= tracks.length) return
    pendingSeek.current = 0
    shouldPlay.current = true
    setCur(0)
    setIdx(next)
  }

  const onLoaded = () => {
    const el = a()
    if (!el) return
    setDur(el.duration || 0)
    if (pendingSeek.current > 0) {
      el.currentTime = pendingSeek.current
      pendingSeek.current = 0
    }
    if (shouldPlay.current) {
      shouldPlay.current = false
      el.play().catch(() => {})
    }
  }
  const onEnded = () => {
    if (idx < tracks.length - 1) goTrack(1)
    else if (profileId) setAudioProgress(profileId, book.id, { trackIndex: 0, time: 0 })
  }

  return (
    <div
      className="audio"
      role="dialog"
      aria-label={book.title}
      style={{
        background: `radial-gradient(120% 80% at 50% -10%, ${book.color} 0%, #0c0d1c 55%, #070810 100%)`,
      }}
    >
      <audio
        ref={audioRef}
        src={src || undefined}
        preload="metadata"
        onLoadedMetadata={onLoaded}
        onTimeUpdate={() => setCur(a()?.currentTime || 0)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={onEnded}
      />

      <header className="audio__bar">
        <button className="player__btn player__back" onClick={onClose}>
          ‹ Back
        </button>
        <span className="audio__bar-title">{book.title}</span>
        <span className="player__bar-spacer" />
      </header>

      <div className="audio__cover" aria-hidden="true">
        {book.thumbnail ? (
          <img className="audio__cover-img" src={book.thumbnail} alt="" />
        ) : (
          <span className="audio__cover-emoji">{book.emoji || '🎧'}</span>
        )}
      </div>

      <div className="audio__meta">
        <h1 className="audio__title">{book.title}</h1>
        {book.author && <p className="audio__author">{book.author}</p>}
        {multi && (
          <p className="audio__chapter">
            {tracks[idx].title || `Chapter ${idx + 1}`} · {idx + 1}/{tracks.length}
          </p>
        )}
      </div>

      <div className="audio__scrub">
        <span className="audio__time">{fmt(cur)}</span>
        <input
          className="audio__range"
          type="range"
          min={0}
          max={dur || 0}
          step={1}
          value={cur}
          onChange={onScrub}
          aria-label="Seek"
        />
        <span className="audio__time">{fmt(dur)}</span>
      </div>

      <div className="audio__controls">
        {multi && (
          <button
            className="audio__ctrl"
            onClick={() => goTrack(-1)}
            disabled={idx === 0}
            aria-label="Previous chapter"
          >
            ⏮
          </button>
        )}
        <button className="audio__ctrl" onClick={() => nudge(-15)} aria-label="Back 15 seconds">
          ↺15
        </button>
        <button
          className="audio__ctrl audio__ctrl--play"
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <button className="audio__ctrl" onClick={() => nudge(15)} aria-label="Forward 15 seconds">
          15↻
        </button>
        {multi && (
          <button
            className="audio__ctrl"
            onClick={() => goTrack(1)}
            disabled={idx === tracks.length - 1}
            aria-label="Next chapter"
          >
            ⏭
          </button>
        )}
      </div>

      <div className="audio__sleep">
        <span className="audio__sleep-label">😴 Sleep timer</span>
        <div className="audio__sleep-opts">
          <button
            className={`audio__chip ${sleepMin === 0 ? 'is-on' : ''}`}
            onClick={() => setSleepMin(0)}
          >
            Off
          </button>
          {SLEEP_OPTIONS.map((m) => (
            <button
              key={m}
              className={`audio__chip ${sleepMin === m ? 'is-on' : ''}`}
              onClick={() => setSleepMin(m)}
            >
              {m}m
            </button>
          ))}
          {sleepLeft > 0 && (
            <span className="audio__sleep-left">⏳ {fmt(sleepLeft)}</span>
          )}
        </div>
      </div>

      {!src && (
        <p className="audio__missing">
          This book has no audio source yet.
        </p>
      )}
    </div>
  )
}
