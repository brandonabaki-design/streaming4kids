# Converting videos for KidFlix

Browsers — and therefore Google Drive's player and this app — can only play
**MP4 files with H.264 video + AAC audio**. Your `.mkv` files (Mr. Rogers,
Winnie the Pooh, the two films) won't play until they're converted. There are
two ways to do it; pick whichever suits you.

---

## Option A (recommended): convert right on your Drive — no downloads

Your videos are already on Google Drive, so the easiest path is to convert them
**in the cloud**, with nothing to install. Use the included Colab notebook:

1. Go to **https://colab.research.google.com** → **Upload** →
   choose **`convert_on_drive.ipynb`** (in this `scripts/` folder).
2. Sign in with the Google account that has the videos.
3. Run the cells top to bottom (▶). Approve the Drive permission popup.
4. It saves a `.mp4` next to each `.mkv`, **in the same Drive folder**.
5. Tell Claude when it's done — it'll add them to the app.

Safe to re-run; it skips anything already converted.

---

## Option B: convert on a Windows PC

If you'd rather do it locally (files are on, or downloaded to, a Windows PC):

### One-time setup: install ffmpeg
1. Open **PowerShell**, run: `winget install Gyan.FFmpeg`
2. Close PowerShell. (Restart the PC if a script later says "ffmpeg not found".)

### Convert
1. Copy **`convert-mkv-to-mp4.bat`** into the folder of `.mkv` files.
2. **Double-click it.** Converted files land in an **`mp4`** subfolder.
3. If a file fails (usually HEVC/x265 like *The Snowy Day*), use
   **`reencode-to-h264.bat`** instead — slower, but handles anything.
4. Upload the new `.mp4` files to your **Kids Media** Drive folder, then tell
   Claude.

---

## After converting (either option)
- Make sure the **Kids Media** folder is shared **"Anyone with the link →
  Viewer"** (you've already done this).
- Tell Claude "the converted files are uploaded" — it reads the new files from
  Drive and adds them to `src/data/content.js`, then pushes so the live app
  updates.

