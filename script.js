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
    // Aplicar clase para desvanecer
    quoteText.classList.add('fade-out');
    
    setTimeout(() => {
        // Cambiar texto
        quoteIndex = (quoteIndex + 1) % quotes.length;
        quoteText.innerText = quotes[quoteIndex];
        
        // Quitar clase para que vuelva a aparecer
        quoteText.classList.remove('fade-out');
    }, 500); // Espera a que termine la transición de opacidad
}

// Cambiar frase cada 5 segundos
setInterval(changeQuote, 5000);

// --- EFECTO 3D INTERACTIVO (TILT) ---
const wrapper = document.getElementById('tilt-wrapper');
const card = document.getElementById('glass-card');

wrapper.addEventListener('mousemove', (e) => {
    // Obtener dimensiones y posición de la tarjeta
    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left; // Posición X del ratón dentro de la tarjeta
    const y = e.clientY - rect.top;  // Posición Y del ratón dentro de la tarjeta
    
    // Calcular centro
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calcular rotación (máximo 15 grados)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    // Aplicar transformación
    card.style.transform = `translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// Restaurar posición al salir el ratón
wrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'translateZ(50px) rotateX(0deg) rotateY(0deg)';
    card.style.transition = 'transform 0.5s ease-out';
});

wrapper.addEventListener('mouseenter', () => {
    card.style.transition = 'none'; // Quitar transición suave durante el movimiento para mayor fluidez
});

// --- GENERADOR DE EFECTO BOKEH (LUCES FLOTANTES) ---
const particlesContainer = document.getElementById('particles-container');

function createBokeh() {
    const bokeh = document.createElement('div');
    bokeh.classList.add('bokeh');
    
    // Tamaño aleatorio
    const size = Math.random() * 80 + 20;
    bokeh.style.width = `${size}px`;
    bokeh.style.height = `${size}px`;
    
    // Posición inicial aleatoria
    bokeh.style.left = `${Math.random() * 100}vw`;
    bokeh.style.top = '110vh';
    
    // Color aleatorio (tonos cálidos y rosados)
    const colors = [
        'rgba(255, 154, 158, 0.4)', 
        'rgba(254, 207, 239, 0.4)', 
        'rgba(243, 156, 18, 0.3)',
        'rgba(255, 255, 255, 0.3)'
    ];
    bokeh.style.background = `radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, rgba(255,255,255,0) 70%)`;
    
    // Duración de animación aleatoria
    const duration = Math.random() * 10 + 8;
    bokeh.style.animationDuration = `${duration}s`;
    
    particlesContainer.appendChild(bokeh);
    
    // Eliminar del DOM cuando termine
    setTimeout(() => {
        bokeh.remove();
    }, duration * 1000);
}

// Crear una luz nueva cada 800ms
setInterval(createBokeh, 800);
// --- LÓGICA DE MÚSICA OCULTA ---
const bgMusic = document.getElementById('bg-music');
let musicStarted = false;

// Puedes ajustar el volumen inicial (de 0.0 a 1.0) para que sea un fondo agradable
bgMusic.volume = 0.4; 

// Escuchar el primer clic en toda la página para saltarnos el bloqueo del navegador
document.body.addEventListener(click, () => {
    if (!musicStarted) {
        bgMusic.play().then(() => {
            musicStarted = true;
        }).catch(error => {
            console.log("El navegador bloqueó la reproducción:", error);
        });
    }
}, { once: true }); // El { once: true } asegura que este evento solo se dispare una vez
