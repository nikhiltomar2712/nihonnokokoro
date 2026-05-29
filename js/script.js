// ============ Nihon no Kokoro - Complete JavaScript ============
// GSAP & ScrollTrigger initialization
gsap.registerPlugin(ScrollTrigger);

// ============ DOM Elements ============
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const progressBar = document.getElementById('progress-bar');
const backToTop = document.getElementById('backToTop');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themePanel = document.getElementById('themePanel');
const themeOrbs = document.querySelectorAll('.theme-orb');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const memberNumber = document.getElementById('memberNumber');
const sakuraCanvas = document.getElementById('sakura-canvas');
const ctx = sakuraCanvas.getContext('2d');

// ============ Sakura Petal Animation ============
let petals = [];
const maxPetals = 60;

function resizeCanvas() {
    sakuraCanvas.width = window.innerWidth;
    sakuraCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Petal {
    constructor() {
        this.reset(true);
    }
    reset(initial = false) {
        this.x = Math.random() * sakuraCanvas.width;
        this.y = initial ? Math.random() * sakuraCanvas.height : -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.03 - 0.015;
        this.opacity = Math.random() * 0.5 + 0.4;
        const isDark = document.documentElement.getAttribute('data-theme') === 'lavender-zen' ||
            document.documentElement.getAttribute('data-theme') === 'soft-sakura-pink';
        this.color = isDark ?
            `rgba(255,150,180,${this.opacity})` :
            `rgba(255,183,197,${this.opacity})`;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.01) * 0.4;
        this.rotation += this.rotationSpeed;
        if (this.y > sakuraCanvas.height + 30) {
            this.reset();
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.45, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

for (let i = 0; i < maxPetals; i++) {
    petals.push(new Petal());
}

function animatePetals() {
    ctx.clearRect(0, 0, sakuraCanvas.width, sakuraCanvas.height);
    petals.forEach(p => {
        p.update();
        p.draw(ctx);
    });
    requestAnimationFrame(animatePetals);
}
animatePetals();

// Update petal colors on theme change
function updatePetalColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'lavender-zen' ||
        document.documentElement.getAttribute('data-theme') === 'soft-sakura-pink';
    petals.forEach(p => {
        p.color = isDark ?
            `rgba(255,150,180,${p.opacity})` :
            `rgba(255,183,197,${p.opacity})`;
    });
}

// ============ Progress Bar ============
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';

    // Back to top button
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    // Navbar shadow
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ Mobile Menu ============
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
    });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('show')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
    }
});

// ============ Theme System ============
function setTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('nihon-theme', themeName);
    themeOrbs.forEach(orb => {
        orb.classList.toggle('active', orb.getAttribute('data-theme') === themeName);
    });
    updatePetalColors();
    updateThemeMetaColor(themeName);
}

function updateThemeMetaColor(themeName) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const colors = {
        'tokyo-night': '#1a1a2e',
        'hacker-green': '#0d1a0d',
        'magenta-bloom': '#2a1030',
        'lavender-zen': '#f0e8ff',
        'cherry-blossom-red': '#2a1015',
        'deep-ocean-blue': '#0a1a30',
        'soft-sakura-pink': '#ffe8ec'
    };
    if (metaThemeColor && colors[themeName]) {
        metaThemeColor.setAttribute('content', colors[themeName]);
    }
}

// Load saved theme
const savedTheme = localStorage.getItem('nihon-theme');
if (savedTheme) {
    setTheme(savedTheme);
}

themeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themePanel.classList.toggle('show');
});

