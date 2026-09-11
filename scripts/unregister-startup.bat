@echo off
setlocal
echo =======================================================
echo  Unregistering WhatsAuto from Windows Startup
echo =======================================================

set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT_PATH1=%STARTUP_FOLDER%\WhatsAuto.lnk"
set "SHORTCUT_PATH2=%STARTUP_FOLDER%\WhatsAuto-Background.vbs"

if exist "%SHORTCUT_PATH1%" del /f /q "%SHORTCUT_PATH1%"
if exist "%SHORTCUT_PATH2%" del /f /q "%SHORTCUT_PATH2%"

echo [SUCCESS] WhatsAuto removed from Windows Startup folder.
echo.
pause
