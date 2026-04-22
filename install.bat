@echo off
echo ============================================
echo    ANNA SPA DA NANG - Installing...
echo ============================================

echo.
echo [1/3] Installing backend dependencies...
cd /d "%~dp0backend"
call npm install
if errorlevel 1 (
    echo ERROR: Backend install failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Installing frontend dependencies...
cd /d "%~dp0frontend"
call npm install
if errorlevel 1 (
    echo ERROR: Frontend install failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Seeding database...
cd /d "%~dp0backend"
call node db/seed.js

echo.
echo ============================================
echo    Installation complete!
echo    Run start.bat to launch the website.
echo ============================================
pause
