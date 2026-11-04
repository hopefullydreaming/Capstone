@echo off

echo [1/2] Cleaning up lingering fullstack processes...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :4200 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1

echo [2/2] Launching Backend and Frontend together into VS Output Window...
echo -------------------------------------------------------------

:: This runs both apps inside the unified pipeline monitored natively by VS.
npx concurrently --kill-others --prefix "[{name}]" --prefix-colors "yellow,cyan" --names "Backend,Frontend" "cd /d \"%~dp0backend\" && node --watch server.js" "cd /d \"%~dp0frontend\" && ng serve"












