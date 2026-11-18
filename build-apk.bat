@echo off
title Build Android Test APK (No Play Store)
echo ======================================================
echo   Building Standalone Android APK with EAS for Testing
echo ======================================================
echo.
cd /d "%~dp0app"
npx eas build -p android --profile preview
pause