themeOrbs.forEach(orb => {
    orb.addEventListener('click', (e) => {
        e.stopPropagation();
        const theme = orb.getAttribute('data-theme');
        setTheme(theme);
        themePanel.classList.remove('show');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.theme-switcher-wrap')) {
        themePanel.classList.remove('show');
    }
});

// ============ Search Functionality ============
const culturalTopics = [
    { title: 'Tea Ceremony', desc: 'Chanoyu - The meditative ritual of preparing matcha green tea. A cornerstone of Japanese culture emphasizing harmony, respect, purity, and tranquility.',
        section: '#traditions', keywords: ['tea', 'matcha', 'chanoyu', 'ceremony'] },
    { title: 'Sushi', desc: 'Japan\'s most famous culinary export. Vinegared rice paired with fresh fish, seafood, and vegetables in endless varieties.',
        section: '#cuisine', keywords: ['sushi', 'fish', 'rice', 'food'] },
    { title: 'Sakura', desc: 'Cherry blossoms symbolize the transient nature of life. Hanami parties celebrate their fleeting beauty each spring.',
        section: '#traditions', keywords: ['sakura', 'cherry', 'blossom', 'hanami', 'spring'] },
    { title: 'Samurai', desc: 'The warrior class of feudal Japan. Bushido code emphasized loyalty, honor, and discipline. Their legacy shapes modern Japan.',
        section: '#culture', keywords: ['samurai', 'warrior', 'bushido', 'katana'] },
    { title: 'Anime', desc: 'Japanese animation has become a global phenomenon. Studio Ghibli, Shonen Jump, and countless series define modern entertainment.',
        section: '#arts', keywords: ['anime', 'manga', 'ghibli', 'animation', 'cartoon'] },
    { title: 'Mount Fuji', desc: 'Japan\'s tallest peak and sacred symbol. A UNESCO World Heritage site attracting climbers and photographers worldwide.',
        section: '#travel', keywords: ['fuji', 'mountain', 'climb', 'volcano'] },
    { title: 'Kimono', desc: 'Traditional Japanese garment. Worn for special occasions, ceremonies, and festivals. Each pattern tells a story.',
        section: '#arts', keywords: ['kimono', 'clothing', 'dress', 'traditional', 'wear'] },
    { title: 'Shinto', desc: 'Japan\'s indigenous spirituality. Kami spirits inhabit natural elements. Shrines with torii gates mark sacred spaces.',
        section: '#culture', keywords: ['shinto', 'religion', 'kami', 'shrine', 'torii'] },
    { title: 'Ramen', desc: 'Wheat noodles in rich broth. Regional varieties from tonkotsu to miso make it Japan\'s soul food.',
        section: '#cuisine', keywords: ['ramen', 'noodle', 'soup', 'broth'] },
    { title: 'Calligraphy', desc: 'Shodo - The artistic writing of Japanese characters using brush and ink. A meditative practice expressing beauty through strokes.',
        section: '#arts', keywords: ['calligraphy', 'shodo', 'brush', 'writing', 'ink'] },
    { title: 'Origami', desc: 'Paper folding art. From simple cranes to complex sculptures, origami embodies patience and precision.',
        section: '#arts', keywords: ['origami', 'paper', 'fold', 'crane'] },
    { title: 'Matsuri', desc: 'Japanese festivals featuring parades, mikoshi shrines, street food, and fireworks. Each region has unique celebrations.',
        section: '#traditions', keywords: ['matsuri', 'festival', 'parade', 'fireworks', 'celebration'] },
];

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if (query.length < 2) {
        searchResults.classList.remove('show');
        searchResults.innerHTML = '';
        return;
    }
    const results = culturalTopics.filter(topic =>
        topic.keywords.some(k => k.includes(query)) ||
        topic.title.toLowerCase().includes(query) ||
        topic.desc.toLowerCase().includes(query)
    );
    if (results.length > 0) {
        searchResults.innerHTML = results.map(r => `
            <div class="search-result-item" onclick="document.querySelector('${r.section}').scrollIntoView({behavior:'smooth'})">
                <strong>${r.title}</strong> — ${r.desc.substring(0, 80)}...
            </div>
        `).join('');
        searchResults.classList.add('show');
    } else {
        searchResults.innerHTML = '<div class="search-result-item" style="text-align:center;color:var(--text-secondary);">No results found. Try "tea", "sushi", "sakura", "samurai"...</div>';
        searchResults.classList.add('show');
    }
}

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
});
searchInput.addEventListener('input', () => {
    if (searchInput.value.length >= 2) performSearch();
    else {
        searchResults.classList.remove('show');
        searchResults.innerHTML = '';
    }
});

// ============ Lightbox ============
document.querySelectorAll('.masonry-item img, .cuisine-card img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('show');
    });
});
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('show');
});

