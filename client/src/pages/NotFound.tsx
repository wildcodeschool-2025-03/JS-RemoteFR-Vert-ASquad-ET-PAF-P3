import { Link } from "react-router";
import "../assets/styles/NotFound.css";
import img404 from "../assets/images/404.png";
import { getRandomMessage } from "../data/404";

export default function NotFound() {
  const message = getRandomMessage();
  return (
    <main className="notfound-main">
      <img src={img404} alt="404" className="notfound-image" />
      <h2 className="notfound-subtitle">Oups ! Cette page n'existe pas.</h2>
      <p className="notfound-text">{message}</p>
      <Link to="/" className="notfound-link">
        Retour à l'accueil
      </Link>
    </main>
  );
}
