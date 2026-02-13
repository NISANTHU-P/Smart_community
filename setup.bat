@echo off
echo ========================================
echo Smart Community Management System
echo Automated Setup Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/4] Installing Backend Dependencies...
cd backend
if not exist node_modules (
    echo Installing packages...
    call npm install
    if errorlevel 1 (
        echo ERROR: Backend installation failed!
        pause
        exit /b 1
    )
    echo Backend dependencies installed successfully!
) else (
    echo Backend dependencies already installed.
)
echo.

echo [3/4] Installing Frontend Dependencies...
cd ..\frontend
if not exist node_modules (
    echo Installing packages...
    call npm install
    if errorlevel 1 (
        echo ERROR: Frontend installation failed!
        pause
        exit /b 1
    )
    echo Frontend dependencies installed successfully!
) else (
    echo Frontend dependencies already installed.
)
echo.

echo [4/4] Setup Complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Make sure MongoDB is running
echo    Windows: net start MongoDB
echo.
echo 2. Open TWO terminal windows:
echo.
echo    Terminal 1 - Backend:
echo    cd backend
echo    npm run seed    (first time only)
echo    npm start
echo.
echo    Terminal 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open browser: http://localhost:3000
echo.
echo 4. Login with:
echo    Email: admin@example.com
echo    Password: password123
echo.
echo ========================================
echo.
pause
