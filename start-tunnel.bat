@echo off
title EduStruc Launcher (Tunnel Mode)
echo ========================================
echo   Starting EduStruc with Expo Tunnel
echo ========================================
echo.
echo 1. Starting Backend API on port 4000...
start "EduStruc Backend" cmd /k "cd /d ""%~dp0backend"" && npm start"

echo 2. Starting Expo Dev Server in Tunnel mode...
start "EduStruc Expo App (Tunnel)" cmd /k "cd /d ""%~dp0app"" && npx expo start --tunnel"

echo.
echo Both services are starting in separate windows.
echo Once the QR code appears in the Expo window, scan it with your phone!
timeout /t 5 >nul
