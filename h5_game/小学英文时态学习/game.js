// 游戏数据 - 四大时态的学习内容
const gameData = {
    present: {
        title: "现在岛 - 一般现在时",
        lesson: `
            <h4>一般现在时表示：</h4>
            <div class="real-life-examples">
                <div class="example-item">
                    <h5><i class="fas fa-calendar-day"></i> 经常发生的动作或习惯：</h5>
                    <ul>
                        <li><span class="highlight">我每天7点半上学。</span> I go to school at 7:30 every day.</li>
                        <li><span class="highlight">妈妈每天12点做饭。</span> My mother cooks at 12 o'clock every day.</li>
                        <li><span class="highlight">我们每周六去公园玩。</span> We go to the park every Saturday.</li>
                    </ul>
                </div>
                <div class="example-item">
                    <h5><i class="fas fa-globe"></i> 客观事实或真理：</h5>
                    <ul>
                        <li><span class="highlight">太阳从东边升起。</span> The sun rises in the east.</li>
                        <li><span class="highlight">水在100度沸腾。</span> Water boils at 100 degrees.</li>
                        <li><span class="highlight">猫喜欢吃鱼。</span> Cats like fish.</li>
                    </ul>
                </div>
                <div class="example-item">
                    <h5><i class="fas fa-user"></i> 现在的状态：</h5>
                    <ul>
                        <li><span class="highlight">我是一名小学生。</span> I am a primary school student.</li>
                        <li><span class="highlight">他喜欢蓝色。</span> He likes blue.</li>
                        <li><span class="highlight">我家在北京。</span> My family lives in Beijing.</li>
                    </ul>
                </div>
            </div>
            <h4>结构：</h4>
            <ul>
                <li>主语 + 动词原形（I, you, we, they）</li>
                <li>主语 + 动词+s（he, she, it）</li>
            </ul>
            <h4>时间状语：</h4>
            <p>always, usually, often, sometimes, every day, every week</p>
            <h4>生活例句：</h4>
            <ul>
                <li>I do my homework after school. （我放学后做作业）</li>
                <li>She brushes her teeth every morning. （她每天早上刷牙）</li>
                <li>My father reads newspapers every evening. （我爸爸每天晚上看报纸）</li>
            </ul>
        `,
        challenges: [
            {
                type: "multiple-choice",
                question: "小明每天7点起床，应该怎么说？",
                options: [
                    "Xiaoming gets up at 7 o'clock every day.",
                    "Xiaoming get up at 7 o'clock every day.",
                    "Xiaoming getting up at 7 o'clock every day.",
                    "Xiaoming got up at 7 o'clock every day."
                ],
                correctAnswer: 0,
                explanation: "正确！第三人称单数要加s：gets up。每天7点起床是经常发生的动作，用一般现在时。"
            },
            {
                type: "fill-blank",
                sentence: "我妈妈每天___ (cook) 晚饭给我们吃。",
                correctAnswer: "cooks",
                explanation: "正确！第三人称单数要加s：cooks。妈妈每天做饭是经常发生的动作。"
            },
            {
                type: "multiple-choice",
                question: "哪个句子描述的是经常发生的动作？",
                options: [
                    "我昨天去了公园。",
                    "我现在正在做作业。",
                    "我每天喝牛奶。",
                    "我明天要去游泳。"
                ],
                correctAnswer: 2,
                explanation: "正确！'每天喝牛奶'是经常发生的动作，用一般现在时。"
            }
        ]
    },
    past: {
        title: "过去岛 - 一般过去时",
        lesson: `
            <h4>一般过去时表示：</h4>
            <div class="real-life-examples">
                <div class="example-item">
                    <h5><i class="fas fa-history"></i> 过去发生的动作或状态：</h5>
                    <ul>
                        <li><span class="highlight">我昨天去了动物园。</span> I went to the zoo yesterday.</li>
                        <li><span class="highlight">上周我感冒了。</span> I had a cold last week.</li>
                        <li><span class="highlight">昨天妈妈给我买了新书包。</span> My mother bought me a new schoolbag yesterday.</li>
                    </ul>
                </div>
                <div class="example-item">
                    <h5><i class="fas fa-redo"></i> 过去经常发生的动作：</h5>
                    <ul>
                        <li><span class="highlight">我小时候经常去奶奶家玩。</span> I often visited my grandma's house when I was little.</li>
                        <li><span class="highlight">去年我每天都练习钢琴。</span> I practiced piano every day last year.</li>
                        <li><span class="highlight">上学期我们每周都有体育课。</span> We had PE class every week last semester.</li>
                    </ul>
                </div>
            </div>
            <h4>结构：</h4>
            <ul>
                <li>主语 + 动词过去式</li>
            </ul>
            <h4>时间状语：</h4>
            <p>yesterday, last week, two days ago, last month, in 2020</p>
            <h4>动词变化规则：</h4>
            <ul>
                <li>规则动词：加-ed（play → played, watch → watched）</li>
                <li>不规则动词：特殊变化（go → went, eat → ate, see → saw）</li>
            </ul>
            <h4>生活例句：</h4>
            <ul>
                <li>I finished my homework at 8 pm yesterday. （我昨晚8点完成了作业）</li>
                <li>She helped her mother with housework last weekend. （她上周末帮妈妈做家务）</li>
                <li>We watched a movie together last Friday. （我们上周五一起看了电影）</li>
            </ul>
        `,
        challenges: [
            {
                type: "multiple-choice",
                question: "小红昨天帮妈妈做家务，应该怎么说？",
                options: [
                    "Xiaohong helps her mother with housework yesterday.",
                    "Xiaohong help her mother with housework yesterday.",
                    "Xiaohong helped her mother with housework yesterday.",
                    "Xiaohong helping her mother with housework yesterday."
                ],
                correctAnswer: 2,
                explanation: "正确！'help' 的过去式是 'helped'。昨天发生的事情用一般过去时。"
            },
            {
                type: "fill-blank",
                sentence: "我上周末___ (visit) 了我的爷爷奶奶。",
                correctAnswer: "visited",
                explanation: "正确！'visit' 的过去式是 'visited'。上周末是过去的时间。"
            },
            {
                type: "multiple-choice",
                question: "哪个句子描述的是过去发生的事情？",
                options: [
                    "我每天练习钢琴。",
                    "我上周去了动物园。",
                    "我现在正在看书。",
                    "我明天要去公园。"
                ],
                correctAnswer: 1,
                explanation: "正确！'上周去了动物园'是过去发生的事情，用一般过去时。"
            }
        ]
    },
    future: {
        title: "将来岛 - 一般将来时",
        lesson: `
            <h4>一般将来时表示：</h4>
            <div class="real-life-examples">
                <div class="example-item">
                    <h5><i class="fas fa-calendar-check"></i> 将要发生的动作或状态：</h5>
                    <ul>
                        <li><span class="highlight">明天我要去图书馆。</span> I will go to the library tomorrow.</li>
                        <li><span class="highlight">下个月我就10岁了。</span> I will be 10 years old next month.</li>
                        <li><span class="highlight">下周我们要考试。</span> We will have an exam next week.</li>
                    </ul>
                </div>
                <div class="example-item">
                    <h5><i class="fas fa-clipboard-list"></i> 未来的计划或打算：</h5>
                    <ul>
                        <li><span class="highlight">我打算暑假去海边玩。</span> I am going to go to the beach this summer vacation.</li>
                        <li><span class="highlight">妈妈计划周末做蛋糕。</span> My mother is going to make a cake this weekend.</li>
                        <li><span class="highlight">我们准备明天打扫房间。</span> We are going to clean the room tomorrow.</li>
                    </ul>
                </div>
            </div>
            <h4>结构：</h4>
            <ul>
                <li>主语 + will + 动词原形</li>
                <li>主语 + be going to + 动词原形</li>
            </ul>
            <h4>时间状语：</h4>
            <p>tomorrow, next week, soon, next month, this weekend</p>
            <h4>用法区别：</h4>
            <ul>
                <li>will：临时决定，预测（例：天要下雨了，我帮你拿伞）</li>
                <li>be going to：计划，打算（例：我计划明天去游泳）</li>
            </ul>
            <h4>生活例句：</h4>
            <ul>
                <li>I will call you after school. （我放学后会给你打电话）</li>
                <li>She is going to learn swimming this summer. （她打算这个夏天学游泳）</li>
                <li>We will visit the science museum next Saturday. （我们下周六要去参观科技馆）</li>
            </ul>
        `,
        challenges: [
            {
                type: "multiple-choice",
                question: "小明打算明天去图书馆借书，应该怎么说？",
                options: [
                    "Xiaoming goes to the library to borrow books tomorrow.",
                    "Xiaoming is going to go to the library to borrow books tomorrow.",
                    "Xiaoming went to the library to borrow books tomorrow.",
                    "Xiaoming going to the library to borrow books tomorrow."
                ],
                correctAnswer: 1,
                explanation: "正确！'be going to' 表示计划好的将来动作。明天去图书馆是未来的计划。"
            },
            {
                type: "fill-blank",
                sentence: "下个月我___ (be) 10岁了。",
                correctAnswer: "will be",
                explanation: "正确！'will be' 表示将来会发生的状态。下个月是未来的时间。"
            },
            {
                type: "multiple-choice",
                question: "哪个句子描述的是将来的计划？",
                options: [
                    "我昨天完成了作业。",
                    "我现在正在吃早饭。",
                    "我暑假要去海边玩。",
                    "我每天练习写字。"
                ],
                correctAnswer: 2,
                explanation: "正确！'暑假要去海边玩'是将来的计划，用一般将来时。"
            }
        ]
    },
    progressive: {
        title: "进行岛 - 现在进行时",
        lesson: `
            <h4>现在进行时表示：</h4>
            <div class="real-life-examples">
                <div class="example-item">
                    <h5><i class="fas fa-clock"></i> 现在正在进行的动作：</h5>
                    <ul>
                        <li><span class="highlight">我现在正在做作业。</span> I am doing my homework now.</li>
                        <li><span class="highlight">妈妈正在厨房做饭。</span> My mother is cooking in the kitchen.</li>
                        <li><span class="highlight">弟弟正在看电视。</span> My brother is watching TV.</li>
                    </ul>
                </div>
                <div class="example-item">
                    <h5><i class="fas fa-calendar-week"></i> 当前一段时间内在进行的动作：</h5>
                    <ul>
                        <li><span class="highlight">我这个月正在学习游泳。</span> I am learning swimming this month.</li>
                        <li><span class="highlight">爸爸这周正在出差。</span> My father is on a business trip this week.</li>
                        <li><span class="highlight">我们学校正在举办运动会。</span> Our school is holding a sports meeting.</li>
                    </ul>
                </div>
            </div>
            <h4>结构：</h4>
            <ul>
                <li>主语 + am/is/are + 动词-ing</li>
                <li>I am, You/We/They are, He/She/It is</li>
            </ul>
            <h4>时间状语：</h4>
            <p>now, at the moment, right now, currently, these days</p>
            <h4>动词-ing变化规则：</h4>
            <ul>
                <li>一般动词：直接加-ing（play → playing, read → reading）</li>
                <li>以e结尾：去e加-ing（write → writing, dance → dancing）</li>
                <li>重读闭音节：双写加-ing（run → running, swim → swimming）</li>
            </ul>
            <h4>生活例句：</h4>
            <ul>
                <li>I am eating breakfast now. （我现在正在吃早餐）</li>
                <li>She is talking to her friend on the phone. （她正在和朋友打电话）</li>
                <li>They are playing football in the playground. （他们正在操场上踢足球）</li>
            </ul>
        `,
        challenges: [
            {
                type: "multiple-choice",
                question: "弟弟正在客厅看电视，应该怎么说？",
                options: [
                    "My brother watches TV in the living room.",
                    "My brother watched TV in the living room.",
                    "My brother is watching TV in the living room.",
                    "My brother will watch TV in the living room."
                ],
                correctAnswer: 2,
                explanation: "正确！'is watching' 是现在进行时，表示正在进行的动作。"
            },
            {
                type: "fill-blank",
                sentence: "听！小鸟在树上___ (sing)。",
                correctAnswer: "is singing",
                explanation: "正确！'is singing' 表示正在进行的动作。'听！'提示正在发生。"
            },
            {
                type: "multiple-choice",
                question: "哪个句子描述的是正在进行的动作？",
                options: [
                    "我每天骑自行车上学。",
                    "我上周学会了游泳。",
                    "妈妈正在厨房做饭。",
                    "我明天要去公园。"
                ],
                correctAnswer: 2,
                explanation: "正确！'正在厨房做饭'是现在正在进行的动作，用现在进行时。"
            }
        ]
    }
};

