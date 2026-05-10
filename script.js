const bgMusic = document.getElementById('bg-music');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

bgMusic.volume = 0.4;

startBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log(error));
    startScreen.style.opacity = '0';
    setTimeout(() => { startScreen.style.visibility = 'hidden'; }, 1000);
});

const quotes = [
    "A todas las mujeres que son refugio, fuerza y el amor más puro del universo.",
    "Madre: una palabra que engloba creación, paciencia y valentía inagotable.",
    "El mundo es más brillante gracias a la luz que ustedes irradian cada día.",
    "No hay poder más grande ni abrazo más sincero que el de una madre.",
    "Feliz día a quienes hacen que lo imposible parezca sencillo con su amor."
];

const quoteText = document.getElementById('quote-text');
let quoteIndex = 0;

function changeQuote() {
    quoteText.classList.add('fade-out');
    setTimeout(() => {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteText.innerText = quotes[quoteIndex];
        quoteText.classList.remove('fade-out');
    }, 500);
}
setInterval(changeQuote, 5000);

// --- EFECTO 3D CONTROLADO ---
const wrapper = document.getElementById('tilt-wrapper');
const card = document.getElementById('glass-card');

function handleMovement(e) {
    const rect = wrapper.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left; 
    const y = clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Si es táctil gira máximo 8 grados, si es mouse 15 grados. Así no se descontrola.
    const maxTilt = e.touches ? 8 : 15; 
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    card.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

function resetPosition() {
    card.style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s ease-out';
}

wrapper.addEventListener('mousemove', (e) => {
    card.style.transition = 'none'; 
    handleMovement(e);
});
wrapper.addEventListener('mouseleave', resetPosition);

// Previene 100% que la pantalla se deslice al tocar la tarjeta
wrapper.addEventListener('touchmove', (e) => {
    e.preventDefault(); 
    card.style.transition = 'none';
    handleMovement(e);
}, { passive: false });

wrapper.addEventListener('touchend', resetPosition);

// --- BOKEH ---
const particlesContainer = document.getElementById('particles-container');

function createBokeh() {
    const bokeh = document.createElement('div');
    bokeh.classList.add('bokeh');
    
    const size = Math.random() * 80 + 20;
    bokeh.style.width = `${size}px`;
    bokeh.style.height = `${size}px`;
    bokeh.style.left = `${Math.random() * 100}%`;
    bokeh.style.top = '110%';
    
    const colors = [
        'rgba(255, 154, 158, 0.4)', 'rgba(254, 207, 239, 0.4)', 
        'rgba(243, 156, 18, 0.3)', 'rgba(255, 255, 255, 0.3)'
    ];
    bokeh.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, rgba(255,255,255,0) 70%)`;
    
    const duration = Math.random() * 10 + 8;
    bokeh.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(bokeh);
    setTimeout(() => { bokeh.remove(); }, duration * 1000);
}
setInterval(createBokeh, 800);