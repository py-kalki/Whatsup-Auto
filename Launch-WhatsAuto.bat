@echo off
setlocal
cd /d "%~dp0"

if exist "dist\win-unpacked\WhatsAuto.exe" (
    echo Starting WhatsAuto in Background Tray...
    start "" "dist\win-unpacked\WhatsAuto.exe"
) else (
    echo Starting WhatsAuto Tray via Electron...
    npm run tray
)