// 游戏状态
let currentGameState = {
    currentIsland: null,
    currentChallengeIndex: 0,
    score: 0,
    stars: 0,
    completedChallenges: []
};

// DOM元素
const islandCards = document.querySelectorAll('.island-card');
const enterButtons = document.querySelectorAll('.enter-island-btn');
const gameArea = document.getElementById('gameArea');
const islandSelection = document.querySelector('.island-selection');
const backButton = document.querySelector('.back-to-islands-btn');
const islandTitle = document.getElementById('islandTitle');
const lessonContent = document.getElementById('lessonContent');
const challengeContent = document.getElementById('challengeContent');
const feedbackSection = document.getElementById('feedbackSection');
const feedbackMessage = document.getElementById('feedbackMessage');
const nextChallengeBtn = document.getElementById('nextChallengeBtn');
const scoreElement = document.getElementById('score');
const starsElement = document.getElementById('stars');

// 音效
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const clickSound = document.getElementById('clickSound');

// 初始化游戏
function initGame() {
    // 加载保存的游戏状态
    loadGameState();

    // 添加岛屿卡片点击事件
    islandCards.forEach(card => {
        card.addEventListener('click', () => {
            playSound(clickSound);
            const island = card.dataset.island;
            highlightIsland(island);
        });
    });

    // 添加进入岛屿按钮事件
    enterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            playSound(clickSound);
            const island = button.dataset.island;
            enterIsland(island);
        });
    });

    // 返回按钮事件
    backButton.addEventListener('click', () => {
        playSound(clickSound);
        returnToIslandSelection();
    });

    // 下一个挑战按钮事件
    nextChallengeBtn.addEventListener('click', () => {
        playSound(clickSound);
        loadNextChallenge();
    });

    // 更新分数显示
    updateScoreDisplay();
}

