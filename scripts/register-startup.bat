@echo off
setlocal
cd /d "%~dp0\.."

set "TARGET_EXE=%CD%\dist\win-unpacked\WhatsAuto.exe"
set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "SHORTCUT_PATH=%STARTUP_FOLDER%\WhatsAuto.lnk"

echo =======================================================
echo  Registering WhatsAuto for Windows Startup (Auto-Boot)
echo =======================================================

if not exist "%TARGET_EXE%" (
    echo [ERROR] %TARGET_EXE% not found.
    pause
    exit /b 1
)

echo Registering auto-start shortcut in: %STARTUP_FOLDER%

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%TARGET_EXE%'; $s.Arguments = '--hidden'; $s.WorkingDirectory = '%CD%\dist\win-unpacked'; $s.Description = 'WhatsAuto Background Automation'; $s.Save()"

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] WhatsAuto is now registered to start automatically on laptop boot!
    echo It will run silently in the background tray whenever you power on your laptop.
) else (
    echo.
    echo [ERROR] Failed to register startup shortcut.
)

echo.
pause
