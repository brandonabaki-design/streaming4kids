import { useState, useEffect, useCallback, useMemo } from 'react'
import { profiles } from './data/content.js'
import {
  getFavorites,
  getWatched,
  toggleFavorite,
  toggleWatched,
  recordOpened,
  removeRecent,
  setWatched,
  syncFromCloud,
  clearWatched,
  clearRecents,
  isTestingMode,
  setTestingMode,
} from './storage.js'
import ProfileSelect from './components/ProfileSelect.jsx'
import Browse from './components/Browse.jsx'
import SeriesDetail from './components/SeriesDetail.jsx'
import Player from './components/Player.jsx'
import YouTubePlayer from './components/YouTubePlayer.jsx'
import AudioPlayer from './components/AudioPlayer.jsx'
import { isAudiobook } from './library.js'
import ParentGate from './components/ParentGate.jsx'
import SettingsSheet from './components/SettingsSheet.jsx'

// View flow:
//   no profile  -> ProfileSelect ("Who's watching?")
//   profile      -> Browse (rows of series + movies)
//   series open  -> SeriesDetail (seasons + episodes)
//   show open     -> Player (full-screen Drive video)
// A ParentGate guards grown-up actions (switching profiles).
export default function App() {
  const [profileId, setProfileId] = useState(null)
  const [activeSeries, setActiveSeries] = useState(null)
  const [activeShow, setActiveShow] = useState(null)
  const [gate, setGate] = useState(null) // { onPass } or null
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [testing, setTesting] = useState(isTestingMode())

  // Bumped on any favorite/watched change so derived sets recompute.
  const [libVersion, setLibVersion] = useState(0)
  const bumpLib = useCallback(() => setLibVersion((v) => v + 1), [])

  const profile = profiles.find((p) => p.id === profileId) || null

  useEffect(() => {
    document.title = profile ? `KidFlix · ${profile.name}` : 'KidFlix'
  }, [profile])

  // Pull this kid's saved Watched/Favorites from the cloud (if sync is on)
  // when they're selected, then refresh.
  useEffect(() => {
    if (!profileId) return
    let cancelled = false
    syncFromCloud(profileId).then((changed) => {
      if (changed && !cancelled) bumpLib()
    })
    return () => {
      cancelled = true
    }
  }, [profileId, bumpLib])

  // Sets passed down so every card reflects the same state.
  const favSet = useMemo(
    () => new Set(profileId ? getFavorites(profileId) : []),
    [profileId, libVersion],
  )
  const watchedSet = useMemo(
    () => new Set(profileId ? getWatched(profileId) : []),
    [profileId, libVersion],
  )

  const handleToggleFavorite = useCallback(
    (id) => {
      toggleFavorite(profileId, id)
      bumpLib()
    },
    [profileId, bumpLib],
  )
  const handleToggleWatched = useCallback(
    (id) => {
      toggleWatched(profileId, id)
      bumpLib()
    },
    [profileId, bumpLib],
  )

  const openShow = useCallback(
    (show) => {
      // In Testing mode we don't record anything — a parent can preview videos
      // without filling up Watched / Continue Watching.
      if (profileId && !isTestingMode()) {
        recordOpened(profileId, show.id)
        // The Drive embed is cross-origin so we can't detect completion;
        // opening is our "watched" signal. A parent can clear it on the card.
        // Audiobooks track their own resume position, so we don't mark those
        // "watched" (that would just dim a book you're mid-way through).
        if (!isAudiobook(show)) setWatched(profileId, show.id, true)
        bumpLib()
      }
      setActiveShow(show)
    },
    [profileId, bumpLib],
  )

  const handleToggleTesting = useCallback((on) => {
    setTestingMode(on)
    setTesting(on)
  }, [])
  const handleClearWatched = useCallback(() => {
    clearWatched(profileId)
    bumpLib()
  }, [profileId, bumpLib])
  const handleClearRecents = useCallback(() => {
    clearRecents(profileId)
    bumpLib()
  }, [profileId, bumpLib])

  const handleRemoveRecent = useCallback(
    (id) => {
      removeRecent(profileId, id)
      bumpLib()
    },
    [profileId, bumpLib],
  )

  const requestGate = useCallback((onPass) => setGate({ onPass }), [])

  const handleSwitchProfile = useCallback(() => {
    requestGate(() => {
      setActiveShow(null)
      setActiveSeries(null)
      setProfileId(null)
    })
  }, [requestGate])

  const library = {
    favSet,
    watchedSet,
    onToggleFavorite: handleToggleFavorite,
    onToggleWatched: handleToggleWatched,
  }

  return (
    <div className="app">
      {!profile && <ProfileSelect onSelect={setProfileId} />}

      {profile && (
        <Browse
          profile={profile}
          library={library}
          testing={testing}
          onPlay={openShow}
          onOpenSeries={setActiveSeries}
          onRemoveRecent={handleRemoveRecent}
          onSwitchProfile={handleSwitchProfile}
          onOpenSettings={() => requestGate(() => setSettingsOpen(true))}
        />
      )}

      {profile && activeSeries && (
        <SeriesDetail
          series={activeSeries}
          profile={profile}
          library={library}
          onPlay={openShow}
          onClose={() => setActiveSeries(null)}
        />
      )}

      {activeShow &&
        (isAudiobook(activeShow) ? (
          <AudioPlayer
            book={activeShow}
            profile={profile}
            onClose={() => setActiveShow(null)}
          />
        ) : activeShow.youtubeId || activeShow.youtubePlaylistId ? (
          <YouTubePlayer show={activeShow} onClose={() => setActiveShow(null)} />
        ) : (
          <Player
            show={activeShow}
            profile={profile}
            onClose={() => setActiveShow(null)}
          />
        ))}

      {settingsOpen && profile && (
        <SettingsSheet
          profile={profile}
          testing={testing}
          onToggleTesting={handleToggleTesting}
          onClearWatched={handleClearWatched}
          onClearRecents={handleClearRecents}
          onClose={() => setSettingsOpen(false)}
        />
      )}

      {gate && (
        <ParentGate
          onPass={() => {
            const cb = gate.onPass
            setGate(null)
            cb && cb()
          }}
          onCancel={() => setGate(null)}
        />
      )}
    </div>
  )
}
