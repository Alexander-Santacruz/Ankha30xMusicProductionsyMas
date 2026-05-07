import { sections } from "../data/siteContent.js";

export default function TopBar({ activeSection, onNavigate }) {
    return (
        <header className="topbar">
            <button className="brand brand-button" type="button" onClick={() => onNavigate("inicio")}>
                Ankha30x Oficial
            </button>
            <nav className="nav" aria-label="Navegacion principal">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        className={activeSection === section.id ? "nav-link is-active" : "nav-link"}
                        type="button"
                        onClick={() => onNavigate(section.id)}
                    >
                        {section.label}
                    </button>
                ))}
            </nav>
        </header>
    );
}
