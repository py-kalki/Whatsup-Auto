@echo off
setlocal
cd /d "%~dp0\.."

echo =======================================================
echo  Building & Packaging WhatsAuto for Distribution
echo =======================================================

echo 1. Building application bundle...
call npm run dist
if %errorlevel% neq 0 (
    echo [ERROR] Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo 2. Compressing to standalone ZIP archive...
if exist "dist\WhatsAuto-v1.0.0-win64.zip" del /f /q "dist\WhatsAuto-v1.0.0-win64.zip"

if exist "node_modules\7zip-bin\win\x64\7za.exe" (
    "node_modules\7zip-bin\win\x64\7za.exe" a -tzip "dist\WhatsAuto-v1.0.0-win64.zip" ".\dist\win-unpacked\*" -mx=5
) else (
    powershell -Command "Compress-Archive -Path 'dist\win-unpacked\*' -DestinationPath 'dist\WhatsAuto-v1.0.0-win64.zip' -Force"
)

echo.
echo =======================================================
echo [SUCCESS] Distribution Package Ready!
echo File: dist\WhatsAuto-v1.0.0-win64.zip
echo =======================================================
echo You can now send 'WhatsAuto-v1.0.0-win64.zip' to anyone!
echo.
pause
