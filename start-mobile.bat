@echo off
title EduStruc Launcher
echo ========================================
echo   Starting EduStruc Backend and Mobile App
echo ========================================
echo.
echo 1. Starting Backend API on port 4000...
start "EduStruc Backend" cmd /k "cd /d ""%~dp0backend"" && npm start"

echo 2. Starting Expo Dev Server on port 8081...
start "EduStruc Expo App" cmd /k "cd /d ""%~dp0app"" && npx expo start -c"

echo.
echo Both services are starting in separate windows.
echo Once the QR code appears in the Expo window, scan it with your phone!
timeout /t 5 >nul
