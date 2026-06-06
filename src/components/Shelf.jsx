// A titled, horizontally scrolling shelf of cards (a Netflix-style row).
export default function Shelf({ title, children }) {
  return (
    <section className="shelf">
      <h2 className="shelf__title">{title}</h2>
      <div className="shelf__track">{children}</div>
    </section>
  )
}
