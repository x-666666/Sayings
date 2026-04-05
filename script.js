// Ensure you have at least 4 sayings here so the multiple-choice works!
const sayings = [
    /*
    { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "It is never too late to be what you might have been.", author: "George Eliot" },
    { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
    { text: "Smooth seas do not make skillful sailors.", author: "African Proverb" },
    { text: "A journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
     */
    {
        text: "喜欢白洲梓的人 都得了爱梓病",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "\"我要一杯星冰乐\" \r\n店员：\"你的星冰乐\"",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "如果有一天你的手和脚打起来了， 你会为了手赢而去打脚吗？",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "你知道为什么兵马俑很爽吗？ 因为守嬴政的很爽",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "周杰伦见过很多人， 周杰是个人物。",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "药膏潮了， 不能再擦了~",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "领字怎么写？ 今页多一点~",
        author: "XY",
        tag: "Sayings"
    },
    {
        // 使用 \r\n 换行，使用 \" 转义引号
        text: "想和爱丽丝 一起姓爱",
        author: "XY",
        tag: "Sayings"
    },
    {
        // 对话形式示例
        text: "异地恋就像数列， 一个等差，一个等比",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "一只鸟的窝掉进水中，\r\n河神问:\"你掉的是这个金丝窝还是这个银丝窝?\"\r\n 鸟说:\"草丝窝\"",
        author: "XY",
        tag: "Sayings"
    },
    {
        // 多行对话
        text: "Life is like a dick. \r\n Sometimes it's up \r\n Sometimes it's down. \r\n But it won't be hard forever.",
        author: "XY",
        tag: "Sayings"
    },
    {
        // 带引号的现代对话
        text: "吧唧发生干涉, 吧唧干涉",
        author: "XY",
        tag: "Sayings"
    },
    {
        text: "为什么男生学习不好? 因为学习需要引导,而男生没有 \r\n 为什么女生学习不好? 因为学习需要积极,而女生没有",
        author: "夜樱次元",
        tag: "Sayings"
    },
    {
        text: "为什么睡觉的时候不能0721? \r\n 因为会被窝潮湿 \r\n所以你们喜欢被窝干还是被窝潮?",
        author: "XY",
        tag: "Sayings"
    }
];

// --- DOM ELEMENTS ---
const readSection = document.getElementById("read-section");
const testSection = document.getElementById("test-section");
const modeReadBtn = document.getElementById("mode-read-btn");
const modeTestBtn = document.getElementById("mode-test-btn");

// Read Mode Elements
const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-btn");

// Test Mode Elements
const testQuoteElement = document.getElementById("test-quote");
const optionsContainer = document.getElementById("options-container");
const testFeedback = document.getElementById("test-feedback");
const nextQuestionBtn = document.getElementById("next-question-btn");
const scoreDisplay = document.getElementById("score-display"); // New element

// --- SCORE TRACKING VARIABLES ---
let currentScore = 0;
let questionsAsked = 0;

// --- NAVIGATION LOGIC ---
modeReadBtn.addEventListener("click", () => {
    readSection.classList.remove("hidden");
    testSection.classList.add("hidden");
    modeReadBtn.classList.add("active-tab");
    modeTestBtn.classList.remove("active-tab");
});

modeTestBtn.addEventListener("click", () => {
    testSection.classList.remove("hidden");
    readSection.classList.add("hidden");
    modeTestBtn.classList.add("active-tab");
    modeReadBtn.classList.remove("active-tab");
    
    // Reset score when entering test mode
    currentScore = 0;
    questionsAsked = 0;
    updateScoreDisplay();
    
    generateQuestion(); 
});

// --- READ MODE LOGIC ---
//显示名言，textContent是难以换行的
function generateQuote() {
    const randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
    quoteElement.textContent = `"${randomSaying.text}"`;
    authorElement.textContent = `- ${randomSaying.author}`;
}
newQuoteBtn.addEventListener("click", generateQuote);

// --- TEST MODE LOGIC ---

function updateScoreDisplay() {
    scoreDisplay.textContent = `Score: ${currentScore} / ${questionsAsked}`;
}

// Helper function to split a string into two halves based on word count
function splitSaying(text) {
    // 判断是否包含中文字符
    /*
    if (/[\u4e00-\u9fa5]/.test(text)) {
        // 按字符分割中文
        const chars = [...text.replace(/\s+/g, '')]; // 去除空格后按字符分割
        const middleIndex = Math.floor(chars.length / 2);
        const part1 = chars.slice(0, middleIndex).join("") + "...";
        const part2 = "... " + chars.slice(middleIndex).join("");
        return { part1, part2 };
    }
        */
    const words = text.split(" ");
        const middleIndex = Math.floor(words.length / 2);
        const part1 = words.slice(0, middleIndex).join(" ") + "...";
        const part2 = "... " + words.slice(middleIndex).join(" ");
        return { part1, part2 };
    // 英文仍按原逻辑处理
}

function generateQuestion() {
    // 1. Reset the UI
    optionsContainer.innerHTML = "";
    testFeedback.textContent = "";
    nextQuestionBtn.classList.add("hidden");

    // 2. Pick a correct saying
    const correctSaying = sayings[Math.floor(Math.random() * sayings.length)];
    const { part1: correctPart1, part2: correctPart2 } = splitSaying(correctSaying.text);
    
    testQuoteElement.textContent = `"${correctPart1}"`;

    // 3. Gather 3 wrong answers (distractors)
    let options = [{ text: correctPart2, isCorrect: true }];
    
    while (options.length < 4) {
        let randomSaying = sayings[Math.floor(Math.random() * sayings.length)];
        let randomPart2 = splitSaying(randomSaying.text).part2;
        
        // Ensure we don't add duplicates
        if (!options.some(opt => opt.text === randomPart2)) {
            options.push({ text: randomPart2, isCorrect: false });
        }
    }

    // 4. Shuffle the options so the correct one isn't always first
    options.sort(() => Math.random() - 0.5);

    // 5. Create the buttons
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.classList.add("option-btn");
        btn.textContent = option.text;
        
        btn.addEventListener("click", () => handleAnswer(btn, option.isCorrect, optionsContainer, correctPart2));
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(clickedBtn, isCorrect, container, correctText) {
    // Disable all buttons so the user can't click twice
    const allButtons = container.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);
    
    // Update Score Variables
    questionsAsked++;

    if (isCorrect) {
        currentScore++;
        clickedBtn.classList.add("correct");
        testFeedback.textContent = "Correct! Well done.";
        testFeedback.style.color = "#28a745";
    } else {
        clickedBtn.classList.add("incorrect");
        testFeedback.textContent = "Oops! That's not it.";
        testFeedback.style.color = "#dc3545";
    }

    // Highlight the actual correct answer regardless of what they clicked
    allButtons.forEach(btn => {
        if(btn.textContent === correctText) {
            btn.classList.add("correct");
        }
    });

    // Update the UI score
    updateScoreDisplay();

    // Show the "Next Question" button
    nextQuestionBtn.classList.remove("hidden");
}

nextQuestionBtn.addEventListener("click", generateQuestion);

// --- INITIALIZATION ---
generateQuote(); // Load the first quote on page load