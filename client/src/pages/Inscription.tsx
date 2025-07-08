import { Lock,Mail  } from "lucide-react";
import { Link } from "react-router";
import "../assets/styles/inscription.css";

export default function Inscription() {
  return (
    <>
      <div className="inscription_page">
        <div className="filter_inscription" />
      </div>
      <div className="form_card_inscription">
        <h2>Inscription</h2>

        <form action="inscription_form" className="inscription_form">
          <div className="firstname-lastname">
            <label htmlFor="Nom">Nom</label>
            <label htmlFor="Prénom">Prénom</label>
            <input type="text" id="lastname" placeholder="Entrez votre nom" />
            <input
              type="text"
              id="firstname"
              placeholder="Entrez votre prénom"
            />
          </div>
          <label htmlFor="email">Email</label>
          <Mail size={24} />
          <input
            type="text"
            id="email"
            placeholder="Entrez votre adresse mail"
          />
          <label htmlFor="password">Mot de passe</label>
          <Lock size={24} />
          <input
            type="text"
            id="password"
            placeholder="Entrez votre mot de passe"
          />

          <label htmlFor="confirm-password">
            {" "}
            Confirmez votre mot de passe
          </label>
          <Lock size={24} />
          <input
            type="text"
            id="confirm-password"
            placeholder="Confirmez votre mot de passe"
          />

          <input
            type="submit"
            value="Valider votre inscription"
            className="button_inscription"
          />
        </form>
        <p>
          Vous avez déjà un compte <br />
          Cliquez sur{" "}
          <Link to="/connexion" className="link_connexion">
            {" "}
            se connecter
          </Link>
        </p>
      </div>
    </>
  );
}
