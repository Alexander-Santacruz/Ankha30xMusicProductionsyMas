// Frases motivacionales
const phrases = [
  "🔥 Nunca te rindas, lo mejor está por venir.",
  "💪 La disciplina tarde o temprano supera al talento.",
  "🚀 Si puedes soñarlo, puedes lograrlo.",
  "✨ Hoy es un gran día para empezar algo nuevo.",
  "🎯 Enfócate en tu meta, el éxito es cuestión de tiempo.",
  "Vamos a seguir con este proyecto lo juro",
];

// Función para actualizar la hora en formato 12h (AM/PM) y el día
function updateClock() {
  const now = new Date();
  
  // Ajustar la hora a la zona horaria de Colombia (UTC -5)
  const utcOffset = -5;
  now.setHours(now.getUTCHours() + utcOffset);
  
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // Determinar AM o PM
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  // Convertir a formato 12 horas
  hours = hours % 12 || 12;
  
  const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const dayName = days[now.getDay()];
  
  document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
  document.getElementById("day").innerText = `📅 ${dayName}`;
  
  // Cambiar colores LED aleatoriamente
  changeLEDColors();
}

// Cambia los colores de los textos con efecto LED aleatorio
function changeLEDColors() {
  const colors = ["cyan", "magenta", "lime", "yellow", "red", "blue", "orange"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  document.getElementById("clock").style.color = randomColor;
  document.getElementById("clock").style.textShadow = `0px 0px 30px ${randomColor}, 0px 0px 50px ${randomColor}`;
  
  document.getElementById("day").style.color = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("day").style.textShadow = `0px 0px 20px ${randomColor}`;
  
  document.getElementById("phrase").style.color = colors[Math.floor(Math.random() * colors.length)];
  document.getElementById("phrase").style.textShadow = `0px 0px 20px ${randomColor}`;
}

// Cambia la frase motivacional al presionar el botón
document.getElementById("changePhrase").addEventListener("click", () => {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  document.getElementById("phrase").innerText = randomPhrase;
  
  // Cambiar colores LED al cambiar la frase
  changeLEDColors();
});

// Actualizar cada segundo
setInterval(updateClock, 1000);
updateClock();

// Configuración de partículas
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.7, random: true },
    size: { value: 4, random: true },
    move: { enable: true, speed: 3, direction: "none", out_mode: "out" }
  }
});