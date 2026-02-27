// 投篮游戏 - Basketball Game
// 使用左右箭头键移动，鼠标点击投篮

class BasketballGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;

        // 游戏状态
        this.state = {
            mode: 'playing', // playing, paused, gameover
            score: 0,
            attempts: 0,
            accuracy: 0,
            player: {
                x: this.width / 2,
                y: this.height - 100,
                width: 40,
                height: 60,
                speed: 5,
                color: '#FF6B6B'
            },
            basketball: {
                x: 0,
                y: 0,
                radius: 15,
                color: '#FFA500',
                velocityX: 0,
                velocityY: 0,
                gravity: 0.3,
                isThrown: false,
                power: 8 // 投篮力度
            },
            hoop: {
                x: this.width / 2,
                y: 250, // 降低篮筐高度，使其更容易被篮球碰到
                width: 80,
                height: 10,
                rimWidth: 5,
                backboardWidth: 10,
                backboardHeight: 60,
                color: '#FFD700'
            },
            keys: {
                left: false,
                right: false
            },
            // 鼠标蓄力相关
            mouse: {
                isPressed: false,
                pressStartTime: 0,
                pressDuration: 0,
                maxPower: 15, // 最大蓄力力度
                minPower: 5,  // 最小蓄力力度
                power: 8,     // 当前蓄力力度
                targetX: 0,
                targetY: 0
            },
            lastTime: 0,
            gameTime: 0
        };

        // 绑定事件
        this.bindEvents();

        // 初始化
        this.init();
    }

    init() {
        // 重置篮球位置到球员手中
        this.resetBasketball();

        // 开始游戏循环
        this.lastTime = performance.now();
        this.gameLoop();
    }

    bindEvents() {
        // 键盘事件
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.state.keys.left = true;
            if (e.key === 'ArrowRight') this.state.keys.right = true;
            if (e.key === 'f' || e.key === 'F') this.toggleFullscreen();
            if (e.key === 'Escape') this.exitFullscreen();
        });

        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowLeft') this.state.keys.left = false;
            if (e.key === 'ArrowRight') this.state.keys.right = false;
        });

        // 鼠标事件 - 蓄力投篮
        this.canvas.addEventListener('mousedown', (e) => {
            if (this.state.mode === 'playing' && !this.state.basketball.isThrown) {
                this.startCharging(e);
            }
        });

        this.canvas.addEventListener('mouseup', (e) => {
            if (this.state.mode === 'playing' && !this.state.basketball.isThrown && this.state.mouse.isPressed) {
                this.shootBasketball(e);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.state.mode === 'playing' && !this.state.basketball.isThrown && this.state.mouse.isPressed) {
                this.updateTarget(e);
            }
        });

        // 防止鼠标移出canvas时丢失mouseup事件
        window.addEventListener('mouseup', (e) => {
            if (this.state.mode === 'playing' && !this.state.basketball.isThrown && this.state.mouse.isPressed) {
                this.shootBasketball(e);
            }
        });

        // 全屏事件
        document.addEventListener('fullscreenchange', () => {
            this.handleFullscreenChange();
        });

        // 窗口大小变化
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    resetBasketball() {
        this.state.basketball.x = this.state.player.x;
        this.state.basketball.y = this.state.player.y - 20;
        this.state.basketball.velocityX = 0;
        this.state.basketball.velocityY = 0;
        this.state.basketball.isThrown = false;

        // 重置蓄力状态
        this.state.mouse.isPressed = false;
        this.state.mouse.pressStartTime = 0;
        this.state.mouse.pressDuration = 0;
        this.state.mouse.power = 8;
    }

    startCharging(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.state.mouse.isPressed = true;
        this.state.mouse.pressStartTime = Date.now();
        this.state.mouse.pressDuration = 0;
        this.state.mouse.targetX = mouseX;
        this.state.mouse.targetY = mouseY;
    }

    updateTarget(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.state.mouse.targetX = mouseX;
        this.state.mouse.targetY = mouseY;
    }

    shootBasketball(e) {
        if (!this.state.mouse.isPressed) return;

        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 计算蓄力时间
        this.state.mouse.pressDuration = Date.now() - this.state.mouse.pressStartTime;

        // 计算蓄力力度（蓄力时间越长，力度越大，但有上限）
        const chargeTime = Math.min(this.state.mouse.pressDuration, 2000); // 最大蓄力2秒
        const chargeRatio = chargeTime / 2000; // 0到1的比例
        this.state.mouse.power = this.state.mouse.minPower +
            (this.state.mouse.maxPower - this.state.mouse.minPower) * chargeRatio;

        // 计算投篮方向（使用鼠标当前位置或最后记录的目标位置）
        const targetX = this.state.mouse.targetX || mouseX;
        const targetY = this.state.mouse.targetY || mouseY;
        const dx = targetX - this.state.basketball.x;
        const dy = targetY - this.state.basketball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 标准化方向向量
        const dirX = dx / distance;
        const dirY = dy / distance;

        // 设置篮球速度（使用蓄力力度）
        this.state.basketball.velocityX = dirX * this.state.mouse.power;
        this.state.basketball.velocityY = dirY * this.state.mouse.power;
        this.state.basketball.isThrown = true;

        // 增加尝试次数
        this.state.attempts++;
        this.updateAccuracy();
        this.updateUI();

        // 重置蓄力状态
        this.state.mouse.isPressed = false;
        this.state.mouse.pressStartTime = 0;
        this.state.mouse.pressDuration = 0;
    }

    update(deltaTime) {
        if (this.state.mode !== 'playing') return;

        // 更新游戏时间
        this.state.gameTime += deltaTime;

        // 更新球员位置
        if (this.state.keys.left) {
            this.state.player.x -= this.state.player.speed;
            if (this.state.player.x < this.state.player.width / 2) {
                this.state.player.x = this.state.player.width / 2;
            }
        }
        if (this.state.keys.right) {
            this.state.player.x += this.state.player.speed;
            if (this.state.player.x > this.width - this.state.player.width / 2) {
                this.state.player.x = this.width - this.state.player.width / 2;
            }
        }

        // 更新蓄力状态
        if (this.state.mouse.isPressed && !this.state.basketball.isThrown) {
            this.state.mouse.pressDuration = Date.now() - this.state.mouse.pressStartTime;
            const chargeTime = Math.min(this.state.mouse.pressDuration, 2000);
            const chargeRatio = chargeTime / 2000;
            this.state.mouse.power = this.state.mouse.minPower +
                (this.state.mouse.maxPower - this.state.mouse.minPower) * chargeRatio;
        }

        // 如果篮球在球员手中，跟随球员移动
        if (!this.state.basketball.isThrown) {
            this.state.basketball.x = this.state.player.x;
            this.state.basketball.y = this.state.player.y - 20;
        } else {
            // 更新篮球位置（物理模拟）
            this.state.basketball.x += this.state.basketball.velocityX;
            this.state.basketball.y += this.state.basketball.velocityY;
            this.state.basketball.velocityY += this.state.basketball.gravity;

            // 检查篮球是否出界
            if (this.state.basketball.y > this.height + 50) {
                this.resetBasketball();
            }

            // 检查篮球是否碰到篮筐
            this.checkHoopCollision();
        }
    }

    checkHoopCollision() {
        const ball = this.state.basketball;
        const hoop = this.state.hoop;

        // 检查篮球是否在篮筐范围内
        const inHoopX = ball.x > hoop.x - hoop.width / 2 &&
                       ball.x < hoop.x + hoop.width / 2;
        const inHoopY = ball.y > hoop.y - 5 &&
                       ball.y < hoop.y + 5;

        if (inHoopX && inHoopY && ball.velocityY > 0) {
            // 得分！
            this.state.score += 2; // 每次投篮得2分
            this.updateAccuracy();
            this.updateUI();

            // 重置篮球
            setTimeout(() => {
                this.resetBasketball();
            }, 500);
        }
    }

    updateAccuracy() {
        if (this.state.attempts > 0) {
            this.state.accuracy = Math.round((this.state.score / 2) / this.state.attempts * 100);
        }
    }

    updateUI() {
        document.getElementById('score').textContent = this.state.score;
        document.getElementById('attempts').textContent = this.state.attempts;
        document.getElementById('accuracy').textContent = `${this.state.accuracy}%`;
    }

    draw() {
        const ctx = this.ctx;

        // 清空画布
        ctx.clearRect(0, 0, this.width, this.height);

        // 绘制背景
        this.drawBackground();

        // 绘制篮筐
        this.drawHoop();

        // 绘制球员
        this.drawPlayer();

        // 绘制篮球
        this.drawBasketball();

        // 绘制蓄力指示器
        this.drawPowerIndicator();

        // 绘制分数
        this.drawScore();
    }

    drawBackground() {
        const ctx = this.ctx;

        // 天空渐变
        const skyGradient = ctx.createLinearGradient(0, 0, 0, this.height);
        skyGradient.addColorStop(0, '#87CEEB');
        skyGradient.addColorStop(1, '#98FB98');
        ctx.fillStyle = skyGradient;
        ctx.fillRect(0, 0, this.width, this.height);

        // 云朵
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.drawCloud(100, 80, 40);
        this.drawCloud(300, 120, 50);
        this.drawCloud(600, 90, 45);
        this.drawCloud(700, 150, 35);
    }

    drawCloud(x, y, size) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.arc(x + size * 0.8, y - size * 0.3, size * 0.7, 0, Math.PI * 2);
        ctx.arc(x + size * 1.5, y, size * 0.8, 0, Math.PI * 2);
        ctx.arc(x + size * 1.2, y + size * 0.4, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
    }

    drawHoop() {
        const ctx = this.ctx;
        const hoop = this.state.hoop;

        // 绘制篮板
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(
            hoop.x - hoop.backboardWidth / 2,
            hoop.y - hoop.backboardHeight / 2,
            hoop.backboardWidth,
            hoop.backboardHeight
        );

        // 绘制篮筐支架
        ctx.fillStyle = '#A0522D';
        ctx.fillRect(hoop.x - 2, hoop.y - hoop.backboardHeight / 2, 4, 30);

        // 绘制篮筐
        ctx.fillStyle = hoop.color;
        ctx.fillRect(
            hoop.x - hoop.width / 2,
            hoop.y - hoop.rimWidth / 2,
            hoop.width,
            hoop.rimWidth
        );

        // 篮筐内网效果
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const x = hoop.x - hoop.width / 2 + (hoop.width / 4) * i;
            ctx.moveTo(x, hoop.y);
            ctx.lineTo(hoop.x, hoop.y + 20);
        }
        ctx.stroke();
    }

    drawPlayer() {
        const ctx = this.ctx;
        const player = this.state.player;

        // 绘制球员身体
        ctx.fillStyle = player.color;
        ctx.fillRect(
            player.x - player.width / 2,
            player.y - player.height,
            player.width,
            player.height
        );

        // 绘制球员头部
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(player.x, player.y - player.height - 15, 15, 0, Math.PI * 2);
        ctx.fill();

        // 绘制球员眼睛
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(player.x - 5, player.y - player.height - 17, 3, 0, Math.PI * 2);
        ctx.arc(player.x + 5, player.y - player.height - 17, 3, 0, Math.PI * 2);
        ctx.fill();

        // 绘制球员嘴巴
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y - player.height - 12, 5, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // 绘制球员手臂（如果拿着篮球）
        if (!this.state.basketball.isThrown) {
            ctx.strokeStyle = player.color;
            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(player.x - player.width / 2, player.y - player.height / 2);
            ctx.lineTo(player.x - 30, player.y - 40);
            ctx.stroke();
        }
    }

    drawBasketball() {
        const ctx = this.ctx;
        const ball = this.state.basketball;

        // 绘制篮球
        ctx.fillStyle = ball.color;
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        // 绘制篮球纹理
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y - ball.radius);
        ctx.lineTo(ball.x, ball.y + ball.radius);
        ctx.moveTo(ball.x - ball.radius, ball.y);
        ctx.lineTo(ball.x + ball.radius, ball.y);
        ctx.stroke();

        // 绘制篮球轨迹（如果正在飞行）
        if (ball.isThrown) {
            ctx.strokeStyle = 'rgba(255, 165, 0, 0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.state.player.x, this.state.player.y - 20);
            ctx.lineTo(ball.x, ball.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }

    drawPowerIndicator() {
        const ctx = this.ctx;
        const mouse = this.state.mouse;

        // 只在蓄力时显示力度指示器
        if (mouse.isPressed && !this.state.basketball.isThrown) {
            const player = this.state.player;
            const ball = this.state.basketball;

            // 计算蓄力比例
            const chargeRatio = Math.min(mouse.pressDuration, 2000) / 2000;
            const powerRatio = (mouse.power - mouse.minPower) / (mouse.maxPower - mouse.minPower);

            // 绘制蓄力条背景
            const barWidth = 200;
            const barHeight = 20;
            const barX = this.width / 2 - barWidth / 2;
            const barY = this.height - 50;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(barX, barY, barWidth, barHeight);

            // 绘制蓄力条填充（根据力度变化颜色）
            const fillWidth = barWidth * powerRatio;
            const hue = 120 - powerRatio * 120; // 绿色到红色
            ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
            ctx.fillRect(barX, barY, fillWidth, barHeight);

            // 绘制蓄力条边框
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.strokeRect(barX, barY, barWidth, barHeight);

            // 绘制蓄力文字
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`蓄力: ${Math.round(powerRatio * 100)}%`, this.width / 2, barY - 10);
            ctx.fillText(`力度: ${mouse.power.toFixed(1)}`, this.width / 2, barY + barHeight + 25);

            // 绘制瞄准线
            if (mouse.targetX && mouse.targetY) {
                ctx.strokeStyle = 'rgba(255, 255, 0, 0.6)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.moveTo(ball.x, ball.y);
                ctx.lineTo(mouse.targetX, mouse.targetY);
                ctx.stroke();
                ctx.setLineDash([]);

                // 绘制瞄准点
                ctx.fillStyle = 'rgba(255, 255, 0, 0.8)';
                ctx.beginPath();
                ctx.arc(mouse.targetX, mouse.targetY, 5, 0, Math.PI * 2);
                ctx.fill();
            }

            // 绘制蓄力提示
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('长按鼠标蓄力，释放投篮', this.width / 2, barY - 30);
        }
    }

    drawScore() {
        const ctx = this.ctx;

        // 绘制当前分数
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(`得分: ${this.state.score}`, 20, 40);
        ctx.fillText(`尝试: ${this.state.attempts}`, 20, 70);
        ctx.fillText(`命中率: ${this.state.accuracy}%`, 20, 100);
    }

    gameLoop(currentTime = 0) {
        // 计算时间增量
        const deltaTime = Math.min((currentTime - this.lastTime) / 1000, 0.1);
        this.lastTime = currentTime;

        // 更新游戏状态
        this.update(deltaTime);

        // 绘制游戏
        this.draw();

        // 继续游戏循环
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().catch(err => {
                console.error(`全屏请求失败: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }

    exitFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }

    handleFullscreenChange() {
        if (document.fullscreenElement) {
            // 全屏时调整canvas大小
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;

            // 调整篮筐位置
            this.state.hoop.x = this.width / 2;
        } else {
            // 退出全屏时恢复原始大小
            this.canvas.width = 800;
            this.canvas.height = 500;
            this.width = this.canvas.width;
            this.height = this.canvas.height;

            // 调整篮筐位置
            this.state.hoop.x = this.width / 2;
            this.state.player.x = this.width / 2;
            this.resetBasketball();
        }
    }

    handleResize() {
        if (!document.fullscreenElement) {
            // 只在非全屏时处理resize
            const container = this.canvas.parentElement;
            const containerWidth = container.clientWidth;

            // 保持canvas比例
            if (containerWidth < 800) {
                this.canvas.style.width = `${containerWidth}px`;
                this.canvas.style.height = `${containerWidth * 0.625}px`;
            } else {
                this.canvas.style.width = '800px';
                this.canvas.style.height = '500px';
            }
        }
    }

    // 提供给Playwright测试的接口
    advanceTime(ms) {
        const steps = Math.max(1, Math.round(ms / (1000 / 60)));
        for (let i = 0; i < steps; i++) {
            this.update(1 / 60);
        }
        this.draw();
    }

    renderGameToText() {
        const payload = {
            mode: this.state.mode,
            score: this.state.score,
            attempts: this.state.attempts,
            accuracy: this.state.accuracy,
            player: {
                x: Math.round(this.state.player.x),
                y: Math.round(this.state.player.y),
                width: this.state.player.width,
                height: this.state.player.height
            },
            basketball: {
                x: Math.round(this.state.basketball.x),
                y: Math.round(this.state.basketball.y),
                radius: this.state.basketball.radius,
                isThrown: this.state.basketball.isThrown,
                velocityX: Math.round(this.state.basketball.velocityX * 100) / 100,
                velocityY: Math.round(this.state.basketball.velocityY * 100) / 100
            },
            hoop: {
                x: Math.round(this.state.hoop.x),
                y: Math.round(this.state.hoop.y),
                width: this.state.hoop.width,
                height: this.state.hoop.height
            },
            keys: this.state.keys,
            gameTime: Math.round(this.state.gameTime * 100) / 100
        };
        return JSON.stringify(payload, null, 2);
    }
}

// 初始化游戏
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    window.game = new BasketballGame(canvas);

    // 暴露测试接口
    window.advanceTime = (ms) => window.game.advanceTime(ms);
    window.render_game_to_text = () => window.game.renderGameToText();

    // 初始UI更新
    window.game.updateUI();
});

// 全屏切换按钮函数
window.toggleFullscreen = function() {
    if (window.game) {
        window.game.toggleFullscreen();
    }
};