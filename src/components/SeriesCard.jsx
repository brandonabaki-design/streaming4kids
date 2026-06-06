import { useState } from 'react'
import { driveThumbnail } from '../drive.js'
import { episodeCount } from '../library.js'

// A series tile shown on the browse screen. Tapping it opens the series detail
// page (seasons + episodes) rather than playing anything directly.
export default function SeriesCard({ series, onOpen }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  // Use the first episode's thumbnail as the series poster, if available.
  const firstEp = series.seasons[0]?.episodes[0]
  const imgSrc = series.poster || driveThumbnail(firstEp?.driveId)

  const seasons = series.seasons.length
  const eps = episodeCount(series)
  const meta =
    (seasons > 1 ? `${seasons} seasons` : `${eps} episodes`) +
    (seasons > 1 ? ` · ${eps} episodes` : '')

  return (
    <button
      className="seriescard"
      onClick={() => onOpen(series)}
      aria-label={`Open ${series.title}`}
    >
      <div
        className="seriescard__art"
        style={{ background: `linear-gradient(150deg, ${series.color}, #14152b)` }}
      >
        {!loaded && <span className="seriescard__emoji">{series.emoji}</span>}
        {imgSrc && !failed && (
          <img
            className={`seriescard__img ${loaded ? 'is-loaded' : ''}`}
            src={imgSrc}
            alt=""
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        )}
        <span className="seriescard__shade" aria-hidden="true" />
        <span className="seriescard__badge">SERIES</span>
        <div className="seriescard__caption">
          <span className="seriescard__title">{series.title}</span>
          <span className="seriescard__meta">{meta}</span>
        </div>
      </div>
    </button>
  )
}
