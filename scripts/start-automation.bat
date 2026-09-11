@echo off
title WhatsApp Automation Suite (Port 3000)
cd /d "%~dp0\.."
echo =======================================================
echo  Starting Custom WhatsApp Automation Suite
echo  Dashboard: http://localhost:3000
echo =======================================================
node server.js
pause
