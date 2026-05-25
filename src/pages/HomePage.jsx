import { useEffect, useMemo, useRef, useState } from "react";
import MobileDock from "../components/MobileDock.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import TopBar from "../components/TopBar.jsx";
import VrmViewerCard from "../components/VrmViewerCard.jsx";
import {
    galleryItems,
    phrases,
    rightsNotice,
    sections,
    videoItems,
    vrmItems
} from "../data/siteContent.js";

function getBogotaTime() {
    const now = new Date();

    return {
        time: new Intl.DateTimeFormat("es-CO", {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
            timeZone: "America/Bogota"
        }).format(now),
        day: new Intl.DateTimeFormat("es-CO", {
            weekday: "long",
            timeZone: "America/Bogota"
        }).format(now),
        date: new Intl.DateTimeFormat("es-CO", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "America/Bogota"
        }).format(now)
    };
}

function getHashState(models) {
    const hash = window.location.hash.replace("#", "");

    if (hash.startsWith("modelo-")) {
        const modelId = hash.replace("modelo-", "");

        if (models.some((item) => item.id === modelId)) {
            return {
                section: "modelos-vrm",
                selectedModelId: modelId
            };
        }
    }

    return {
        section: sections.some((section) => section.id === hash) ? hash : "inicio",
        selectedModelId: null
    };
}