// 播放音效
function playSound(sound) {
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log("音效播放失败:", e));
    }
}

// 高亮显示选中的岛屿
function highlightIsland(island) {
    islandCards.forEach(card => {
        card.style.transform = card.dataset.island === island ? 'translateY(-10px)' : '';
        card.style.boxShadow = card.dataset.island === island ?
            '0 15px 35px rgba(0, 0, 0, 0.2)' : '0 8px 25px rgba(0, 0, 0, 0.1)';
    });
}

// 进入选中的岛屿
function enterIsland(island) {
    currentGameState.currentIsland = island;
    currentGameState.currentChallengeIndex = 0;

    // 显示游戏区域，隐藏岛屿选择
    islandSelection.style.display = 'none';
    gameArea.style.display = 'block';

    // 加载岛屿内容
    loadIslandContent(island);

    // 保存游戏状态
    saveGameState();
}

// 加载岛屿内容
function loadIslandContent(island) {
    const islandData = gameData[island];

    // 设置标题
    islandTitle.textContent = islandData.title;

    // 加载课程内容
    lessonContent.innerHTML = islandData.lesson;

    // 加载第一个挑战
    loadChallenge(island, 0);
}

// 加载挑战
function loadChallenge(island, challengeIndex) {
    const islandData = gameData[island];
    const challenge = islandData.challenges[challengeIndex];

    challengeContent.innerHTML = '';
    feedbackSection.style.display = 'none';

    if (challenge.type === "multiple-choice") {
        createMultipleChoiceChallenge(challenge);
    } else if (challenge.type === "fill-blank") {
        createFillBlankChallenge(challenge);
    }
}

