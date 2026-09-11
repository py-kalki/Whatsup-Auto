@echo off
setlocal
cd /d "%~dp0\.."

set "TARGET_EXE=%CD%\dist\win-unpacked\WhatsAuto.exe"
set "DESKTOP_DIR=%USERPROFILE%\Desktop"
set "SHORTCUT_PATH=%DESKTOP_DIR%\WhatsAuto Suite.lnk"
set "ICON_PATH=%CD%\public\logo-whatsup.png"

echo =======================================================
echo  Creating Desktop Shortcut for WhatsAuto
echo =======================================================

if not exist "%TARGET_EXE%" (
    echo [ERROR] %TARGET_EXE% not found.
    pause
    exit /b 1
)

powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%SHORTCUT_PATH%'); $s.TargetPath = '%TARGET_EXE%'; $s.WorkingDirectory = '%CD%\dist\win-unpacked'; $s.Description = 'WhatsApp Automation Suite Desktop Tray'; $s.Save()"

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] Shortcut created on Desktop: "%SHORTCUT_PATH%"
    echo You can now double-click it from your Desktop anytime!
) else (
    echo [ERROR] Failed to create shortcut.
)

echo.
pause