// ============ 3D Tilt Effect ============
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// ============ Audio Playback (Simulated) ============
function playAudio(phrase) {
    const utterances = {
        'arigatou': { text: 'Arigatō gozaimasu', lang: 'ja-JP' },
        'sumimasen': { text: 'Sumimasen', lang: 'ja-JP' },
        'itadakimasu': { text: 'Itadakimasu', lang: 'ja-JP' },
        'ojama': { text: 'Ojama shimasu', lang: 'ja-JP' },
    };
    const utterance = utterances[phrase];
    if (utterance && 'speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(utterance.text);
        msg.lang = utterance.lang;
        msg.rate = 0.85;
        speechSynthesis.cancel();
        speechSynthesis.speak(msg);
    } else {
        // Fallback notification
        const btn = document.activeElement;
        if (btn) {
            const origText = btn.textContent;
            btn.textContent = '🔊 Playing...';
            btn.style.borderColor = 'var(--accent)';
            setTimeout(() => {
                btn.textContent = origText;
                btn.style.borderColor = '';
            }, 1500);
        }
    }
}

// ============ Quiz ============
const quizData = [
    {
        question: 'What does "Wabi-Sabi" celebrate?',
        options: ['Perfect symmetry', 'Beauty in imperfection', 'Bright colors', 'Modern technology'],
        correct: 1,
    },
    {
        question: 'Which Japanese festival celebrates cherry blossoms?',
        options: ['Obon', 'Tanabata', 'Hanami', 'Shōgatsu'],
        correct: 2,
    },
    {
        question: 'What is the Japanese art of paper folding called?',
        options: ['Ikebana', 'Shodō', 'Kintsugi', 'Origami'],
        correct: 3,
    },
    {
        question: 'What does "Itadakimasu" mean?',
        options: ['Goodbye', 'I\'m sorry', 'Thank you for the food', 'Excuse me'],
        correct: 2,
    },
    {
        question: 'Which mountain is Japan\'s tallest and most sacred?',
        options: ['Mount Kita', 'Mount Fuji', 'Mount Hotaka', 'Mount Aso'],
        correct: 1,
    },
];

let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;

const quizQuestion = document.getElementById('quizQuestion');
const quizOptions = document.getElementById('quizOptions');
const quizResult = document.getElementById('quizResult');
const quizNextBtn = document.getElementById('quizNextBtn');
const quizRestartBtn = document.getElementById('quizRestartBtn');

function loadQuiz() {
    if (currentQuiz >= quizData.length) {
        showQuizFinalResult();
        return;
    }
    quizAnswered = false;
    quizNextBtn.style.display = 'none';
    quizResult.textContent = '';
    const q = quizData[currentQuiz];
    quizQuestion.textContent = `Q${currentQuiz + 1}: ${q.question}`;
    quizOptions.innerHTML = q.options
        .map(
            (opt, i) =>
            `<button class="quiz-option" data-index="${i}" onclick="selectQuizAnswer(${i}, this)">${opt}</button>`
        )
        .join('');
}

function selectQuizAnswer(index, btnElement) {
    if (quizAnswered) return;
    quizAnswered = true;
    const q = quizData[currentQuiz];
    const allOptions = quizOptions.querySelectorAll('.quiz-option');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    if (index === q.correct) {
        btnElement.classList.add('correct');
        quizScore++;
        quizResult.innerHTML = '✅ <span style="color:#4caf50;">Correct!</span>';
    } else {
        btnElement.classList.add('wrong');
        allOptions[q.correct].classList.add('correct');
        quizResult.innerHTML = '❌ <span style="color:#f44336;">Not quite!</span> The correct answer is highlighted.';
    }
    quizNextBtn.style.display = 'inline-block';
}

function showQuizFinalResult() {
    quizQuestion.textContent = '🎉 Quiz Complete!';
    quizOptions.innerHTML = '';
    quizNextBtn.style.display = 'none';
    quizRestartBtn.style.display = 'inline-block';
    const pct = Math.round((quizScore / quizData.length) * 100);
    let message = '';
    if (pct >= 80) message = '🏯 You are a true Japan expert! Sugoi!';
    else if (pct >= 50) message = '🌸 You have a good understanding of Japanese culture!';
    else message = '🎌 Keep learning! Japan has so much to discover.';
    quizResult.innerHTML =
        `<span style="font-size:2rem;">${pct}%</span><br><span style="color:var(--accent);">${message}</span><br><span style="font-size:0.9rem;color:var(--text-secondary);">Score: ${quizScore}/${quizData.length}</span>`;
}

quizNextBtn.addEventListener('click', () => {
    currentQuiz++;
    loadQuiz();
});

quizRestartBtn.addEventListener('click', () => {
    currentQuiz = 0;
    quizScore = 0;
    quizRestartBtn.style.display = 'none';
    loadQuiz();
});