// 创建选择题挑战
function createMultipleChoiceChallenge(challenge) {
    const container = document.createElement('div');
    container.className = 'question-container';

    const question = document.createElement('div');
    question.className = 'question-text';
    question.textContent = challenge.question;
    container.appendChild(question);

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    challenge.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            checkMultipleChoiceAnswer(index, challenge.correctAnswer, challenge.explanation);
        });

        optionsContainer.appendChild(button);
    });

    container.appendChild(optionsContainer);
    challengeContent.appendChild(container);
}

// 创建填空题挑战
function createFillBlankChallenge(challenge) {
    const container = document.createElement('div');
    container.className = 'fill-blank-container';

    const sentence = document.createElement('div');
    sentence.className = 'sentence';

    // 将句子中的空白部分替换为输入框
    const parts = challenge.sentence.split('___');
    sentence.innerHTML = `
        ${parts[0]} <span class="blank">______</span> ${parts[1]}
    `;

    container.appendChild(sentence);

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'answer-input';
    input.placeholder = '请输入答案';
    container.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.className = 'submit-btn';
    submitButton.textContent = '提交答案';

    submitButton.addEventListener('click', () => {
        const answer = input.value.trim();
        checkFillBlankAnswer(answer, challenge.correctAnswer, challenge.explanation);
    });

    // 按回车键提交
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const answer = input.value.trim();
            checkFillBlankAnswer(answer, challenge.correctAnswer, challenge.explanation);
        }
    });

    container.appendChild(submitButton);
    challengeContent.appendChild(container);
}

