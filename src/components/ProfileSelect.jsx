import { profiles } from '../data/content.js'

// The "Who's watching?" screen — big, friendly, tappable avatars.
export default function ProfileSelect({ onSelect }) {
  return (
    <div className="whos">
      <div className="whos__brand">
        <span className="brand__mark">▶</span>
        <span className="brand__name">KidFlix</span>
      </div>
      <h1 className="whos__title">Who's watching?</h1>
      <div className="whos__grid">
        {profiles.map((p) => (
          <button
            key={p.id}
            className="avatarcard"
            onClick={() => onSelect(p.id)}
            aria-label={`Watch as ${p.name}`}
          >
            <span
              className="avatarcard__face"
              style={{
                background: `radial-gradient(circle at 32% 28%, ${p.color}, #1a1b2e 78%)`,
              }}
            >
              <span className="avatarcard__emoji">{p.emoji}</span>
            </span>
            <span className="avatarcard__name">{p.name}</span>
            <span className="avatarcard__age">{p.ageLabel}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
