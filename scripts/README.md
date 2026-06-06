# Converting videos for KidFlix (Windows)

Browsers — and therefore Google Drive's player and this app — can only play
**MP4 files with H.264 video + AAC audio**. Your `.mkv` files (Mr. Rogers,
Winnie the Pooh, the two films) won't play until they're converted. These
scripts do that for you.

## One-time setup: install ffmpeg

1. Press **Start**, type **PowerShell**, open it.
2. Paste this and press Enter:
   ```
   winget install Gyan.FFmpeg
   ```
3. Close PowerShell. (If a script later says "ffmpeg not found", restart your PC
   so the new PATH takes effect.)

## Convert your files

1. Copy **`convert-mkv-to-mp4.bat`** into the folder that holds your `.mkv`
   files (e.g. your local Mr. Rogers folder).
2. **Double-click it.** It creates an **`mp4`** subfolder with the converted
   videos. This is fast — it copies the video and only re-encodes audio.
3. If one file fails (it'll say so — usually HEVC/x265 like *The Snowy Day*),
   copy **`reencode-to-h264.bat`** into the same folder and double-click that
   one instead. It's slower but handles anything.

## Get them into the app

1. Upload the new `.mp4` files to your **"Kids Media"** Google Drive folder.
2. Make sure that folder is shared **"Anyone with the link → Viewer"**.
3. Tell Claude "I uploaded the converted Mr. Rogers / Pooh / movies" — it can
   read the new files from Drive and add them to `src/data/content.js`
   automatically, then push so the live app updates.

## Don't have the files on your PC, only on Drive?

Download them first: in Google Drive, right-click each file (or the folder) →
**Download**. Drive may zip a folder; unzip it, then run the converter on the
`.mkv` files inside.
