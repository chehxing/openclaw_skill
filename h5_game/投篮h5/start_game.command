#!/bin/bash

# 投篮游戏启动脚本
# 双击此文件即可启动游戏

echo "========================================"
echo "      🏀 投篮游戏启动器 🏀"
echo "========================================"
echo ""
echo "正在启动游戏服务器..."

# 获取当前脚本所在目录
GAME_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$GAME_DIR"

# 检查Python3是否可用
if ! command -v python3 &> /dev/null; then
    echo "❌ 错误：未找到Python3"
    echo "请安装Python3后再运行此游戏"
    echo "可以从 https://www.python.org/downloads/ 下载"
    exit 1
fi

# 检查端口是否被占用
PORT=8080
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  端口 $PORT 已被占用，尝试使用其他端口..."
    PORT=8081
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
        PORT=8082
    fi
fi

echo "✅ 使用端口: $PORT"
echo "✅ 游戏目录: $GAME_DIR"
echo ""
echo "========================================"
echo "游戏将在浏览器中自动打开..."
echo "如果浏览器没有自动打开，请手动访问："
echo "👉 http://localhost:$PORT/basketball_game.html"
echo "========================================"
echo ""
echo "按 Ctrl+C 停止游戏服务器"
echo ""

# 在Mac上自动打开浏览器
if [[ "$OSTYPE" == "darwin"* ]]; then
    sleep 2
    open "http://localhost:$PORT/basketball_game.html"
fi

# 启动HTTP服务器
python3 -m http.server $PORT

echo ""
echo "========================================"
echo "游戏服务器已停止"
echo "========================================"