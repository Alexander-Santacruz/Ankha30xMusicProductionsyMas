import { useEffect, useState } from "react";
import MobileDock from "../components/MobileDock.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TopBar from "../components/TopBar.jsx";
import {
    featureItems,
    galleryItems,
    phrases,
    sections,
    videoItems
} from "../data/siteContent.js";

function getBogotaTime() {
    const now = new Date();
    const time = new Intl.DateTimeFormat("es-CO", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "America/Bogota"
    }).format(now);

    const weekday = new Intl.DateTimeFormat("es-CO", {
        weekday: "long",
        timeZone: "America/Bogota"
    }).format(now);

    return {
        time,
        day: weekday.charAt(0).toUpperCase() + weekday.slice(1)
    };
}

export default function HomePage() {
    const [clock, setClock] = useState(() => getBogotaTime().time);
    const [day, setDay] = useState(() => getBogotaTime().day);
    const [phrase, setPhrase] = useState(phrases[0]);
    const [activeSection, setActiveSection] = useState(() => {
        const hash = window.location.hash.replace("#", "");
        return sections.some((section) => section.id === hash) ? hash : "inicio";
    });

    useEffect(() => {
        const timer = window.setInterval(() => {
            const next = getBogotaTime();
            setClock(next.time);
            setDay(next.day);
        }, 1000);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/service-worker.js").catch(() => {
                // Si falla el registro, la app sigue funcionando.
            });
        }

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.replace("#", "");
            if (sections.some((section) => section.id === hash)) {
                setActiveSection(hash);
            }
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    function showRandomPhrase() {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        setPhrase(phrases[randomIndex]);
    }

    function handleNavigate(sectionId) {
        setActiveSection(sectionId);
        window.history.replaceState(null, "", `#${sectionId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="app-shell">
            <div className="particle-layer" aria-hidden="true">
                <span className="particle particle-a"></span>
                <span className="particle particle-b"></span>
                <span className="particle particle-c"></span>
                <span className="particle particle-d"></span>
            </div>

            <TopBar activeSection={activeSection} onNavigate={handleNavigate} />

            <main className="container">
                {activeSection === "inicio" && (
                    <section className="hero" id="inicio">
                        <div className="hero-copy">
                            <p className="eyebrow">Ankha30x Oficial desde 2017</p>
                            <h1>La casa digital de Ankha30x Oficial en version web y movil.</h1>
                            <p className="hero-text">
                                Este espacio reune la musica, los videos, las imagenes y la identidad de Ankha30x Oficial
                                en una experiencia mas seria, mas ordenada y lista para seguir creciendo en computadora y celular.
                            </p>

                            <div className="hero-actions">
                                <a
                                    className="button button-primary"
                                    href="https://youtube.com/@ankha30xoficial?feature=shared"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Ver canal oficial
                                </a>
                                <button className="button button-secondary" type="button" onClick={showRandomPhrase}>
                                    Cambiar frase
                                </button>
                            </div>

                            <div className="status-grid">
                                <article className="status-card">
                                    <span className="status-label">Hora local</span>
                                    <strong className="clock">{clock}</strong>
                                    <span className="status-subtext">{day}</span>
                                </article>
                                <article className="status-card">
                                    <span className="status-label">Estado</span>
                                    <strong>Universo Ankha30x activo</strong>
                                    <span className="status-subtext">{phrase}</span>
                                </article>
                            </div>
                        </div>

                        <div className="hero-card">
                            <img src="/assets/images/Ankha30x Oficial.jpeg" alt="Portada oficial de Ankha30x" />
                            <div className="hero-card-body">
                                <p className="card-kicker">Identidad oficial</p>
                                <h2>Ankha30x Oficial, sus personajes y su estetica ahora tienen un hogar mas fuerte.</h2>
                                <p>
                                    La portada principal ya no solo muestra contenido: ahora presenta el proyecto como
                                    una marca creativa con personalidad propia.
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {activeSection === "musica" && (
                    <section className="section content-section" id="musica">
                        <SectionHeading
                            eyebrow="Musica y concepto"
                            title="Una app web hecha para presentar mejor la esencia de Ankha30x Oficial."
                            text="Ankha30x Oficial mezcla musica independiente, energia emocional, personajes propios y una imagen que no busca parecerse a nadie. Esta version en React conserva esa identidad y la adapta a una interfaz lista para escritorio y movil."
                        />

                        <div className="feature-grid">
                            {featureItems.map((item) => (
                                <article className="feature-card" key={item.title}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === "galeria" && (
                    <section className="section content-section" id="galeria">
                        <SectionHeading
                            eyebrow="Galeria visual"
                            title="Personajes, variantes y momentos clave de Ankha30x Oficial."
                        />

                        <div className="gallery-grid">
                            {galleryItems.map((item) => (
                                <figure className="media-card" key={item.src}>
                                    <img src={item.src} alt={item.alt} />
                                    <figcaption>{item.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === "videos" && (
                    <section className="section content-section" id="videos">
                        <SectionHeading
                            eyebrow="Videos destacados"
                            title="Clips, remixes y piezas que expanden el mundo musical de Ankha30x Oficial."
                        />

                        <div className="video-grid">
                            {videoItems.map((item) => (
                                <article className="video-card" key={item.src}>
                                    <h3>{item.title}</h3>
                                    <video controls preload="metadata">
                                        <source src={item.src} type="video/mp4" />
                                    </video>
                                </article>
                            ))}
                        </div>
                    </section>
                )}
            </main>

            <footer className="footer container">
                <p>Ankha30x Oficial. Musica, identidad visual y expansion digital en una sola plataforma.</p>
            </footer>

            <MobileDock activeSection={activeSection} onNavigate={handleNavigate} />
        </div>
    );
}