// 检查选择题答案
function checkMultipleChoiceAnswer(selectedIndex, correctIndex, explanation) {
    const buttons = document.querySelectorAll('.option-btn');

    // 禁用所有按钮
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });

    // 标记正确答案和错误答案
    buttons.forEach((btn, index) => {
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex && index !== correctIndex) {
            btn.classList.add('wrong');
        }
    });

    // 显示反馈
    if (selectedIndex === correctIndex) {
        showFeedback(true, explanation);
        addScore(10);
        addStar();
    } else {
        showFeedback(false, explanation);
    }
}

// 检查填空题答案
function checkFillBlankAnswer(answer, correctAnswer, explanation) {
    const input = document.querySelector('.answer-input');
    const submitButton = document.querySelector('.submit-btn');

    // 禁用输入和按钮
    input.disabled = true;
    submitButton.disabled = true;
    submitButton.style.cursor = 'not-allowed';

    // 检查答案（不区分大小写）
    const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();

    // 显示正确答案
    const blank = document.querySelector('.blank');
    blank.textContent = correctAnswer;
    blank.style.color = isCorrect ? '#00b894' : '#d63031';
    blank.style.fontWeight = 'bold';

    // 显示反馈
    if (isCorrect) {
        showFeedback(true, explanation);
        addScore(15); // 填空题分值更高
        addStar();
    } else {
        showFeedback(false, `正确答案是: ${correctAnswer}. ${explanation}`);
    }
}

