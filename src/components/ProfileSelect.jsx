import { profiles } from '../data/content.js'

// The "Who's watching?" screen — big, friendly, tappable avatars.
export default function ProfileSelect({ onSelect }) {
  return (
    <div className="profile-select">
      <h1 className="profile-select__title">Who's watching?</h1>
      <div className="profile-select__grid">
        {profiles.map((p) => (
          <button
            key={p.id}
            className="profile-card"
            onClick={() => onSelect(p.id)}
            aria-label={`Watch as ${p.name}`}
          >
            <span
              className="profile-card__avatar"
              style={{
                background: `radial-gradient(circle at 30% 30%, ${p.color}, #1a1b2e)`,
              }}
            >
              <span className="profile-card__emoji">{p.emoji}</span>
            </span>
            <span className="profile-card__name">{p.name}</span>
            <span className="profile-card__age">{p.ageLabel}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