loadQuiz();

// ============ Live Member Count Animation ============
function animateMemberCount() {
    let count = 12847;
    setInterval(() => {
        const change = Math.floor(Math.random() * 7) - 2;
        count += change;
        if (count < 12800) count = 12830;
        if (count > 12950) count = 12920;
        memberNumber.textContent = count.toLocaleString();
    }, 4000);
}
animateMemberCount();

// ============ Language Switcher ============
const langButtons = document.querySelectorAll('.lang-btn');
const translations = {
    en: {
        'nav-home': 'Home',
        'nav-culture': 'Culture',
        'nav-traditions': 'Traditions',
        'nav-cuisine': 'Cuisine',
        'nav-arts': 'Arts',
        'nav-language': 'Language',
        'nav-modern': 'Modern Japan',
        'nav-travel': 'Travel',
        'nav-gallery': 'Gallery',
        'nav-community': 'Community',
        'hero-subtitle': 'Discover the Beauty, Tradition, and Soul of Japan',
        'hero-explore': 'Explore Culture',
        'hero-quiz': 'Take the Quiz 🧠',
        'search-placeholder': '🔍 Search cultural topics...',
        'culture-title': 'Cultural Essence',
        'culture-wabisabi': 'Wabi-Sabi',
        'culture-wabisabi-desc': 'The art of finding beauty in imperfection and transience.',
        'culture-omotenashi': 'Omotenashi',
        'culture-omotenashi-desc': 'Japanese hospitality rooted in selfless service.',
        'culture-monoaware': 'Mono no Aware',
        'culture-monoaware-desc': 'The bittersweet awareness of impermanence.',
        'culture-shinto': 'Shinto & Buddhism',
        'culture-shinto-desc': 'Two major spiritual traditions coexisting harmoniously.',
        'culture-respect': 'Respect & Harmony',
        'culture-respect-desc': 'Wa (harmony) is central to Japanese society.',
        'culture-nature': 'Nature Reverence',
        'culture-nature-desc': 'Deep connection with nature through seasonal celebrations.',
        'traditions-title': 'Traditions & Festivals',
        'cuisine-title': 'Japanese Cuisine',
        'arts-title': 'Arts & Crafts',
        'language-title': 'Language & Etiquette',
        'modern-title': 'Modern Japan',
        'travel-title': 'Travel & Experiences',
        'gallery-title': 'Gallery',
        'quiz-title': 'How Japanese Are You?',
        'community-title': 'Join Our Community',
        'discord-desc': 'Connect with Japan lovers worldwide!',
    },
    romaji: {
        'nav-home': 'Hōmu',
        'nav-culture': 'Bunka',
        'nav-traditions': 'Dentō',
        'nav-cuisine': 'Washoku',
        'nav-arts': 'Geijutsu',
        'nav-language': 'Gengo',
        'nav-modern': 'Gendai Nihon',
        'nav-travel': 'Tabi',
        'nav-gallery': 'Gyararī',
        'nav-community': 'Komyuniti',
        'hero-subtitle': 'Nihon no utsukushisa, dentō, soshite tamashī o hakken shiyou',
        'hero-explore': 'Bunka o sagasu',
        'hero-quiz': 'Kuizu 🧠',
        'search-placeholder': '🔍 Bunka topikku o kensaku...',
        'culture-title': 'Bunka no Shinzui',
        'culture-wabisabi': 'Wabi-Sabi',
        'culture-wabisabi-desc': 'Fukanzen to hakanasa no naka ni utsukushisa o mitsukeru.',
        'culture-omotenashi': 'Omotenashi',
        'culture-omotenashi-desc': 'Mushō no sābisu ni nezashita Nihon no omotenashi.',
        'culture-monoaware': 'Mono no Aware',
        'culture-monoaware-desc': 'Hakanasa e no setsunai ishiki.',
        'culture-shinto': 'Shintō to Bukkyō',
        'culture-shinto-desc': 'Futatsu no seishin dentō ga chōwa shite sonzai.',
        'culture-respect': 'Sonkei to Wa',
        'culture-respect-desc': 'Wa wa Nihon shakai no chūshin desu.',
        'culture-nature': 'Shizen Sūhai',
        'culture-nature-desc': 'Kisetsu no oiwai o tsūjita shizen to no fukai kizuna.',
        'traditions-title': 'Dentō to Matsuri',
        'cuisine-title': 'Washoku',
        'arts-title': 'Geijutsu to Kōgei',
        'language-title': 'Gengo to Reigi',
        'modern-title': 'Gendai Nihon',
        'travel-title': 'Tabi to Taiken',
        'gallery-title': 'Gyararī',
        'quiz-title': 'Anata wa dono kurai Nihonjin?',
        'community-title': 'Komyuniti ni Sanka',
        'discord-desc': 'Sekaijū no Nihon ai kōsha to tsunagarou!',
    },
    jp: {
        'nav-home': 'ホーム',
        'nav-culture': '文化',
        'nav-traditions': '伝統',
        'nav-cuisine': '和食',
        'nav-arts': '芸術',
        'nav-language': '言語',
        'nav-modern': '現代日本',
        'nav-travel': '旅',
        'nav-gallery': 'ギャラリー',
        'nav-community': 'コミュニティ',
        'hero-subtitle': '日本の美しさ、伝統、魂を発見しよう',
        'hero-explore': '文化を探る',
        'hero-quiz': 'クイズに挑戦 🧠',
        'search-placeholder': '🔍 文化トピックを検索...',
        'culture-title': '文化の真髄',
        'culture-wabisabi': '侘び寂び',
        'culture-wabisabi-desc': '不完全さと儚さの中に美を見出す芸術。',
        'culture-omotenashi': 'おもてなし',
        'culture-omotenashi-desc': '無私の奉仕に根ざした日本の hospitality。',
        'culture-monoaware': '物の哀れ',
        'culture-monoaware-desc': '儚さへの切ない意識。',
        'culture-shinto': '神道と仏教',
        'culture-shinto-desc': '調和して共存する二大精神的伝統。',
        'culture-respect': '尊敬と和',
        'culture-respect-desc': '和は日本社会の中心です。',
        'culture-nature': '自然崇拝',
        'culture-nature-desc': '季節の祝いを通じた自然との深いつながり。',
        'traditions-title': '伝統と祭り',
        'cuisine-title': '和食',
        'arts-title': '芸術と工芸',
        'language-title': '言語と礼儀',
        'modern-title': '現代日本',
        'travel-title': '旅と体験',
        'gallery-title': 'ギャラリー',
        'quiz-title': 'あなたはどのくらい日本人？',
        'community-title': 'コミュニティに参加',
        'discord-desc': '世界中の日本愛好家とつながろう！',
    },
};