// 显示反馈信息
function showFeedback(isCorrect, message) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'wrong'}`;
    feedbackSection.style.display = 'block';

    // 播放音效
    if (isCorrect) {
        playSound(correctSound);
    } else {
        playSound(wrongSound);
    }

    // 滚动到反馈区域
    feedbackSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// 加载下一个挑战
function loadNextChallenge() {
    const island = currentGameState.currentIsland;
    const nextIndex = currentGameState.currentChallengeIndex + 1;

    if (nextIndex < gameData[island].challenges.length) {
        currentGameState.currentChallengeIndex = nextIndex;
        loadChallenge(island, nextIndex);
        saveGameState();
    } else {
        // 所有挑战完成
        showCompletionMessage();
    }
}

// 显示完成消息
function showCompletionMessage() {
    challengeContent.innerHTML = `
        <div class="question-container" style="text-align: center;">
            <h3 style="color: #00b894;">🎉 恭喜！ 🎉</h3>
            <p style="font-size: 1.3rem; margin: 20px 0;">
                你已完成 ${gameData[currentGameState.currentIsland].title} 的所有挑战！
            </p>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">
                你获得了 <span style="color: #ffd32a; font-weight: bold;">3颗星星</span>！
            </p>
            <div style="font-size: 1.1rem; background: #f8f9fa; padding: 15px; border-radius: 10px;">
                <p>🎯 <strong>学习要点回顾：</strong></p>
                <p>${getTenseSummary(currentGameState.currentIsland)}</p>
            </div>
            <button id="returnToIslands" class="submit-btn" style="margin-top: 20px;">
                返回岛屿选择
            </button>
        </div>
    `;

    feedbackSection.style.display = 'none';

    document.getElementById('returnToIslands').addEventListener('click', () => {
        playSound(clickSound);
        returnToIslandSelection();
    });
}

// 获取时态总结
function getTenseSummary(island) {
    const summaries = {
        present: "一般现在时：表示经常发生的动作或客观事实。记住第三人称单数要加s！",
        past: "一般过去时：表示过去发生的动作。注意动词要变成过去式！",
        future: "一般将来时：表示将要发生的动作。使用will或be going to！",
        progressive: "现在进行时：表示正在进行的动作。结构是am/is/are + 动词-ing！"
    };
    return summaries[island] || "继续加油学习！";
}

// 返回岛屿选择
function returnToIslandSelection() {
    islandSelection.style.display = 'block';
    gameArea.style.display = 'none';

    // 重置高亮
    islandCards.forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
}

// 添加分数
function addScore(points) {
    currentGameState.score += points;
    updateScoreDisplay();
    saveGameState();
}

// 添加星星
function addStar() {
    currentGameState.stars += 1;
    updateScoreDisplay();
    saveGameState();
}

// 更新分数显示
function updateScoreDisplay() {
    scoreElement.textContent = currentGameState.score;
    starsElement.textContent = currentGameState.stars;
}

// 保存游戏状态到本地存储
function saveGameState() {
    try {
        localStorage.setItem('englishTenseGameState', JSON.stringify(currentGameState));
    } catch (e) {
        console.log("无法保存游戏状态:", e);
    }
}

// 从本地存储加载游戏状态
function loadGameState() {
    try {
        const savedState = localStorage.getItem('englishTenseGameState');
        if (savedState) {
            currentGameState = JSON.parse(savedState);
            updateScoreDisplay();
        }
    } catch (e) {
        console.log("无法加载游戏状态:", e);
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', initGame);

// 添加一些动画效果
document.addEventListener('DOMContentLoaded', () => {
    // 为岛屿卡片添加延迟动画
    islandCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'slideIn 0.5s ease-out forwards';
        card.style.opacity = '0';
    });

    // 添加一些交互提示
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.9);
        padding: 10px 15px;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        font-size: 0.9rem;
        z-index: 1000;
        animation: bounceIn 1s ease-out;
    `;
    hint.innerHTML = '💡 点击岛屿开始学习！';
    document.body.appendChild(hint);

    // 5秒后隐藏提示
    setTimeout(() => {
        hint.style.opacity = '0';
        hint.style.transition = 'opacity 1s';
        setTimeout(() => hint.remove(), 1000);
    }, 5000);
});