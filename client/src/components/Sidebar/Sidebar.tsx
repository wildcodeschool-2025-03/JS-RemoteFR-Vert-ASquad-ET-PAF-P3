import { Menu, X } from "lucide-react";
import { type default as React, useState } from "react";
import { Link } from "react-router";
import logoVertical from "../../assets/images/logo-vertical.png";
import { getRoleConfig } from "../../constants/roleConfigs";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useRoles } from "../../hooks/useRoles";
import type { SidebarProps } from "../../types/SidebarTypes";
import "../../assets/styles/Sidebar.css";

const Sidebar: React.FC<SidebarProps> = ({ activeItem, userRole }) => {
  const { getRoleColor, loading } = useRoles();
  const roleConfig = getRoleConfig(userRole);
  const roleColor = getRoleColor(userRole);
  const isMobile = useIsMobile(768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sidebarStyle = {
    "--role-color": roleColor,
    "--role-color-hover": `${roleColor}33`,
  } as React.CSSProperties;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      closeMenu();
    }
  };

  return (
    <>
      {isMobile && (
        <button
          type="button"
          className={`burger-btn ${isMenuOpen ? "hidden" : ""}`}
          onClick={toggleMenu}
          style={sidebarStyle}
        >
          <Menu size={24} />
        </button>
      )}

      {isMobile && isMenuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
          onKeyDown={handleOverlayKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Fermer le menu"
        />
      )}

      <div
        className={`sidebar ${isMobile ? "sidebar-mobile" : ""} ${isMenuOpen ? "open" : ""}`}
        style={sidebarStyle}
      >
        <div className="sidebar-header">
          {isMobile && (
            <button type="button" className="close-btn" onClick={closeMenu}>
              <X size={24} />
            </button>
          )}
          <div className="logo">
            <img
              src={logoVertical}
              alt="Externatic Logo"
              className="logo-image"
            />
          </div>
        </div>

        <nav className="sidebar-nav">
          {loading ? (
            <div className="loading-text">Loading...</div>
          ) : (
            roleConfig.navItems.map(({ id, path, icon, label }) => (
              <Link
                key={id}
                to={path}
                className={`nav-item ${activeItem === id ? "active" : ""}`}
                onClick={isMobile ? closeMenu : undefined}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
