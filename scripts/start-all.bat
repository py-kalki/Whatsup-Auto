@echo off
title WhatsApp Automation Suite Launcher
echo =======================================================
echo  Launching OpenWA Gateway and WhatsApp Automation Suite
echo =======================================================

start "OpenWA Gateway" cmd /c "%~dp0start-openwa.bat"
timeout /t 3 /nobreak >nul
start "WhatsApp Automation Hub" cmd /c "%~dp0start-automation.bat"

echo.
echo Both servers have been launched!
echo Open your browser at: http://localhost:3000
echo.
timeout /t 5
