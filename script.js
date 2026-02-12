// DOM Elements
const screens = document.querySelectorAll('.screen');
const envelope = document.getElementById('envelope');
const envelopeContainer = document.getElementById('envelopeContainer');
const bgMusic = document.getElementById('bgMusic');
const finalMusic = document.getElementById('finalMusic');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const sadMessage = document.getElementById('sadMessage');
const heartCanvas = document.getElementById('heartCanvas');
const bigHeartCanvas = document.getElementById('bigHeartCanvas');
const lovePercentageEl = document.getElementById('lovePercentage');
const draggableHeart = document.getElementById('draggableHeart');
const meterMessage = document.getElementById('meterMessage');
const heartMeterSection = document.getElementById('heartMeterSection');
const bigHeartSection = document.getElementById('bigHeartSection');
const swipeContainer = document.getElementById('swipeContainer');
const swipeDots = document.getElementById('swipeDots');
const nextSectionBtn = document.getElementById('nextSectionBtn');
const countdownNumberEl = document.getElementById('countdownNumber');
const countdownContainer = document.getElementById('countdownContainer');
const birthdayMessage = document.getElementById('birthdayMessage');
const slowHeartsContainer = document.getElementById('slowHeartsContainer');

let currentScreen = 1;
let isMusicPlaying = false;
let loveLevel = 0;
let isDragging = false;
let startY = 0;
let currentY = 0;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initHeartCanvas();
    initSwipeGallery();
    createBackgroundElements();
    
    // Envelope Click
    envelopeContainer.addEventListener('click', () => {
        envelope.classList.add('open');
        setTimeout(() => {
            playMusic();
            nextScreen(2);
        }, 800);
    });

    // Yes/No Buttons
    yesBtn.addEventListener('click', () => {
        // Confetti effect could go here
        playMusic(); // Ensure music is playing
        nextScreen(6);
    });

    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', () => {
        sadMessage.style.display = 'block';
        moveNoButton();
    });

    // Draggable Heart
    draggableHeart.addEventListener('mousedown', startDrag);
    draggableHeart.addEventListener('touchstart', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
});

// Navigation
function nextScreen(screenId) {
    const activeScreen = document.querySelector('.screen.active');
    const nextScreenEl = document.getElementById(`screen${screenId}`);

    if (activeScreen) {
        activeScreen.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => {
            activeScreen.classList.remove('active');
            activeScreen.style.animation = '';
            nextScreenEl.classList.add('active');
            
            // Screen specific logic
            if (screenId === 4) startCountdown();
            if (screenId === 11) startFinalCinematic();
        }, 500);
    } else {
        nextScreenEl.classList.add('active');
    }
}

// Music Control
function playMusic() {
    if (!isMusicPlaying) {
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        isMusicPlaying = true;
    }
}

function switchMusic() {
    bgMusic.pause();
    finalMusic.volume = 0.6;
    finalMusic.currentTime = 0;
    finalMusic.play().catch(e => console.log("Final audio play failed:", e));
}

// No Button Logic
function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

// Heart Meter Logic
const ctx = heartCanvas.getContext('2d');
let fillHeight = 0;
const canvasWidth = 350;
const canvasHeight = 350;

function initHeartCanvas() {
    drawHeart(0);
}

function drawHeart(fillPercentage) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Heart Shape Path
    ctx.beginPath();
    const topCurveHeight = canvasHeight * 0.3;
    ctx.moveTo(canvasWidth / 2, canvasHeight / 5);
    ctx.bezierCurveTo(canvasWidth / 2, canvasHeight / 6, canvasWidth / 10, 0, 0, canvasHeight / 3);
    ctx.bezierCurveTo(0, canvasHeight * 0.7, canvasWidth / 2, canvasHeight * 0.9, canvasWidth / 2, canvasHeight);
    ctx.bezierCurveTo(canvasWidth / 2, canvasHeight * 0.9, canvasWidth, canvasHeight * 0.7, canvasWidth, canvasHeight / 3);
    ctx.bezierCurveTo(canvasWidth, 0, canvasWidth - canvasWidth / 10, canvasHeight / 6, canvasWidth / 2, canvasHeight / 5);
    ctx.closePath();
    
    // Clip to heart shape
    ctx.save();
    ctx.clip();
    
    // Background (Empty)
    ctx.fillStyle = 'rgba(255, 182, 193, 0.2)';
    ctx.fill();
    
    // Fill (Liquid)
    const fillY = canvasHeight - (canvasHeight * fillPercentage);
    ctx.fillStyle = '#FF69B4'; // Dark pink
    ctx.fillRect(0, fillY, canvasWidth, canvasHeight * fillPercentage);
    
    // Restore
    ctx.restore();
    
    // Outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#FF69B4';
    ctx.stroke();
}

