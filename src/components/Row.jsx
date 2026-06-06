import Card from './Card.jsx'

// A horizontally scrolling row of show cards, like a Netflix shelf.
export default function Row({
  title,
  items,
  favSet,
  watchedSet,
  onPlay,
  onToggleFavorite,
  onToggleWatched,
}) {
  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__track">
        {items.map((show) => (
          <Card
            key={show.id}
            show={show}
            fav={favSet.has(show.id)}
            watched={watchedSet.has(show.id)}
            onPlay={onPlay}
            onToggleFavorite={onToggleFavorite}
            onToggleWatched={onToggleWatched}
          />
        ))}
      </div>
    </section>
  )
}
