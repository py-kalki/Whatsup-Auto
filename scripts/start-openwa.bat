@echo off
title OpenWA Gateway (Docker Compose)
cd /d "C:\Users\pykal\OpenWA"
echo =======================================================
echo  Starting OpenWA Gateway on Port 2785 via Docker
echo =======================================================
if not exist ".env" (
    echo Creating .env from .env.minimal...
    copy .env.minimal .env
)
docker compose up -d
echo.
echo OpenWA Gateway is running in Docker on port 2785!
echo Dashboard / Swagger: http://localhost:2785
echo.
pause
