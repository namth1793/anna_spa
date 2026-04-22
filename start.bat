@echo off
echo ============================================
echo    ANNA SPA DA NANG
echo ============================================
echo    Backend  : http://localhost:5013
echo    Frontend : http://localhost:5173
echo ============================================
echo.

start "Anna Spa - Backend" cmd /k "cd /d "%~dp0backend" && node server.js"
timeout /t 2 /nobreak >nul
start "Anna Spa - Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"

echo    Both servers started! Browser opening...
echo    Press any key to close this window.
pause >nul
