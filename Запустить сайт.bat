@echo off
chcp 65001 >nul
setlocal
cd /d "%~dp0"
title Мир профессий

rem --- Node.js: сначала портативный из папки проекта, иначе системный ---
set "NODE_DIR=%~dp0.tools\node"
if exist "%NODE_DIR%\node.exe" (
  set "PATH=%NODE_DIR%;%PATH%"
) else (
  where node >nul 2>nul
  if errorlevel 1 (
    echo [Ошибка] Не найден Node.js: нет папки .tools\node, и Node.js не установлен в системе.
    pause
    exit /b 1
  )
)

rem --- Зависимости: ставятся в node_modules этой папки, только если их нет ---
if not exist "node_modules\vite\bin\vite.js" goto install
if not exist "node_modules\@rolldown\binding-win32-x64-msvc" goto install
goto run

:install
echo Устанавливаю зависимости в папку проекта. Нужен интернет, это делается один раз...
call npm ci --no-audit --no-fund
if errorlevel 1 (
  echo [Ошибка] Не удалось установить зависимости. Проверьте интернет и запустите файл ещё раз.
  pause
  exit /b 1
)

:run
echo.
echo Сайт запускается, браузер откроется сам: http://localhost:3000/
echo Чтобы остановить сайт, закройте это окно.
echo.
node node_modules\vite\bin\vite.js --port 3000 --open
echo.
echo Сайт остановлен.
pause
