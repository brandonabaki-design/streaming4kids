# 🦁🦋 KidFlix — a streaming app for Noah & Naia

A Netflix-style web app for two little ones, with content hosted on **your own
Google Drive**. No subscriptions, no ads, no rabbit holes — just the shows you
choose, organized into kid-friendly rows, behind a simple grown-up gate.

Built as a **static web app** (React + Vite), so it's free to host and runs in
any browser on a phone, tablet, laptop, or smart TV.

---

## ✨ What it does (v1 prototype)

- **"Who's watching?" screen** — big tappable avatars for **Noah** (🦁) and
  **Naia** (🦋), just like Netflix kids profiles.
- **Per-kid browse screen** — a hero banner plus rows of shows (Nursery Rhymes,
  Learning Time, Story Time, Animals, Calm & Sleepy). Each kid only sees the
  shows you've tagged for them.
- **Plays videos straight from Google Drive** — no Google login required in the
  app, no API keys.
- **Favorites** ♥ and **Continue Watching** — saved per kid, on the device.
- **Grown-up gate** — switching profiles asks a small multiplication question
  so a toddler can't wander out on their own.
- **Colorful auto-generated card art** — every show gets a bright gradient +
  emoji, so you don't need to make thumbnail images.

> The app ships with a handful of **placeholder shows** so you can see it
> working immediately. Replace their `driveId`s with your real Drive videos
> (see below) and they'll play.

---

## 🚀 Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

To make a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

---

## 🎬 Adding your own videos (the only file you edit)

Everything lives in **`src/data/content.js`**.

1. Upload your video to Google Drive (`.mp4` works best).
2. Right-click it → **Share** → set **General access** to
   **"Anyone with the link" → Viewer**. *(This is what lets the app play it.)*
3. Click **Copy link**. It looks like:
   ```
   https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
   ```
   The part between `/d/` and `/view` is the **Drive file ID**.
4. Add (or edit) an entry in the `shows` array:

   ```js
   {
     id: 'bluey-magic-xylophone',           // any unique slug
     title: 'Bluey — The Magic Xylophone',
     driveId: '1AbCdEfGhIjKlMnOpQrStUvWxYz', // <- paste the ID here
     category: 'Story Time',                  // which row it appears in
     profiles: ['noah', 'naia'],              // who can see it
     emoji: '🐶',                             // card art
     color: '#5C9DFF',                        // card art background
     duration: '7 min',                       // optional label
   }
   ```

That's it — save, and the show appears in the right kid's row and plays.

### Tweaking the kids or the rows
- Edit the `profiles` array at the top of `content.js` to change names, emojis,
  colors, or ages.
- Edit `categoryOrder` to rename or reorder the rows. (`Continue Watching` and
  `Favorites` are special rows that fill in automatically.)

---

## 🌐 Hosting it (so the kids can use it on a tablet/TV)

Because it's a static site, any of these work for free:

- **GitHub Pages** — `npm run build`, then publish the `dist/` folder.
- **Netlify / Vercel / Cloudflare Pages** — point it at this repo; build command
  `npm run build`, output directory `dist`.

The `vite.config.js` `base: './'` setting means the build works under a subpath
(like a GitHub Pages project URL) without extra config.

---

## 🔒 A note on safety & privacy

- The app never links out, has no search, and can't reach anything except the
  Drive videos you list — there's no way for a child to wander to other content.
- Favorites/history are stored only in the browser (`localStorage`), nothing is
  sent anywhere.
- The grown-up gate is a gentle speed bump, not real security. Anyone who can do
  small multiplication can pass it — it's there to stop a 3-year-old, not a teen.
- Videos must be shared as "Anyone with the link." If you'd rather keep videos
  fully private, that needs a different approach (Google OAuth in the app) — we
  can add that later if you want it.

---

## 🗺️ Ideas for next versions

- Watch-time limits / a "bedtime" lock.
- Real progress bars (resume where you left off inside a video).
- Custom photo avatars for each kid.
- Auto-syncing the catalog from a Drive folder (drop a file in, it appears).
- A tiny password instead of the math gate.

Made with ♥ for Noah & Naia.
