const baseUrl = import.meta.env.BASE_URL;
const asset = (path) => `${baseUrl}${path}`;

export const sections = [
    { id: "inicio", label: "Inicio" },
    { id: "galeria", label: "Imagenes" },
    { id: "videos", label: "Videos" },
    { id: "modelos-vrm", label: "Modelos VRM" }
];

export const phrases = [
    "Ankha30x Oficial no nacio para copiar a nadie, nacio para abrir su propio reino digital.",
    "Cada cancion de Ankha30x Oficial desbloquea una zona distinta de este universo.",
    "Ichika30x, Kitty30x, Ana30x y cada variante expanden el mapa emocional de Ankha30x Oficial.",
    "Detras de Ankha30x Oficial hay imagen, poder sonoro y una identidad que sigue subiendo de nivel.",
    "Este proyecto sigue vivo porque Ankha30x Oficial convierte emociones intensas en arte legendario.",
    "Ankha30x Oficial crece entre sonidos, historias y personajes que dejan huella.",
    "Entrar al mundo de Ankha30x es como cargar una partida secreta llena de energia propia.",
    "Cada remix dentro de Ankha30x Oficial suena como una batalla emocional ganada.",
    "La estetica de Ankha30x Oficial mezcla ternura, caos y presencia como un universo jugable.",
    "No es solo musica: es una dimension donde Ankha30x convierte sentimientos en poder visual.",
    "Ankha30x Oficial avanza como una saga que cada temporada se vuelve mas intensa.",
    "Cada personaje de Ankha30x trae una historia que podria sentirse como su propio videojuego.",
    "El universo Ankha30x no pide permiso: entra, brilla y deja marca.",
    "Hay proyectos que se escuchan y otros que se viven; Ankha30x Oficial se vive.",
    "Cada imagen de Ankha30x parece una pantalla de seleccion antes de entrar a algo grande.",
    "Ankha30x Oficial transforma lo personal en una aventura audiovisual con identidad total.",
    "En este mundo no hay relleno: cada clip y cada personaje suman a la leyenda.",
    "Ankha30x Oficial sigue construyendo una biblioteca propia de emociones, remixes y simbolos.",
    "Cuando Ankha30x aparece, el ambiente cambia como si empezara una partida epica.",
    "Este universo sigue creciendo porque Ankha30x Oficial tiene vision, personaje y fuego creativo."
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
        title: "Cotisol Remix: una nueva pieza dentro del universo de Ankha30x",
        src: asset("assets/videos/Cotisol-Ankha30x Remix.mp4")
    },
    {
        title: "Kitty30x Suicide Letter Card: una pieza intensa y sentimental dentro del universo Ankha30x",
        src: asset("assets/videos/Ankha30x-Kitty30x Suickde letter card.mp4")
    },
    {
        title: "La cancion hecha con Vocaloid mas personal de Ankha30x sobre temas de odio disfrazados con un video dulce",
        src: asset("assets/videos/Ankha30x-Corrupted mind.mp4")
    },
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

export const vrmItems = [
    {
        id: "ankha30x-vrm-default",
        name: "Ankha30x",
        filename: "Ankha30x.vrm",
        size: "Modelo incluido",
        url: asset("assets/vrm/Ankha30x.vrm")
    },
    {
        id: "ana30x-vrm-default",
        name: "Ana30x",
        filename: "Ana30x.vrm",
        size: "Modelo incluido",
        url: asset("assets/vrm/Ana30x.vrm")
    },
    {
        id: "ankha30x-girl2-vrm-default",
        name: "Ankha30x Girl2",
        filename: "Ankha30x Girl2.vrm",
        size: "Modelo incluido",
        url: asset("assets/vrm/Ankha30x Girl2.vrm")
    },
    {
        id: "ankha30x-v2-vrm-default",
        name: "Ankha30x version 2",
        filename: "Ankha30x version 2.vrm",
        size: "Modelo incluido",
        url: asset("assets/vrm/Ankha30x version 2.vrm")
    }
];

export const rightsNotice = "Visualizacion protegida. Descarga y uso solo con autorizacion de Ankha30x Oficial.";
