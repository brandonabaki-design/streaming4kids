import { useMemo, useState } from 'react'

// A simple "are you a grown-up?" gate shown before leaving the kid view.
// It asks a small multiplication question a toddler can't answer but a
// parent solves instantly. Not Fort Knox — just a speed bump.
export default function ParentGate({ onPass, onCancel }) {
  const { a, b } = useMemo(
    () => ({
      a: 3 + Math.floor(Math.random() * 7), // 3..9
      b: 3 + Math.floor(Math.random() * 7), // 3..9
    }),
    [],
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

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
        <h2 className="gate__title">Grown-ups only</h2>
        <p className="gate__prompt">
          What is <strong>{a} × {b}</strong>?
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
          <button type="button" className="gate__btn gate__btn--ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="gate__btn">
            Enter
          </button>
        </div>
      </form>
    </div>
  )
}