function applyTranslation(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' && el.getAttribute('placeholder') !== null) {
                el.placeholder = translations[lang][key];
            } else {
                el.textContent = translations[lang][key];
            }
        }
    });
    // Special handling for search placeholder
    if (translations[lang]['search-placeholder']) {
        searchInput.placeholder = translations[lang]['search-placeholder'];
    }
}

langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const lang = btn.getAttribute('data-lang');
        localStorage.setItem('nihon-lang', lang);
        applyTranslation(lang);
    });
});

// Load saved language
const savedLang = localStorage.getItem('nihon-lang');
if (savedLang && translations[savedLang]) {
    langButtons.forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-lang="${savedLang}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    applyTranslation(savedLang);
}

// ============ Scroll Reveal Animations ============
const revealElements = document.querySelectorAll('.card, .cuisine-card, .masonry-item, .discord-card, .quiz-container');
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                gsap.fromTo(entry.target, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// ============ Parallax on Hero ============
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const hero = document.getElementById('hero');
    if (hero && scrollY < window.innerHeight) {
        const floatingEls = hero.querySelectorAll('.floating-3d');
        floatingEls.forEach((el, i) => {
            const speed = 0.3 + i * 0.08;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
});

// ============ Active Nav Link on Scroll ============
const allSections = document.querySelectorAll('section[id]');
const allNavAnchors = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    allNavAnchors.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) {
            a.classList.add('active');
        }
    });
});

// ============ GSAP Hero Animation ============
gsap.fromTo('.hero-content h1', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 });
gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
gsap.fromTo('.hero-cta', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 });

// ============ Initialize ============
console.log('🌸 日本の心 - Nihon no Kokoro');
console.log('✨ All systems ready. Enjoy exploring Japanese culture!');
console.log('🎨 Active theme:', savedTheme || 'tokyo-night');
console.log('🌐 Language:', savedLang || 'en');
