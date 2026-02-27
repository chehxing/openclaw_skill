@echo off
chcp 65001 >nul
echo ========================================
echo      🏀 投篮游戏启动器 🏀
echo ========================================
echo.
echo 正在启动游戏服务器...

REM 获取当前脚本所在目录
set GAME_DIR=%~dp0
cd /d "%GAME_DIR%"

REM 检查Python是否可用
python --version >nul 2>&1
if errorlevel 1 (
    python3 --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ 错误：未找到Python
        echo 请安装Python后再运行此游戏
        echo 可以从 https://www.python.org/downloads/ 下载
        pause
        exit /b 1
    )
    set PYTHON_CMD=python3
) else (
    set PYTHON_CMD=python
)

REM 检查端口是否被占用
set PORT=8080
netstat -an | findstr ":%PORT%" | findstr "LISTENING" >nul
if not errorlevel 1 (
    echo ⚠️  端口 %PORT% 已被占用，尝试使用其他端口...
    set PORT=8081
    netstat -an | findstr ":%PORT%" | findstr "LISTENING" >nul
    if not errorlevel 1 (
        set PORT=8082
    )
)

echo ✅ 使用端口: %PORT%
echo ✅ 游戏目录: %GAME_DIR%
echo.
echo ========================================
echo 游戏将在浏览器中自动打开...
echo 如果浏览器没有自动打开，请手动访问：
echo 👉 http://localhost:%PORT%/basketball_game.html
echo ========================================
echo.
echo 按 Ctrl+C 停止游戏服务器
echo.

REM 在Windows上自动打开浏览器
timeout /t 2 /nobreak >nul
start "" "http://localhost:%PORT%/basketball_game.html"

REM 启动HTTP服务器
%PYTHON_CMD% -m http.server %PORT%

echo.
echo ========================================
echo 游戏服务器已停止
echo ========================================
pause