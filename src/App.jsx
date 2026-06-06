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
} from './storage.js'
import ProfileSelect from './components/ProfileSelect.jsx'
import Browse from './components/Browse.jsx'
import SeriesDetail from './components/SeriesDetail.jsx'
import Player from './components/Player.jsx'
import ParentGate from './components/ParentGate.jsx'

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
      if (profileId) {
        recordOpened(profileId, show.id)
        // The Drive embed is cross-origin so we can't detect completion;
        // opening is our "watched" signal. A parent can clear it on the card.
        setWatched(profileId, show.id, true)
        bumpLib()
      }
      setActiveShow(show)
    },
    [profileId, bumpLib],
  )

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
          onPlay={openShow}
          onOpenSeries={setActiveSeries}
          onRemoveRecent={handleRemoveRecent}
          onSwitchProfile={handleSwitchProfile}
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

      {activeShow && (
        <Player
          show={activeShow}
          profile={profile}
          onClose={() => setActiveShow(null)}
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