function startDrag(e) {
    isDragging = true;
    startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    draggableHeart.style.cursor = 'grabbing';
}

function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const deltaY = startY - clientY;
    
    // Map drag distance to fill percentage (0 to 1)
    let newFill = loveLevel + (deltaY / 200);
    newFill = Math.max(0, Math.min(1, newFill));
    
    drawHeart(newFill);
    lovePercentageEl.textContent = `${Math.round(newFill * 100)}%`;
    
    // Visual feedback on draggable heart
    draggableHeart.style.transform = `translateX(-50%) translateY(${-deltaY}px)`;
    
    if (newFill >= 1) {
        completeHeartMeter();
    }
}

function endDrag() {
    isDragging = false;
    draggableHeart.style.transform = `translateX(-50%)`;
    draggableHeart.style.cursor = 'grab';
    
    // Reset if not complete
    if (loveLevel < 1) {
        // Optional: Animate back to 0 or keep current level
        // loveLevel = 0; 
        // drawHeart(0);
        // lovePercentageEl.textContent = '0%';
    }
}

function completeHeartMeter() {
    isDragging = false;
    loveLevel = 1;
    heartMeterSection.style.display = 'none';
    bigHeartSection.style.display = 'block';
    initBigHeart();
}

function initBigHeart() {
    const bigCtx = bigHeartCanvas.getContext('2d');
    // Draw a fancy big heart with particles maybe?
    // For simplicity, just a static heart for now
    bigCtx.fillStyle = '#FF1744';
    bigCtx.beginPath();
    bigCtx.moveTo(300, 150);
    bigCtx.bezierCurveTo(300, 100, 100, 0, 0, 200);
    bigCtx.bezierCurveTo(0, 450, 300, 550, 300, 600);
    bigCtx.bezierCurveTo(300, 550, 600, 450, 600, 200);
    bigCtx.bezierCurveTo(600, 0, 400, 100, 300, 150);
    bigCtx.fill();
}

// Countdown
function startCountdown() {
    let count = 3;
    countdownNumberEl.textContent = count;
    
    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumberEl.textContent = count;
        } else {
            clearInterval(interval);
            countdownContainer.style.display = 'none';
            birthdayMessage.style.display = 'block';
            birthdayMessage.classList.add('screen-shake');
        }
    }, 1000);
}

// Swipe Gallery
let currentSlide = 0;
const slides = document.querySelectorAll('.memory-card');

function initSwipeGallery() {
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('swipe-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        swipeDots.appendChild(dot);
    });

    // Touch events for swipe
    let touchStartX = 0;
    let touchEndX = 0;

    swipeContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    swipeContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
}

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    swipeDots.children[currentSlide].classList.remove('active');
    
    currentSlide = n;
    
    slides[currentSlide].classList.add('active');
    swipeDots.children[currentSlide].classList.add('active');
    
    if (currentSlide === slides.length - 1) {
        nextSectionBtn.style.display = 'block';
    }
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

// Final Cinematic
function startFinalCinematic() {
    switchMusic();
    document.body.classList.add('hide-effects');
    
    // Create floating hearts
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('slow-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        slowHeartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 10000);
    }, 400);
}

// Global Background Effects
function createBackgroundElements() {
    const heartsBg = document.getElementById('heartsBg');
    const rosesBg = document.getElementById('rosesBg');

    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart-bg');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 15 + 10 + 's';
        heart.style.animationDelay = Math.random() * 10 + 's';
        heartsBg.appendChild(heart);
        
        const rose = document.createElement('div');
        rose.classList.add('floating-rose-bg');
        rose.innerHTML = '🌹';
        rose.style.left = Math.random() * 100 + '%';
        rose.style.animationDuration = Math.random() * 20 + 10 + 's';
        rose.style.animationDelay = Math.random() * 10 + 's';
        rosesBg.appendChild(rose);
    }
}
