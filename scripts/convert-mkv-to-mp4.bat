@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM  KidFlix - Convert MKV to MP4 (fast, for Google Drive + browser playback)
REM ----------------------------------------------------------------------------
REM  Put this .bat file in the SAME folder as your .mkv videos, then
REM  double-click it. It creates an "mp4" subfolder with browser-friendly
REM  copies you can upload to Google Drive.
REM
REM  How it works: the video is COPIED as-is (fast, no quality loss) and only
REM  the audio is re-encoded to AAC so browsers can play it. Each file takes
REM  seconds to a couple of minutes, not the length of the episode.
REM ============================================================================

echo.
echo === KidFlix MKV -^> MP4 converter ===
echo.

REM --- Check that ffmpeg is available ---
where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo ffmpeg is not installed, or not on your PATH.
  echo.
  echo To install it, open PowerShell and run:
  echo     winget install Gyan.FFmpeg
  echo.
  echo Then CLOSE this window, open a NEW one, and double-click this file again.
  echo.
  pause
  exit /b 1
)

if not exist "mp4" mkdir "mp4"

set /a count=0
set /a fail=0

for %%f in (*.mkv) do (
  set /a count+=1
  echo [!count!] Converting "%%f" ...
  ffmpeg -y -nostdin -i "%%f" -map 0:v:0 -map 0:a:0? -c:v copy -c:a aac -b:a 192k -movflags +faststart -sn "mp4\%%~nf.mp4"
  if errorlevel 1 (
    set /a fail+=1
    echo     ^^^!^^^! FAILED: "%%f"  ^(likely HEVC/x265 video - use reencode-to-h264.bat instead^)
  ) else (
    echo     OK -^> "mp4\%%~nf.mp4"
  )
  echo.
)

echo ============================================================
echo Done. Converted !count! file(s). Failures: !fail!.
echo Your MP4 files are in the "mp4" folder.
echo.
echo Next: upload them to your "Kids Media" Google Drive folder,
echo make sure that folder is shared "Anyone with the link",
echo then tell Claude and it'll add them to the app.
echo ============================================================
echo.
pause
