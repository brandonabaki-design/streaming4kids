// Parent settings (opened from the top bar, behind the math gate). Holds the
// Testing-mode switch and quick resets for the current kid.
export default function SettingsSheet({
  profile,
  testing,
  onToggleTesting,
  onClearWatched,
  onClearRecents,
  onClose,
}) {
  return (
    <div className="sheet" role="dialog" aria-label="Parent settings">
      <div className="sheet__box">
        <div className="sheet__head">
          <h2 className="sheet__title">Parent settings</h2>
          <button className="sheet__x" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <button
          className="setting"
          onClick={() => onToggleTesting(!testing)}
          aria-pressed={testing}
        >
          <span className="setting__text">
            <span className="setting__label">Testing mode</span>
            <span className="setting__desc">
              While on, videos you open won't be marked Watched or added to
              Continue Watching. Great for previewing episodes.
            </span>
          </span>
          <span className={`switch ${testing ? 'is-on' : ''}`} aria-hidden="true">
            <span className="switch__dot" />
          </span>
        </button>

        <div className="sheet__section">
          <span className="sheet__section-title">Reset for {profile.name}</span>
          <div className="sheet__actions">
            <button className="sheet__btn" onClick={onClearWatched}>
              Mark all as unwatched
            </button>
            <button className="sheet__btn" onClick={onClearRecents}>
              Clear Continue Watching
            </button>
          </div>
        </div>

        <button className="sheet__done" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  )
}
