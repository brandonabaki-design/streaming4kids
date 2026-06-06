@echo off
setlocal enabledelayedexpansion

REM ============================================================================
REM  KidFlix - RE-ENCODE video to H.264 MP4 (for stubborn files)
REM ----------------------------------------------------------------------------
REM  Use this ONLY if convert-mkv-to-mp4.bat produced a file that still won't
REM  play (usually because the original video is HEVC/x265, e.g. "The Snowy
REM  Day"). This fully re-encodes the video to H.264, which every browser plays.
REM
REM  This is SLOWER than the fast converter (it actually re-encodes the picture),
REM  so expect it to take a while per file. Quality stays high.
REM
REM  Put this .bat in the same folder as the .mkv files and double-click it.
REM ============================================================================

echo.
echo === KidFlix re-encode to H.264 ===
echo.

where ffmpeg >nul 2>nul
if errorlevel 1 (
  echo ffmpeg is not installed, or not on your PATH.
  echo Open PowerShell and run:  winget install Gyan.FFmpeg
  echo Then reopen this window and try again.
  pause
  exit /b 1
)

if not exist "mp4" mkdir "mp4"

for %%f in (*.mkv) do (
  echo Re-encoding "%%f" ...  ^(this one takes a while^)
  ffmpeg -y -nostdin -i "%%f" -map 0:v:0 -map 0:a:0? -c:v libx264 -crf 21 -preset fast -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart -sn "mp4\%%~nf.mp4"
  echo.
)

echo Done. Files are in the "mp4" folder.
pause
