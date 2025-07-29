import { Menu, Moon, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import logo from "../../assets/images/EXTERNATIC-logo.png";
import "../../assets/styles/Navbar.css";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: "Accueil", href: "/", active: true },
    { name: "Offres", href: "/offers" },
    { name: "À Propos", href: "/about" },
  ];
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-container">
            <img src={logo} alt="Externatic Logo" className="logo" />
          </div>

          <div className="nav-links">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`nav-link ${item.active ? "active" : ""}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <NavLink to="/login">
              {!user ? (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="btn-login"
                >
                  Se connecter
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setUser(null)}
                  className="btn-login"
                >
                  Déconnexion
                </button>
              )}
            </NavLink>
            <button
              type="button"
              aria-label="Mode sombre"
              className="btn-theme"
            >
              <Moon size={20} />
            </button>
          </div>

          {/* Mobile */}
          <div className="mobile-menu-button">
            <button
              type="button"
              className="btn-theme-mobile"
              aria-label="Dark mode"
            >
              <Moon size={20} />
            </button>
            <button
              type="button"
              onClick={toggleMenu}
              className="btn-menu-toggle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsMenuOpen(false);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Fermer le menu"
          />
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <div className="mobile-nav-links">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`mobile-nav-link ${item.active ? "active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              <div className="mobile-menu-actions">
                {!user ? (
                  <button
                    type="button"
                    className="mobile-btn-login"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Se connecter
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/");
                      setUser(null);
                      setIsMenuOpen(false);
                    }}
                    className="mobile-btn-login"
                  >
                    Déconnexion
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
