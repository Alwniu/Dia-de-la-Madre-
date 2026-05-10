// --- LÓGICA DE MÚSICA Y PANTALLA DE INICIO ---
const bgMusic = document.getElementById('bg-music');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');

bgMusic.volume = 0.4; // Ajusta el volumen a tu gusto (0.0 a 1.0)

startBtn.addEventListener('click', () => {
    // 1. Iniciar la música (tiene un catch por si falla el archivo de audio, para que no se tranque la página)
    bgMusic.play().catch(error => {
        console.log("No se pudo reproducir el audio. ¿Verificaste que el archivo 'tu-cancion.mp3' exista?", error);
    });

    // 2. Desvanecer la pantalla de inicio
    startScreen.style.opacity = '0';
    
    // 3. Quitarla del DOM para que puedas interactuar con la tarjeta
    setTimeout(() => {
        startScreen.style.visibility = 'hidden';
    }, 1000);
});

// --- LÓGICA DE FRASES DINÁMICAS ---
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

// --- EFECTO 3D INTERACTIVO (TILT) ---
const wrapper = document.getElementById('tilt-wrapper');
const card = document.getElementById('glass-card');

wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    card.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s ease-out';
});

wrapper.addEventListener('mouseenter', () => {
    card.style.transition = 'none'; 
});

// --- GENERADOR DE EFECTO BOKEH (LUCES FLOTANTES) ---
const particlesContainer = document.getElementById('particles-container');

function createBokeh() {
    const bokeh = document.createElement('div');
    bokeh.classList.add('bokeh');
    
    const size = Math.random() * 80 + 20;
    bokeh.style.width = `${size}px`;
    bokeh.style.height = `${size}px`;
    
    bokeh.style.left = `${Math.random() * 100}vw`;
    bokeh.style.top = '110vh';
    
    const colors = [
        'rgba(255, 154, 158, 0.4)', 
        'rgba(254, 207, 239, 0.4)', 
        'rgba(243, 156, 18, 0.3)',
        'rgba(255, 255, 255, 0.3)'
    ];
    bokeh.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, rgba(255,255,255,0) 70%)`;
    
    const duration = Math.random() * 10 + 8;
    bokeh.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(bokeh);
    
    setTimeout(() => {
        bokeh.remove();
    }, duration * 1000);
}

setInterval(createBokeh, 800);