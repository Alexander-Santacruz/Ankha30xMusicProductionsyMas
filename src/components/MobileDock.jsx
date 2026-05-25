import { sections } from "../data/siteContent.js";

export default function MobileDock({ activeSection, onNavigate }) {
    return (
        <nav className="mobile-dock" aria-label="Accesos moviles">
            {sections.map((section) => (
                <button
                    key={section.id}
                    className={activeSection === section.id ? "dock-link is-active" : "dock-link"}
                    type="button"
                    onClick={() => onNavigate(section.id)}
                >
                    <span>{section.label}</span>
                </button>
            ))}
        </nav>
    );
}
