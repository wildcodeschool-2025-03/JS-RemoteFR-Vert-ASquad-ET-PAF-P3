import type { FC } from "react";
import "../../assets/styles/Footer.css";
import logo from "../../assets/images/logo-vertical.png";

type SocialLink = {
  id: string;
  site: string;
  url: string;
  imgSrc: string;
  alt: string;
};

type NavLink = {
  id: string;
  title: string;
  url: string;
};

type NavSection = {
  id: string;
  title: string;
  links: NavLink[];
};

type LegalLink = {
  id: string;
  title: string;
  url: string;
};

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      id: "footer-twitter-link",
      site: "twitter",
      url: "#",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png",
      alt: "Twitter Icon",
    },
    {
      id: "footer-instagram-link",
      site: "instagram",
      url: "#",
      imgSrc: "https://img.icons8.com/win10/512/FFFFFF/instagram-new.png",
      alt: "Instagram Icon",
    },
    {
      id: "footer-youtube-link",
      site: "youtube",
      url: "#",
      imgSrc: "https://i.imgur.com/vo0fWR1.png",
      alt: "YouTube Link",
    },
    {
      id: "footer-facebook-link",
      site: "facebook",
      url: "#",
      imgSrc: "https://i.imgur.com/CcHU0Y6.jpeg",
      alt: "Facebook Icon",
    },
  ];

  const navSections: NavSection[] = [
    {
      id: "footer-externatic-section",
      title: "Externatic",
      links: [
        { id: "footer-about-link", title: "À propos", url: "#" },
        { id: "footer-offers-link", title: "Nos offres", url: "#" },
        { id: "footer-login-link", title: "Connexion", url: "#" },
      ],
    },
    {
      id: "footer-resources-section",
      title: "Ressources",
      links: [
        {
          id: "footer-candidate-guide-link",
          title: "Guide du candidat",
          url: "#",
        },
        { id: "footer-consultants-link", title: "Nos consultants", url: "#" },
        { id: "footer-findyourcompany-link", title: "TrouveTaBoite", url: "#" },
      ],
    },
    {
      id: "footer-partners-section",
      title: "Partenaires",
      links: [
        { id: "footer-wcs-link", title: "Wild Code School", url: "#" },
        { id: "footer-externatic-link", title: "Externatic", url: "#" },
        { id: "footer-mind-link", title: "Mind", url: "#" },
      ],
    },
  ];

  const legalLinks: LegalLink[] = [
    { id: "footer-legal-mentions", title: "Mentions légales", url: "#" },
    {
      id: "footer-privacy-policy",
      title: "Politique de confidentialité",
      url: "#",
    },
    { id: "footer-terms-of-use", title: "CGU", url: "#" },
    { id: "footer-cookies-policy", title: "Cookies", url: "#" },
  ];

  // Footer Container

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img src={logo} alt="Externatic Logo" className="footer-logo" />
            </div>
            <div className="social-links">
              {socialLinks.map((link) => (
                <a key={link.id} href={link.url} className="social-link">
                  <img
                    src={link.imgSrc}
                    alt={link.alt}
                    className="social-icon"
                  />
                </a>
              ))}
            </div>
          </div>

          {navSections.map((section) => (
            <div key={section.id} className="footer-nav">
              <h3 className="nav-title">{section.title}</h3>
              <ul className="nav-list">
                {section.links.map((link) => (
                  <li key={link.id}>
                    <a href={link.url} className="nav-link">
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Externatic. Tous droits réservés.
          </p>
          <div className="legal-links">
            {legalLinks.map((link) => (
              <a key={link.id} href={link.url} className="legal-link">
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
