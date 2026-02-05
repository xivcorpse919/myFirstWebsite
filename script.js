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
const paletteBtn = document.getElementById('paletteBtn');
const saveBtn = document.getElementById('saveBtn');
const favoritesGrid = document.getElementById('favoritesGrid');
const moodDisplay = document.getElementById('moodDisplay');
const paletteDisplay = document.getElementById('paletteDisplay');
const paletteInfo = document.getElementById('paletteInfo');

// Color palette generation using color theory
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Generate harmonious color palette using different color schemes
function generateColorPalette() {
    const schemes = [
        {
            name: 'Analogous Harmony',
            description: 'Colors that sit next to each other on the color wheel',
            generate: (baseHue) => {
                const saturation = 65 + Math.random() * 25;
                return [
                    hslToHex(baseHue, saturation, 45),
                    hslToHex((baseHue + 15) % 360, saturation, 55),
                    hslToHex((baseHue + 30) % 360, saturation + 10, 65),
                    hslToHex((baseHue + 45) % 360, saturation, 55),
                    hslToHex((baseHue + 60) % 360, saturation, 45)
                ];
            }
        },
        {
            name: 'Complementary Spectrum',
            description: 'Opposite colors creating vibrant contrast',
            generate: (baseHue) => {
                const saturation = 70 + Math.random() * 20;
                const complement = (baseHue + 180) % 360;
                return [
                    hslToHex(baseHue, saturation, 35),
                    hslToHex(baseHue, saturation - 10, 50),
                    hslToHex(baseHue, saturation - 20, 70),
                    hslToHex(complement, saturation - 10, 55),
                    hslToHex(complement, saturation, 40)
                ];
            }
        },
        {
            name: 'Triadic Balance',
            description: 'Three colors equally spaced on the color wheel',
            generate: (baseHue) => {
                const saturation = 60 + Math.random() * 25;
                return [
                    hslToHex(baseHue, saturation, 40),
                    hslToHex(baseHue, saturation - 15, 60),
                    hslToHex((baseHue + 120) % 360, saturation, 45),
                    hslToHex((baseHue + 120) % 360, saturation - 15, 65),
                    hslToHex((baseHue + 240) % 360, saturation, 50)
                ];
            }
        },
        {
            name: 'Split-Complementary',
            description: 'A base color with two adjacent to its complement',
            generate: (baseHue) => {
                const saturation = 65 + Math.random() * 25;
                return [
                    hslToHex(baseHue, saturation, 45),
                    hslToHex(baseHue, saturation - 10, 60),
                    hslToHex((baseHue + 150) % 360, saturation, 50),
                    hslToHex((baseHue + 180) % 360, saturation + 5, 55),
                    hslToHex((baseHue + 210) % 360, saturation, 50)
                ];
            }
        },
        {
            name: 'Tetradic Harmony',
            description: 'Four colors arranged into two complementary pairs',
            generate: (baseHue) => {
                const saturation = 60 + Math.random() * 20;
                return [
                    hslToHex(baseHue, saturation, 45),
                    hslToHex((baseHue + 90) % 360, saturation + 10, 55),
                    hslToHex((baseHue + 180) % 360, saturation, 50),
                    hslToHex((baseHue + 270) % 360, saturation + 10, 60),
                    hslToHex((baseHue + 45) % 360, saturation - 10, 70)
                ];
            }
        },
        {
            name: 'Monochromatic Elegance',
            description: 'Variations of a single hue with different lightness',
            generate: (baseHue) => {
                const saturation = 65 + Math.random() * 25;
                return [
                    hslToHex(baseHue, saturation, 25),
                    hslToHex(baseHue, saturation - 5, 40),
                    hslToHex(baseHue, saturation - 10, 55),
                    hslToHex(baseHue, saturation - 15, 70),
                    hslToHex(baseHue, saturation - 20, 85)
                ];
            }
        }
    ];

    const baseHue = Math.floor(Math.random() * 360);
    const scheme = schemes[Math.floor(Math.random() * schemes.length)];
    const colors = scheme.generate(baseHue);

    return {
        name: scheme.name,
        description: scheme.description,
        colors: colors
    };
}

// Display generated palette
function displayPalette() {
    const palette = generateColorPalette();

    paletteDisplay.innerHTML = palette.colors
        .map((color, index) => `
            <div class="color-swatch" style="background: ${color}" onclick="copyToClipboard('${color}', ${index})">
                <div class="color-swatch-code">${color}</div>
            </div>
        `)
        .join('');

    paletteInfo.innerHTML = `
        <div class="palette-name">${palette.name}</div>
        <div class="palette-description">${palette.description}</div>
    `;
}

// Copy color to clipboard
function copyToClipboard(color, index) {
    navigator.clipboard.writeText(color).then(() => {
        const swatches = document.querySelectorAll('.color-swatch');
        const originalContent = swatches[index].innerHTML;

        swatches[index].innerHTML = `
            <div class="color-swatch-code">✓ Copied!</div>
        `;

        setTimeout(() => {
            swatches[index].innerHTML = originalContent;
        }, 1500);
    }).catch(err => {
        alert('Failed to copy color code');
    });
}

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
paletteBtn.addEventListener('click', displayPalette);
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
    } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        displayPalette();
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
