import { Link } from "react-router";
import "../assets/styles/connexion.css";
import { Lock, Mail  } from "lucide-react";

export default function Connexion() {
  return (
    <>
      <div className="connexion_page">
        <div className="filter_connexion"/>
      </div>
      <div className="form_card_connexion">
        <h2>Connexion</h2>

        <form action="connexion_form" className="connexion_form">
          <label htmlFor="email">Email</label>
          <Mail size={24} />
          <input
            type="text"
            id="email"
            placeholder="Entrer votre adresse mail"
          />

          <label htmlFor="password">Password</label>
          <Lock size={24} />
          <input
            type="text"
            id="password"
            placeholder="Entrer votre mot de passe"
          />

          <input type="submit" value="Connexion" className="button_connexion" />
        </form>
        <p>
          Vous voulez créer un compte <br />
          Cliquez sur{" "}
          <Link to="/inscription" className="link_inscription">
            créer mon compte
          </Link>
        </p>
      </div>
    </>
  );
}