export default function HomePage() {
    const baseUrl = import.meta.env.BASE_URL;
    const [clockData, setClockData] = useState(() => getBogotaTime());
    const [phrase] = useState(phrases[0]);
    const [featuredVideoIndex, setFeaturedVideoIndex] = useState(0);
    const [uploadedVrms, setUploadedVrms] = useState(vrmItems);
    const uploadedVrmsRef = useRef(vrmItems);
    const initialHashState = getHashState(vrmItems);
    const [activeSection, setActiveSection] = useState(initialHashState.section);
    const [selectedVrmId, setSelectedVrmId] = useState(initialHashState.selectedModelId);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setClockData(getBogotaTime());
        }, 1000);

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register(`${baseUrl}service-worker.js`).catch(() => {});
        }

        return () => window.clearInterval(timer);
    }, [baseUrl]);

    useEffect(() => {
        const handleHashChange = () => {
            const nextHashState = getHashState(uploadedVrmsRef.current);
            setActiveSection(nextHashState.section);
            setSelectedVrmId(nextHashState.selectedModelId);
        };

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    useEffect(() => {
        const videoTimer = window.setInterval(() => {
            setFeaturedVideoIndex((current) => (current + 1) % videoItems.length);
        }, 9000);

        return () => window.clearInterval(videoTimer);
    }, []);

    useEffect(() => {
        uploadedVrmsRef.current = uploadedVrms;
    }, [uploadedVrms]);

    useEffect(() => {
        return () => {
            uploadedVrmsRef.current.forEach((item) => {
                if (item.isTemporary) {
                    URL.revokeObjectURL(item.url);
                }
            });
        };
    }, []);

    const featuredVisual = useMemo(
        () => ({
            src: `${baseUrl}assets/images/Ankha30x Oficial.jpeg`,
            alt: "Portada oficial de Ankha30x",
            caption: "Ankha30x Oficial como imagen principal del inicio"
        }),
        [baseUrl]
    );
    const featuredVideo = videoItems[featuredVideoIndex];
    const selectedVrm = uploadedVrms.find((item) => item.id === selectedVrmId) ?? null;

    function handleNavigate(sectionId) {
        setActiveSection(sectionId);
        setSelectedVrmId(null);
        window.history.replaceState(null, "", `#${sectionId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleOpenModel(modelId) {
        setActiveSection("modelos-vrm");
        setSelectedVrmId(modelId);
        window.history.replaceState(null, "", `#modelo-${modelId}`);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleVrmUpload(event) {
        const files = Array.from(event.target.files ?? []);
        const nextModels = files.map((file, index) => ({
            id: `${file.name}-${file.lastModified}-${index}`,
            name: file.name.replace(/\.vrm$/i, ""),
            filename: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
            url: URL.createObjectURL(file),
            isTemporary: true
        }));

        setUploadedVrms((current) => [...nextModels, ...current]);
        event.target.value = "";
    }

    function preventMediaSave(event) {
        event.preventDefault();
    }

    return (
        <div className="app-shell">
            <div className="ambient-grid" aria-hidden="true" />

            <TopBar activeSection={activeSection} onNavigate={handleNavigate} />

            <main className="page-shell">
                {activeSection === "inicio" && (
                    <section className="hero-panel" id="inicio">
                        <div className="hero-copy">
                            <p className="eyebrow">Ankha30x Oficial</p>
                            <h1>Una experiencia visual poderosa para entrar al universo Ankha30x.</h1>
                            <p className="hero-text">
                                Una pagina hecha con amor para el futuro de este proyecto de Ankha30x.
                            </p>

                            <div className="hero-clock-card">
                                <span className="status-label">Hora</span>
                                <strong className="clock">{clockData.time}</strong>
                                <span className="status-subtext">{clockData.date}</span>
                                <span className="status-day">
                                    {clockData.day.charAt(0).toUpperCase() + clockData.day.slice(1)}
                                </span>
                            </div>

                            <div className="hero-status-card">
                                <span className="status-label">Estado</span>
                                <strong>Universo Ankha30x activo</strong>
                                <p>{phrase}</p>
                            </div>
                        </div>

                        <div className="hero-showcase">
                            <article className="showcase-card visual-card">
                                <div className="showcase-media protect-media" onContextMenu={preventMediaSave}>
                                    <img src={featuredVisual.src} alt={featuredVisual.alt} draggable="false" />
                                    <div className="media-guard">
                                        <span>{rightsNotice}</span>
                                    </div>
                                </div>
                                <div className="showcase-body">
                                    <span className="card-tag">Imagen destacada</span>
                                    <h2>{featuredVisual.caption}</h2>
                                </div>
                            </article>

                            <article className="showcase-card video-highlight-card">
                                <div className="showcase-media protect-media" onContextMenu={preventMediaSave}>
                                    <video
                                        controls
                                        controlsList="nodownload noplaybackrate"
                                        disablePictureInPicture
                                        preload="metadata"
                                    >
                                        <source src={featuredVideo.src} type="video/mp4" />
                                    </video>
                                    <div className="media-guard">
                                        <span>{rightsNotice}</span>
                                    </div>
                                </div>
                                <div className="showcase-body">
                                    <span className="card-tag">Video destacado</span>
                                    <h2>{featuredVideo.title}</h2>
                                </div>
                            </article>
                        </div>
                    </section>
                )}

                {activeSection === "galeria" && (
                    <section className="content-panel" id="galeria">
                        <SectionHeading
                            eyebrow="Imagenes"
                            title="Galeria visual Ankha30x"
                        />

                        <div className="media-grid gallery-grid">
                            {galleryItems.map((item, index) => (
                                <figure className="media-tile" key={item.src}>
                                    <div className="media-frame protect-media" onContextMenu={preventMediaSave}>
                                        <img src={item.src} alt={item.alt} draggable="false" />
                                        <div className="media-guard">
                                            <span>{rightsNotice}</span>
                                        </div>
                                        <span className="media-counter">Imagen {index + 1}</span>
                                    </div>
                                    <figcaption>{item.caption}</figcaption>
                                </figure>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === "videos" && (
                    <section className="content-panel" id="videos">
                        <SectionHeading
                            eyebrow="Videos"
                            title="Videoteca Ankha30x"
                        />

                        <div className="media-grid video-grid">
                            {videoItems.map((item, index) => (
                                <article className="video-tile" key={item.src}>
                                    <div className="media-frame protect-media" onContextMenu={preventMediaSave}>
                                        <video
                                            controls
                                            controlsList="nodownload noplaybackrate"
                                            disablePictureInPicture
                                            preload="metadata"
                                        >
                                            <source src={item.src} type="video/mp4" />
                                        </video>
                                        <div className="media-guard">
                                            <span>{rightsNotice}</span>
                                        </div>
                                        <span className="media-counter">Video {index + 1}</span>
                                    </div>
                                    <div className="video-tile-body">
                                        <h3>{item.title}</h3>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {activeSection === "modelos-vrm" && selectedVrm && (
                    <section className="content-panel model-focus-page" id="modelos-vrm">
                        <div className="model-focus-topbar">
                            <button className="model-back-button" type="button" onClick={() => handleNavigate("modelos-vrm")}>
                                Volver a modelos
                            </button>
                        </div>

                        <VrmViewerCard
                            index={Math.max(0, uploadedVrms.findIndex((item) => item.id === selectedVrm.id))}
                            model={selectedVrm}
                            fullScreen
                        />
                    </section>
                )}

                {activeSection === "modelos-vrm" && !selectedVrm && (
                    <section className="content-panel" id="modelos-vrm">
                        <SectionHeading
                            eyebrow="Modelos VRM Ankha30x"
                            title="Modelos Oficiales Ankha30x"
                        />

                        {uploadedVrms.length > 0 ? (
                            <div className="vrm-grid">
                                {uploadedVrms.map((item, index) => (
                                    <VrmViewerCard
                                        key={item.id ?? `${item.filename}-${index}`}
                                        index={index}
                                        model={item}
                                        onOpen={handleOpenModel}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <strong>No hay modelos cargados</strong>
                                <p>Agrega tus archivos VRM para verlos aqui.</p>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <MobileDock activeSection={activeSection} onNavigate={handleNavigate} />
        </div>
    );
}
