# Locking the tablet to KidFlix (kiosk mode)

A website **cannot** block the tablet's swipe gestures, app switching, or
system prompts — that's an OS-level security boundary no web page can cross.
The reliable lock comes from the tablet's own built-in kiosk feature. Use that
together with the app's in-app helpers below.

## iPad — Guided Access
1. Settings → Accessibility → **Guided Access** → turn on.
2. Set a **passcode** (and optionally enable Face ID / Touch ID to end it).
3. Open KidFlix (ideally the installed home-screen app), then **triple-click**
   the side button (or Home button on older iPads).
4. Tap **Start**. The iPad is now locked to KidFlix: the home gesture, app
   switching, and hardware buttons are disabled.
5. To exit: triple-click again and enter the passcode.

## Android — Screen Pinning (App pinning)
1. Settings → Security (or Security & privacy) → **App pinning / Screen
   pinning** → turn on, and enable **"Ask for PIN before unpinning."**
2. Open KidFlix, then open the recent-apps view and **pin** the app (tap the
   app icon → Pin), or use the share/pin control depending on the device.
3. The tablet is now held on KidFlix until someone unpins with the PIN.

## In-app helpers (already built in)
- **Install to the home screen** ("Add to Home Screen") so it launches
  fullscreen with no address bar.
- **Re-entry lock** (Settings → ⚙ → Re-entry lock): if the app is left and
  reopened, it drops a grown-up math question over everything. This complements
  Guided Access / Screen Pinning; it does not replace them.
- The casual grown-up gate (switch profile / settings) **auto-closes after a
  few idle seconds** so a kid who opens it by accident is returned to the show.
