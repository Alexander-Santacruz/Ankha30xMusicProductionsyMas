const phrases = [
    "Ankha30x Oficial no nacio para copiar a nadie, nacio para tener su propio sello.",
    "Cada cancion de Ankha30x Oficial abre una parte distinta de este universo.",
    "Ichika30x, Kitty30x, Ana30x y cada variante hacen mas grande el mundo de Ankha30x Oficial.",
    "Detras de Ankha30x Oficial hay musica, imagen y una identidad que sigue evolucionando.",
    "Este proyecto sigue vivo porque Ankha30x Oficial convierte emociones intensas en arte propio.",
    "Ankha30x Oficial sigue creciendo entre sonidos, historias y personajes que no se olvidan."
];

const clockElement = document.getElementById("clock");
const dayElement = document.getElementById("day");
const phraseElement = document.getElementById("phrase");
const changePhraseButton = document.getElementById("changePhrase");

function updateClock() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("es-CO", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/Bogota"
    });

    const dayFormatter = new Intl.DateTimeFormat("es-CO", {
        weekday: "long",
        timeZone: "America/Bogota"
    });

    clockElement.textContent = formatter.format(now);
    const dayName = dayFormatter.format(now);
    dayElement.textContent = dayName.charAt(0).toUpperCase() + dayName.slice(1);
}

function showRandomPhrase() {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    phraseElement.textContent = randomPhrase;
}

changePhraseButton.addEventListener("click", showRandomPhrase);

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js").catch(() => {
            // Si el registro falla, la web sigue funcionando normalmente.
        });
    });
}

setInterval(updateClock, 1000);
updateClock();
showRandomPhrase();
