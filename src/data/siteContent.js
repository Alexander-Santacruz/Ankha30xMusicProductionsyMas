const baseUrl = import.meta.env.BASE_URL;
const asset = (path) => `${baseUrl}${path}`;

export const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "musica", label: "Musica" },
    { id: "galeria", label: "Galeria" },
    { id: "videos", label: "Videos" }
];

export const phrases = [
    "Ankha30x Oficial no nacio para copiar a nadie, nacio para tener su propio sello.",
    "Cada cancion de Ankha30x Oficial abre una parte distinta de este universo.",
    "Ichika30x, Kitty30x, Ana30x y cada variante hacen mas grande el mundo de Ankha30x Oficial.",
    "Detras de Ankha30x Oficial hay musica, imagen y una identidad que sigue evolucionando.",
    "Este proyecto sigue vivo porque Ankha30x Oficial convierte emociones intensas en arte propio.",
    "Ankha30x Oficial sigue creciendo entre sonidos, historias y personajes que no se olvidan."
];

export const galleryItems = [
    {
        src: asset("assets/images/DulcePecado (11).jpeg"),
        alt: "Ichika30x dentro del universo Ankha30x Oficial",
        caption: "Ichika30x y su lado mas intimo dentro del universo Ankha30x Oficial"
    },
    {
        src: asset("assets/images/kitty30x.jpeg"),
        alt: "Kitty30x en una faceta emocional profunda",
        caption: "Kitty30x cargando una emocion oscura y profunda que define parte del proyecto"
    },
    {
        src: asset("assets/images/Ichika30x Gamer.png"),
        alt: "Ichika30x Gamer",
        caption: "Ichika30x Gamer mostrando una faceta mas divertida de Ankha30x Oficial"
    },
    {
        src: asset("assets/images/Ana30x .jpg"),
        alt: "Ana30x en distintas poses",
        caption: "Ana30x en diferentes poses como parte del estilo visual del proyecto"
    },
    {
        src: asset("assets/images/Ankha30x original.jpg"),
        alt: "Version original de Ankha30x Oficial",
        caption: "La version original de Ankha30x Oficial, la raiz de toda esta identidad"
    },
    {
        src: asset("assets/images/Variante masculina.jpg"),
        alt: "Variante masculina del universo Ankha30x",
        caption: "Una variante masculina que tambien forma parte del imaginario de Ankha30x Oficial"
    }
];

export const videoItems = [
    {
        title: "Killer Love: una de las caras mas intensas de Ankha30x Oficial",
        src: asset("assets/videos/Ankha30x-Killer Love.mp4")
    },
    {
        title: "Oficial Remix: identidad directa y energia propia",
        src: asset("assets/videos/Ankha30x Oficial-Remix.mp4")
    },
    {
        title: "Double Life: una historia marcada por dualidad y secretos",
        src: asset("assets/videos/Anka30x-Double Life.mp4")
    },
    {
        title: "Love Virtual X: sentimiento digital dentro del sonido Ankha30x",
        src: asset("assets/videos/Anka30x-Love Virtual X (Lirycs version).mp4")
    }
];

export const featureItems = [
    {
        title: "Presencia oficial",
        text: "La imagen de Ankha30x Oficial comunica mejor su identidad, su energia visual y su evolucion como proyecto independiente."
    },
    {
        title: "Experiencia para fans",
        text: "La interfaz permite descubrir canciones, personajes e imagenes de Ankha30x Oficial con una navegacion mas clara y directa."
    },
    {
        title: "Base multiplataforma",
        text: "Esta nueva estructura en React y Vite deja la base lista para crecer como web moderna y futura app mas avanzada."
    }
];
