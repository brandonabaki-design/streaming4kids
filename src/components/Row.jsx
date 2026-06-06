import Card from './Card.jsx'

// A horizontally scrolling row of show cards, like a Netflix shelf.
export default function Row({ title, items, profile, onPlay, onFavoriteChange }) {
  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__track">
        {items.map((show) => (
          <Card
            key={show.id}
            show={show}
            profile={profile}
            onPlay={onPlay}
            onFavoriteChange={onFavoriteChange}
          />
        ))}
      </div>
    </section>
  )
}
