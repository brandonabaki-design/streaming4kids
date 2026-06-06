import { useEffect, useMemo, useRef, useState } from 'react'

// A simple "are you a grown-up?" gate. It asks a small multiplication question
// a toddler can't answer but a parent solves instantly. Not Fort Knox — just a
// speed bump.
//
// Two modes:
//  - Normal (default): protects a grown-up action (switch profile, settings).
//    If a kid opens it by accident and doesn't answer, it auto-closes after a
//    few idle seconds and returns them to what they were watching.
//  - lock: the re-entry lock shown after the app is left/reopened. No Cancel,
//    no auto-close — the only way forward is the right answer.
const AUTO_DISMISS_MS = 8000

export default function ParentGate({ onPass, onCancel, lock = false }) {
  const { a, b } = useMemo(
    () => ({
      a: 3 + Math.floor(Math.random() * 7), // 3..9
      b: 3 + Math.floor(Math.random() * 7), // 3..9
    }),
    [],
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [secsLeft, setSecsLeft] = useState(Math.round(AUTO_DISMISS_MS / 1000))
  const timedOut = useRef(false)

  // Idle countdown for the casual gate: ticks down and cancels at zero. Any
  // keystroke (a parent actually answering) resets it.
  useEffect(() => {
    if (lock || !onCancel) return
    setSecsLeft(Math.round(AUTO_DISMISS_MS / 1000))
    const t = setInterval(() => {
      setSecsLeft((s) => {
        if (s <= 1) {
          clearInterval(t)
          if (!timedOut.current) {
            timedOut.current = true
            onCancel()
          }
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(t)
  }, [lock, onCancel, value]) // re-running on `value` change resets the timer

  const submit = (e) => {
    e.preventDefault()
    if (parseInt(value, 10) === a * b) {
      onPass()
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <div className="gate" role="dialog" aria-label="Grown-up check">
      <form className="gate__box" onSubmit={submit}>
        <h2 className="gate__title">{lock ? '🔒 Locked' : 'Grown-ups only'}</h2>
        <p className="gate__prompt">
          What is{' '}
          <strong>
            {a} × {b}
          </strong>
          ?
        </p>
        <input
          className={`gate__input ${error ? 'is-error' : ''}`}
          type="number"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
          aria-label="Answer"
        />
        {error && <p className="gate__error">Not quite — try again.</p>}
        <div className="gate__actions">
          {!lock && onCancel && (
            <button
              type="button"
              className="gate__btn gate__btn--ghost"
              onClick={onCancel}
            >
              Cancel ({secsLeft})
            </button>
          )}
          <button type="submit" className="gate__btn">
            Enter
          </button>
        </div>
      </form>
    </div>
  )
}
