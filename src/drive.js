// Helpers for working with Google Drive file links.

// Google Drive auto-generates a thumbnail (a frame from the video) for each
// file. For files shared "Anyone with the link", this URL returns that image
// with no API key needed. We use it as real card art, falling back to the
// emoji gradient if it isn't available yet (e.g. file not shared, or Drive
// hasn't finished generating it).
export function driveThumbnail(driveId, width = 640) {
  if (!driveId || driveId.startsWith('REPLACE_WITH')) return null
  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w${width}`
}
