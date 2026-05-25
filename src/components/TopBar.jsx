import { sections } from "../data/siteContent.js";

export default function TopBar({ activeSection, onNavigate }) {
    const activeLabel = sections.find((section) => section.id === activeSection)?.label ?? "Inicio";

    return (
        <header className="topbar">
            <button className="brand brand-button" type="button" onClick={() => onNavigate("inicio")}>
                Ankha30x Oficial
            </button>
            <span className="topbar-status">{activeLabel}</span>
        </header>
    );
}
