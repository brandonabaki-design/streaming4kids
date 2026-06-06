import { useState, useEffect, useCallback } from 'react'
import { profiles } from './data/content.js'
import ProfileSelect from './components/ProfileSelect.jsx'
import Browse from './components/Browse.jsx'
import Player from './components/Player.jsx'
import ParentGate from './components/ParentGate.jsx'
import { markWatched } from './storage.js'

// Top-level app state machine:
//   - no profile selected  -> ProfileSelect ("Who's watching?")
//   - profile selected      -> Browse (rows of shows)
//   - show selected         -> Player (full-screen Drive video)
// A ParentGate can be requested before "grown-up" actions (e.g. switch profile).

export default function App() {
  const [profileId, setProfileId] = useState(null)
  const [activeShow, setActiveShow] = useState(null)
  const [gate, setGate] = useState(null) // { onPass } or null

  const profile = profiles.find((p) => p.id === profileId) || null

  // Keep the browser tab title in sync with who's watching.
  useEffect(() => {
    document.title = profile ? `KidFlix — ${profile.name}` : 'KidFlix'
  }, [profile])

  const openShow = useCallback(
    (show) => {
      if (profileId) markWatched(profileId, show.id)
      setActiveShow(show)
    },
    [profileId],
  )

  const requestGate = useCallback((onPass) => {
    setGate({ onPass })
  }, [])

  // Switching profiles is a grown-up action, so it goes through the gate.
  const handleSwitchProfile = useCallback(() => {
    requestGate(() => {
      setActiveShow(null)
      setProfileId(null)
    })
  }, [requestGate])

  return (
    <div className="app">
      {!profile && <ProfileSelect onSelect={setProfileId} />}

      {profile && (
        <Browse
          profile={profile}
          onPlay={openShow}
          onSwitchProfile={handleSwitchProfile}
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
