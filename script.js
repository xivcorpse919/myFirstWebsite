// Mood data with colors and quotes
const moods = [
    {
        name: "Energetic Sunrise",
        gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
        colors: ["#FF6B6B", "#FFE66D"],
        quote: "Every sunrise is an invitation to brighten someone's day."
    },
    {
        name: "Ocean Calm",
        gradient: "linear-gradient(135deg, #4ECDC4 0%, #556270 100%)",
        colors: ["#4ECDC4", "#556270"],
        quote: "Be like water - calm on the surface, powerful underneath."
    },
    {
        name: "Purple Dreams",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        colors: ["#667eea", "#764ba2"],
        quote: "Dream big, sparkle more, shine bright."
    },
    {
        name: "Forest Whisper",
        gradient: "linear-gradient(135deg, #134E5E 0%, #71B280 100%)",
        colors: ["#134E5E", "#71B280"],
        quote: "In every walk with nature, one receives far more than he seeks."
    },
    {
        name: "Sunset Bliss",
        gradient: "linear-gradient(135deg, #F2709C 0%, #FF9472 100%)",
        colors: ["#F2709C", "#FF9472"],
        quote: "Chase the sunset and find your peace."
    },
    {
        name: "Cosmic Wonder",
        gradient: "linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)",
        colors: ["#2E3192", "#1BFFFF"],
        quote: "We are all made of stardust and infinite possibilities."
    },
    {
        name: "Cherry Blossom",
        gradient: "linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 50%, #E6E6FA 100%)",
        colors: ["#FFB6C1", "#E6E6FA"],
        quote: "Like cherry blossoms, beauty is fleeting but unforgettable."
    },
    {
        name: "Electric Vibes",
        gradient: "linear-gradient(135deg, #00F260 0%, #0575E6 100%)",
        colors: ["#00F260", "#0575E6"],
        quote: "Your vibe attracts your tribe."
    },
    {
        name: "Golden Hour",
        gradient: "linear-gradient(135deg, #F7971E 0%, #FFD200 100%)",
        colors: ["#F7971E", "#FFD200"],
        quote: "Make every hour your golden hour."
    },
    {
        name: "Midnight Mystery",
        gradient: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
        colors: ["#000428", "#004e92"],
        quote: "The night is darkest just before the dawn."
    }
];

// State management
let currentMood = null;
let favorites = JSON.parse(localStorage.getItem('colorMoodFavorites')) || [];

// DOM elements
const gradientBg = document.getElementById('gradientBg');
const moodName = document.getElementById('moodName');
const moodQuote = document.getElementById('moodQuote');
const colorInfo = document.getElementById('colorInfo');
const generateBtn = document.getElementById('generateBtn');
const saveBtn = document.getElementById('saveBtn');
const favoritesGrid = document.getElementById('favoritesGrid');
const moodDisplay = document.getElementById('moodDisplay');

// Generate random mood
function generateMood() {
    const randomIndex = Math.floor(Math.random() * moods.length);
    currentMood = moods[randomIndex];

    // Update UI with animation
    gradientBg.style.background = currentMood.gradient;
    moodName.textContent = currentMood.name;
    moodQuote.textContent = `"${currentMood.quote}"`;

    // Display color chips
    colorInfo.innerHTML = currentMood.colors
        .map(color => `<div class="color-chip">${color}</div>`)
        .join('');

    // Add pulse animation
    moodDisplay.style.animation = 'none';
    setTimeout(() => {
        moodDisplay.style.animation = '';
    }, 10);
}

// Save current mood to favorites
function saveFavorite() {
    if (!currentMood) {
        alert('Generate a mood first!');
        return;
    }

    // Check if already saved
    const alreadySaved = favorites.some(fav => fav.name === currentMood.name);
    if (alreadySaved) {
        alert('This mood is already in your favorites!');
        return;
    }

    favorites.push({ ...currentMood });
    localStorage.setItem('colorMoodFavorites', JSON.stringify(favorites));
    renderFavorites();

    // Visual feedback
    saveBtn.textContent = '✓ Saved!';
    setTimeout(() => {
        saveBtn.innerHTML = '<span class="btn-icon">💾</span> Save Favorite';
    }, 2000);
}

// Render favorites grid
function renderFavorites() {
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-message">No favorites yet. Generate and save your favorite moods!</p>';
        return;
    }

    favoritesGrid.innerHTML = favorites
        .map((mood, index) => `
            <div class="favorite-card" style="background: ${mood.gradient}" onclick="loadFavorite(${index})">
                <h4>${mood.name}</h4>
                <button class="delete-btn" onclick="event.stopPropagation(); deleteFavorite(${index})">✕</button>
            </div>
        `)
        .join('');
}

// Load a favorite mood
function loadFavorite(index) {
    currentMood = favorites[index];
    gradientBg.style.background = currentMood.gradient;
    moodName.textContent = currentMood.name;
    moodQuote.textContent = `"${currentMood.quote}"`;
    colorInfo.innerHTML = currentMood.colors
        .map(color => `<div class="color-chip">${color}</div>`)
        .join('');

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Delete a favorite
function deleteFavorite(index) {
    favorites.splice(index, 1);
    localStorage.setItem('colorMoodFavorites', JSON.stringify(favorites));
    renderFavorites();
}

// Event listeners
generateBtn.addEventListener('click', generateMood);
saveBtn.addEventListener('click', saveFavorite);
moodDisplay.addEventListener('click', generateMood);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        generateMood();
    } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        saveFavorite();
    }
});

// Initialize
renderFavorites();
generateMood();

// Add a fun easter egg - shake to generate
let shakeCount = 0;
let lastShake = Date.now();

window.addEventListener('devicemotion', (e) => {
    const acceleration = e.accelerationIncludingGravity;
    const threshold = 15;

    if (Math.abs(acceleration.x) > threshold ||
        Math.abs(acceleration.y) > threshold ||
        Math.abs(acceleration.z) > threshold) {

        const now = Date.now();
        if (now - lastShake > 1000) {
            generateMood();
            lastShake = now;
        }
    }
});
